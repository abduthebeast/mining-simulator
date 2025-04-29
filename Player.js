let player, velocityY = 0;
const gravity = -9.8;
const speed = 5;

function initPlayer(scene) {
    const geometry = new THREE.BoxGeometry(1,2,1);
    const material = new THREE.MeshStandardMaterial({color: 'blue'});
    player = new THREE.Mesh(geometry, material);
    player.position.y = 5;
    scene.add(player);
}

function updatePlayer(delta) {
    velocityY += gravity * delta;
    player.position.y += velocityY * delta;

    if(player.position.y <= 1) {
        velocityY = 0;
        player.position.y = 1;
    }

    // Basic movement (you can upgrade later)
    if(keyPressed['w']) player.position.z -= speed * delta;
    if(keyPressed['s']) player.position.z += speed * delta;
    if(keyPressed['a']) player.position.x -= speed * delta;
    if(keyPressed['d']) player.position.x += speed * delta;
}

const keyPressed = {};
window.addEventListener('keydown', e => keyPressed[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keyPressed[e.key.toLowerCase()] = false);

export { initPlayer, updatePlayer };
