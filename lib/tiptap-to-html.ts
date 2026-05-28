/**
 * Converts TipTap JSON to HTML
 * This is a simple converter - for complex rendering use a proper library
 */
type TipTapMark = {
  type?: string;
  attrs?: Record<string, unknown>;
};

type TipTapNode = {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: TipTapMark[];
  content?: TipTapNode[];
};

const asNode = (value: unknown): TipTapNode | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return value as TipTapNode;
};

export function generateHtml(content: unknown): string {
  const root = asNode(content);
  if (!root || !Array.isArray(root.content)) return '';

  const escapeHtml = (text: string): string =>
    text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  let html = '';

  const renderNode = (node: TipTapNode): string => {
    let nodeHtml = '';

    switch (node.type) {
      case 'doc':
        node.content?.forEach((child) => {
          nodeHtml += renderNode(child);
        });
        break;

      case 'paragraph':
        nodeHtml = `<p>${renderContent(node)}</p>`;
        break;

      case 'heading':
        const rawLevel = Number(node.attrs?.level ?? 1);
        const level = Math.min(6, Math.max(1, Number.isNaN(rawLevel) ? 1 : rawLevel));
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

      case 'table':
        nodeHtml = `<table>${renderContent(node)}</table>`;
        break;

      case 'tableRow':
        nodeHtml = `<tr>${renderContent(node)}</tr>`;
        break;

      case 'tableHeader':
        nodeHtml = `<th>${renderContent(node)}</th>`;
        break;

      case 'tableCell':
        nodeHtml = `<td>${renderContent(node)}</td>`;
        break;

      case 'codeBlock':
        nodeHtml = `<pre><code>${renderContent(node)}</code></pre>`;
        break;

      case 'image': {
        const src = String(node.attrs?.src ?? '');
        const alt = String(node.attrs?.alt ?? 'Blog image');
        nodeHtml = `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />`;
        break;
      }

      case 'text':
        nodeHtml = escapeHtml(node.text ?? '');
        if (node.marks) {
          node.marks.forEach((mark) => {
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
                const href = String(mark.attrs?.href ?? '#');
                nodeHtml = `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${nodeHtml}</a>`;
                break;
              case 'highlight': {
                const color = mark.attrs?.color;
                nodeHtml = color
                  ? `<mark style="background-color:${escapeHtml(String(color))}">${nodeHtml}</mark>`
                  : `<mark>${nodeHtml}</mark>`;
                break;
              }
              case 'textStyle':
                if (mark.attrs?.color) {
                  nodeHtml = `<span style="color:${escapeHtml(String(mark.attrs.color))}">${nodeHtml}</span>`;
                }
                break;
            }
          });
        }
        break;

      default:
        if (Array.isArray(node.content)) {
          nodeHtml = renderContent(node);
        }
    }

    return nodeHtml;
  };

  const renderContent = (node: TipTapNode): string => {
    if (!Array.isArray(node.content)) return '';
    return node.content.map((child) => renderNode(child)).join('');
  };

  html = renderNode(root);
  return html;
}
