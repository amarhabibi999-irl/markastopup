import { NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ARTICLES_FILE = path.join(process.cwd(), 'data', 'articles.json');

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  let articles = JSON.parse(await fs.readFile(ARTICLES_FILE, 'utf8'));
  articles = articles.filter((a: any) => a.id !== params.id);
  await fs.writeFile(ARTICLES_FILE, JSON.stringify(articles, null, 2));
  return Response.json({ ok: true });
}