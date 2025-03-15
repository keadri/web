export default function imageLoader({ src }: { src: string }) {
  const baseUrl = process.env.NODE_ENV === 'production' ? '/Web' : '';
  return `${baseUrl}${src}`;
} 