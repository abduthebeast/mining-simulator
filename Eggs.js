function initEggs(scene) {
    const eggTypes = ['basic', 'rare', 'epic', 'legendary'];
    eggTypes.forEach((egg, index) => {
        const geometry = new THREE.SphereGeometry(0.5, 16, 16);
        const material = new THREE.MeshStandardMaterial({color: getEggColor(egg)});
        const eggMesh = new THREE.Mesh(geometry, material);
        eggMesh.position.set(index * 3 - 5, 1, 10);
        eggMesh.userData = { eggType: egg };
        scene.add(eggMesh);
    });
}

function getEggColor(type) {
    switch(type) {
        case 'rare': return 'blue';
        case 'epic': return 'purple';
        case 'legendary': return 'yellow';
        default: return 'white';
    }
}

function hatchEgg(eggType) {
    // 20% rare, 10% epic, 5% legendary
    let rand = Math.random();
    if (eggType === 'legendary' && rand < 0.05) {
        hatchPet('legendary');
    } else if (eggType === 'epic' && rand < 0.1) {
        hatchPet('epic');
    } else if (eggType === 'rare' && rand < 0.2) {
        hatchPet('rare');
    } else {
        hatchPet('common');
    }
}

export { initEggs, hatchEgg };
