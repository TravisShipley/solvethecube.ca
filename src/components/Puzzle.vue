<template>
  <div ref="container" class="puzzle-container"></div>
</template>

<script>
import * as THREE from "three";

// TODO these imports used to work
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// import Cube from "../js/Cube.js";
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
      lights: null,
      container: null,
      canvas: null,
      timeline: null,
      origin: null,
      size: null,
      foo: null,
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
      console.log("Initialized");

      this.container = this.$refs.container;
      console.log(this.container.width);
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

      this.cube.rotation.set(1, 1, 1);

      // add the cube to the scene
      this.scene.add(this.cube);

      // add all the lights
      for (let light of this.lights) {
        this.scene.add(light);
      }
      console.log("puzzle state:", this.state);
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
          console.log(t.x);
          return "+=3";
        },
        y: (i, t) => {
          console.log(t.y);
          return "+=8";
        },
        z: (i, t) => {
          console.log(t.z);
          return "+=2";
        },
        repeatRefresh: true,
        ease: "power3.out"
      });
    },

    spinY: function() {
      return gsap.to(this.cube.rotation, {
        duration: 1,
        y: () => {
          return this.cube.rotation.y + 3;
        }
      });
    },

    showOnlyTheCorners: function() {
      this.changeColor(0xdd1144);
    },

    showOnlyTheEdges: function() {
      // this.cube.material = new THREE.MeshPhongMaterial({ color: 0x4411dd });
      this.changeColor(0x4411dd);
    },

    showOnlyTheCenters: function() {
      // this.cube.material = new THREE.MeshPhongMaterial({ color: 0x11dd44 });
      this.changeColor(0x11dd44);
    },

    changeSize() {
      // gsap.to(this.canvas, {
      //   // x: "-=300",
      //   attr: { width: 600, height: 600 }
      // });
    },

    setState: function() {
      console.log("State set to", this.state);
      switch (this.state) {
        case "DAISY":
          this.changeColor(0xeb4034);
          break;
        case "SOLVED":
          this.changeColor(0x008888);
          break;

        case "PRE_DAISY_1":
          console.log("pre daisy state");
          this.changeColor(0x345098);
          break;
        default:
          console.log("DEFAULT PUZZLE STATE");
          this.changeColor(0x112222);
          break;
      }
    },

    changeColor: function(c) {
      if (!c) {
        throw new Error('No color given to "Puzzle.changeColor"');
      }
      let color = new THREE.Color(c);
      if (!color.isColor) {
        throw new Error('Invalid color given to "Puzzle.changeColor"');
      }
      console.log("Change color to", color);
      return gsap.to(this.cube.material.color, {
        duration: 0,
        r: color.r,
        g: color.g,
        b: color.b
      });
    },

    spinContinuously: function() {
      return gsap.to(this.cube.rotation, {
        duration: 2,
        x: "+=random(2,3)",
        y: "+=random(2,3)",
        z: "+=random(2,3)",
        repeat: -1,
        repeatRefresh: true,
        ease: "none"
      });
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
    console.log("Puzzle did foo", this.fubar);
    this.$nextTick(function() {
      window.addEventListener("resize", this.resizeCanvasToDisplaySize);

      //Init
      this.resizeCanvasToDisplaySize();
    });

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
  height: 100%;
  // max-width: 90vmin;
  transform-origin: center right;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
