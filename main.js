// Import scripts
import './scripts/player.js';
import './scripts/mining.js';
import './scripts/inventory.js';
import './scripts/shop.js';
import './scripts/pets.js';
import './scripts/eggs.js';
import './scripts/ores.js';
import './scripts/ui.js';

import * as THREE from 'three';

// Basic Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('gameCanvas')});
renderer.setSize(window.innerWidth, window.innerHeight);

const clock = new THREE.Clock();

// Initialize
initPlayer(scene);
initGround(scene);
initOres(scene);
initShop(scene);
initEggs(scene);

camera.position.set(0, 5, 10);
camera.lookAt(0,0,0);

// Animate
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    updatePlayer(delta);
    updateUI();
    renderer.render(scene, camera);
}

animate();
