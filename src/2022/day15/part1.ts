// Advent of Code - Day 15 - Part One

import { Position } from '../../utils/dijkstra/Position';
import { Sensor } from './Sensor';
import { calculateDistance } from './calculateDistance';

export const part1 = (input: string[], targetY: number): number => {
    const sensors: Sensor[] = input
        .filter((line) => line.length > 0)
        .map((line) => {
            const regex = /(x=(-?\d+), y=(-?\d+))/g;
            const match1 = regex.exec(line) || [];
            const sensorPos = [match1[2] ? Number(match1[2]) : 0, match1[3] ? Number(match1[3]) : 0] as Position;
            const match2 = regex.exec(line) || [];
            const beaconPos = [match2[2] ? Number(match2[2]) : 0, match2[3] ? Number(match2[3]) : 0] as Position;

            return {
                pos: sensorPos,
                beacon: beaconPos,
                view: Math.abs(sensorPos[0] - beaconPos[0]) + Math.abs(sensorPos[1] - beaconPos[1]),
            } as Sensor;
        });

    const scanRange = sensors.reduce(
        (currRange, currSensor): [number, number] => {
            return [
                Math.min(currRange[0], currSensor.pos[0] - currSensor.view),
                Math.max(currRange[1], currSensor.pos[0] + currSensor.view),
            ];
        },
        [Number.MAX_VALUE, Number.MIN_VALUE]
    );

    const xCoords = Array.from({ length: Math.abs(scanRange[1] - scanRange[0]) + 1 }, (_, i) => i + scanRange[0]);

    const targetRow: number[] = xCoords.map((targetX) => {
        const whichSensorSeesThis = sensors.findIndex((sensor) => {
            return (
                calculateDistance(sensor.pos, [targetX, targetY]) <= sensor.view &&
                (sensor.beacon[0] !== targetX || sensor.beacon[1] !== targetY)
            );
        });

        return whichSensorSeesThis === -1 ? 0 : 1;
    });

    const answer = targetRow.reduce((acc, curr) => acc + curr, 0);

    return answer;
};
