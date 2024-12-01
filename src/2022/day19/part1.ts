// Advent of Code - Day 19 - Part One
import { Blueprint } from './Blueprint';

export const part1 = (input: string[]): number => {
    const blueprints = parseInput(input);
    return sumQualityLevels(blueprints);
};

function parseInput(input: string[]): Blueprint[] {
    return input.map((line, index) => {
        const [oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geodeCostObsidian] = line.split(' ').map(Number).filter(n => !isNaN(n));
        return { id: index + 1, oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geodeCostObsidian };
    });
}

function simulateBlueprint(blueprint: Blueprint): number {
  console.dir(blueprint);
  let ore = 0, clay = 0, obsidian = 0, geodes = 0;
  let oreRobots = 1, clayRobots = 0, obsidianRobots = 0, geodeRobots = 0;

  for (let minute = 1; minute <= 9; minute++) {
    // build robots after collecting materials
    let newOreRobots = oreRobots;
    let newClayRobots = clayRobots;
    let newObsidianRobots = obsidianRobots;
    let newGeodeRobots = geodeRobots;

    // can we build a geode robot?
    if (blueprint.geodeCostObsidian <= obsidian && blueprint.geodeCostOre <= ore) {
        newGeodeRobots++;
        obsidian -= blueprint.geodeCostObsidian;
        ore -= blueprint.geodeCostOre;
    }

    // can we build an obsidian robot?
    if (blueprint.obsidianCostClay <= clay && blueprint.obsidianCostOre <= ore) {
        newObsidianRobots++;
        clay -= blueprint.obsidianCostClay;
        ore -= blueprint.obsidianCostOre;
    }

    // can we build a clay robot?
    if (blueprint.clayCost <= ore) {
        newClayRobots++;
        ore -= blueprint.clayCost;
    }

    // can we build an ore robot?
    if (blueprint.oreCost <= ore) {
        newOreRobots++;
        ore -= blueprint.oreCost;
    }

    // collect materials
    ore += oreRobots;
    clay += clayRobots;
    obsidian += obsidianRobots;
    geodes += geodeRobots;

    // update robots after building
    oreRobots = newOreRobots;
    clayRobots = newClayRobots;
    obsidianRobots = newObsidianRobots;
    geodeRobots = newGeodeRobots;

    logState(minute, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsidianRobots, geodeRobots);
  }

  return geodes;
}

function logState(minute: number, ore: number, clay: number, obsidian: number, geodes: number, oreRobots: number, clayRobots: number, obsidianRobots: number, geodeRobots: number): void {
    console.log(`--- State at minute ${minute} ---
Resources:
  Ore: ${ore}
  Clay: ${clay}
  Obsidian: ${obsidian}
  Geodes: ${geodes}
Robots:
  Ore Robots: ${oreRobots}
  Clay Robots: ${clayRobots}
  Obsidian Robots: ${obsidianRobots}
  Geode Robots: ${geodeRobots}`);
}

function calculateQualityLevel(blueprint: Blueprint): number {
  const maxGeodes = simulateBlueprint(blueprint);
  return blueprint.id * maxGeodes;
}

function sumQualityLevels(blueprints: Blueprint[]): number {
  return blueprints.reduce((sum, blueprint) => sum + calculateQualityLevel(blueprint), 0);
}