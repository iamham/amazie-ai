import React from 'react';
import type { Product } from '../types';
import { ChevronRightIcon } from './icons';

interface Props {
  product: Product;
}

/**
 * Order-card pattern from §6 (thumb + name + qty/price + footer action),
 * adapted for product recommendations.
 */
const ProductCard: React.FC<Props> = ({ product }) => {
  const buy = () =>
    window.open(
      `https://www.amaze.shop/?s=${encodeURIComponent(product.name)}`,
      '_blank',
      'noopener',
    );

  return (
    <article
      className="flex overflow-hidden group transition-all"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--elev-1)',
        transitionDuration: 'var(--duration-standard)',
        transitionTimingFunction: 'var(--easing-entrance)',
      }}
    >
      <div
        className="flex-shrink-0 relative overflow-hidden"
        style={{
          width: 96,
          height: 96,
          background: 'var(--color-primary-100)',
        }}
      >
        <img
          src={product.imageURL}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          style={{ transitionDuration: 'var(--duration-standard)' }}
          loading="lazy"
        />
      </div>

      <div className="flex-1 min-w-0 p-3 flex flex-col justify-between gap-2">
        <div className="min-w-0">
          <span
            className="inline-block mb-1 uppercase tracking-wide"
            style={{
              fontSize: 10,
              fontWeight: 600,
              lineHeight: '14px',
              color: 'var(--color-text-tertiary)',
            }}
          >
            SKU {product.sku}
          </span>
          <h4
            className="clamp-2"
            style={{
              fontSize: 14,
              lineHeight: '20px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            {product.name}
          </h4>
        </div>

        <button
          type="button"
          onClick={buy}
          className="self-start inline-flex items-center gap-1 transition-all active:scale-[0.97]"
          style={{
            background: 'var(--color-primary-500)',
            color: '#fff',
            borderRadius: 'var(--radius-pill)',
            fontSize: 12,
            fontWeight: 600,
            padding: '6px 12px',
            transitionDuration: 'var(--duration-micro)',
          }}
        >
          ดูสินค้า
          <ChevronRightIcon size={14} />
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
