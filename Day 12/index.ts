import { inputData } from './data';

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const data = splitData(inputData),
        connectionsToZero = new Set<string>(),
        childrenToProcess = ['0'];

    while (childrenToProcess.length) {
        const curVillageId = childrenToProcess.shift();
        if (connectionsToZero.has(curVillageId)) continue;

        connectionsToZero.add(curVillageId);
        const curVillage = data.get(curVillageId);
        curVillage.connections.forEach(val => {
            if (!connectionsToZero.has(val)) childrenToProcess.push(val);
        });
    }

    return connectionsToZero.size;
}

function puzzleB() {
    const data = splitData(inputData),
        connectionGroups = new Map<string, Set<string>>(),
        childrenToProcess: string[] = [];
    
    for (let x = 0; x < data.size; x++) {
        const baseId = x.toString(),
            baseVillage = data.get(baseId);
        if (baseVillage.wasProcessed) continue;

        childrenToProcess.push(baseId);
        const curSet  = new Set<string>();
        connectionGroups.set(baseId, curSet)
        while (childrenToProcess.length) {
            const curVillageId = childrenToProcess.shift();
            if (curSet.has(curVillageId)) continue;
    
            curSet.add(curVillageId);
            const curVillage = data.get(curVillageId);
            curVillage.wasProcessed = true;
            curVillage.connections.forEach(val => {
                if (!curSet.has(val)) childrenToProcess.push(val);
            });
        }
    }

    return connectionGroups.size;
}

function splitData(input: string) {
    const villageRegex = /^(\d+) <-> (.+)$/; // 1 <-> 1, 1433
    return new Map(
        input.split('\n')
            .map(row => {
                const matches = villageRegex.exec(row);
                return [
                    matches[1],
                    {
                        villageId: matches[1],
                        connections: matches[2].split(', ')
                    }
                ] as [string, Village];
            })
        );
}

interface Village {
    villageId: string;
    connections: string[];
    wasProcessed: boolean;
}
