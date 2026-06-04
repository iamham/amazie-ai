import React from 'react';

/**
 * Three-dot bot-bubble typing indicator (§7 motion, §6 cards radius).
 */
const TypingIndicator: React.FC = () => (
  <div className="flex items-end gap-2 animate-enter">
    <div
      className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-black/5"
      aria-hidden="true"
    >
      <img
        src="https://www.amaze.shop/wp-content/uploads/2024/10/Amaze-App-Icon-IOS-1024x1024.png"
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
    <div
      role="status"
      aria-label="Amazie กำลังพิมพ์"
      className="dot-bounce flex items-center px-4 py-3"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg) var(--radius-lg) var(--radius-lg) 4px',
        boxShadow: 'var(--elev-1)',
        minWidth: 56,
      }}
    >
      <span />
      <span />
      <span />
    </div>
  </div>
);

export default TypingIndicator;
