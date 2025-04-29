let ores = [];

function initOres(scene) {
    const oreTypes = ['stone', 'gold', 'diamond'];
    for (let i = 0; i < 50; i++) {
        const type = oreTypes[Math.floor(Math.random() * oreTypes.length)];
        const geometry = new THREE.BoxGeometry(1,1,1);
        const material = new THREE.MeshStandardMaterial({ color: getOreColor(type) });
        const ore = new THREE.Mesh(geometry, material);
        ore.position.set(
            Math.random() * 50 - 25,
            0.5,
            Math.random() * 50 - 25
        );
        ore.userData = { type: type };
        scene.add(ore);
        ores.push(ore);
    }
}

function getOreColor(type) {
    switch(type) {
        case 'gold': return 'gold';
        case 'diamond': return 'cyan';
        default: return 'gray';
    }
}

function mineOre(ore) {
    if (!ore) return;
    let value = 5; // Default stone value
    if (ore.userData.type === 'gold') value = 15;
    if (ore.userData.type === 'diamond') value = 30;

    addCoins(value);
    removeOre(ore);
}

function removeOre(ore) {
    ore.parent.remove(ore);
    ores = ores.filter(o => o !== ore);
}

export { initOres, mineOre };
