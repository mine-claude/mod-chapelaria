// @ts-check
import { ItemType } from '../mineclaude-sdk.js';

// Wizard hat: wide brim, a tall pointed crown that bends near the tip, little stars.
export default class Bruxo extends ItemType {
  name = 'Chapéu de bruxo';
  stack = 1;
  armor = { part: 0, points: 0 };
  rarity = 'rare';
  texture = 'textures/item/bruxo.png';
  static cubes = [
    { origin: [-8, 31, -8], size: [16, 1, 16], color: '#3d2a6b', pattern: 'stars' },
    { origin: [-5.5, 32, -5.5], size: [11, 4, 11], color: '#46317a', pattern: 'stars-band', band: '#e2b33c' },
    { origin: [-3.5, 36, -3.5], size: [7, 4, 7], color: '#4b3582', pattern: 'stars' },
    { origin: [-1.5, 40, -2], size: [4, 3, 4], color: '#503a8a', pattern: 'stars' },
    { origin: [1, 43, -1], size: [3, 2, 2], color: '#563f93', pattern: 'plain' },
  ];
}
