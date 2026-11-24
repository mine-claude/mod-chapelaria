// @ts-check
import { ItemType } from '../mineclaude-sdk.js';

// Knit beanie: striped wool, a folded cuff and a white pompom.
export default class Gorro extends ItemType {
  name = 'Gorro de lã';
  stack = 1;
  armor = { part: 0, points: 0 };
  texture = 'textures/item/gorro.png';
  static cubes = [
    { origin: [-6.5, 28, -6.5], size: [13, 2, 13], color: '#b3302e', pattern: 'rib' },
    { origin: [-6, 30, -6], size: [12, 6, 12], color: '#c9413a', pattern: 'knit', band: '#f2e6d0' },
    { origin: [-1.5, 36, -1.5], size: [3, 3, 3], color: '#f4f1ea', pattern: 'fluff' },
  ];
}
