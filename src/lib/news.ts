import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked, Renderer } from 'marked';

export interface Article {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  tags: string[];
  status: string;
  sourceUrl: string;
  sourceTitle: string;
  image?: string;
  imageAlt?: string;
  body: string;
  html: string;
}

const directory = path.join(process.cwd(), 'content/news');
const renderer = new Renderer();
renderer.html = () => '';
const escapeAttribute = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
renderer.link = ({ href, tokens }) => {
  const label = renderer.parser.parseInline(tokens);
  if (!/^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(href)) return label;
  return `<a href="${escapeAttribute(href)}">${label}</a>`;
};

export function getNews(): Article[] {
  if (!fs.existsSync(directory)) return [];
  const articles = fs.readdirSync(directory).filter(name => /\.mdx?$/.test(name)).map(filename => {
    const { data, content } = matter(fs.readFileSync(path.join(directory, filename), 'utf8'));
    for (const field of ['id', 'title', 'date', 'category', 'summary', 'sourceUrl', 'sourceTitle']) {
      if (typeof data[field] !== 'string' || !data[field]) throw new Error(`${filename}: Feld ${field} fehlt.`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(Date.parse(data.date))) throw new Error(`${filename}: Datum muss YYYY-MM-DD sein.`);
    if (!/^[a-z0-9-]+$/.test(data.id)) throw new Error(`${filename}: Ungültige Artikel-ID.`);
    if (!/^https:\/\//.test(data.sourceUrl)) throw new Error(`${filename}: Quelle benötigt HTTPS.`);
    return {
      id: data.id, slug: data.id, title: data.title, date: data.date, category: data.category,
      summary: data.summary, tags: Array.isArray(data.tags) ? data.tags.filter((tag: unknown): tag is string => typeof tag === 'string') : [],
      status: typeof data.status === 'string' ? data.status : 'review-pending',
      sourceUrl: data.sourceUrl, sourceTitle: data.sourceTitle,
      image: typeof data.image === 'string' ? data.image : undefined,
      imageAlt: typeof data.imageAlt === 'string' ? data.imageAlt : undefined,
      body: content, html: marked.parse(content, { async: false, renderer }) as string,
    };
  });
  if (new Set(articles.map(article => article.id)).size !== articles.length) throw new Error('Nachrichten enthalten doppelte IDs.');
  return articles.sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(id: string): Article | undefined {
  return getNews().find(article => article.id === id);
}

export function formatNewsDate(date: string) {
  return new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Berlin' }).format(new Date(`${date}T12:00:00Z`));
}
