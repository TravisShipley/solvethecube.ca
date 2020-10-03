import * as THREE from "three";

export class Cube {
  constructor(size, state) {
    this.size = size;
    this.state = state;

    Cube.BLACK = 0x221112;

    this.material = new THREE.MeshPhongMaterial({
      color: 0x221112,
      transparent: true
    });
    // this.material = new THREE.MeshPhongMaterial({ color: 0x7aeb94 });
    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.material);
  }

  hello() {
    // return "hello";
    console.log("hello");
  }
}

export default Cube;
