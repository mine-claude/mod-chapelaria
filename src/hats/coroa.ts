// @ts-check
import { ItemType } from '../mineclaude-sdk.js';

// Crown: a gold band set with gems, five points on top.
export default class Coroa extends ItemType {
  name = 'Coroa';
  stack = 1;
  armor = { part: 0, points: 0 };
  rarity = 'epic';
  texture = 'textures/item/coroa.png';
  static cubes = [
    { origin: [-6, 31, -6], size: [12, 3, 12], color: '#e8b83a', pattern: 'gems' },
    { origin: [-6, 34, -6], size: [2, 2, 2], color: '#f2c94c', pattern: 'shine' },
    { origin: [4, 34, -6], size: [2, 2, 2], color: '#f2c94c', pattern: 'shine' },
    { origin: [-6, 34, 4], size: [2, 2, 2], color: '#f2c94c', pattern: 'shine' },
    { origin: [4, 34, 4], size: [2, 2, 2], color: '#f2c94c', pattern: 'shine' },
    { origin: [-1, 34, -6], size: [2, 3, 2], color: '#f2c94c', pattern: 'shine' },
  ];
}
