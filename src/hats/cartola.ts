// @ts-check
import { ItemType } from '../mineclaude-sdk.js';

// Top hat: tall black crown, a thin brim, a dark red band.
export default class Cartola extends ItemType {
  name = 'Cartola';
  stack = 1;
  armor = { part: 0, points: 0 };
  rarity = 'uncommon';
  texture = 'textures/item/cartola.png';
  static cubes = [
    { origin: [-7.5, 31, -7.5], size: [15, 1, 15], color: '#25252b', pattern: 'felt' },
    { origin: [-5.5, 32, -5.5], size: [11, 9, 11], color: '#2c2c33', pattern: 'felt-band', band: '#7a1f2b' },
  ];
}
