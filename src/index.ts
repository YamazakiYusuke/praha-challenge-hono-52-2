import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import fs from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = new Hono();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/image1', async (c) => {
  const filePath = join(__dirname, '..', 'resource', 'sample.jpeg');
  console.log("Constructed file path:", filePath);
  const buffer = fs.readFileSync(filePath);
  const arrayBuffer = new Uint8Array(buffer).buffer;
  
  return c.body(arrayBuffer, 200, {
    'Content-Type': 'image/jpeg',
    'Cache-Control': 'public, max-age=31536000'
  });
});

app.get('/image2', async (c) => {
  const filePath = join(__dirname, '..', 'resource', 'sample.jpeg');
  console.log("Constructed file path:", filePath);
  const buffer = fs.readFileSync(filePath);
  const arrayBuffer = new Uint8Array(buffer).buffer;
  
  return c.body(arrayBuffer, 200, {
    'Content-Type': 'image/jpeg',
    'Cache-Control': 'no-store'
  });
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});