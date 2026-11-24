// @ts-check
// Turns a hat's cubes (editor pixels, 1 px = 1/16 block, the head's pivot at y 24 and the top of the hair at y 34) into
// a Bedrock box-UV geometry for ctx.render.armorModel, packing each cube's UV net on a 64x64 sheet. The textures
// generator uses the same layout, so the painted skin always matches the model.
export const SHEET = 64;

export function layout(cubes) {
  let x = 0, y = 0, rowH = 0;
  return cubes.map((c) => {
    const [w, h, d] = c.size, netW = 2 * (d + w), netH = d + h;
    if (x + netW > SHEET) { x = 0; y += rowH; rowH = 0; }
    const uv = [x, y];
    x += netW; rowH = Math.max(rowH, netH);
    if (y + netH > SHEET) throw new Error('hat: cubes do not fit the 64x64 sheet');
    return { ...c, uv };
  });
}

export function geometry(key, cubes) {
  return {
    'minecraft:geometry': [{
      description: { identifier: `geometry.chapelaria.${key}`, texture_width: SHEET, texture_height: SHEET },
      bones: [{ name: key, attach: 'head', slot: 0, pivot: [0, 24, 0],
        cubes: layout(cubes).map(({ origin, size, uv }) => ({ origin, size, uv })) }],
    }],
  };
}
