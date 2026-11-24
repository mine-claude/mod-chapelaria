// @ts-check
// Source of this mod's images: `node packages/cli/cli.js textures mods-dev/chapelaria` writes them.
// For each hat: its model skin (the same box-UV layout as hats/build.js) and its 16x16 item icon (a front view).
import HATS from './hats/index.ts';
import { layout, SHEET } from './hats/build.ts';

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const hex = (c) => '#' + c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const shade = (h, k) => hex(rgb(h).map((v) => v * k));

// brightness / color of a texel inside one face: x, y in the face; w, h its size; side: 'top' | 'side' | 'bottom'
function texel(cube, side, x, y, w, h) {
  const edge = x === 0 || y === 0 || x === w - 1 || y === h - 1;
  const p = cube.pattern, base = cube.color;
  const k = side === 'top' ? 1.12 : side === 'bottom' ? 0.62 : 1;
  const bandRow = side === 'side' && y >= h - 2 && y < h - 1; // a band just above the bottom of the sides
  if (p.endsWith('band') && bandRow) return shade(cube.band, k);
  switch (p.replace('-band', '')) {
    case 'weave': return shade(base, k * (((x + y) % 4 < 2) ? 1.08 : 0.9) * (edge ? 0.82 : 1));
    case 'felt': return shade(base, k * (edge ? 0.8 : 1) * (((x * 7 + y * 3) % 9 === 0) ? 1.15 : 1));
    case 'panels': return shade(base, k * (x % 4 === 0 && side !== 'bottom' ? 0.78 : 1) * (edge ? 0.85 : 1));
    case 'rib': return shade(base, k * (x % 2 ? 0.86 : 1.04));
    case 'knit': {
      if (side === 'side' && y % 3 === 1) return shade(cube.band, k); // white stripes of yarn
      return shade(base, k * ((x + (y % 2)) % 2 ? 0.92 : 1.06));
    }
    case 'fluff': return shade(base, k * (((x * 5 + y * 3) % 4 === 0) ? 0.9 : 1.04));
    case 'stars': return ((x * 13 + y * 7) % 17 === 0 && !edge) ? '#f3d36b' : shade(base, k * (edge ? 0.8 : 1));
    case 'gems': {
      if (side === 'side' && y === 1 && x % 4 === 2) return ['#d6334a', '#2f8fd6', '#3cb371'][(x >> 2) % 3];
      return shade(base, k * (edge ? 0.78 : 1) * (y === 0 ? 1.15 : 1));
    }
    case 'shine': return shade(base, k * (x === 0 && y === 0 ? 1.3 : edge ? 0.85 : 1));
    default: return shade(base, k * (edge ? 0.82 : 1));
  }
}

function skin(cubes) {
  return {
    size: SHEET,
    paint(set) {
      for (const c of layout(cubes)) {
        const [w, h, d] = c.size, [u, v] = c.uv;
        const faces = [
          [u + d, v, w, d, 'top'], [u + d + w, v, w, d, 'bottom'],
          [u, v + d, d, h, 'side'], [u + d, v + d, w, h, 'side'], [u + d + w, v + d, d, h, 'side'], [u + 2 * d + w, v + d, w, h, 'side'],
        ];
        for (const [x0, y0, fw, fh, side] of faces) for (let y = 0; y < fh; y++) for (let x = 0; x < fw; x++) set(x0 + x, y0 + y, texel(c, side, x, y, fw, fh));
      }
    },
  };
}

// item icon: the hat seen from the front, scaled to fit 16x16 (each cube its color, a light top edge)
function icon(cubes) {
  const minX = Math.min(...cubes.map((c) => c.origin[0])), maxX = Math.max(...cubes.map((c) => c.origin[0] + c.size[0]));
  const minY = Math.min(...cubes.map((c) => c.origin[1])), maxY = Math.max(...cubes.map((c) => c.origin[1] + c.size[1]));
  const s = 14 / Math.max(maxX - minX, maxY - minY), ox = (16 - (maxX - minX) * s) / 2, oy = (16 - (maxY - minY) * s) / 2;
  return {
    size: 16,
    paint(set) {
      const order = [...cubes].sort((a, b) => (b.origin[2] + b.size[2]) - (a.origin[2] + a.size[2])); // back first
      for (const c of order) {
        const x0 = Math.floor(ox + (c.origin[0] - minX) * s), x1 = Math.ceil(ox + (c.origin[0] + c.size[0] - minX) * s) - 1;
        const y1 = Math.floor(16 - oy - (c.origin[1] - minY) * s) - 1, y0 = Math.ceil(16 - oy - (c.origin[1] + c.size[1] - minY) * s);
        for (let y = Math.max(0, y0); y <= Math.min(15, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(15, x1); x++) {
          const edge = x === x0 || x === x1 || y === y1;
          set(x, y, texel(c, 'side', x - x0, y - y0, x1 - x0 + 1, y1 - y0 + 1) === c.color ? shade(c.color, y === y0 ? 1.25 : edge ? 0.7 : 1) : (y === y0 ? shade(c.color, 1.25) : edge ? shade(c.color, 0.7) : texel(c, 'side', x - x0, y - y0, x1 - x0 + 1, y1 - y0 + 1)));
        }
      }
    },
  };
}

export default Object.fromEntries(Object.entries(HATS).flatMap(([key, Hat]) => [
  [`textures/hat/${key}.png`, skin(Hat.cubes)],
  [`textures/item/${key}.png`, icon(Hat.cubes)],
]));
