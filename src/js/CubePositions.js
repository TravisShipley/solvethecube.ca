import { COLORS } from "./Colors.js";

const R = COLORS.RED;
const O = COLORS.ORANGE;
const Y = COLORS.YELLOW;
const W = COLORS.WHITE;
const B = COLORS.BLUE;
const G = COLORS.GREEN;
const _ = COLORS.BLANK; // this could be a problem if I import lodash at some point

export const POSITIONS = {
  SOLVED: {
    name: "SOLVED",
    UP: [Y, Y, Y, Y, Y, Y, Y, Y, Y],
    FRONT: [B, B, B, B, B, B, B, B, B],
    RIGHT: [R, R, R, R, R, R, R, R, R],
    BACK: [G, G, G, G, G, G, G, G, G],
    LEFT: [O, O, O, O, O, O, O, O, O],
    DOWN: [W, W, W, W, W, W, W, W, W]
  },

  DAISY: {
    name: "DAISY",
    UP: [_, W, _, W, Y, W, _, W, _],
    FRONT: [_, _, _, _, _, _, _, _, _],
    RIGHT: [_, _, _, _, _, _, _, _, _],
    BACK: [_, _, _, _, _, _, _, _, _],
    LEFT: [_, _, _, _, _, _, _, _, _],
    DOWN: [_, _, _, _, _, _, _, _, _]
  },

  WHITECROSS: {
    name: "WHITECROSS",
    UP: [_, _, _, _, Y, _, _, _, _],
    FRONT: [_, _, _, _, B, _, _, B, _],
    RIGHT: [_, _, _, _, R, _, _, R, _],
    BACK: [_, _, _, _, G, _, _, G, _],
    LEFT: [_, _, _, _, O, _, _, O, _],
    DOWN: [_, W, _, W, W, W, _, W, _]
  },

  FIRSTLAYER: {
    name: "FIRSTLAYER",
    UP: [_, _, _, _, Y, _, _, _, _],
    FRONT: [_, _, _, _, B, _, B, B, B],
    RIGHT: [_, _, _, _, R, _, R, R, R],
    BACK: [_, _, _, _, G, _, G, G, G],
    LEFT: [_, _, _, _, O, _, O, O, O],
    DOWN: [W, W, W, W, W, W, W, W, W]
  },

  FIRST2LAYERS: {
    name: "FIRST2LAYERS",
    UP: [_, _, _, _, Y, _, _, _, _],
    FRONT: [_, _, _, B, B, B, B, B, B],
    RIGHT: [_, _, _, R, R, R, R, R, R],
    BACK: [_, _, _, G, G, G, G, G, G],
    LEFT: [_, _, _, O, O, O, O, O, O],
    DOWN: [W, W, W, W, W, W, W, W, W]
  },

  YELLOWCROSS: {
    name: "YELLOWCROSS",
    UP: [Y, Y, Y, _, Y, _, Y, Y, Y],
    FRONT: [_, _, _, B, B, B, B, B, B],
    RIGHT: [_, Y, _, R, R, R, R, R, R],
    BACK: [_, _, _, G, G, G, G, G, G],
    LEFT: [_, Y, _, O, O, O, O, O, O],
    DOWN: [W, W, W, W, W, W, W, W, W]
  },

  YELLOWDOT: {
    name: "YELLOWDOT",
    UP: [_, _, _, _, Y, _, _, _, _],
    FRONT: [_, Y, _, B, B, B, B, B, B],
    RIGHT: [Y, Y, _, R, R, R, R, R, R],
    BACK: [Y, Y, Y, G, G, G, G, G, G],
    LEFT: [_, Y, Y, O, O, O, O, O, O],
    DOWN: [W, W, W, W, W, W, W, W, W]
  },

  PRE_DAISY: {
    name: "PRE_DAISY",
    UP: [_, W, _, W, Y, W, _, W, _],
    FRONT: [_, _, _, _, _, _, _, _, _],
    RIGHT: [_, _, _, _, _, _, _, _, _],
    BACK: [_, _, _, _, _, _, _, _, _],
    LEFT: [_, _, _, _, _, _, _, _, _],
    DOWN: [_, _, _, _, _, _, _, _, _]
  },

  UNKNOWN: {
    name: "SOLVED",
    UP: [R, R, R, R, R, R, R, R, R],
    FRONT: [R, R, R, R, R, R, R, R, R],
    RIGHT: [R, R, R, R, R, R, R, R, R],
    BACK: [R, R, R, R, R, R, R, R, R],
    LEFT: [R, R, R, R, R, R, R, R, R],
    DOWN: [R, R, R, R, R, R, R, R, R]
  }
};
