import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';

const app = new Hono()

app.get('/image', async (c) => {
  if (getCookie(c, 'thirdPartyCookie') == null) {
    setCookie(c, 'thirdPartyCookie', 'value2', {
      httpOnly: true,
    });
  }

  // 画像を返す
  const response = await fetch('https://picsum.photos/200/300');
  const arrayBuffer = await response.arrayBuffer();
  return c.body(arrayBuffer, 200, {
    'Content-Type': 'image/jpeg'
  });
});

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
