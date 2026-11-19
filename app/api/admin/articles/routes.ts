import { NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ARTICLES_FILE = path.join(process.cwd(), 'data', 'articles.json');

export async function POST(req: NextRequest) {
  const body = await req.json();
  let articles = [];
  try {
    articles = JSON.parse(await fs.readFile(ARTICLES_FILE, 'utf8'));
  } catch {}

  const newArticle = {
    id: body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    title: body.title,
    category: body.category,
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    content: body.content
  };

  articles.unshift(newArticle); // Taruh paling atas
  await fs.writeFile(ARTICLES_FILE, JSON.stringify(articles, null, 2));
  
  return Response.json({ ok: true, article: newArticle });
}