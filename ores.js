// ores.js

export const ores = [
  {
    name: "Coal",
    value: 10,
    rarity: 0.5, // Higher = more common
    color: "#3b3b3b"
  },
  {
    name: "Iron",
    value: 25,
    rarity: 0.3,
    color: "#a19d94"
  },
  {
    name: "Gold",
    value: 50,
    rarity: 0.15,
    color: "#ffd700"
  },
  {
    name: "Diamond",
    value: 100,
    rarity: 0.05,
    color: "#00ffff"
  },
  {
    name: "Mythril",
    value: 250,
    rarity: 0.01,
    color: "#8a2be2"
  }
];

// Utility function to randomly select an ore based on rarity
export function getRandomOre() {
  const rand = Math.random();
  let cumulative = 0;

  for (const ore of ores.sort((a, b) => b.rarity - a.rarity)) {
    cumulative += ore.rarity;
    if (rand < cumulative) {
      return ore;
    }
  }

  // Fallback to the most common ore
  return ores[0];
}
