// three
import * as THREE from 'three';

// gsap
import gsap from 'gsap';

// gui
import * as dat from 'dat.gui';

// --------------------------------------------------------------------------

export class RolexModel {
  constructor(scene, gltf) {
    this.scene = scene;
    this.gltf = gltf;
    this.init();
  }

  addGui(rolexModel) {
    const gui = new dat.GUI();
    const options = {
      x: -12,
      y: -1.6,
      z: 9,
      rx: -0.12,
      ry: 0.77,
      rz: 0.17,
      scale: 1.5,
    };
    gui.add(options, 'x').onChange(function (e) {
      rolexModel.position.x = e;
    });
    gui.add(options, 'y').onChange(function (e) {
      rolexModel.position.y = e;
    });
    gui.add(options, 'z').onChange(function (e) {
      rolexModel.position.z = e;
    });
    gui.add(options, 'rx').onChange(function (e) {
      rolexModel.rotation.x = e;
    });
    gui.add(options, 'ry').onChange(function (e) {
      rolexModel.rotation.y = e;
    });
    gui.add(options, 'rz').onChange(function (e) {
      rolexModel.rotation.z = e;
    });
    gui.add(options, 'scale').onChange(function (e) {
      rolexModel.scale.set(e, e, e);
    });
  }

  animate(rolexModel) {
    let tick = 0;
    gsap.to(rolexModel.position, {
      x: 0.1,
      y: -1.2,
      z: 0,
      duration: 3,
      delay: 1,
      onStart: () => {
        tick = 0;
      },
      onUpdate: () => {
        tick++;
        if (tick === 60) {
          gsap
            .timeline()
            .to('header', {
              opacity: 1,
              visibility: 'visible',
              translateY: 0,
              duration: 1,
            })
            .to(
              '#scroller',
              {
                opacity: 1,
                visibility: 'visible',
                duration: 1,
              },
              0.5
            )
            .to(
              '#pageNav',
              {
                opacity: 1,
                visibility: 'visible',
                duration: 1,
              },
              1
            )
            .to(
              '#discoverContent',
              {
                translate: 0,
                opacity: 1,
                visibility: 'visible',
                duration: 1.2,
                ease: 'power3.out',
              },
              1.3
            );
        }
      },
    });
    gsap.to(rolexModel.rotation, {
      x: -0.76,
      y: 0.92,
      z: 0.41,
      duration: 3,
      delay: 1,
    });
  }

  load() {
    const rolexModel = this.gltf.scene;
    rolexModel.name = 'rolexModel';
    this.scene.add(rolexModel);
    // model.position.set(0, -1.2, 0);
    // model.rotation.set(-0.76, 0.92, 0.41);
    rolexModel.scale.set(4.6, 4.6, 4.6);
    rolexModel.position.set(-12, -1.6, 9);
    rolexModel.rotation.set(-0.12, 0.77, 0.17);

    this.animate(rolexModel);

    // this.addGui(rolexModel);
  }

  init() {
    this.load();
  }
}
