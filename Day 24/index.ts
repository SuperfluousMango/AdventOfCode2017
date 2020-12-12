import { inputData } from "./data";

const bridges = new Set<number[][]>();

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const data = splitInput(inputData),
        queue: number[][][] = [];

    data.forEach(val => {
        const [a, b] = val;
        if (a === 0 || b === 0) { queue.push([val]); }
    });

    while (queue.length) {
        const cur = queue.shift(),
            lastConnector = cur[cur.length - 1];
        let numToMatch: number;

        bridges.add(cur);

        if (cur.length === 1) {
            numToMatch = lastConnector[1];
        } else {
            numToMatch = cur[cur.length - 2].includes(lastConnector[0])
                ? lastConnector[1]
                : lastConnector[0];
        }

        Array.from(data)
            .filter(x => x.includes(numToMatch) && !cur.includes(x))
            .forEach(connector => {
                queue.push([...cur, connector]);
            });
    }

    return Array.from(bridges).reduce((acc, bridge) => {
        const bridgeStrength = bridge.flat()
            .reduce((bAcc, val) => bAcc + val, 0);
        return Math.max(acc, bridgeStrength);
    }, 0);
}

function puzzleB() {
    const bridgesArr = Array.from(bridges),
        maxLen = bridgesArr.reduce((acc, bridge) => Math.max(acc, bridge.length), 0),
        longBridges = bridgesArr.filter(bridge => bridge.length === maxLen);

    return longBridges.reduce((acc, bridge) => {
        const bridgeStrength = bridge.flat()
            .reduce((bAcc, val) => bAcc + val, 0);
        return Math.max(acc, bridgeStrength);
    }, 0);
}

function splitInput(data: string): Set<number[]> {
    return new Set(
        data.split('\n')
            .map(x => x.split('/').map(Number))
    );
}
