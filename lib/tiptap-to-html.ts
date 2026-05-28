/**
 * Converts TipTap JSON to HTML
 * This is a simple converter - for complex rendering use a proper library
 */
export function generateHtml(content: any): string {
  if (!content || !content.content) return '';

  let html = '';

  const renderNode = (node: any): string => {
    let nodeHtml = '';

    switch (node.type) {
      case 'doc':
        node.content?.forEach((child: any) => {
          nodeHtml += renderNode(child);
        });
        break;

      case 'paragraph':
        nodeHtml = `<p>${renderContent(node)}</p>`;
        break;

      case 'heading':
        const level = node.attrs?.level || 1;
        nodeHtml = `<h${level}>${renderContent(node)}</h${level}>`;
        break;

      case 'bulletList':
        nodeHtml = `<ul>${renderContent(node)}</ul>`;
        break;

      case 'orderedList':
        nodeHtml = `<ol>${renderContent(node)}</ol>`;
        break;

      case 'listItem':
        nodeHtml = `<li>${renderContent(node)}</li>`;
        break;

      case 'blockquote':
        nodeHtml = `<blockquote>${renderContent(node)}</blockquote>`;
        break;

      case 'codeBlock':
        nodeHtml = `<pre><code>${renderContent(node)}</code></pre>`;
        break;

      case 'image':
        const src = node.attrs?.src || '';
        nodeHtml = `<img src="${src}" alt="Blog image" />`;
        break;

      case 'text':
        nodeHtml = node.text || '';
        if (node.marks) {
          node.marks.forEach((mark: any) => {
            switch (mark.type) {
              case 'bold':
                nodeHtml = `<strong>${nodeHtml}</strong>`;
                break;
              case 'italic':
                nodeHtml = `<em>${nodeHtml}</em>`;
                break;
              case 'underline':
                nodeHtml = `<u>${nodeHtml}</u>`;
                break;
              case 'strike':
                nodeHtml = `<s>${nodeHtml}</s>`;
                break;
              case 'code':
                nodeHtml = `<code>${nodeHtml}</code>`;
                break;
              case 'link':
                const href = mark.attrs?.href || '#';
                nodeHtml = `<a href="${href}" target="_blank" rel="noopener noreferrer">${nodeHtml}</a>`;
                break;
            }
          });
        }
        break;

      default:
        if (node.content) {
          nodeHtml = renderContent(node);
        }
    }

    return nodeHtml;
  };

  const renderContent = (node: any): string => {
    if (!node.content) return '';
    return node.content.map((child: any) => renderNode(child)).join('');
  };

  html = renderNode(content);
  return html;
}
