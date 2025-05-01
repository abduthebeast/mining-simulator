// Game setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0x8B4513 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Player
const player = new THREE.Mesh(
  new THREE.BoxGeometry(1, 2, 1),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
player.position.y = 1;
scene.add(player);

// Camera
camera.position.set(0, 10, 10);
camera.lookAt(player.position);

// Controls
const keysPressed = {};
document.addEventListener('keydown', e => keysPressed[e.key.toLowerCase()] = true);
document.addEventListener('keyup', e => keysPressed[e.key.toLowerCase()] = false);

// UI Elements
let money = 0;
let capacity = 10;
let currentOre = 0;
document.getElementById('money').innerText = money;
document.getElementById('capacity').innerText = `${currentOre}/${capacity}`;

// Ore types
const oreTypes = [
  { name: "Coal", color: 0x333333, value: 1, rarity: 0.6 },
  { name: "Iron", color: 0xbbbbbb, value: 5, rarity: 0.25 },
  { name: "Gold", color: 0xffd700, value: 10, rarity: 0.1 },
  { name: "Diamond", color: 0x00ffff, value: 50, rarity: 0.05 }
];

// Utility to pick a random ore type
function getRandomOreType() {
  const rand = Math.random();
  let sum = 0;
  for (const ore of oreTypes) {
    sum += ore.rarity;
    if (rand < sum) return ore;
  }
  return oreTypes[0];
}

// Mine generation
let ores = [];
let mineSize = 20;
function generateMine() {
  const orePositions = new Set(ores.map(o => `${o.position.x},${o.position.z}`));
  const half = mineSize / 2;

  for (let x = -half; x < half; x++) {
    for (let z = -half; z < half; z++) {
      if (Math.abs(x) >= half - 5 || Math.abs(z) >= half - 5) {
        const key = `${x},${z}`;
        if (!orePositions.has(key) && Math.random() < 0.3) {
          const oreType = getRandomOreType();
          const ore = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({ color: oreType.color })
          );
          ore.position.set(x, 0.5, z);
          ore.userData = { type: oreType };
          scene.add(ore);
          ores.push(ore);
          orePositions.add(key);
        }
      }
    }
  }
}

// Mining
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('click', () => {
  raycaster.setFromCamera({ x: 0, y: 0 }, camera);
  const intersects = raycaster.intersectObjects(ores);
  if (intersects.length > 0) {
    const ore = intersects[0].object;
    if (currentOre < capacity) {
      currentOre++;
      money += ore.userData.type.value;
      document.getElementById('money').innerText = money;
      document.getElementById('capacity').innerText = `${currentOre}/${capacity}`;
      scene.remove(ore);
      ores = ores.filter(o => o !== ore);
    }
  }
});

// Shop
document.getElementById('upgradeBackpack').addEventListener('click', () => {
  const cost = capacity * 10;
  if (money >= cost) {
    money -= cost;
    capacity += 5;
    document.getElementById('money').innerText = money;
    document.getElementById('capacity').innerText = `${currentOre}/${capacity}`;
  }
});

// Pet system
const pets = [];
function spawnPet() {
  const pet = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xff00ff })
  );
  pet.position.set(player.position.x + 1, 0.5, player.position.z + 1);
  scene.add(pet);
  pets.push(pet);
}
spawnPet();

// Animate
function animate() {
  requestAnimationFrame(animate);

  // Player movement
  const speed = 0.15;
  if (keysPressed['w']) player.position.z -= speed;
  if (keysPressed['s']) player.position.z += speed;
  if (keysPressed['a']) player.position.x -= speed;
  if (keysPressed['d']) player.position.x += speed;

  camera.position.x = player.position.x;
  camera.position.z = player.position.z + 10;
  camera.lookAt(player.position);

  // Pet follow
  pets.forEach(pet => {
    const dx = player.position.x - pet.position.x;
    const dz = player.position.z - pet.position.z;
    pet.position.x += dx * 0.05;
    pet.position.z += dz * 0.05;
  });

  // Expand mine over time
  if (money > mineSize * 2) {
    mineSize += 10;
    generateMine();
  }

  renderer.render(scene, camera);
}
generateMine();
animate();
// --- Ore system ---
const oreTypes = [
  { name: 'Stone', color: 0x888888, value: 1, rarity: 0.6 },
  { name: 'Iron', color: 0xb7410e, value: 5, rarity: 0.25 },
  { name: 'Gold', color: 0xffd700, value: 10, rarity: 0.1 },
  { name: 'Diamond', color: 0x00ffff, value: 25, rarity: 0.05 }
];

let oreBlocks = [];
let minedCount = 0;
let mineSize = 20;

function spawnOreField(centerX = 30, centerZ = 0, size = mineSize) {
  for (let x = -size / 2; x < size / 2; x += 2) {
    for (let z = -size / 2; z < size / 2; z += 2) {
      const oreType = getRandomOreType();
      const block = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: oreType.color })
      );
      block.position.set(centerX + x, 0.5, centerZ + z);
      block.userData = { oreType };
      scene.add(block);
      oreBlocks.push(block);
    }
  }
}

function getRandomOreType() {
  const rand = Math.random();
  let cumulative = 0;
  for (const ore of oreTypes) {
    cumulative += ore.rarity;
    if (rand < cumulative) return ore;
  }
  return oreTypes[0]; // fallback to common
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'e') tryMine();
});

function tryMine() {
  for (let i = 0; i < oreBlocks.length; i++) {
    const ore = oreBlocks[i];
    const dist = player.position.distanceTo(ore.position);
    if (dist < 2.5) {
      scene.remove(ore);
      oreBlocks.splice(i, 1);
      collectOre(ore.userData.oreType);
      return;
    }
  }
}

function collectOre(ore) {
  currentOre++;
  coins += ore.value;
  minedCount++;

  document.getElementById('capacity-text').innerText = `Ore: ${currentOre} / ${maxOre}`;
  document.getElementById('coins-text').innerText = `Coins: ${coins}`;

  if (minedCount % 10 === 0) {
    mineSize += 10;
    spawnOreField(30, 0, mineSize);
  }
}

// --- Initial mine generation ---
spawnOreField();

