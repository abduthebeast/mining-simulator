// Game setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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

// Camera offset
const cameraOffset = new THREE.Vector3(0, 5, -10);

// Controls
const keysPressed = {};
document.addEventListener('keydown', e => keysPressed[e.key.toLowerCase()] = true);
document.addEventListener('keyup', e => keysPressed[e.key.toLowerCase()] = false);

// Mouse turning
let isMouseDown = false;
let previousMouseX = 0;
let playerRotation = 0;

document.addEventListener('mousedown', e => {
  isMouseDown = true;
  previousMouseX = e.clientX;
});
document.addEventListener('mouseup', () => {
  isMouseDown = false;
});
document.addEventListener('mousemove', e => {
  if (isMouseDown) {
    const deltaX = e.clientX - previousMouseX;
    playerRotation -= deltaX * 0.005;
    previousMouseX = e.clientX;
  }
});

// UI Elements
let money = 100;
let capacity = 50;
let currentOre = 0;
document.getElementById('coin-count').innerText = money;
document.getElementById('ore-count').innerText = currentOre;
document.getElementById('ore-max').innerText = capacity;

// Ore types
const oreTypes = [
  { name: "Coal", color: 0x333333, value: 1, rarity: 0.6 },
  { name: "Iron", color: 0xbbbbbb, value: 5, rarity: 0.25 },
  { name: "Gold", color: 0xffd700, value: 10, rarity: 0.1 },
  { name: "Diamond", color: 0x00ffff, value: 50, rarity: 0.05 }
];

function getRandomOreType() {
  const rand = Math.random();
  let sum = 0;
  for (const ore of oreTypes) {
    sum += ore.rarity;
    if (rand < sum) return ore;
  }
  return oreTypes[0];
}

// Mine generationfunction
generateMine() 
  const orePositions = new Set(ores.map(o => `${o.position.x},${o.position.z}`));
  const half = mineSize / 2;

  for (let x = -half; x < half; x++) {
    for (let z = -half; z < half; z++) {
      const key = `${x},${z}`;
      if (!orePositions.has(key) && Math.random() < 0.15) {  // lowered from 0.2 to 0.15
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

// Mining
const raycaster = new THREE.Raycaster();

window.addEventListener('click', () => {
  raycaster.setFromCamera({ x: 0, y: 0 }, camera);
  const intersects = raycaster.intersectObjects(ores);
  if (intersects.length > 0) {
    const ore = intersects[0].object;
    if (currentOre < capacity) {
      currentOre++;
      money += ore.userData.type.value;
      document.getElementById('coin-count').innerText = money;
      document.getElementById('ore-count').innerText = currentOre;
      scene.remove(ore);
      ores = ores.filter(o => o !== ore);
    }
  }
});

// Shop
function upgradeTool() {
  const cost = 50;
  if (money >= cost) {
    money -= cost;
    document.getElementById('coin-count').innerText = money;
    alert("Tool upgraded!");
  }
}

function upgradeBackpack() {
  const cost = capacity * 2;
  if (money >= cost) {
    money -= cost;
    capacity += 10;
    document.getElementById('coin-count').innerText = money;
    document.getElementById('ore-max').innerText = capacity;
  }
}

function sellOre() {
  money += currentOre * 2;
  currentOre = 0;
  document.getElementById('coin-count').innerText = money;
  document.getElementById('ore-count').innerText = currentOre;
}

document.getElementById('shop-button').addEventListener('click', () => {
  const shopUI = document.getElementById('shop-ui');
  shopUI.style.display = shopUI.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('inventory-button').addEventListener('click', () => {
  const invUI = document.getElementById('inventory-ui');
  invUI.style.display = invUI.style.display === 'none' ? 'block' : 'none';
});

// Pets
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
  const speed = 0.50;
  const direction = new THREE.Vector3();

  if (keysPressed['w']) direction.z += 1;
  if (keysPressed['s']) direction.z -= 1;
  if (keysPressed['a']) direction.x += 1;
  if (keysPressed['d']) direction.x -= 1;

  direction.normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), playerRotation);
  player.position.addScaledVector(direction, speed);

  // Update camera
  const camPos = player.position.clone().add(cameraOffset.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), playerRotation));
  camera.position.copy(camPos);
  camera.lookAt(player.position);

  // Rotate player
  player.rotation.y = playerRotation;

  // Pet follow
  pets.forEach(pet => {
    const dx = player.position.x - pet.position.x;
    const dz = player.position.z - pet.position.z;
    pet.position.x += dx * 0.05;
    pet.position.z += dz * 0.05;
  });

  // Expand mine
// Add this variable at the top of your script
let lastMineSize = mineSize;

// Inside the animate() function:
if (money > lastMineSize * 2) {
  mineSize += 10;
  lastMineSize = mineSize;
  generateMine();
}

  }

  renderer.render(scene, camera);
}

generateMine();
animate();
