<template>
  <div ref="container" class="puzzle-container"></div>
</template>

<script>
import * as THREE from "three";

// TODO these imports used to work
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

import Cube from "../js/Cube.js";
import Lighting from "../js/Lighting.js";
import { MATERIALS } from "../js/Materials.js";

var Puzzle = {
  name: "Puzzle",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      material: null,
      model: null,
      cube: null,
      cubes: null,
      states: null,
      stateIndex: null,
      startingState: 0,
      history: null,
      canvas: null,
      size: null
    };
  },
  props: {
    name: String,
    scrollDirection: {
      type: Number,
      default: 1
    },
    state: {
      type: String,
      default: "SOLVED"
    },
    sphere: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    state: function(val) {
      let reset = !!this.model;
      this.model = new Cube(this.state);

      if (reset) {
        this.states = [];
        this.history = [];

        this.recordState();
        this.reset();

        // things have changed let our observers know
        this.$emit("stateChanged");
      }
    }
  },

  methods: {
    init() {
      console.log("\n\nPuzzle Init ====================================\n");

      const container = this.$refs.container;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(20, 1);
      this.camera.position.set(0, 0, 15);

      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });

      this.renderer.setSize(container.width, container.height);
      container.appendChild(this.renderer.domElement);
      this.canvas = this.renderer.domElement;

      // create a new cube
      this.cube = new THREE.Group();
      this.model = new Cube(this.state);

      this.cubes = [];
      this.states = [];
      this.history = [];

      this.recordState();

      if (this.sphere) {
        var sphere = new THREE.Mesh(
          new THREE.SphereGeometry(1.2, 24, 24),
          new THREE.MeshStandardMaterial({ color: MATERIALS.BLACK })
        );
        this.cube.add(sphere);
      }

      for (let c of this.model.cubelets) {
        var piece = this.getPiece();
        piece.data = c; // attach the cubelet data directly to the piece.
        piece.colors = c.colors;

        for (let key in c.colors) {
          if (c.colors[key]) {
            let sticker = this.getSticker(
              c.stickerCount - 1, // determines shape
              key,
              c.x,
              c.y,
              c.z
            );

            piece.stickers[key] = sticker;
            piece.plastic.add(sticker);
          }
        }

        this.cubes.push(piece);

        piece.position.x = c.x;
        piece.position.y = c.y;
        piece.position.z = c.z;

        piece.plastic.position.set(c.x, c.y, c.z);
        this.cube.add(piece.obj);
      }

      // add the cube to the scene
      this.scene.add(this.cube);

      // the lighting setup
      const lights = new Lighting();

      // add all the lights
      for (let light of lights) {
        this.scene.add(light);
      }
      // this.setRotation();
      this.reset();
      this.cube.rotation.set(0.5, -0.6, 0);

      this.render();
      // this.animate();
    },

    render: function() {
      this.resizeCanvasToDisplaySize();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    },

    animate: function() {
      this.resizeCanvasToDisplaySize();
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },

    getPiece: function() {
      let p = {
        data: null,
        // pivot: new THREE.Group(),
        obj: new THREE.Group(),
        plastic: new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({
            color: MATERIALS.BLACK,
            transparent: true
          })
        ),
        stickers: {
          UP: null,
          DOWN: null,
          LEFT: null,
          RIGHT: null,
          FRONT: null,
          BACK: null
        },
        position: {
          x: 0,
          y: 0,
          z: 0
        },

        stickersVisible: true,
        hasStickers: {
          get: function() {
            return this.stickersVisible;
          },
          set: function(value) {
            this.stickersVisible = value;
            this.animateStickers(0, value ? 1 : 0);
          }
        },

        showStickers: function() {
          this.stickersVisible = true;
          this.animateStickers(0.3, 1);
        },

        hideStickers: function() {
          this.stickersVisible = false;
          this.animateStickers(0.3, 0);
        },

        animateStickers: function(time, alpha) {
          for (let face in this.stickers) {
            let sticker = this.stickers[face];

            if (sticker) {
              gsap.to(sticker.material, {
                duration: time,
                opacity: alpha
              });
            }
          }
        },

        hide: function() {
          gsap.to(this.plastic.material, { duration: 0.3, opacity: 0.1 });
          this.hideStickers();
        },
        show: function() {
          gsap.to(this.plastic.material, { duration: 0.3, opacity: 1 });
          this.showStickers();
        },
        update: function() {
          // update the stickers
          for (let face in this.stickers) {
            if (this.stickers[face]) {
              this.stickers[face].material.color.set(
                MATERIALS[this.data.colors[face]]
              );
            }
          }
        }
      };

      p.obj.add(p.plastic);
      return p;
    },

    showOnlyCenters: function() {
      for (let c of this.cubes) {
        if (c.data.stickerCount != 1) {
          c.hide();
        } else {
          c.show();
        }
      }
    },

    showOnlyEdges: function() {
      for (let c of this.cubes) {
        if (c.data.stickerCount != 2) {
          c.hide();
        } else {
          c.show();
        }
      }
    },
    showOnlyCorners: function() {
      for (let c of this.cubes) {
        if (c.data.stickerCount != 3) {
          c.hide();
        } else {
          c.show();
        }
      }
    },
    showAll: function() {
      for (let c of this.cubes) {
        c.show();
      }
    },

    getSticker: function(shape, face, x, y, z) {
      // flat shape

      const CENTER = 0;
      const EDGE = 1;
      const CORNER = 2;
      const shapes = [
        this.roundedRect(0.25, 0.25, 0.25, 0.25),
        this.roundedRect(0.1, 0.1, 0.1, 0.1),
        this.roundedRect(0.1, 0.1, 0.1, 0.1)
      ];

      var geometry = new THREE.ShapeBufferGeometry(shapes[shape]);
      var material = new THREE.MeshStandardMaterial({
        color: MATERIALS.N,
        transparent: true
      });
      var sticker = new THREE.Mesh(geometry, material);
      var r = Math.PI / 2;
      let depth = 0.501;

      let s = 0.9; // sticker scale
      sticker.scale.set(s, s, s);

      switch (face) {
        case "UP":
          sticker.position.set(0, depth * y, 0);
          sticker.rotation.set(-r, 0, 0);
          break;
        case "DOWN":
          sticker.position.set(0, depth * y, 0);
          sticker.rotation.set(r, 0, 0);
          break;
        case "RIGHT":
          sticker.position.set(depth * x, 0, 0);
          sticker.rotation.set(0, r, 0);
          break;
        case "LEFT":
          sticker.position.set(depth * x, 0, 0);
          sticker.rotation.set(0, -r, 0);
          break;
        case "FRONT":
          sticker.position.set(0, 0, depth * z);
          sticker.rotation.set(0, 0, 0);
          break;
        case "BACK":
          sticker.position.set(0, 0, depth * z);
          sticker.rotation.set(0, r * 2, 0);
          break;
      }
      return sticker;
    },

    roundedRect: function(rad1, rad2, rad3, rad4) {
      var y = -0.5;
      var x = -0.5;
      var height = 1;
      var width = 1;
      var shape = new THREE.Shape();

      shape.moveTo(x, y + rad1);
      shape.lineTo(x, y + height - rad1);
      shape.quadraticCurveTo(x, y + height, x + rad1, y + height);
      shape.lineTo(x + width - rad2, y + height);
      shape.quadraticCurveTo(
        x + width,
        y + height,
        x + width,
        y + height - rad2
      );
      shape.lineTo(x + width, y + rad3);
      shape.quadraticCurveTo(x + width, y, x + width - rad3, y);
      shape.lineTo(x + rad4, y);
      shape.quadraticCurveTo(x, y, x, y + rad4);

      return shape;
    },

    reset: function() {
      this.cube.rotation.set(0.5, -0.6, 0);
      this.applyState(this.startingState);
    },

    twist: function(str) {
      let ccw = str.includes("'");
      let _180 = str.includes("2");
      let face = str.charAt(0);
      this.model.rotate(face, ccw, _180);
      this.recordState();
    },

    prepare: function(list) {
      // let self = this;
      let moves = list.split(" ");

      for (let move of moves) {
        this.twist(move);
        this.history.push(move);
      }

      this.startingState = this.stateIndex;
      this.reset();
    },

    performMoves: function(list) {
      console.log("list of move", list);
      console.log(this.states);
      let sequence = list ? list.split(" ") : [...this.history];
      let tl = gsap.timeline();

      for (let move of sequence) {
        if (move.charAt() == "x" || move.charAt() == "y") {
          tl.add(this.adjustCube(move));
        } else {
          tl.add(this.getMove(move));
        }
      }

      return tl;
    },

    parseMove: function(str) {
      let face = str.charAt(0);
      let ccw = str.includes("'");
      let turns = str.includes("4")
        ? 4
        : str.includes("3")
        ? 3
        : str.includes("2")
        ? 2
        : 1;

      return { face, turns, ccw };
    },

    reverseTimeline: function() {
      let tl = gsap.timeline({});

      let sequence = [...this.history].reverse();

      for (let move of sequence) {
        move = this.invertMove(move);
        tl.add(this.getMove(move));
      }
      return tl;
    },

    invertMove: function(str) {
      return str.includes("'") ? str.replace("'", "") : str + "'";
    },

    adjustCube: function(str) {
      this.recordState();

      let { face, turns, ccw } = this.parseMove(str);
      // let x, y, z;
      let radians = Math.PI / 3;
      let rotation = ccw ? "+=" + radians * turns : "-=" + radians * turns;
      let baseDuration = 0.3;

      let tweenProps = {
        duration: baseDuration + baseDuration * turns,
        ease: "power1.inOut"
        // onStart: () => console.log("cube: ", x, y, z),
        // onComplete: () => console.log("cube:", this.cube.rotation)
      };

      if (face == "x") tweenProps.x = rotation;
      else tweenProps.y = rotation;

      return gsap.to(this.cube.rotation, tweenProps);
    },

    getMove: function(str) {
      let x = null;
      let y = null;
      let z = null;
      let axis = null;

      // parse the move input
      let { face, turns, ccw } = this.parseMove(str);

      let duration = turns == 1 ? 0.6 : 0.9;

      let radians = ccw ? Math.PI / 2 : Math.PI / -2;
      let vector = ["R", "F", "U"].includes(face) ? 1 : -1;

      if (face == "R" || face == "L") {
        axis = "x";
        x = radians * turns * vector;
      } else if (face == "U" || face == "D") {
        axis = "y";
        y = radians * turns * vector;
      } else {
        axis = "z";
        z = radians * turns * vector;
      }

      // if we're not doing a cube adjustment, continue on

      // update the model and save the new data
      // TODO this probably shouldn't be here
      this.model.rotate(face, ccw, turns == 2);
      this.recordState();

      // keep track of where we are in the list of states
      let start = this.stateIndex - 1;
      let end = this.stateIndex;

      // get the cubes we want to rotate
      var targets = this.cubes.filter(c => c.position[axis] == vector);

      // TODO make the cubes into Object3Ds
      // separately get their Object3Ds
      var activeFace = targets.map(cube => cube.obj.rotation);

      // create the tween to rotate the cubes
      var tween = gsap.fromTo(
        activeFace,
        {
          x: () => {
            return x && this.scrollDirection == -1 ? -x : 0;
          },
          y: () => {
            return y && this.scrollDirection == -1 ? -y : 0;
          },
          z: () => {
            return z && this.scrollDirection == -1 ? -z : 0;
          }
        },

        {
          x: () => {
            return x && this.scrollDirection == -1 ? 0 : x;
          },
          y: () => {
            return y && this.scrollDirection == -1 ? 0 : y;
          },
          z: () => {
            return z && this.scrollDirection == -1 ? 0 : z;
          },

          duration: duration,
          ease: "back.inOut",
          onComplete: () => {
            // invalidate the tween so that start and end directions
            // are recalculated each time it runs
            tween.invalidate();
            activeFace.map(rot => rot.set(0, 0, 0));
            this.applyState(end);
          },

          onReverseComplete: () => {
            // invalidate the tween so that start and end directions
            // are recalculated each time it runs
            tween.invalidate();
            activeFace.map(rot => rot.set(0, 0, 0));
            this.applyState(start);
          }
        }
      );

      return tween;
    },

    applyState: function(index, targets = this.cubes) {
      this.stateIndex = index;
      console.log("applying state:", index, this.states.length);
      // console.log(this.states[index].prettyPrint);
      for (let i in this.states[index]) {
        let c = this.states[index][i];
        targets[i].data = c;
        targets[i].update();
      }
    },

    // keep an array of every state of the cube
    recordState: function() {
      // console.log("RECORD STATE");
      // console.log("states.length", this.states.length);
      this.states.push(this.model.getState());
      this.stateIndex = this.states.length - 1;
    },

    groupCubes: function(axis, direction) {
      let group = [];

      for (let c of this.cubes) {
        if (c.position[axis] == direction) {
          group.push(c);
        }
      }

      return group;
    },

    spinX: function() {
      return gsap.to(this.cube.rotation, {
        duration: 1,
        x: () => {
          return this.cube.rotation.y + 3;
        }
      });
    },

    spinY: function(rotation = 3, repeat = false) {
      // let y = () => this.cube.rotation.y + rotation * ccw;

      // if (rotation == -1) {
      // let y = ccw ? "+=" + rotation : "-=" + rotation;
      // repeat = rotation;
      // }

      return gsap.to(this.cube.rotation, {
        repeat: repeat ? -1 : 0,
        duration: 1,
        repeatRefresh: repeat,
        y: "+=" + rotation
      });
    },

    spinContinuously: function() {
      return gsap.to(this.cube.rotation, {
        duration: 2,
        x: "+=random(2,3)",
        y: "+=random(2,3)",
        z: "+=random(0,1)",
        repeat: -1,
        repeatRefresh: true,
        onRepeat: () => this.unspin(),
        ease: "none"
      });
    },

    spinOnce: function() {
      return gsap.to(this.cube.rotation, {
        duration: 1,
        x: "+=2",
        y: "+=3",
        z: "+=1",
        repeatRefresh: true,
        repeat: -1,
        ease: "none"
      });
    },

    spinTo: function(x, y, z, time = 1) {
      this.unspin();
      // if inputs are null maintain the same rotation
      var newX = x == null ? this.cube.rotation.x : x;
      var newY = y == null ? this.cube.rotation.y : y;
      var newZ = z == null ? this.cube.rotation.z : z;

      return gsap.to(this.cube.rotation, {
        duration: time,
        x: newX,
        y: newY,
        z: newZ,
        onComplete: () => {
          console.log(
            "Cube rotation set to",
            this.cube.rotation.x,
            this.cube.rotation.y,
            this.cube.rotation.z
          );
        }
      });
    },

    unspin: function() {
      var pi2 = Math.PI * 2;

      var newX = this.cube.rotation.x % pi2;
      var newY = this.cube.rotation.y % pi2;
      var newZ = this.cube.rotation.z % pi2;

      this.cube.rotation.set(newX, newY, newZ);
    },

    resizeCanvasToDisplaySize: function() {
      // TODO this needs fixing still
      // look up the size the canvas is being displayed
      const displaySize = this.canvas.clientWidth;

      // adjust displayBuffer size to match
      if (this.canvas.width !== displaySize) {
        // you must pass false here or three.js sadly fights the browser
        this.renderer.setSize(displaySize, displaySize, false);
        this.camera.updateProjectionMatrix();
      }
    },

    print: function() {
      // console.log("CUBE CLICKED. INITIAL STATE:", this.state);
      this.model.prettyPrintIDs();
      this.model.prettyPrintIndexes();

      for (let c of this.model.cubelets) {
        console.log(c.id);
      }
    }
  },

  created() {
    console.log("Puzzle created.");
  },

  mounted() {
    console.log("Puzzle did mount", this.state);
    this.$nextTick(function() {
      window.addEventListener("resize", this.resizeCanvasToDisplaySize);

      //Init
      this.resizeCanvasToDisplaySize();
    });
    gsap.defaults({ ease: "none" });
    this.init();
  },

  destroyed() {
    window.removeEventListener("resize", this.resizeCanvasToDisplaySize);
  }
};

export default Puzzle;
</script>

<style lang="scss">
.puzzle-container {
  width: 100%;
  transform-origin: center right;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
