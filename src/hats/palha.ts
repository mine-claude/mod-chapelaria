// @ts-check
import { ItemType } from '../mineclaude-sdk.js';

// Straw hat: a wide woven brim and a low crown with a red band.
export default class Palha extends ItemType {
  name = 'Chapéu de palha';
  stack = 1;
  armor = { part: 0, points: 0 };
  texture = 'textures/item/palha.png';
  static cubes = [
    { origin: [-8, 31, -8], size: [16, 1, 16], color: '#d9b65c', pattern: 'weave' },
    { origin: [-6, 32, -6], size: [12, 4, 12], color: '#e3c46c', pattern: 'weave-band', band: '#b8322a' },
  ];
}
