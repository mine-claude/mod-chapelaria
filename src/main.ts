// @ts-check
import { ModInitializer } from './mineclaude-sdk.js';
import HATS from './hats/index.ts';
import { geometry } from './hats/build.ts';

// Wearable hats: each one is an item for the helmet slot (no armor points) whose look comes from ctx.render.armorModel,
// with a box-UV model built from the cubes on its class and a skin painted by code (textures.gen.js).
export default class Chapelaria extends ModInitializer {
  onInitialize(ctx) {
    for (const [key, Hat] of Object.entries(HATS)) {
      ctx.items.register(key, new Hat());
      ctx.render.armorModel(`chapelaria:${key}`, { geometry: geometry(key, Hat.cubes), texture: `textures/hat/${key}.png` });
    }
    ctx.recipes.add({ key: 'palha', out: 'chapelaria:palha', n: 1, pattern: ['.W.', 'WWW'], legend: { W: 'mineclaude:wheat' } });
    ctx.recipes.add({ key: 'gorro', out: 'chapelaria:gorro', n: 1, pattern: ['.W.', 'WWW'], legend: { W: 'mineclaude:wool' } });
    ctx.recipes.add({ key: 'cartola', out: 'chapelaria:cartola', n: 1, pattern: ['.L.', '.L.', 'LLL'], legend: { L: 'mineclaude:leather' }, station: 'crafting_table' });
  }
}
