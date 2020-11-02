import * as THREE from "three";

class Lighting {
  constructor() {
    console.log("Lights created");

    this.lights = [
      new THREE.DirectionalLight(0xffffff, 1.0),
      new THREE.DirectionalLight(0xffffff, 0.9),
      new THREE.DirectionalLight(0xffffff, 0.8)
    ];

    this.lights[0].position.set(0, -0.2, 0.1);

    this.lights[1].position.set(1.9, 2, 0.4);
    this.lights[2].position.set(-1.9, 2, 0.6);

    return this.lights;
  }
}

export default Lighting;
