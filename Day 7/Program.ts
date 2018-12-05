export class Program {
    readonly children = new Map<string, Program>();
    parent: Program;
    
    get hasChildren() {
        return this.children.size > 0;
    }
    
    private get totalWeight(): number {
        return this.weight + this.childWeights.reduce((acc, val) => acc + val, 0);
    }

    private get childWeights() {
        return Array.from(this.children.values()).map(val => val.totalWeight)
    }

    constructor(
        public name: string,
        public weight: number
    ) {}

    addChildProgram(child: Program) {
        if (!child) throw new Error(`empty child in ${this.name}`);
        this.children.set(child.name, child)
        child.parent = this;
    }

    findUnbalancedBranch() {
        if (!this.hasChildren) return null;

        const weightMap = this.buildWeightMap();
        if (weightMap.size === 1) return null; // children all have same weight

        return Array.from(weightMap.values())
            .sort((a, b) => a.length - b.length) // sort by number of children with each weight, ascending
            [0]  // smallest weight list
            [0]; // first (only, given our data) child with this weight
    }

    findWeightDiff() {
        if (!this.hasChildren) return 0;

        const weightMap = this.buildWeightMap();
        if (weightMap.size === 1) return 0; // children all have same weight

        const weights = Array.from(weightMap)
            .sort((a, b) => a[1].length - b[1].length); // sort by number of children with each weight, ascending
        return Math.abs(weights[0][0] - weights[1][0]); // return the difference between the unbalanced weight and the standard weight
    }

    private buildWeightMap() {
        const weightMap = new Map<number, Program[]>();
        this.children.forEach((val, key) => {
            const childWeight = val.totalWeight;
            if (!weightMap.has(childWeight)) weightMap.set(childWeight, []);
            weightMap.get(childWeight).push(val);
        });
        return weightMap;
    }
}
