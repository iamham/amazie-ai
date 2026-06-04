import type { Content, Part } from '@google/genai';
import type { GeminiReply, Product } from '../types';

/**
 * Stateless client for `/api/chat` (a Vercel Function that owns Gemini + the
 * product catalog). We keep the conversation history in module-scope so the
 * server can stay stateless — each request ships the full transcript.
 */

let history: Content[] = [];

interface ChatResponse {
  text: string;
  products?: Product[];
  history: Content[];
}

export const initChat = (): void => {
  history = [];
};

export const sendMessage = async (
  text: string,
  image: string | null,
): Promise<GeminiReply> => {
  const parts: Part[] = [];
  if (image) {
    const base64 = image.split(',')[1] || image;
    parts.push({ inlineData: { mimeType: 'image/jpeg', data: base64 } });
  }
  if (text) parts.push({ text });
  if (!text && image) {
    parts.push({ text: 'Find products in the database that look like this image.' });
  }

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ history, message: parts }),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as ChatResponse | null;
      return {
        text:
          body?.text ??
          'เหมือนว่าจะเล่นเยอะไปหน่อยจน API ติด Rate Limit นะ คงต้องใช้แบบจ่ายตังแหละ',
      };
    }

    const data = (await res.json()) as ChatResponse;
    history = data.history ?? history;
    return { text: data.text, products: data.products };
  } catch (err) {
    console.error('Chat API error:', err);
    return {
      text: 'Sorry, something went wrong. Please try again.',
    };
  }
};
