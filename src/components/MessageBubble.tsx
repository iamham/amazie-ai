import React from 'react';
import ProductCard from './ProductCard';
import { Role, type ChatMessage } from '../types';

interface Props {
  message: ChatMessage;
}

const renderWithBold = (text: string): React.ReactNode => {
  if (!text) return null;
  return text.split(/(\*\*[\s\S]*?\*\*)/g).map((chunk, i) =>
    chunk.startsWith('**') && chunk.length >= 4 && chunk.endsWith('**') ? (
      <strong key={i} className="font-bold">
        {chunk.slice(2, -2)}
      </strong>
    ) : (
      <React.Fragment key={i}>{chunk}</React.Fragment>
    ),
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

      <div className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`} style={{ maxWidth: '85%' }}>
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
            {m.text && (
              <p
                className="whitespace-pre-wrap break-words"
                style={{
                  fontSize: 14,
                  lineHeight: '22px',
                  fontWeight: 400,
                }}
              >
                {renderWithBold(m.text)}
              </p>
            )}
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
