import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono()


app.use(
  '/*',
  cors({
    origin: 'https://lemon-things-trade.loca.lt', // corsを許可するorigin
    allowMethods: ['POST'],
  })
)

app.post('/data', async (c) => {
  return c.json({
    message: 'some json response',
    status: '201',
    data: {
      id: 1,
      name: 'some json response name',
      description: 'some json response description'
    }
  })
});

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
