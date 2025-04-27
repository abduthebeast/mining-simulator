
const ores = [
    { type: "Stone", value: 5 },
    { type: "Gold", value: 10 },
    { type: "Diamond", value: 20 }
];

function mineOre() {
    const randomOre = ores[Math.floor(Math.random() * ores.length)];
    console.log(`You mined a ${randomOre.type} worth ${randomOre.value} coins!`);
}
