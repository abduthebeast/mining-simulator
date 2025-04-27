
const pets = [
    { name: "Dog", rarity: "Common", boost: 1 },
    { name: "Cat", rarity: "Rare", boost: 2 },
    { name: "Dragon", rarity: "Epic", boost: 3 },
    { name: "Phoenix", rarity: "Legendary", boost: 5 }
];

function spawnPet() {
    const randomPet = pets[Math.floor(Math.random() * pets.length)];
    console.log(`You spawned a ${randomPet.rarity} ${randomPet.name} with a boost of ${randomPet.boost}`);
}
