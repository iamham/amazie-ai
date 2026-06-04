import React from 'react';
import { RefreshIcon } from './icons';

interface Props {
  onReset?: () => void;
}

/**
 * Sticky gradient hero header (§2 hero gradient, §3 title-md).
 */
const Header: React.FC<Props> = ({ onReset }) => (
  <header
    className="fixed top-0 inset-x-0 z-30 select-none"
    style={{ background: 'var(--gradient-hero)' }}
  >
    <div
      className="max-w-screen-sm mx-auto px-4 flex items-center justify-between"
      style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)', paddingBottom: 14 }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/25 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="https://www.amaze.shop/wp-content/uploads/2024/10/Amaze-App-Icon-IOS-1024x1024.png"
            alt=""
            className="w-9 h-9 object-cover"
          />
        </div>
        <div className="leading-tight">
          <h1
            className="text-white font-bold"
            style={{ fontSize: 18, lineHeight: '26px', letterSpacing: '-0.01em' }}
          >
            Amazie
          </h1>
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--color-accent-400)' }}
              aria-hidden="true"
            />
            <p
              className="text-white/90"
              style={{ fontSize: 12, lineHeight: '16px', fontWeight: 500 }}
            >
              ผู้ช่วยช้อปปิ้ง Amaze · ออนไลน์
            </p>
          </div>
        </div>
      </div>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          aria-label="เริ่มการสนทนาใหม่"
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/90 hover:bg-white/10 active:bg-white/20 transition-colors"
          style={{ transitionDuration: 'var(--duration-micro)' }}
        >
          <RefreshIcon />
        </button>
      )}
    </div>
  </header>
);

export default Header;
