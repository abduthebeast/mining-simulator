import * as THREE from './js/three.module.js';

let scene, camera, renderer;
let player, ground;
let ores = [], pets = [];

let keys = {};
let velocityY = 0;
let canJump = false;

const GRAVITY = -0.5;
let oreCount = 0;
let maxOre = 5;
let coins = 0;
let health = 100;

const oreValue = 5;

init();
animate();

function init() {
  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB); // Sky blue

  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 10);

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lighting
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7.5);
  scene.add(light);

  // Ground
  const groundGeo = new THREE.BoxGeometry(50, 1, 50);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // Grass green
  ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.y = -0.5;
  scene.add(ground);

  // Player (human-like blocky character)
  const playerMat = new THREE.MeshStandardMaterial({ color: 0xffff00 }); // Yellow
  const playerGeo = new THREE.BoxGeometry(1, 2, 1);
  player = new THREE.Mesh(playerGeo, playerMat);
  player.position.y = 1;
  scene.add(player);

  // Generate ores
  for (let i = 0; i < 10; i++) {
    spawnOre();
  }

  // Event listeners
  document.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
  document.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);
  document.addEventListener('click', mineOre);

  // Hatch pet button
  document.getElementById('hatchBtn').addEventListener('click', hatchPet);

  updateUI();
}

function spawnOre() {
  const oreGeo = new THREE.BoxGeometry(1, 1, 1);
  const oreMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
  const ore = new THREE.Mesh(oreGeo, oreMat);
  ore.position.set(
    Math.random() * 40 - 20,
    0.5,
    Math.random() * 40 - 20
  );
  ores.push(ore);
  scene.add(ore);
}

function mineOre(event) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(ores);

  if (intersects.length > 0 && oreCount < maxOre) {
    const ore = intersects[0].object;
    scene.remove(ore);
    ores.splice(ores.indexOf(ore), 1);
    oreCount++;
    coins += oreValue;
    spawnOre();
    updateUI();
  }
}

function hatchPet() {
  const eggTypes = [
    { name: "Basic", cost: 25, rarity: ["Common", "Rare", "Epic", "Legendary"] }
  ];

  const selectedEgg = eggTypes[0];

  if (coins >= selectedEgg.cost) {
    coins -= selectedEgg.cost;

    const rand = Math.random();
    let rarity = "Common";

    if (rand > 0.95) rarity = "Legendary";
    else if (rand > 0.85) rarity = "Epic";
    else if (rand > 0.6) rarity = "Rare";

    const pet = {
      rarity: rarity,
      multiplier: rarity === "Legendary" ? 3 : rarity === "Epic" ? 2 : rarity === "Rare" ? 1.5 : 1
    };

    if (pets.length < 5) {
      pets.push(pet);
      applyBoosts();
      alert(`You hatched a ${rarity} pet!`);
    } else {
      alert("Max pets equipped (5)");
    }

    updateUI();
  } else {
    alert("Not enough coins!");
  }
}

function applyBoosts() {
  let coinBoost = 0;
  pets.forEach(p => coinBoost += p.multiplier);
  coinBoost = Math.max(1, coinBoost / pets.length);
  window.oreValue = Math.floor(5 * coinBoost);
}

function updateUI() {
  document.getElementById('coins').innerText = coins;
  document.getElementById('ore').innerText = oreCount;
  document.getElementById('capacity').innerText = maxOre;
  document.getElementById('health').innerText = health;
}

function animate() {
  requestAnimationFrame(animate);

  // Gravity
  velocityY += GRAVITY * 0.1;
  player.position.y += velocityY * 0.1;

  if (player.position.y <= 1) {
    velocityY = 0;
    player.position.y = 1;
    canJump = true;
  }

  const speed = 0.2;

  if (keys['w']) player.position.z -= speed;
  if (keys['s']) player.position.z += speed;
  if (keys['a']) player.position.x -= speed;
  if (keys['d']) player.position.x += speed;
  if (keys[' '] && canJump) {
    velocityY = 5;
    canJump = false;
  }

  camera.position.x = player.position.x;
  camera.position.z = player.position.z + 5;
  camera.lookAt(player.position);

  renderer.render(scene, camera);
}
