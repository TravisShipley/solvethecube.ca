import { MeshPhongMaterial as mesh } from "three";

export const MATERIALS = {
  W: new mesh({
    color: 0xfafafa
  }),
  R: new mesh({
    color: 0xf0165b
  }),
  B: new mesh({
    color: 0x4287f5
  }),
  G: new mesh({
    color: 0x4bbd57
  }),
  O: new mesh({
    color: 0xfc6800
  }),
  Y: new mesh({
    color: 0xffee00
  }),
  K: new mesh({
    color: 0x121212,
    transparent: true,
    opacity: 1
  }),
  H: new mesh({
    color: 0x121212
  }),
  DS: new mesh({ color: 0xee1212, side: 2 })
};
MATERIALS.YELLOW = MATERIALS.Y;
MATERIALS.WHITE = MATERIALS.W;
MATERIALS.RED = MATERIALS.R;
MATERIALS.ORANGE = MATERIALS.O;
MATERIALS.BLUE = MATERIALS.B;
MATERIALS.GREEN = MATERIALS.G;
