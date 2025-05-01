import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

// Background
const loader = new THREE.TextureLoader();
loader.load('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg', (texture) => {
  scene.background = texture;
});

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sphere
const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0xff5733 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Ground
const groundTexture = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/terrain/grasslight-big.jpg');
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(25, 25);
groundTexture.colorSpace = THREE.SRGBColorSpace;
const groundMat = new THREE.MeshStandardMaterial({ map: groundTexture });
const ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1;
scene.add(ground);

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// Controls
camera.position.set(0, 2, 5);
const controls = new OrbitControls(camera, renderer.domElement);

// Animation
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
