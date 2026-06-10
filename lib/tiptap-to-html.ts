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

const getAlignmentStyle = (node: TipTapNode): string => {
  const align = node.attrs?.textAlign;
  if (align === 'left' || align === 'center' || align === 'right' || align === 'justify') {
    return ` style="text-align:${align}"`;
  }

  return '';
};

const tableWrapperClass = 'my-8 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800';
const tableClass = 'w-full min-w-[520px] border-collapse text-sm';
const tableHeaderClass = 'border border-slate-300 bg-slate-100 px-4 py-3 text-left font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50';
const tableCellClass = 'border border-slate-200 px-4 py-3 align-top text-slate-700 dark:border-slate-800 dark:text-slate-300';

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

  const getCellStyle = (node: TipTapNode): string => {
    const backgroundColor = node.attrs?.backgroundColor;
    return backgroundColor ? ` style="background-color:${escapeHtml(String(backgroundColor))}"` : '';
  };

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
        nodeHtml = `<p${getAlignmentStyle(node)}>${renderContent(node)}</p>`;
        break;

      case 'heading':
        const rawLevel = Number(node.attrs?.level ?? 1);
        const level = Math.min(6, Math.max(1, Number.isNaN(rawLevel) ? 1 : rawLevel));
        nodeHtml = `<h${level}${getAlignmentStyle(node)}>${renderContent(node)}</h${level}>`;
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
        nodeHtml = `<div class="${tableWrapperClass}"><table class="${tableClass}">${renderContent(node)}</table></div>`;
        break;

      case 'tableRow':
        nodeHtml = `<tr>${renderContent(node)}</tr>`;
        break;

      case 'tableHeader':
        nodeHtml = `<th class="${tableHeaderClass}"${getCellStyle(node)}>${renderContent(node)}</th>`;
        break;

      case 'tableCell':
        nodeHtml = `<td class="${tableCellClass}"${getCellStyle(node)}>${renderContent(node)}</td>`;
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
