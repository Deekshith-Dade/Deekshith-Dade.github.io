"use client";
import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Eye } from 'lucide-react'

export default function ViewCounter({ slug, compact = false, increment = false }) {
    const [views, setViews] = useState(null)
    const [loading, setLoading] = useState(true)
    const hasIncremented = useRef(false)

    useEffect(() => {
        // Check if Supabase is configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            setLoading(false)
            return
        }

        // Fetch current view count
        async function fetchViews() {
            try {
                const { data, error } = await supabase
                    .from('blog_views')
                    .select('count')
                    .eq('slug', slug)
                    .single()

                if (data) {
                    setViews(data.count)
                } else if (error && error.code === 'PGRST116') {
                    // Row doesn't exist yet, initialize with 0
                    setViews(0)
                }
            } catch (error) {
                console.error('Error fetching views:', error)
            } finally {
                setLoading(false)
            }
        }

        // Increment view count (only once per session, and only if increment prop is true)
        async function incrementViews() {
            // Only increment if explicitly requested (e.g., on the blog post page, not list page)
            if (!increment) return

            // Check if already viewed in this session (synchronously, before any async operations)
            const hasViewed = sessionStorage.getItem(`viewed-${slug}`)
            if (hasViewed || hasIncremented.current) {
                return
            }

            // Mark as incrementing immediately to prevent race conditions
            hasIncremented.current = true
            sessionStorage.setItem(`viewed-${slug}`, 'true')

            try {
                // Use RPC function to atomically increment
                const { data, error } = await supabase.rpc('increment_views', {
                    blog_slug: slug
                })

                if (!error && data !== null) {
                    setViews(data) // Update with new count
                } else if (error) {
                    // If function doesn't exist or fails, try upsert approach
                    const { data: existing, error: fetchError } = await supabase
                        .from('blog_views')
                        .select('count')
                        .eq('slug', slug)
                        .single()

                    if (existing) {
                        // Row exists, update it
                        const { data: updated, error: updateError } = await supabase
                            .from('blog_views')
                            .update({ count: existing.count + 1 })
                            .eq('slug', slug)
                            .select('count')
                            .single()

                        if (!updateError && updated) {
                            setViews(updated.count)
                        }
                    } else if (fetchError && fetchError.code === 'PGRST116') {
                        // Row doesn't exist, insert new row
                        const { data: inserted, error: insertError } = await supabase
                            .from('blog_views')
                            .insert({ slug, count: 1 })
                            .select('count')
                            .single()

                        if (!insertError && inserted) {
                            setViews(inserted.count)
                        }
                    }
                }
            } catch (error) {
                console.error('Error incrementing views:', error)
                // Reset on error so it can retry
                hasIncremented.current = false
                sessionStorage.removeItem(`viewed-${slug}`)
            }
        }

        fetchViews()
        incrementViews()
    }, [slug, increment])

    // Don't render if not configured or loading
    if (loading || views === null) {
        return null
    }

    if (compact) {
        return (
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-[0.35em] text-white/50">
                <Eye size={12} />
                {views} {views === 1 ? 'view' : 'views'}
            </span>
        )
    }

    return (
        <span className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/50">
            <Eye size={14} />
            {views} {views === 1 ? 'view' : 'views'}
        </span>
    )
}

