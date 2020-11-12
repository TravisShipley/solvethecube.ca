import { POSITIONS } from "./CubePositions.js";
import { COLORS } from "./Colors.js";

const UP = "UP";
const RIGHT = "RIGHT";
const BACK = "BACK";
const LEFT = "LEFT";
const FRONT = "FRONT";
const DOWN = "DOWN";

const FACE_NAMES = {
  U: "UP",
  R: "RIGHT",
  B: "BACK",
  L: "LEFT",
  F: "FRONT",
  D: "DOWN"
};

let AXIS = {
  UP: { tangents: ["BACK", "RIGHT", "FRONT", "LEFT"] },
  RIGHT: { tangents: ["UP", "BACK", "DOWN", "FRONT"] },
  FRONT: { tangents: ["UP", "RIGHT", "DOWN", "LEFT"] },
  BACK: { tangents: ["UP", "LEFT", "DOWN", "RIGHT"] },
  LEFT: { tangents: ["UP", "FRONT", "DOWN", "BACK"] },
  DOWN: { tangents: ["BACK", "LEFT", "FRONT", "RIGHT"] }
};

let CUBELETS_OF = {
  UP: [20, 11, 2, 19, 10, 1, 18, 9, 0],
  FRONT: [18, 9, 0, 21, 12, 3, 24, 15, 6],
  RIGHT: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  BACK: [2, 11, 20, 5, 14, 23, 8, 17, 26],
  LEFT: [20, 19, 18, 23, 22, 21, 26, 25, 24],
  DOWN: [24, 15, 6, 25, 16, 7, 26, 17, 8]
};

export default class Cube {
  constructor(state) {
    this.cubelets = [];
    this.state = this.setState(state);

    // this.rotate("FRONT", CW);
    // this.prettyPrint();
    // this.rotate("RIGHT", CW);

    // this.rotate("UP", CW);
  }

  rotate(faceCode, CCW, fullTurn = false) {
    let face = FACE_NAMES[faceCode];
    // create and array of all the cubelets in the face
    // that we want to rotate, then turn that into a matrix

    let self = this;
    let selectedCubelets = CUBELETS_OF[face].map(v => self.cubelets[v]);
    let matrix = matrixFromArray(selectedCubelets);

    // rotating a matrix is simpler than an array
    // TODO:  but it might be less efficient for my purposes.
    //        Look into that.
    if (CCW) matrix = rotateMatrixCCW(matrix);
    else matrix = rotateMatrix(matrix);

    // convert the rotated matrix back to an array
    selectedCubelets = arrayFromMatrix(matrix);

    // insert the newly rotated array back into the array of cubelets
    for (let i in CUBELETS_OF[face]) {
      this.cubelets[CUBELETS_OF[face][i]] = selectedCubelets[i];
      this.cubelets[CUBELETS_OF[face][i]].rotate(AXIS[face], CCW);

      // set the index of the cubelet to it's new index in the main array
      this.cubelets[CUBELETS_OF[face][i]].index = CUBELETS_OF[face][i];
    }

    if (fullTurn) this.rotate(faceCode, CCW);
  }

