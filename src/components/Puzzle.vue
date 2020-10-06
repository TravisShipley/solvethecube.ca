<template>
  <div id="container" width="size" height="size" @click="changeSize">
    <canvas id="canvas"></canvas>
  </div>
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
      mesh: null,
      cube: null,
      lights: null,
      container: null,
      canvas: null,
      timeline: null,
      size: 600,
      scrollY: 0
    };
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

      this.container = document.getElementById("container");
      console.log(this.container.width);
      this.canvas = document.getElementById("canvas");
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(20, 1);
      this.camera.position.set(0, 0, 5);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        // antialias: true,
        alpha: true
      });

      this.renderer.setSize(this.container.width, this.container.height);
      // this.container.appendChild(this.renderer.domElement);
      this.canvas = this.renderer.domElement;

      // the lighting setup
      this.lights = new Lighting();

      // create a new cube
      this.cube = new Cube();
      this.mesh = this.cube.mesh;
      this.mesh.rotation.set(1, 1, 1);

      // add the cube to the scene
      this.scene.add(this.cube.mesh);

      // add all the lights
      for (let light of this.lights) {
        this.scene.add(light);
      }
      this.render();
      // this.animate();
    },
    render: function() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },

    spinAnimation: function() {
      return gsap.to(this.mesh.rotation, {
        duration: 1,
        x: "+=2",
        y: "+=2.33",
        z: "+=3",
        repeatRefresh: true,
        ease: "inOut"
      });
    },

    showOnlyTheCorners: function() {
      this.changeColor(0xdd1144);
    },

    showOnlyTheEdges: function() {
      // this.mesh.material = new THREE.MeshPhongMaterial({ color: 0x4411dd });
      this.changeColor(0x4411dd);
    },

    showOnlyTheCenters: function() {
      // this.mesh.material = new THREE.MeshPhongMaterial({ color: 0x11dd44 });
      this.changeColor(0x11dd44);
    },
    changeSize() {
      // this.size -= 100;
      console.log(this.size);
    },
    changeColor(c) {
      if (!c) {
        throw new Error('No color given to "Puzzle.changeColor"');
      }
      let color = new THREE.Color(c);
      if (!color.isColor) {
        throw new Error('Invalid color given to "Puzzle.changeColor"');
      }
      console.log("Change color to", color);
      return gsap.to(this.mesh.material.color, {
        duration: 1,
        r: color.r,
        g: color.g,
        b: color.b
      });
    },
    spinIndefinitely() {
      return gsap.to(this.mesh.rotation, {
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
      const displaySize = this.container.clientWidth;
      const width = this.canvas.width;

      // adjust displayBuffer size to match
      if (width !== displaySize) {
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
    console.log("Puzzle did mount");
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

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
  // border: 10px solid turquoise;
  // filter: drop-shadow(0 20px 30px #30022855);
}
</style>
