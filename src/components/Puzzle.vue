<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";

// TODO these imports used to work
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

import Cube from "../js/Cube.js";
import Lighting from "../js/Lighting.js";

export default {
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
      timeline: null,
      scrollY: 0,
      puzzleState: "tomato"
    };
  },
  methods: {
    init() {
      console.log("Initialized", gsap);

      this.container = document.getElementById("container");

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(20, 1);
      this.camera.position.set(0, 0, 5);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

      this.renderer.setSize(
        screen.height / 2 - window.scrollY,
        screen.height / 2 - window.scrollY
      );
      this.container.appendChild(this.renderer.domElement);

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

      this.timeline = gsap.timeline({
        scrollTrigger: {
          // markers: true,
          trigger: "#container",
          start: "center 400px",
          end: "+=700",
          scrub: 1,
          pin: true,
          pinSpacing: false
        }
      });

      // this.timeline.add(this.spinAnimation());
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.002;
      this.mesh.rotation.y += 0.003;
      this.mesh.rotation.z += 0.001;
      this.renderer.render(this.scene, this.camera);
    },

    spinAnimation: function() {
      return gsap.to(this.mesh.rotation, {
        x: "+=" + 1,
        y: "+=" + 1,
        z: "+=" + Math.PI,
        ease: "inOut"
      });
    },
    corners: function() {
      let c = new THREE.Color(0xdd1144);
      console.log(c.r);
      gsap.to(this.mesh.material.color, {
        duration: 2,
        r: c.r,
        g: c.g,
        b: c.b
      });
      gsap.to("#container", {
        duration: 3,
        opacity: 0.1
      });
    },

    edges: function() {
      this.mesh.material = new THREE.MeshPhongMaterial({ color: 0x4411dd });
    },

    centers: function() {
      this.mesh.material = new THREE.MeshPhongMaterial({ color: 0x11dd44 });
    },
    render: function() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    },
    onWindowResize: function() {
      let size = Math.min(this.container.clientWidth, 650);
      // console.log("window did resize", size);
      this.renderer.setSize(size, size);
      this.camera.updateProjectionMatrix();
    },
    onPageScroll: function() {
      console.log("scrolling", window.scrollY, screen.height);
      this.scrollY = window.scrollY;
      let min = screen.height / 4;
      let max = screen.height / 2 - window.scrollY;
      let size = Math.max(max, min);

      console.log("size:", size);

      if (size == min) {
        this.corners();
      }
      this.renderer.setSize(size, size);
      this.camera.updateProjectionMatrix();
    }
  },
  created() {
    console.log("Puzzle created.");
  },

  mounted() {
    console.log("Puzzle did mount");

    // window.onscroll = this.onPageScroll;

    this.$nextTick(function() {
      window.addEventListener("resize", this.onWindowResize);

      //Init
      this.onWindowResize();
    });

    this.init();

    // this.animate();
  },
  destroyed() {
    window.removeEventListener("resize", this.onWindowResize);
  }
};
</script>

<style lang="scss" scoped>
#container {
  background: rgba(200, 128, 128, 0.4);
  position: absolute;
  top: 50vh;
  left: 50vw;
  // margin-top: -6rem;
  // margin-bottom: -6rem;
  // margin-left: 6rem;
  width: 50vmax;
  filter: drop-shadow(0 20px 30px #30022822);
}
@media screen and (min-width: 650px) {
  #container {
    // top: -vw;
    // left: 0;
    // margin-left: 350px;
    width: 650px;
  }
}
</style>
