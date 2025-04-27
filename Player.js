// Player.js

document.addEventListener('keydown', movePlayer);

let player = document.getElementById("player");

function movePlayer(event) {
    const speed = 5;
    let playerStyle = window.getComputedStyle(player);
    let left = parseInt(playerStyle.left);

    if (event.key === "ArrowLeft") {
        player.style.left = (left - speed) + "px";
    }
    if (event.key === "ArrowRight") {
        player.style.left = (left + speed) + "px";
    }
}
