function initShop(scene) {
    const geometry = new THREE.BoxGeometry(5,3,5);
    const material = new THREE.MeshStandardMaterial({color: 'purple'});
    const shop = new THREE.Mesh(geometry, material);
    shop.position.set(20, 1.5, 0);
    scene.add(shop);
    shop.name = "Shop";
}

function buyTool(toolName) {
    // Add tool logic (future)
}

export { initShop, buyTool };
