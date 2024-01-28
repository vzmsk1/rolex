// three
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// gsap
import gsap from 'gsap';

// gui
import * as dat from 'dat.gui';

// components
import { RolexModel } from './rolexModel';

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

  loadModel(_this) {
    _this.gltfLoader.load('./files/rolex_neotix.gltf', function (gltf) {
      new RolexModel(_this.scene, gltf);
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
