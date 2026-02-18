'use client';

import { MDXRemote } from 'next-mdx-remote';
import { mdxComponents } from '@/components/mdx';

export default function MDXContent({ source }) {
  return <MDXRemote {...source} components={mdxComponents} />;
}
