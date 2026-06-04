import React from 'react';
import { CameraIcon, SparkleIcon } from './icons';

export interface Suggestion {
  emoji: string;
  label: string;
  prompt: string;
}

const SUGGESTIONS: Suggestion[] = [
  { emoji: '🍳', label: 'สูตรอาหาร', prompt: 'อยากทำกระเพราไก่ ขอสูตรพร้อมวัตถุดิบหน่อย' },
  { emoji: '💄', label: 'ลิปสติก', prompt: 'แนะนำลิปสติกสีแดงหน่อย' },
  { emoji: '🧴', label: 'ของใช้ในบ้าน', prompt: 'มีน้ำยาซักผ้าอะไรขายบ้าง' },
  { emoji: '🐶', label: 'สัตว์เลี้ยง', prompt: 'แนะนำอาหารแมวให้หน่อย' },
];

interface Props {
  onPick: (prompt: string) => void;
  onPickImage: () => void;
}

/**
 * Empty-state hero (§6 promo card pattern, lighter).
 * Shown when only the welcome message exists.
 */
const WelcomeSuggestions: React.FC<Props> = ({ onPick, onPickImage }) => (
  <div className="animate-enter px-1 pt-2">
    <div
      className="rounded-2xl p-5 mb-4 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, var(--color-primary-100) 0%, #ffffff 60%)',
        boxShadow: 'var(--elev-2)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <SparkleIcon size={18} style={{ color: 'var(--color-primary-500)' }} />
        <span
          className="uppercase tracking-wide"
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--color-primary-700)',
            lineHeight: '14px',
          }}
        >
          AMAZIE · AI SHOPPING ASSISTANT
        </span>
      </div>
      <h2
        style={{
          fontSize: 24,
          lineHeight: '32px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.01em',
        }}
      >
        สวัสดี 🙏 อยากให้ช่วยอะไรดี?
      </h2>
      <p
        className="mt-1"
        style={{
          fontSize: 14,
          lineHeight: '22px',
          color: 'var(--color-text-secondary)',
        }}
      >
        ลองพิมพ์ถามหาสินค้า แนะนำสูตรอาหาร หรือ
        <strong style={{ color: 'var(--color-primary-700)' }}> อัปโหลดรูป </strong>
        ให้ฉันช่วยค้นหาสินค้าที่คล้ายกันก็ได้
      </p>
    </div>

    <div className="grid grid-cols-2 gap-2.5 mb-3">
      {SUGGESTIONS.map((s) => (
        <button
          key={s.label}
          type="button"
          onClick={() => onPick(s.prompt)}
          className="text-left rounded-xl px-3.5 py-3 transition-all active:scale-[0.98]"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--elev-1)',
            transitionDuration: 'var(--duration-micro)',
            transitionTimingFunction: 'var(--easing-entrance)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <span style={{ fontSize: 22 }} aria-hidden="true">
              {s.emoji}
            </span>
            <div className="min-w-0">
              <div
                className="clamp-1"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  lineHeight: '20px',
                }}
              >
                {s.label}
              </div>
              <div
                className="clamp-1"
                style={{
                  fontSize: 12,
                  color: 'var(--color-text-tertiary)',
                  lineHeight: '16px',
                }}
              >
                {s.prompt}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>

    <button
      type="button"
      onClick={onPickImage}
      className="w-full flex items-center justify-center gap-2 rounded-xl py-3 transition-all active:scale-[0.99]"
      style={{
        background: 'var(--color-primary-100)',
        color: 'var(--color-primary-700)',
        border: '1px dashed var(--color-primary-300)',
        fontSize: 14,
        fontWeight: 600,
        transitionDuration: 'var(--duration-micro)',
      }}
    >
      <CameraIcon size={20} />
      ค้นหาสินค้าด้วยรูปภาพ
    </button>
  </div>
);

export default WelcomeSuggestions;
