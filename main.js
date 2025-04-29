import * as THREE from './js/three.module.js';

// Renderer
const canvas = document.getElementById('gameCanvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Scene + Camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 8);
camera.lookAt(0, 0, 0);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);

// Ground
const groundGeo = new THREE.PlaneGeometry(100, 100);
const groundMat = new THREE.MeshPhongMaterial({ color: 0x5ec867 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
scene.add(ground);

// Placeholder player
const playerGeo = new THREE.BoxGeometry(1, 2, 1);
const playerMat = new THREE.MeshStandardMaterial({ color: 0xffd700 }); // Gold color
const player = new THREE.Mesh(playerGeo, playerMat);
player.position.set(0, 1, 0); // Standing on the ground
scene.add(player);

// Placeholder ore
const oreGeo = new THREE.SphereGeometry(0.5, 16, 16);
const oreMat = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Gray ore
const ore = new THREE.Mesh(oreGeo, oreMat);
ore.position.set(3, 0.5, 0);
scene.add(ore);

// Animate
function animate() {
  requestAnimationFrame(animate);
  player.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