  setState(state) {
    let s = POSITIONS[state];

    if (!s) {
      s = POSITIONS.UNKNOWN;
      console.warn("Cube has been set to an unknown position.");
    } else {
      console.log("the state is ", s);
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          let index = k + j * 3 + i * 9;
          let x = 1 - i;
          let y = 1 - j;
          let z = 1 - k;

          let c = new Cubelet(index, x, y, z);
          // using this cubelet's index, find which faces it belongs to
          // then assign the color at that position from the given
          // state object to this cubelet.

          for (let face in c.colors) {
            let color = s[face][CUBELETS_OF[face].indexOf(index)];
            c.colors[face] = color ? color : null;
          }

          this.cubelets[index] = c;
        }
      }
    }
  }

  getState() {
    // return a copy of the cubelets array
    //
    // figuring out that I needed to clone the array
    // AND all the objects in it was a nightmare
    // to figure out

    return this.cubelets.map(obj => obj.clone());
  }

  // return the ids for all the cube in the face
  getIDsForFace(face) {
    let ids = [];
    for (let i of CUBELETS_OF[face]) {
      // add all the ids of the cubelets of 'face' to the array
      ids.push(this.cubelets[i].id);
    }
    return ids;
  }

  prettyPrint(
    cubelets = this.cubelets,
    _colors = true,
    _id = false,
    _index = false,
    _loc = false
  ) {
    console.log(
      "\nThe current state of the cube\n============================="
    );

    var colors = "";
    var id = "";
    var index = "";
    var loc = "";

    for (let face in CUBELETS_OF) {
      id += `\n${face}  id: \t`;
      index += `\n${face}  index: \t`;
      loc += `\n${face} loc: \t`;

      colors += `\n${face}: \t`;
      var n = 0;

      for (let i of CUBELETS_OF[face]) {
        let color = cubelets[i].colors[face];
        if (color == COLORS.BLANK) color = "______";
        if (color == COLORS.HIGHLIGHTED) color = "######";
        if (color == COLORS.TINTED) color = "------";

        // pad out the color string
        while (color.length < 6) {
          color += " ";
        }

        colors += n % 3 == 0 ? "\n\t\t" : " ";
        colors += `${color}\t`;

        loc += n % 3 == 0 ? "\n\t\t" : " ";
        loc += `${cubelets[i].location}`;

        id += n % 3 == 0 ? "\n\t\t" : " ";
        id += `${cubelets[i].id}`;

        index += n % 3 == 0 ? "\n\t\t" : " ";
        index += `${cubelets[i].index}`;

        n++;
      }
    }
    if (_colors) console.log(colors);
    if (_loc) console.log(loc);
    if (_id) console.log(id);
    if (_index) console.log(index);
  }
  prettyPrintIDs(cubelets = this.cubelets) {
    this.prettyPrint(cubelets, false, true, false, false);
  }
  prettyPrintIndexes(cubelets = this.cubelets) {
    this.prettyPrint(cubelets, false, false, true, false);
  }
}

class Cubelet {
  constructor(index, x, y, z) {
    this.id = index;
    this.index = index;
    this.x = x;
    this.y = y;
    this.z = z;

    this.colors = {
      FRONT: null,
      RIGHT: null,
      UP: null,
      BACK: null,
      LEFT: null,
      DOWN: null
    };
  }

  clone() {
    var clone = new Cubelet(this.index, this.x, this.y, this.z);
    clone.id = this.id;
    clone.colors = Object.assign({}, this.colors);
    return clone;
  }

  rotate(axis, CCW) {
    var newTangents = axis.tangents.slice();

    // shift the tangents array to rotate the tangent faces
    if (CCW) newTangents.push(newTangents.shift());
    else newTangents.unshift(newTangents.pop());

    var rotatedColors = newTangents.map(v => this.colors[v]);

    for (var i in axis.tangents) {
      this.colors[axis.tangents[i]] = rotatedColors[i];
    }

    // reset the xyz
    this.x = this.y = this.z = 0;

    // update the XYZ based on the visible sides
    for (var c in this.colors) {
      if (this.colors[c]) {
        if (c == UP) this.y = 1;
        else if (c == DOWN) this.y = -1;
        else if (c == RIGHT) this.x = 1;
        else if (c == LEFT) this.x = -1;
        else if (c == FRONT) this.z = 1;
        else if (c == BACK) this.z = -1;
      }
    }
  }

  get stickerCount() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }

  get location() {
    return `(${this.x},${this.y},${this.z})`;
  }
}

const matrixFromArray = function(array) {
  var size = Math.sqrt(array.length);
  var matrix = [[], [], []];

  var n = 0;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      matrix[i][j] = array[n];
      n++;
    }
  }
  return matrix;
};

const arrayFromMatrix = function(matrix) {
  var arr = [];
  for (let row in matrix) {
    for (let value of matrix[row]) {
      arr.push(value);
    }
  }
  return arr;
};

// borrowed from:
//  https://medium.com/front-end-weekly/matrix-rotation-%EF%B8%8F-6550397f16ab

const flipMatrix = matrix =>
  matrix[0].map((column, index) => matrix.map(row => row[index]));

const rotateMatrix = matrix => flipMatrix(matrix.reverse());

const rotateMatrixCCW = matrix => flipMatrix(matrix).reverse();
