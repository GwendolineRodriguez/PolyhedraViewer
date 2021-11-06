import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry";
import { Wireframe } from "three/examples/jsm/lines/Wireframe";

class Polyhedron {
  constructor(polyhedron, accentColor) {
    this.geometry = polyhedron;
    this.accentColor = parseInt(accentColor.replace("#", "0x"));
    this.width = window.innerWidth - 80;
    this.height = window.innerHeight * 0.7;
    this.viewAngle = 35;
    this.nearClippingPane = 1;
    this.farClippingPane = 1000;
    this.init();
  }

  init = () => {
    this.camera = new THREE.PerspectiveCamera(
      this.viewAngle,
      this.width / this.height,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.set(-50, 0, 50);
    this.scene = new THREE.Scene();

    var edgesPavement = new THREE.EdgesGeometry(this.geometry);
    var lineGeometry = new LineSegmentsGeometry().setPositions(
      edgesPavement.attributes.position.array
    );
    this.matLine = new LineMaterial({
      color: this.accentColor,
      linewidth: 3,
    });
    this.mesh = new Wireframe(lineGeometry, this.matLine);
    this.mesh.computeLineDistances();
    this.mesh.scale.set(1, 1, 1);

    this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setAnimationLoop(this.animation);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    window.addEventListener("resize", this.onWindowResize);
    this.onWindowResize();
  };

  render = () => {
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setViewport(0, 0, this.width, this.height);
    this.matLine.resolution.set(this.width, this.height);
    this.renderer.render(this.scene, this.camera);
  };

  animation = (time) => {
    this.mesh.rotation.y = time / 10000;
    this.render();
  };

  stopAnimation = () => {
    this.mesh.rotation.y = 0;
    this.mesh.rotation.needsUpdate = true;
    this.render();
  };

  onWindowResize = () => {
    this.width = window.innerWidth - 80;
    this.height = window.innerHeight * 0.7;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  };

  updateTheme = (color) => {
    this.mesh.material.color.setHex(color.replace("#", "0x"));
  };
}

export default Polyhedron;
