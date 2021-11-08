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
    this.initTheme();
    this.createPolyhedra(16);
    this.initCanva();
  }

  initTheme = () => {
    this.colors = {
      light: "#5859ff",
      dark: "#42c996",
    };
    themeToggler.addEventListener("input", () => {
      this.updatePolyhedronTheme();
    });
  };

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
    this.accentColor = this.getAccentColor();
    this.tetrahedron = new Polyhedron(
      tetrahedronGeometry,
      this.accentColor,
      this.colors
    );
    this.cube = new Polyhedron(cubeGeometry, this.accentColor, this.colors);
    this.octahedron = new Polyhedron(
      octahedronGeometry,
      this.accentColor,
      this.colors
    );
    this.dodecahedron = new Polyhedron(
      dodecahedronGeometry,
      this.accentColor,
      this.colors
    );
    this.icosahedron = new Polyhedron(
      icosahedronGeometry,
      this.accentColor,
      this.colors
    );
  };

  getAccentColor = () =>
    getComputedStyle(document.body).getPropertyValue("--accent-color");

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
    this.tetrahedron.updateTheme();
    this.cube.updateTheme();
    this.octahedron.updateTheme();
    this.dodecahedron.updateTheme();
    this.icosahedron.updateTheme();
  };
}

const app = new App();
