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

// Crea un material básico con color rojo
var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Define la función poligono
function poligono(nlados, radio) {
    const vertices = [];
    for (let i = 0; i < nlados; i++) {
        const a = (2 * Math.PI * i) / nlados;
        vertices.push(new THREE.Vector3(
            radio * Math.cos(a),
            0,
            radio * Math.sin(a)
        ));
    }
    return vertices;
}

// Parámetros de la pirámide
const nladosBase = 3;
const radioBase = 1;
const alturaPiramide = 2;

// Crear los vértices de la base de la pirámide
const verticesBase = poligono(nladosBase, radioBase);

// Crear la geometría de la base de la pirámide
const geometriaBase = new THREE.BufferGeometry().setFromPoints(verticesBase);

// Crear el objeto de la base de la pirámide
const base = new THREE.Mesh(geometriaBase, material);
scene.add(base);

// Crear los vértices de las caras laterales de la pirámide
const verticesLaterales = [];
for (let i = 0; i < nladosBase; i++) {
    const a = (2 * Math.PI * i) / nladosBase;
    verticesLaterales.push(
        new THREE.Vector3(
            radioBase * Math.cos(a),
            0,
            radioBase * Math.sin(a)
        ),
        new THREE.Vector3(0, alturaPiramide, 0)
    );
}

// Crear los triángulos de las caras laterales de la pirámide
const triangulosLaterales = [];
for (let i = 0; i < nladosBase; i++) {
    const v1 = verticesLaterales[i];
    const v2 = verticesLaterales[(i + 1) % nladosBase];
    triangulosLaterales.push(v1, v2, verticesBase[i]);
}

// Crear la geometría de las caras laterales de la pirámide
const geometriaLaterales = new THREE.BufferGeometry().setFromPoints(triangulosLaterales);

// Crear el objeto de las caras laterales de la pirámide
const laterales = new THREE.Mesh(geometriaLaterales, material);
scene.add(laterales);




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
    renderer.render(scene, camera);
}
render();



