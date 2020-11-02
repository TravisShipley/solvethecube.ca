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
import { COLORS } from "../js/Colors.js";
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
      activeCubes: null,

      canvas: null,
      timeline: null,
      origin: null,
      size: null,
      scrollY: 0
    };
  },
  props: {
    state: {
      type: String,
      default: "SOLVED"
    },
    sphere: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // size: {
    //   get: function {
    //     return
    //   }
    // }
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

      this.model = new Cube(this.state);
      this.cube = new THREE.Group();

      if (this.sphere) {
        var sphere = new THREE.Mesh(
          new THREE.SphereGeometry(1.2, 24, 24),
          new THREE.MeshStandardMaterial({ color: MATERIALS.BLACK })
        );
        this.cube.add(sphere);
      }

      this.cubes = [];

      for (let c of this.model.cubelets) {
        var piece = this.getPiece();

        piece.data = c; // attach the cubelet data directly to the piece.
        let sticker;

        for (let key in c.colors) {
          let color = c.colors[key];

          if (color) {
            sticker = this.getSticker(
              c.stickerCount - 1,
              MATERIALS[color],
              key,
              c.x,
              c.y,
              c.z
            );

            piece.stickers[key] = sticker;
            piece.obj.add(sticker);
          }
        }

        this.cubes.push(piece);

        piece.position.x = c.x;
        piece.position.y = c.y;
        piece.position.z = c.z;

        piece.obj.position.set(c.x, c.y, c.z);
        this.cube.add(piece.obj);
      }

      this.cube.rotation.set(0.5, -0.6, 0);

      // add the cube to the scene
      this.scene.add(this.cube);

      // the lighting setup
      const lights = new Lighting();

      // add all the lights
      for (let light of lights) {
        this.scene.add(light);
      }

      this.activeCubes = new THREE.Group();
      this.cube.add(this.activeCubes);

      // this.getMove("U");
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
          gsap.to(this.plastic.material, { duration: 0.3, opacity: 0 });
          this.hideStickers();
        },
        show: function() {
          gsap.to(this.plastic.material, { duration: 0.3, opacity: 1 });
          this.showStickers();
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

    getSticker: function(shape, color, dir, x, y, z) {
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
        color: color,
        transparent: true
      });
      var sticker = new THREE.Mesh(geometry, material);
      var r = Math.PI / 2;
      let depth = 0.501;

      let s = 0.9; // sticker scale
      sticker.scale.set(s, s, s);

      switch (dir) {
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

    changeColor: function(color, time = 1) {
      // if (!color) {
      //   throw new Error('No color given to "Puzzle.changeColor"');
      // }
      // let newColor = new THREE.Color(color);
      // if (!newColor.isColor) {
      //   throw new Error('Invalid color given to "Puzzle.changeColor"');
      // }
      // return gsap.to(this.cube.material.color, {
      //   duration: time,
      //   r: newColor.r,
      //   g: newColor.g,
      //   b: newColor.b
      // });
      return null;
    },
    getMove: function(str) {
      let move = str.split("");
      let x = null;
      let y = null;
      let z = null;
      let r = Math.PI / 2;
      let axis;
      let dir;
      let face;

      // rotate CCW?
      r = move.length > 1 && move[1] == "'" ? r : -r;

      if (move[0] == "R") {
        face = "RIGHT";
        axis = "x";
        dir = 1;
        x = r * dir;
      } else if (move[0] == "L") {
        face = "LEFT";
        axis = "x";
        dir = -1;
        x = r * dir;
      } else if (move[0] == "U") {
        face = "UP";
        axis = "y";
        dir = 1;
        y = r * dir;
      } else if (move[0] == "D") {
        face = "DOWN";
        axis = "y";
        dir = -1;
        y = r * dir;
      } else if (move[0] == "F") {
        face = "FRONT";
        axis = "z";
        dir = 1;
        z = r * dir;
      } else if (move[0] == "B") {
        face = "BACK";
        axis = "z";
        dir = -1;
        z = r * dir;
      }

      // this.selectCubes(axis, dir);

      return gsap.to(this.activeCubes.rotation, {
        onStart: () => {
          this.selectCubes(axis, dir);
        },
        // callbackScope: this,
        onComplete: () => {
          this.updateCube(face, dir);
        },
        duration: 0.4,
        x: x,
        y: y,
        z: z,
        ease: "back.inOut"
      });
    },

    updateCube: function(face, dir) {
      this.model.rotate(face, dir);

      this.resetActiveCubes();
      this.model.prettyPrint();
    },

    resetActiveCubes: function() {
      let len = this.activeCubes.children.length;
      for (let i = 0; i < len; i++) {
        this.cube.add(this.activeCubes.children[0]);
      }

      this.activeCubes.rotation.set(0, 0, 0);
    },

    selectCubes: function(axis, direction) {
      console.log("selecting cubes", this.activeCubes.children.length);
      console.log("Are there any cubes selected??");
      if (this.activeCubes.children.length) {
        console.log("Yes, cubes were selected.");
        this.resetActiveCubes();
      } else {
        console.log("No cubes selected");
      }
      var n = 0;
      for (let c of this.cubes) {
        n++;
        if (c.position[axis] == direction) {
          this.activeCubes.add(c.obj);
        }
      }
      console.log(
        "number of selected cubes:",
        this.activeCubes.children.length
      );
    },
    spinX: function() {
      return gsap.to(this.cube.rotation, {
        duration: 1,
        x: () => {
          return this.cube.rotation.y + 3;
        }
      });
    },
    spinY: function(rotation = 3) {
      return gsap.to(this.cube.rotation, {
        duration: 1,
        y: () => this.cube.rotation.y + rotation
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
        onRepeate: this.unspin,
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
