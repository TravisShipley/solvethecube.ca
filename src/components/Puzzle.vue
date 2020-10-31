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
import { log, MeshPhongMaterial as mesh } from "three";

var Puzzle = {
  name: "Puzzle",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      material: null,
      cube: null,
      cubes: null,
      model: null,
      side: null,
      container: null,
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

      this.container = this.$refs.container;
      this.canvas = document.getElementById("canvas");
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(20, 1);
      this.camera.position.set(0, 0, 15);

      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });

      this.renderer.setSize(this.container.width, this.container.height);
      this.container.appendChild(this.renderer.domElement);
      this.canvas = this.renderer.domElement;

      // create a new cube

      this.model = new Cube(this.state);
      this.cube = new THREE.Group();

      var shapes = [
        this.roundedRect(0.2, 0.2, 0.2, 0.2),
        this.roundedRect(0.1, 0.1, 0.1, 0.1),
        this.roundedRect(0.1, 0.1, 0.1, 0.1)
      ];

      this.cubes = [];

      for (let c of this.model.cubelets) {
        var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), MATERIALS.K);
        this.cubes.push(cube);

        let sticker;

        for (let key in c.colors) {
          // console.log(c.colors[key]);
          let color = c.colors[key];
          if (color) {
            // cube.add(this.getSticker());
            console.log(key, ":", color);
            console.log(this.model.position);
            sticker = this.getSticker(
              shapes[c.stickerCount - 1],
              MATERIALS[color],
              key,
              c.x,
              c.y,
              c.z
            );
            cube.add(sticker);
          }
        }

        cube.position.set(c.x, c.y, c.z);
        this.cube.add(cube);
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

      var side = new THREE.Group();
      this.cube.add(side);

      for (let c of this.cubes) {
        // console.log(c.position.x);
        if (c.position.x == 1) {
          side.add(c);
        }
      }
      side.rotation.x = 2;

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

    spinAnimation: function() {
      // TODO work out how to make this spin from the current position
      return gsap.to(this.cube.rotation, {
        duration: 3,
        x: (i, t) => {
          // console.log(t.x);
          return "+=3";
        },
        y: (i, t) => {
          // console.log(t.y);
          return "+=8";
        },
        z: (i, t) => {
          // console.log(t.z);
          return "+=2";
        },
        repeatRefresh: true,
        ease: "power3.out"
      });
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

    showOnlyCenters: function() {
      // return this.changeColor(0x6e2aad); // purple
    },

    showOnlyEdges: function() {
      // return this.changeColor(0x156ead); // blue
    },
    showOnlyCorners: function() {
      // return this.changeColor(0xffd608); //gold
    },

    getSticker: function(shape, material, dir, x, y, z) {
      // flat shape
      let s = 0.9; // sticker scale
      var geometry = new THREE.ShapeBufferGeometry(shape);
      var sticker = new THREE.Mesh(geometry, material);
      var r = Math.PI / 2;
      let depth = 0.501;

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
      let xValue = "+=0";
      let yValue = "+=0";
      let zValue = "+=0";
      const qtr = Math.PI / 4;

      switch (str) {
        case "R":
        case "R'":
          xValue = "+=" + -qtr;
          break;
        case "L":
        case "L'":
          xValue = "+=" + qtr;
          break;
        case "U'":
        case "U":
          yValue = "+=" + qtr;
          break;
        case "F'":
        case "F":
          zValue = "+=" + qtr;
          break;
      }

      return this.spinTo(xValue, yValue, zValue);
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
    },
    hello: function() {
      return "Puzzle says hello";
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
