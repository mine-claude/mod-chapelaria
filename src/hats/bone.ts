// @ts-check
import { ItemType } from '../mineclaude-sdk.js';

// Cap: a round crown with panel seams and a stiff visor at the front.
export default class Bone extends ItemType {
  name = 'Boné';
  stack = 1;
  armor = { part: 0, points: 0 };
  texture = 'textures/item/bone.png';
  static cubes = [
    { origin: [-6, 30, -6], size: [12, 5, 12], color: '#2f6fb8', pattern: 'panels' },
    { origin: [-5, 30, -11], size: [10, 1, 5], color: '#24589a', pattern: 'plain' },
    { origin: [-1, 35, -1], size: [2, 1, 2], color: '#f0f0f0', pattern: 'plain' },
  ];
}
