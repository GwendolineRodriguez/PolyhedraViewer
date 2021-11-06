import * as THREE from "three";
import Polyhedron from "./polyhedron.module";

const themeToggler = document.querySelector("theme-toggler");
const canva = document.getElementById("canva");
const tetrahedronBtn = document.getElementById("tetrahedron");
const cubeBtn = document.getElementById("cube");
const octahedronBtn = document.getElementById("octahedron");
const dodecahedronBtn = document.getElementById("dodecahedron");
const icosaHedronBtn = document.getElementById("icosahedron");

class App {
  constructor() {
    this.accentColor = this.getAccentColor();
    this.initTheme();
    this.createPolyhedra(16);
    this.initCanva();
  }

  initTheme = () => {
    themeToggler.addEventListener("input", () => {
      this.updatePolyhedronTheme();
    });
  };

  getAccentColor = () =>
    getComputedStyle(document.body).getPropertyValue("--accent-color");

  updateCanva = (e) => {
    const polyhedron = e.currentTarget.polyhedron;
    canva.childNodes[0].replaceWith(polyhedron.renderer.domElement);
  };

  createPolyhedra = (polyhedronSize) => {
    const tetrahedronGeometry = new THREE.TetrahedronGeometry(
      polyhedronSize,
      0
    );
    const cubeGeometry = new THREE.BoxGeometry(
      polyhedronSize,
      polyhedronSize,
      polyhedronSize
    );
    const octahedronGeometry = new THREE.OctahedronGeometry(polyhedronSize, 0);
    const dodecahedronGeometry = new THREE.DodecahedronGeometry(
      polyhedronSize,
      0
    );
    const icosahedronGeometry = new THREE.IcosahedronGeometry(
      polyhedronSize,
      0
    );

    this.tetrahedron = new Polyhedron(tetrahedronGeometry, this.accentColor);
    this.cube = new Polyhedron(cubeGeometry, this.accentColor);
    this.octahedron = new Polyhedron(octahedronGeometry, this.accentColor);
    this.dodecahedron = new Polyhedron(dodecahedronGeometry, this.accentColor);
    this.icosahedron = new Polyhedron(icosahedronGeometry, this.accentColor);
  };

  initCanva = () => {
    tetrahedronBtn.polyhedron = this.tetrahedron;
    cubeBtn.polyhedron = this.cube;
    octahedronBtn.polyhedron = this.octahedron;
    icosaHedronBtn.polyhedron = this.icosahedron;
    dodecahedronBtn.polyhedron = this.dodecahedron;

    tetrahedronBtn.addEventListener("click", this.updateCanva);
    cubeBtn.addEventListener("click", this.updateCanva);
    octahedronBtn.addEventListener("click", this.updateCanva);
    icosaHedronBtn.addEventListener("click", this.updateCanva);
    dodecahedronBtn.addEventListener("click", this.updateCanva);

    canva.appendChild(this.icosahedron.renderer.domElement);
  };

  updatePolyhedronTheme = () => {
    const color = this.getAccentColor();
    this.tetrahedron.updateTheme(color);
    this.cube.updateTheme(color);
    this.octahedron.updateTheme(color);
    this.dodecahedron.updateTheme(color);
    this.icosahedron.updateTheme(color);
  };
}

const app = new App();
