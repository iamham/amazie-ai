import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import WelcomeSuggestions from './WelcomeSuggestions';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { CloseIcon, ImageIcon, SendIcon } from './icons';
import { initChat, sendMessage } from '../services/geminiService';
import { Role, type ChatMessage } from '../types';

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: Role.MODEL,
  text: 'สวัสดี 🙏 อยากให้ Amazie แนะนำอะไรสอบถามผมได้เลยนะครับ!',
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    initChat();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
  }, [input]);

  const reset = () => {
    initChat();
    setMessages([WELCOME]);
    setInput('');
    setImage(null);
  };

  const pickImage = () => fileRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  const submit = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if ((!text && !image) || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: Role.USER,
      text,
      image: image || undefined,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setImage(null);
    setLoading(true);

    try {
      const reply = await sendMessage(userMsg.text, userMsg.image ?? null);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-m`,
          role: Role.MODEL,
          text: reply.text,
          products: reply.products,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-e`,
          role: Role.SYSTEM,
          text: 'ขออภัย เกิดข้อผิดพลาด ลองอีกครั้งนะคะ',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const isEmpty = messages.length === 1 && messages[0].id === 'welcome';
  const canSend = !loading && (input.trim().length > 0 || !!image);

  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{ background: 'var(--color-bg)' }}
    >
      <Header onReset={messages.length > 1 ? reset : undefined} />

      {/* Message scroll area */}
      <main
        className="flex-1 max-w-screen-sm w-full mx-auto px-4"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 76px)',
          paddingBottom: 140,
        }}
      >
        <div className="space-y-4 py-2">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}

          {isEmpty && !loading && (
            <WelcomeSuggestions onPick={submit} onPickImage={pickImage} />
          )}

          {loading && <TypingIndicator />}

          <div ref={bottomRef} aria-hidden="true" />
        </div>
      </main>

      {/* Composer */}
      <div
        className="fixed bottom-0 inset-x-0 z-20"
        style={{
          background: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          boxShadow: 'var(--elev-3)',
        }}
      >
        <div className="max-w-screen-sm mx-auto px-3 pt-3 pb-3">
          {image && (
            <div className="mb-2 flex items-center gap-2 animate-enter">
              <div className="relative">
                <img
                  src={image}
                  alt="ตัวอย่างรูป"
                  className="object-cover"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  aria-label="ลบรูปที่แนบ"
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: 'var(--color-text-primary)',
                    color: '#fff',
                    boxShadow: 'var(--elev-2)',
                  }}
                >
                  <CloseIcon size={12} />
                </button>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--color-text-secondary)',
                  fontWeight: 500,
                }}
              >
                แนบรูปแล้ว — กดส่งเพื่อค้นหาสินค้าที่คล้ายกัน
              </div>
            </div>
          )}

          <div
            className="flex items-end gap-2"
            style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 6,
            }}
          >
            <button
              type="button"
              onClick={pickImage}
              aria-label="อัปโหลดรูป"
              className="flex-shrink-0 flex items-center justify-center rounded-full transition-colors"
              style={{
                width: 36,
                height: 36,
                color: 'var(--color-primary-500)',
                background: 'var(--color-primary-100)',
                transitionDuration: 'var(--duration-micro)',
              }}
            >
              <ImageIcon size={20} />
              <input
                type="file"
                ref={fileRef}
                className="hidden"
                accept="image/*"
                onChange={onFileChange}
              />
            </button>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={image ? 'พิมพ์รายละเอียดเพิ่มเติม...' : 'ถาม Amazie ได้เลย...'}
              rows={1}
              className="flex-1 bg-transparent resize-none focus:outline-none placeholder:text-[var(--color-text-tertiary)]"
              style={{
                fontSize: 14,
                lineHeight: '22px',
                paddingTop: 7,
                paddingBottom: 7,
                paddingLeft: 4,
                color: 'var(--color-text-primary)',
                maxHeight: 120,
                fontFamily: 'inherit',
              }}
              aria-label="พิมพ์ข้อความ"
            />

            <button
              type="button"
              onClick={() => submit()}
              disabled={!canSend}
              aria-label="ส่งข้อความ"
              className="flex-shrink-0 flex items-center justify-center rounded-full transition-all active:scale-95"
              style={{
                width: 36,
                height: 36,
                background: canSend
                  ? 'var(--color-primary-500)'
                  : 'var(--color-border)',
                color: canSend ? '#fff' : 'var(--color-text-tertiary)',
                cursor: canSend ? 'pointer' : 'not-allowed',
                boxShadow: canSend ? 'var(--elev-2)' : 'none',
                transitionDuration: 'var(--duration-micro)',
              }}
            >
              <SendIcon size={18} />
            </button>
          </div>

          <div
            className="text-center mt-2"
            style={{
              fontSize: 10,
              lineHeight: '14px',
              color: 'var(--color-text-tertiary)',
              fontWeight: 500,
            }}
          >
            Amazie อาจตอบผิดได้ — โปรดตรวจสอบข้อมูลสินค้าก่อนสั่งซื้อ
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
