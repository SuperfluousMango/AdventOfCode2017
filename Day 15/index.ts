const factorA = 16807,
    factorB = 48271,
    initialA = 512,
    initialB = 191,
    divisor = 2147483647,
    fnA = (x: number) => x * factorA % divisor,
    fnB = (x: number) => x * factorB % divisor;

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const iterations = 40 * 1000 * 1000;
    let valA = initialA,
        valB = initialB,
        matches = 0;

    for (let x = 0; x < iterations; x++) {
        valA = fnA(valA);
        valB = fnB(valB);
        if ((valA & 65535) === (valB & 65535)) matches++;
    }

    return matches;
}

function puzzleB() {
    const maxOutputs = 5 * 1000 * 1000,
        checkFactorA = 4,
        checkFactorB = 8,
        validOutputs = {
            a: [] as number[],
            b: [] as number[]
        };
    let valA = initialA,
        valB = initialB,
        matches = 0;

    do {
        valA = fnA(valA);
        if (valA % checkFactorA === 0) validOutputs.a.push(valA);
    } while (validOutputs.a.length < maxOutputs);

    do {
        valB = fnB(valB);
        if (valB % checkFactorB === 0) validOutputs.b.push(valB);
    } while (validOutputs.b.length < maxOutputs);

    for (let x = 0; x < maxOutputs; x++) {
        if ((validOutputs.a[x] & 65535) === (validOutputs.b[x] & 65535)) matches++;
    }

    return matches;
}
