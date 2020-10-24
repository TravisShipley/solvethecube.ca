import { POSITIONS } from "./CubePositions.js";
import { COLORS } from "./Colors.js";

const UP = "UP";
const RIGHT = "RIGHT";
const BACK = "BACK";
const LEFT = "LEFT";
const FRONT = "FRONT";
const DOWN = "DOWN";

const CW = 1;
const CCW = -1;

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
    console.log("\n\n\n\n         Class of CUBE       \n\n\n\n", state);

    this.cubelets = [];
    this.state = this.setState(state);

    this.prettyPrint();

    this.rotate("UP", CCW);
    this.rotate("FRONT", CW);
    this.rotate("DOWN", CW);
    this.rotate("RIGHT", CW);
  }

  rotate(face, direction) {
    // create and array of all the cubelets in the face
    // that we want to rotate, then turn that into a matrix
    var selectedCubelets = CUBELETS_OF[face].map(v => this.cubelets[v]);
    var matrix = matrixFromArray(selectedCubelets);

    // rotating a matrix is simpler than an array
    // TODO:  but it might be less efficient for my purposes.
    //        Look into that.
    if (direction == CW) matrix = rotateMatrix(matrix);
    else matrix = rotateMatrixCCW(matrix);

    // convert the rotated matrix back to an array
    selectedCubelets = arrayFromMatrix(matrix);

    // insert the newly rotated array back into the array of cubelets
    for (let i in CUBELETS_OF[face]) {
      this.cubelets[CUBELETS_OF[face][i]] = selectedCubelets[i];
      this.cubelets[CUBELETS_OF[face][i]].rotate(AXIS[face], direction);

      // set the position of the cubelet to it's new index in the main array
      this.cubelets[CUBELETS_OF[face][i]].position = CUBELETS_OF[face][i];
    }
  }

  setState(state) {
    let s = POSITIONS[state];

    if (!s) {
      s = POSITIONS.UNKNOWN;
      console.warn("Cube has been set to an unknown position.");
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

  hello() {
    return "Cube says hello";
  }
  prettyPrint(_colors = true, _pos = false, _id = false, _loc = false) {
    console.log(
      "\nThe current state of the cube\n============================="
    );

    var colors = "";
    var pos = "";
    var id = "";
    var loc = "";

    for (let face in CUBELETS_OF) {
      pos += `\n${face} pos: \t`;
      id += `\n${face}  id: \t`;
      loc += `\n${face} loc: \t`;

      colors += `\n${face}: \t`;
      var n = 0;

      for (let i of CUBELETS_OF[face]) {
        colors += n % 3 == 0 ? "\n\t\t" : " ";
        colors += `${this.cubelets[i].colors[face]}\t`;

        pos += n % 3 == 0 ? "\n\t\t" : " ";
        pos += `${this.cubelets[i].position}`;

        loc += n % 3 == 0 ? "\n\t\t" : " ";
        loc += `${this.cubelets[i].location}`;

        id += n % 3 == 0 ? "\n\t\t" : " ";
        id += `${this.cubelets[i].id}`;

        n++;
      }
    }
    if (_colors) console.log(colors);
    if (_pos) console.log(pos);
    if (_loc) console.log(loc);
    if (_id) console.log(id);
  }
}

class Cubelet {
  constructor(index, x, y, z) {
    this.id = index;
    this.state = index;
    this.x = x;
    this.y = y;
    this.z = z;

    this.colors = {
      UP: null,
      FRONT: null,
      RIGHT: null,
      BACK: null,
      LEFT: null,
      DOWN: null
    };
  }

  rotate(axis, direction) {
    var newTangents = axis.tangents.slice();

    // shift the tangents array to rotate the tangent faces
    if (direction == CCW) newTangents.push(newTangents.shift());
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

  get location() {
    return `(${this.x},${this.y},${this.z})`;
  }

  // I thought this was pretty clever, but it's totally unnecessary
  /* get position() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          let index = k + j * 3 + i * 9;

          if (this.x == 1 - i && this.y == 1 - j && this.z == 1 - k) {
            return index;
          }
        }
      }
    }
  } */
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
