import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  const gamesPath = path.join(process.cwd(), 'data', 'games.json');
  const productsPath = path.join(process.cwd(), 'data', 'products.json');
  
  try {
    const games = JSON.parse(await fs.readFile(gamesPath, 'utf8'));
    const products = JSON.parse(await fs.readFile(productsPath, 'utf8'));
    return Response.json({ games, products });
  } catch {
    return Response.json({ games: [], products: [] });
  }
}