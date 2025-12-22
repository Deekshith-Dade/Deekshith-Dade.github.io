// Extract all inline references from blocks
// Inline reference syntax: [^label](url) - renders as superscript link
export function extractInlineReferences(blocks) {
  const inlineRefs = [];
  const refRegex = /\[\^([^\]]+)\]\(([^)]+)\)/g;
  
  blocks.forEach((block) => {
    const textFields = [];
    
    // Collect all text fields that might contain inline references
    if (block.text) textFields.push(block.text);
    if (block.items) textFields.push(...block.items);
    
    textFields.forEach((text) => {
      if (!text) return;
      let match;
      refRegex.lastIndex = 0;
      while ((match = refRegex.exec(text)) !== null) {
        const label = match[1];
        const url = match[2];
        // Only add if not already present (by URL)
        if (!inlineRefs.find(r => r.url === url)) {
          inlineRefs.push({ label, url });
        }
      }
    });
  });
  
  return inlineRefs;
}

