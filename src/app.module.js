import * as THREE from "three";
import Polyhedron from "./polyhedron.module";

const polyhedronSize = 16;
const getAccentColor = () =>
  getComputedStyle(document.body).getPropertyValue("--accent-color");
const accentColor = getAccentColor();
const theme = {
  light: window.matchMedia("(prefers-color-scheme: light)"),
  dark: window.matchMedia("(prefers-color-scheme: dark)"),
  accentColor: getAccentColor(),
};

const _darkCSS = document.querySelectorAll(
  "link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]"
);
const _lightCSS = document.querySelectorAll(
  "link[rel=stylesheet][media*=prefers-color-scheme][media*=light]"
);

const canva = document.getElementById("canva");
const themeToggler = document.getElementById("themeToggler");
const initToggler = () => {
  if (window.matchMedia("(prefers-color-scheme: dark)")) {
    themeToggler.checked = true;
  }
};
initToggler();
const tetrahedronBtn = document.getElementById("tetrahedron");
const cubeBtn = document.getElementById("cube");
const octahedronBtn = document.getElementById("octahedron");
const dodecahedronBtn = document.getElementById("dodecahedron");
const icosaHedronBtn = document.getElementById("icosahedron");

const tetrahedronGeometry = new THREE.TetrahedronGeometry(polyhedronSize, 0);
const cubeGeometry = new THREE.BoxGeometry(
  polyhedronSize,
  polyhedronSize,
  polyhedronSize
);
const octahedronGeometry = new THREE.OctahedronGeometry(polyhedronSize, 0);
const dodecahedronGeometry = new THREE.DodecahedronGeometry(polyhedronSize, 0);
const icosahedronGeometry = new THREE.IcosahedronGeometry(polyhedronSize, 0);

const tetrahedron = new Polyhedron(tetrahedronGeometry, accentColor);
const cube = new Polyhedron(cubeGeometry, accentColor);
const octahedron = new Polyhedron(octahedronGeometry, accentColor);
const dodecahedron = new Polyhedron(dodecahedronGeometry, accentColor);
const icosahedron = new Polyhedron(icosahedronGeometry, accentColor);

canva.appendChild(icosahedron.renderer.domElement);

const updateCanva = (e) => {
  const polyhedron = e.currentTarget.polyhedron;
  canva.childNodes[0].replaceWith(polyhedron.renderer.domElement);
};

const updateTheme = () => {
  switchTheme().then(() => updatePolyhedronTheme());
};

const switchTheme = () => {
  return new Promise((resolve) => {
    if (theme.light) {
      theme.light = false;
      theme.dark = true;
      _darkCSS.forEach((link) => {
        link.media = "not all";
        link.disabled = true;
      });
      _lightCSS.forEach((link) => {
        link.media = "all";
        link.disabled = false;
        onload = resolve();
      });
    } else {
      theme.light = true;
      theme.dark = false;
      _lightCSS.forEach((link) => {
        link.media = "not all";
        link.disabled = true;
      });
      _darkCSS.forEach((link) => {
        link.media = "all";
        link.disabled = false;
        onload = resolve();
      });
    }
  });
};

const updatePolyhedronTheme = () => {
  theme.accentColor = getAccentColor();
  tetrahedron.updateTheme(theme);
  cube.updateTheme(theme);
  octahedron.updateTheme(theme);
  dodecahedron.updateTheme(theme);
  icosahedron.updateTheme(theme);
};

tetrahedronBtn.polyhedron = tetrahedron;
cubeBtn.polyhedron = cube;
octahedronBtn.polyhedron = octahedron;
icosaHedronBtn.polyhedron = icosahedron;
dodecahedronBtn.polyhedron = dodecahedron;

tetrahedronBtn.addEventListener("click", updateCanva);
cubeBtn.addEventListener("click", updateCanva);
octahedronBtn.addEventListener("click", updateCanva);
icosaHedronBtn.addEventListener("click", updateCanva);
dodecahedronBtn.addEventListener("click", updateCanva);
themeToggler.addEventListener("click", updateTheme);
