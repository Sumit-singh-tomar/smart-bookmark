import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const token = req.cookies.get('token')?.value;
  if (!token) return new Response('Unauthorized', { status: 401 });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  const { payload } = await jwtVerify(token, secret);

  const userId = payload.id;

  const stream = new ReadableStream({
    start(controller) {
      global.bookmarkStreams ??= {};
      global.bookmarkStreams[userId] ??= new Set();

      global.bookmarkStreams[userId].add(controller);

      // cleanup when tab closes
      req.signal.addEventListener('abort', () => {
        global.bookmarkStreams[userId].delete(controller);
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}