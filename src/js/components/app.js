// three
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// components
import { Loader } from './loader';

// --------------------------------------------------------------------------

export class App {
  constructor() {
    this.canvasContainer = document.getElementById('canvas-container');
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.init();
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
  }

  handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  init() {
    // set renderer size
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // add canvas to its container
    this.canvasContainer.appendChild(this.renderer.domElement);

    // set background color
    // this.renderer.setClearColor(0x0d1328);

    // set camera position
    this.camera.position.set(6, 8, 14);
    this.orbitControls.update();

    // set animation loop
    this.renderer.setAnimationLoop(this.animate.bind(this));

    // add loader
    new Loader(this.scene);

    // add resize listener to make canvas responsier
    window.addEventListener('resize', this.handleResize);
  }
}
// --------------------------------------------------------------------------

new App();
