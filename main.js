import * as THREE from './js/three.module.js';

// Setup renderer
const canvas = document.getElementById('gameCanvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Setup scene and camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // sky blue
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5);

// Ground
const groundGeo = new THREE.PlaneGeometry(50, 50);
const groundMat = new THREE.MeshPhongMaterial({ color: 0x5ec867 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// Test object (like a player or ore)
const boxGeo = new THREE.BoxGeometry();
const boxMat = new THREE.MeshStandardMaterial({ color: 0xff5733 });
const box = new THREE.Mesh(boxGeo, boxMat);
box.position.y = 0.5;
scene.add(box);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  box.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Resize handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
