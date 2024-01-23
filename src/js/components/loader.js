// three
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// gsap
import gsap from 'gsap';

// --------------------------------------------------------------------------

export class Loader {
  constructor(scene) {
    this.scene = scene;
    this.loader = document.getElementById('loader');
    this.progressBar = document.getElementById('progress');
    this.loadingManager = new THREE.LoadingManager();
    this.gltfLoader = new GLTFLoader(this.loadingManager);
    this.init();
  }

  onProgressHandler(index, total) {
    gsap.to(this.progressBar, {
      scaleX: index / total,
      duration: 0,
    });
  }

  onLoadHandler(loader) {
    gsap.to(loader, {
      scale: 1.5,
      opacity: 0,
      duration: 0.7,
      delay: 0.5,
    });
  }

  loadModel(app) {
    app.gltfLoader.load('./files/rolex_neotix.gltf', function (gltf) {
      app.scene.add(gltf.scene);
    });
  }

  init() {
    // add progress listener
    this.loadingManager.onProgress = (url, index, total) => {
      this.onProgressHandler(index, total);
    };
    // add load listener
    this.loadingManager.onLoad = (url, index, total) => {
      this.onLoadHandler(this.loader);
    };

    // load model
    this.loadModel(this);
  }
}
