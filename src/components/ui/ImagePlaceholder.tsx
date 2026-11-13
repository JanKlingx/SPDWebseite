import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import media from '../../../content/media.json';

type MediaKey = keyof typeof media;
type MediaAsset = { src: string | null; alt: string; width: number; height: number; credit: string | null; sourceUrl: string | null; rights: string };

export function ImagePlaceholder({ title, description, className = '', mediaKey }: { title: string; description: string; className?: string; mediaKey?: MediaKey }) {
  const asset = mediaKey ? media[mediaKey] as MediaAsset : undefined;
  if (asset?.src && asset.src.startsWith('/images/')) {
    return <figure className={`media-image ${className}`} style={{ margin: 'var(--space-0)', display: 'flex', flexDirection: 'column' }}>
      <Image src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} sizes="(max-width: 600px) 100vw, 50vw" style={{ width: '100%', height: 'auto', objectFit: 'cover', flex: 1, minHeight: 0 }} />
      {(asset.credit || asset.sourceUrl) && <figcaption className="small" style={{ paddingTop: 'var(--space-xs)' }}>{asset.credit}{asset.sourceUrl && <> <a href={asset.sourceUrl}>Bildquelle</a></>}</figcaption>}
    </figure>;
  }
  return <figure className={`image-placeholder ${className}`} aria-label={`Bildplatzhalter: ${description}`}><ImageIcon size={32} aria-hidden="true" /><span className="placeholder-title">{title}</span><figcaption className="placeholder-caption"><span>Bildplatzhalter<br />{description}</span><span aria-hidden="true">↗</span></figcaption></figure>;
}
