import { inputData } from "./data";

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
//     const inputData = `p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>
// p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>`;
    const particles = splitInput(inputData);

    // Process an arbitrary 1000 cycles just to stablize things
    for (let i = 0; i < 1000; i++) {
        particles.forEach(p => {
            accelerateParticle(p);
            moveParticle(p);
        })
    }

    let closestParticle = particles.reduce((closest, cur) => {
        return !closest || calcDistanceFromOrigin(cur) < calcDistanceFromOrigin(closest)
            ? cur
            : closest;
    }),
        lastClosestParticle;

    // Run loops until we get the same closest particle twice in a row
    do {
        lastClosestParticle = closestParticle;
        closestParticle = particles.reduce((closest, cur) => {
            return !closest || calcDistanceFromOrigin(cur) < calcDistanceFromOrigin(closest)
                ? cur
                : closest;
        });
    } while (closestParticle !== lastClosestParticle);

    return particles.indexOf(closestParticle);
}

function puzzleB() {
    const particles = new Set(splitInput(inputData)),
        particlesByPosition = new Map<string, Particle[]>();
    
    // arbitrarily assume 1000 iterations is enough to get through the collision stage
    for (let i = 0; i < 1000; i++) {
        particles.forEach(p => {
            accelerateParticle(p);
            moveParticle(p);
            const pos = `${p.pos.x},${p.pos.y},${p.pos.z}`;
            if (!particlesByPosition.has(pos)) { particlesByPosition.set(pos, []); }
            particlesByPosition.get(pos).push(p);
        });

        Array.from(particlesByPosition.values())
            .filter(arr => arr.length > 1)
            .flat()
            .forEach(p => particles.delete(p));

        particlesByPosition.clear();
    }

    return particles.size;
}

function splitInput(data: string): Particle[] {
    return data.split('\n')
        .map(row => {
            const [p, v, a] = row.split(', ').map(chunk => chunk.replace(/.=|<|>/g, '')),
                [x, y, z] = p.split(',').map(Number),
                [xVel, yVel, zVel] = v.split(',').map(Number),
                [xDelta, yDelta, zDelta] = a.split(',').map(Number),
                pos = { x, y, z },
                velocity = { xVel, yVel, zVel },
                accel = { xDelta, yDelta, zDelta };
            
            return { pos, velocity, accel };
        });
}

function accelerateParticle(p: Particle): void {
    p.velocity.xVel += p.accel.xDelta;
    p.velocity.yVel += p.accel.yDelta;
    p.velocity.zVel += p.accel.zDelta;
}

function moveParticle(p: Particle): void {
    p.pos.x += p.velocity.xVel;
    p.pos.y += p.velocity.yVel;
    p.pos.z += p.velocity.zVel;
}

function calcDistanceFromOrigin(p: Particle): number {
    return Math.abs(p.pos.x) + Math.abs(p.pos.y) + Math.abs(p.pos.z);
}

interface Point {
    x: number;
    y: number;
    z: number;
}

interface Velocity {
    xVel: number;
    yVel: number;
    zVel: number;
}

interface Vector {
    xDelta: number;
    yDelta: number;
    zDelta: number;
}

interface Particle {
    pos: Point;
    velocity: Velocity;
    accel: Vector;
}
