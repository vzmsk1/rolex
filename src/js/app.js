import '../scss/style.scss';

// --------------------------------------------------------------------------
// three
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// components
import { Loader } from './components/loader';
import { Navigation } from './components/navigation';

import * as dat from 'dat.gui';

// --------------------------------------------------------------------------

class App {
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
    this.alight = new THREE.AmbientLight(0xffffff, -11);
    this.light = new THREE.DirectionalLight(0xffffff, -69);
    this.light1 = new THREE.DirectionalLight(0xffffff, 23);
    this.light2 = new THREE.DirectionalLight(0xffffff, 4.1);
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.material = new THREE.MeshBasicMaterial();
    this.axesHelper = new THREE.AxesHelper(5);
    this.gridHelper = new THREE.GridHelper();
    // this.lHelper = new THREE.DirectionalLightHelper(this.light3);
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

  addGui(_this) {
    // gui
    const gui = new dat.GUI();
    const options = {
      lpx: 10.3,
      lpy: 15,
      lpz: 1.1,
      lpi: 20,
      lpc: '#ffffff',
      cx: 7.2,
      cy: 1.2,
      cz: 12.3,
      intensity: 1,
    };
    gui.add(options, 'cx').onChange(function (e) {
      _this.camera.position.x = e;
    });
    gui.add(options, 'cy').onChange(function (e) {
      _this.camera.position.y = e;
    });
    gui.add(options, 'cz').onChange(function (e) {
      _this.camera.position.z = e;
    });
    gui.add(options, 'lpx').onChange(function (e) {
      _this.light3.position.x = e;
    });
    gui.add(options, 'lpy').onChange(function (e) {
      _this.light3.position.y = e;
    });
    gui.add(options, 'lpz').onChange(function (e) {
      _this.light3.position.z = e;
    });
    gui.add(options, 'intensity').onChange(function (e) {
      _this.light.intensity = e;
    });
  }

  init() {
    // set renderer size
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // add canvas to its container
    this.canvasContainer.appendChild(this.renderer.domElement);

    // set background color
    this.renderer.setClearColor(0x0d1328);

    // add light
    this.light.position.set(28, 130, -112);
    this.scene.add(this.light);
    this.light1.position.set(119, -57, -2.8);
    this.scene.add(this.light1);
    this.light2.position.set(197, 108, 2);
    this.scene.add(this.light2);
    this.scene.add(this.alight);

    // set camera position
    this.camera.position.set(7.2, 1.6, 12);
    this.orbitControls.update();

    // tone mapping
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;

    // helpers
    // this.scene.add(this.axesHelper);
    // this.scene.add(this.gridHelper);
    // this.scene.add(this.lHelper);

    // set animation loop
    this.renderer.setAnimationLoop(this.animate.bind(this));

    // add gui
    // this.addGui(this);

    // add loader
    new Loader(this.scene);

    // init page navigation
    new Navigation();

    // add resize listener to make canvas responsive
    window.addEventListener('resize', this.handleResize.bind(this));
  }
}
new App();
