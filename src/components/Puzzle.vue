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

var Puzzle = {
  name: "Puzzle",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      material: null,
      cube: null,
      model: null,
      lights: null,
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
      this.camera.position.set(0, 0, 5);

      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });

      this.renderer.setSize(this.container.width, this.container.height);
      this.container.appendChild(this.renderer.domElement);
      this.canvas = this.renderer.domElement;

      // the lighting setup
      this.lights = new Lighting();

      // create a new cube

      this.material = new THREE.MeshPhongMaterial({
        color: 0xfca600,
        transparent: true
      });
      this.cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.material);

      this.model = new Cube(this.state);

      this.cube.rotation.set(1, 1, 1);

      // add the cube to the scene
      this.scene.add(this.cube);

      // add all the lights
      for (let light of this.lights) {
        this.scene.add(light);
      }

      // console.log("puzzle state:", this.state);
      this.setState();

      this.render();
      // this.animate();
    },
    render: function() {
      this.resizeCanvasToDisplaySize();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    },
    animate: function() {
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
      return this.changeColor(0x6e2aad); // purple
    },

    showOnlyEdges: function() {
      return this.changeColor(0x156ead); // blue
    },
    showOnlyCorners: function() {
      return this.changeColor(0xffd608); //gold
    },

    setState: function() {
      // console.log("State set to", this.state);

      switch (this.state) {
        case "DAISY":
          this.changeColor(0xeb4034, 0);
          break;
        case "SOLVED":
          this.changeColor(0x008888, 0);
          break;

        case "PRE_DAISY_1":
          this.changeColor(0x345098, 0);
          break;
        default:
          this.changeColor(0x112222, 0);
          break;
      }
    },

    changeColor: function(color, time = 1) {
      if (!color) {
        throw new Error('No color given to "Puzzle.changeColor"');
      }
      let newColor = new THREE.Color(color);
      if (!newColor.isColor) {
        throw new Error('Invalid color given to "Puzzle.changeColor"');
      }

      return gsap.to(this.cube.material.color, {
        duration: time,
        r: newColor.r,
        g: newColor.g,
        b: newColor.b
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
