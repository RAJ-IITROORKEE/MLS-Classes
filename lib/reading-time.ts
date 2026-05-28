/**
 * Generates reading time in minutes based on TipTap JSON content
 * Average reading speed: 200-250 words per minute
 */
export function generateReadingTime(content: any): number {
  if (!content || !content.content) return 0;

  let wordCount = 0;

  const countWords = (node: any) => {
    if (node.type === 'text' && node.text) {
      wordCount += node.text.split(/\s+/).filter((w: string) => w.length > 0)
        .length;
    }

    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(countWords);
    }
  };

  content.content.forEach(countWords);

  // Reading speed: 200 words per minute
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  return readingTime;
}
