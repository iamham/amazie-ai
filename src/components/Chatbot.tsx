import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import { initChat, sendMessage } from '../services/geminiService';
import { Role, type ChatMessage } from '../types';

const renderWithBold = (text: string): React.ReactNode => {
  if (!text) return null;
  return text.split(/(\*\*[\s\S]*?\*\*)/g).map((chunk, i) =>
    chunk.startsWith('**') && chunk.length >= 4 && chunk.endsWith('**') ? (
      <strong key={i} className="font-bold">
        {chunk.slice(2, -2)}
      </strong>
    ) : (
      chunk
    ),
  );
};

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: Role.MODEL,
  text: 'สวัสดี 🙏 อยากให้ Amazie แนะนำอะไรสอบถามผมได้เลยนะครับ !',
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    initChat();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  const send = async () => {
    if ((!input.trim() && !image) || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: Role.USER,
      text: input,
      image: image || undefined,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setImage(null);
    setLoading(true);

    try {
      const reply = await sendMessage(userMsg.text, userMsg.image ?? null);
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: Role.MODEL,
        text: reply.text,
        products: reply.products,
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: Role.SYSTEM,
          text: 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="w-full bottom-6 right-6 z-50 flex flex-col items-end">
      <div className="w-full bg-gradient-to-r from-blue-100 to-[#2e6cf7] p-4 flex fixed items-center justify-between shadow-md select-none">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
            <img
              src="https://www.amaze.shop/wp-content/uploads/2024/10/Amaze-App-Icon-IOS-1024x1024.png"
              alt="Amaze"
            />
          </div>
          <div>
            <h3 className="text-blue-950 font-bold text-lg">Amazie</h3>
            <p className="text-blue-900 text-xs">ผู้ช่วย AI อัจฉริยะ</p>
          </div>
        </div>
      </div>

      <div className="w-full flex-1 overflow-y-auto bg-gray-50 space-y-4 scrollbar-hide pt-[90px] px-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.role === Role.USER ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm select-none ${
                m.role === Role.USER
                  ? 'bg-[#2e6cf7] text-white rounded-br-none'
                  : m.role === Role.SYSTEM
                    ? 'bg-red-100 text-red-600'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
              }`}
            >
              {m.image && (
                <img
                  src={m.image}
                  alt="User upload"
                  className="max-w-full h-32 object-cover rounded-lg mb-2 border border-white/20"
                />
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap font-sans overflow-hidden text-ellipsis">
                {renderWithBold(m.text)}
              </p>
            </div>
            {m.products && m.products.length > 0 && (
              <div className="mt-2 w-[85%] space-y-2 animate-pulse-fade-in">
                <p className="text-xs text-gray-500 ml-1 mb-1">สินค้าแนะนำ:</p>
                {m.products.map((p) => (
                  <ProductCard key={p.sku} product={p} />
                ))}
              </div>
            )}
            <span className="text-[10px] text-gray-400 mt-1 mx-1">
              {m.role === Role.USER ? 'คุณ' : 'Amazie'}
            </span>
          </div>
        ))}
        {loading && (
          <div className="flex items-start space-x-2 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="h-8 bg-gray-200 rounded-2xl w-24" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="w-full fixed bottom-0 p-3 bg-white border-t border-gray-100">
        {image && (
          <div className="relative inline-block mb-2">
            <img
              src={image}
              alt="Preview"
              className="h-16 w-16 object-cover rounded-md border border-gray-200"
            />
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
              aria-label="Remove image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="flex items-end space-x-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors bg-gray-50 rounded-full hover:bg-blue-50"
            title="Upload Image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              accept="image/*"
              onChange={onFileChange}
            />
          </button>
          <div className="flex-1 bg-gray-50 rounded-2xl flex items-center px-3 border border-gray-200 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={image ? 'พิมพ์ในนี้ได้เลยครับ...' : 'ถาม Amazie ได้เลย...'}
              className="w-full bg-transparent py-3 focus:outline-none text-sm"
            />
          </div>
          <button
            type="button"
            onClick={send}
            disabled={loading || (!input && !image)}
            className={`p-3 rounded-full transition-all shadow-md ${
              loading || (!input && !image)
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#2e6cf7] text-white hover:bg-[#2e6cf7] hover:shadow-lg hover:scale-105 active:scale-95'
            }`}
            aria-label="Send"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 rotate-90"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
