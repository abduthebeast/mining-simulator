let pets = [];
const maxPetsEquipped = 5;

function hatchPet(rarity) {
    const pet = {
        rarity: rarity,
        boost: getBoost(rarity)
    };

    if (pets.length < maxPetsEquipped) {
        pets.push(pet);
    }
}

function getBoost(rarity) {
    switch(rarity) {
        case 'legendary': return { coins: 2, health: 1.5, damage: 2 };
        case 'epic': return { coins: 1.7, health: 1.3, damage: 1.7 };
        case 'rare': return { coins: 1.5, health: 1.2, damage: 1.5 };
        default: return { coins: 1.2, health: 1, damage: 1.2 };
    }
}

export { hatchPet };
