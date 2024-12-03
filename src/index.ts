import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono()

app.get('/image1', async (c) => {
  const response = await fetch('https://picsum.photos/200/300');
  const arrayBuffer = await response.arrayBuffer();
  
  return c.body(arrayBuffer, 200, {
    'Content-Type': 'image/jpeg',
    'Cache-Control': 'public, max-age=31536000'
  });
});

app.get('/image2', async (c) => {
  const response = await fetch('https://picsum.photos/200/300');
  const arrayBuffer = await response.arrayBuffer();
  return c.body(arrayBuffer, 200, {
    'Content-Type': 'image/jpeg',
    'Cache-Control': 'no-store'
  });
});

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
