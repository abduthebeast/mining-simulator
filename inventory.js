let inventory = [];
let maxInventory = 10;

function addToInventory(item) {
    if (inventory.length >= maxInventory) return false;
    inventory.push(item);
    return true;
}

function sellInventory() {
    let totalCoins = 0;
    inventory.forEach(item => {
        totalCoins += item.value;
    });
    addCoins(totalCoins);
    inventory = [];
}

function upgradeBackpack() {
    maxInventory += 5;
}

export { addToInventory, sellInventory, upgradeBackpack };
