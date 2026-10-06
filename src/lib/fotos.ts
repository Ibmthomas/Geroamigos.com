// Fotos que se agregan dejando archivos en carpetas (sin tocar código):
// - src/assets/paises/<slug>/  → hasta 3 fotos por país (orden alfabético)
// - src/assets/amigos/<id>.jpg → foto de cada amigo (id definido en src/data/paises.ts)
import type { ImageMetadata } from 'astro';

const paisFotos = import.meta.glob<ImageMetadata>('../assets/paises/*/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});
const amigoFotos = import.meta.glob<ImageMetadata>('../assets/amigos/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

export const fotosDePais = (slug: string) =>
  Object.keys(paisFotos)
    .filter((file) => file.includes(`/paises/${slug}/`))
    .sort()
    .slice(0, 3)
    .map((file) => paisFotos[file]);

export const fotoDeAmigo = (id: string) => {
  const file = Object.keys(amigoFotos).find((f) => f.split('/').pop()!.replace(/\.[^.]+$/, '') === id);
  return file ? amigoFotos[file] : undefined;
};
