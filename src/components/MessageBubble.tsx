import React from 'react';
import ProductCard from './ProductCard';
import { Role, type ChatMessage } from '../types';

interface Props {
  message: ChatMessage;
}

/**
 * Lightweight inline-markdown renderer. Supports **bold** and *italic*.
 * We deliberately do not pull in a full markdown library — the model only
 * needs bold, italic, bullet `-`, and numbered `1.` lists, and we want zero
 * dependencies for the chat bubble.
 */
const renderInline = (text: string): React.ReactNode => {
  if (!text) return null;
  const tokens = text.split(/(\*\*[\s\S]+?\*\*|(?<![*\w])\*[^*\n]+?\*)/g);
  return tokens.map((chunk, i) => {
    if (chunk.startsWith('**') && chunk.endsWith('**') && chunk.length >= 4) {
      return (
        <strong key={i} style={{ fontWeight: 700 }}>
          {chunk.slice(2, -2)}
        </strong>
      );
    }
    if (
      chunk.startsWith('*') &&
      chunk.endsWith('*') &&
      chunk.length >= 3 &&
      !chunk.startsWith('**')
    ) {
      return (
        <em key={i} style={{ fontStyle: 'italic' }}>
          {chunk.slice(1, -1)}
        </em>
      );
    }
    return <React.Fragment key={i}>{chunk}</React.Fragment>;
  });
};

interface Block {
  type: 'p' | 'ul' | 'ol';
  items: string[];
}

const parseBlocks = (raw: string): Block[] => {
  const lines = raw.split('\n');
  const blocks: Block[] = [];
  let buffer: string[] = [];

  const flushParagraph = () => {
    if (buffer.length) {
      blocks.push({ type: 'p', items: [buffer.join('\n')] });
      buffer = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const ul = /^\s*[-•*]\s+(.*)$/.exec(line);
    const ol = /^\s*\d+[.)]\s+(.*)$/.exec(line);

    if (ul) {
      flushParagraph();
      const last = blocks[blocks.length - 1];
      if (last && last.type === 'ul') last.items.push(ul[1]);
      else blocks.push({ type: 'ul', items: [ul[1]] });
    } else if (ol) {
      flushParagraph();
      const last = blocks[blocks.length - 1];
      if (last && last.type === 'ol') last.items.push(ol[1]);
      else blocks.push({ type: 'ol', items: [ol[1]] });
    } else if (line.trim() === '') {
      flushParagraph();
    } else {
      buffer.push(line);
    }
  }
  flushParagraph();
  return blocks;
};

const RichText: React.FC<{ text: string; inverted?: boolean }> = ({
  text,
  inverted,
}) => {
  const blocks = parseBlocks(text);
  const markerColor = inverted
    ? 'rgba(255,255,255,0.85)'
    : 'var(--color-primary-500)';

  return (
    <div className="space-y-2">
      {blocks.map((b, i) => {
        if (b.type === 'p') {
          return (
            <p
              key={i}
              className="whitespace-pre-wrap break-words"
              style={{ fontSize: 14, lineHeight: '22px' }}
            >
              {renderInline(b.items[0])}
            </p>
          );
        }
        if (b.type === 'ul') {
          return (
            <ul key={i} className="space-y-1 pl-1">
              {b.items.map((item, j) => (
                <li
                  key={j}
                  className="flex gap-2"
                  style={{ fontSize: 14, lineHeight: '22px' }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      color: markerColor,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    •
                  </span>
                  <span className="flex-1 break-words">
                    {renderInline(item)}
                  </span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <ol key={i} className="space-y-1.5 pl-1">
            {b.items.map((item, j) => (
              <li
                key={j}
                className="flex gap-2"
                style={{ fontSize: 14, lineHeight: '22px' }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    color: markerColor,
                    fontWeight: 700,
                    flexShrink: 0,
                    minWidth: 18,
                  }}
                >
                  {j + 1}.
                </span>
                <span className="flex-1 break-words">
                  {renderInline(item)}
                </span>
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
};

const Avatar: React.FC = () => (
  <div
    className="w-8 h-8 rounded-full flex-shrink-0 ring-1 ring-black/5 overflow-hidden"
    aria-hidden="true"
  >
    <img
      src="https://www.amaze.shop/wp-content/uploads/2024/10/Amaze-App-Icon-IOS-1024x1024.png"
      alt=""
      className="w-full h-full object-cover"
    />
  </div>
);

const MessageBubble: React.FC<Props> = ({ message: m }) => {
  if (m.role === Role.SYSTEM) {
    return (
      <div className="flex justify-center animate-enter">
        <div
          className="px-3 py-1.5"
          style={{
            background: '#FCE9E9',
            color: 'var(--color-danger)',
            borderRadius: 'var(--radius-pill)',
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {m.text}
        </div>
      </div>
    );
  }

  const isUser = m.role === Role.USER;

  return (
    <div
      className={`flex gap-2 animate-enter ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isUser && <Avatar />}

      <div
        className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}
        style={{ maxWidth: '85%' }}
      >
        {(m.text || m.image) && (
          <div
            className="px-4 py-3"
            style={{
              background: isUser ? 'var(--color-primary-500)' : 'var(--color-surface)',
              color: isUser ? '#fff' : 'var(--color-text-primary)',
              border: isUser ? 'none' : '1px solid var(--color-border)',
              boxShadow: 'var(--elev-1)',
              borderRadius: isUser
                ? 'var(--radius-lg) var(--radius-lg) 4px var(--radius-lg)'
                : 'var(--radius-lg) var(--radius-lg) var(--radius-lg) 4px',
            }}
          >
            {m.image && (
              <img
                src={m.image}
                alt="แนบรูป"
                className="rounded-lg mb-2 object-cover"
                style={{
                  maxHeight: 160,
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
            )}
            {m.text && <RichText text={m.text} inverted={isUser} />}
          </div>
        )}

        {m.products && m.products.length > 0 && (
          <div className="w-full space-y-2">
            <div
              className="flex items-center gap-1.5"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                สินค้าแนะนำ · {m.products.length} รายการ
              </span>
            </div>
            {m.products.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
