window.onload = () => {
    let player = document.getElementById("player");
    player.style.position = "absolute";
    player.style.bottom = "20px";
    player.style.left = "50%";

    // Simulate the game world, camera, and environment
    startGame();
};

function startGame() {
    // Start the game logic
    console.log("Game is starting...");
    createPlayer();
}

function createPlayer() {
    // Create the player
    let player = document.getElementById("player");
    player.style.backgroundColor = "#FF6347"; // color of the player
}
