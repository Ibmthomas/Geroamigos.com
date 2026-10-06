// Mapa de Latinoamérica generado en el build (sin JavaScript en el navegador) a partir
// de Natural Earth 1:50m (paquete world-atlas). Los países de la red se exportan aparte
// para poder resaltarlos, enlazarlos y "volar" hacia ellos al hacer scroll.
import { geoAzimuthalEqualArea, geoBounds, geoCentroid, geoPath } from 'd3-geo';
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from 'geojson';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-50m.json';
import { PAISES } from '../data/paises';

export const MAP_W = 600;
export const MAP_H = 820;

// Países de Latinoamérica y el Caribe (ISO 3166-1 numérico)
const LATAM = [
  '484', '320', '084', '340', '222', '558', '188', '591', '192', '388', '332', '214', '630', '044',
  '780', '170', '862', '328', '740', '218', '604', '068', '076', '600', '858', '032', '152', '238',
];

type CountryFeature = Feature<Polygon | MultiPolygon, { name: string }>;

const all = (feature(world as any, (world as any).objects.countries) as unknown as FeatureCollection<
  Polygon | MultiPolygon,
  { name: string }
>).features as CountryFeature[];

// Quita islas remotas (Isla de Pascua, Galápagos) que descuadran el mapa
const withoutRemoteIslands = (f: CountryFeature): CountryFeature => {
  if (f.geometry.type !== 'MultiPolygon' || !['152', '218'].includes(String(f.id))) return f;
  const coordinates = f.geometry.coordinates.filter((poly) => poly[0][0][0] > -88);
  return { ...f, geometry: { type: 'MultiPolygon', coordinates } };
};

// La Guayana Francesa viene dentro de Francia: se extraen solo esos polígonos
const france = all.find((f) => f.id === '250')!;
const frenchGuiana: CountryFeature = {
  type: 'Feature',
  id: '254',
  properties: { name: 'Guayana Francesa' },
  geometry: {
    type: 'MultiPolygon',
    coordinates: (france.geometry as MultiPolygon).coordinates.filter(([ring]) => {
      const [lon, lat] = ring[0];
      return lon > -56 && lon < -50 && lat > 1 && lat < 7;
    }),
  },
};

const countries = [...all.filter((f) => LATAM.includes(String(f.id))).map(withoutRemoteIslands), frenchGuiana];

const projection = geoAzimuthalEqualArea()
  .rotate([72, 10])
  .fitExtent(
    [
      [16, 16],
      [MAP_W - 16, MAP_H - 16],
    ],
    { type: 'FeatureCollection', features: countries },
  );
const path = geoPath(projection).digits(1);

const networkIsos = new Set(PAISES.map((p) => p.iso));

/** Países de contexto (se dibujan una sola vez y se reutilizan con <use>) */
export const baseCountries = countries
  .filter((f) => !networkIsos.has(String(f.id)))
  .map((f) => ({ id: String(f.id), name: f.properties.name, d: path(f)! }));

/** Países de la red con su forma, centro y encuadre en coordenadas del mapa */
export const networkCountries = PAISES.map((pais) => {
  const f = countries.find((c) => String(c.id) === pais.iso)!;
  const [[x0, y0], [x1, y1]] = path.bounds(f);
  const [cx, cy] = projection(geoCentroid(f))!;
  return { ...pais, d: path(f)!, cx, cy, box: { x0, y0, x1, y1 }, lonLat: geoBounds(f) };
});

/**
 * Transformación para centrar un país en el mapa (efecto "volar" del recorrido).
 * Escala limitada para que países pequeños como Costa Rica no se vean pixelados.
 */
export function focusTransform(box: { x0: number; y0: number; x1: number; y1: number }) {
  const w = box.x1 - box.x0;
  const h = box.y1 - box.y0;
  const scale = Math.max(1.15, Math.min(2.6, (MAP_W * 0.55) / w, (MAP_H * 0.55) / h));
  const tx = MAP_W / 2 - scale * (box.x0 + w / 2);
  const ty = MAP_H / 2 - scale * (box.y0 + h / 2);
  return `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${scale.toFixed(3)})`;
}
