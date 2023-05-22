
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

// Crea una cámara y la posiciona en el espacio
var camera = new THREE.PerspectiveCamera(80, WIDTH / HEIGHT, 0.1, 1000);
camera.position.z = 4.5;
camera.position.x = -1.2;
camera.position.y = 2;

// Agrega una luz ambiente
var light = new THREE.AmbientLight(0x404040);
scene.add(light);

// Define la función poligono
function poligono(nlados, radio) {
  const vertices = [];
  for (let i = 0; i < nlados; i++) {
    const a = (2 * Math.PI * i) / nlados;
    vertices.push(
      new THREE.Vector3(radio * Math.cos(a), 0, radio * Math.sin(a))
    );
  }
  return vertices;
}

function crearPiramide(row, col) {
  // Parámetros de la pirámide
  const nladosBase = 8; // Número de lados de la base
  const radioBase = 1;
  const alturaPiramide = 2;

  // Crear los vértices de la base de la pirámide
  const verticesBase = poligono(nladosBase, radioBase);

  // Crear la geometría de la base de la pirámide
  const geometriaBase = new THREE.BufferGeometry().setFromPoints(verticesBase);

  // Crear un color aleatorio para el material
  const color = new THREE.Color(Math.random() * 0xffffff);

  // Crear el material con el color aleatorio
  const material = new THREE.MeshBasicMaterial({ color: color });

  // Crear el objeto de la base de la pirámide
  const base = new THREE.Mesh(geometriaBase, material);
  scene.add(base);

  // Crear los vértices de las caras laterales de la pirámide
  const verticesLaterales = [];
  const centro = new THREE.Vector3(0, alturaPiramide, 0);

  for (let i = 0; i < nladosBase; i++) {
    const a = (2 * Math.PI * i) / nladosBase;
    const x = radioBase * Math.cos(a);
    const z = radioBase * Math.sin(a);

    verticesLaterales.push(
      verticesBase[i],
      centro,
      verticesBase[(i + 1) % nladosBase],
      verticesBase[(i + 1) % nladosBase],
      centro,
      new THREE.Vector3(x, 0, z)
    );
  }

  // Crear la geometría de las caras laterales de la pirámide
  const geometriaLaterales = new THREE.BufferGeometry().setFromPoints(
    verticesLaterales
  );

  // Crear el objeto de las caras laterales de la pirámide
  const laterales = new THREE.Mesh(geometriaLaterales, material);
  scene.add(laterales);

  // Ajustar posición de la pirámide
  const offsetX = (col - 2) * 2;
  const offsetY = row * 2;
  base.position.set(offsetX, offsetY, 0);
  laterales.position.set(offsetX, offsetY, 0);
}

// Creación de múltiples pirámides en filas
const numRows = 2; // Número de filas de pirámides
const numCols = 4; // Número de columnas de pirámides

for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    crearPiramide(row, col);
  }
}

// Creación de la malla
var size = 100;
var divisions = 100;
var gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

// Agrega controles de órbita para mover la cámara alrededor de la escena
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// Renderiza la escena
function render() {
  requestAnimationFrame(render);
  controls.update(); // Actualiza los controles de órbita
  renderer.render(scene, camera);
}
render();








