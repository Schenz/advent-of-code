// Advent of Code - Day 15 - Part Two

import { Position } from '../../utils/dijkstra/Position';
import { Sensor } from './Sensor';
import { calculateDistance } from './calculateDistance';

export const part2 = (input: string[], maxCoord: number): number => {
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

    const hiddenPoints = sensors.flatMap((sensor) => {
        const peri = getPerimetre(sensor);
        const howManySensorsSeeThis: (Position | undefined)[] = peri.map((point) => {
            const whichSensorSeesThis = sensors.findIndex((sensor) => {
                return calculateDistance(sensor.pos, point) <= sensor.view;
            });

            if (whichSensorSeesThis === -1) {
                if (point[0] >= 0 && point[0] <= maxCoord && point[1] >= 0 && point[1] <= maxCoord) {
                    return point;
                }
                return undefined;
            } else {
                return undefined;
            }
        });

        return howManySensorsSeeThis.filter((p) => p !== undefined);
    });

    const distressBeaconPosition = hiddenPoints[0] as Position;

    const answer = distressBeaconPosition[0] * 4000000 + distressBeaconPosition[1];

    return answer;
};

const getPerimetre = (from: Sensor): Position[] => {
    const centre = from.pos;
    const topRight = Array.from(
        { length: from.view + 2 },
        (_, i) => [centre[0] + i, centre[1] - from.view + i - 1] as Position
    );
    const bottomRight = Array.from(
        { length: from.view + 2 },
        (_, i) => [centre[0] + i, centre[1] + from.view - i + 1] as Position
    );
    const bottomLeft = Array.from(
        { length: from.view + 2 },
        (_, i) => [centre[0] - i, centre[1] + from.view - i + 1] as Position
    );
    const topLeft = Array.from(
        { length: from.view + 2 },
        (_, i) => [centre[0] - i, centre[1] - from.view + i - 1] as Position
    );

    return [...topRight, ...bottomRight, ...bottomLeft, ...topLeft];
};
