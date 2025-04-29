let coins = 0;
let health = 100;

function addCoins(amount) {
    coins += amount;
}

function updateUI() {
    document.getElementById('coins').innerText = `Coins: ${coins}`;
    document.getElementById('health').innerText = `Health: ${health}%`;
    document.getElementById('inventory').innerText = `Inventory: ${inventory.length}/${maxInventory}`;
}

export { addCoins, updateUI };
