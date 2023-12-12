const input = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`.split('\n')

const directions = input.shift().split('')
input.shift()

const maps = {};
let currentLocations = []


for (const line of input) {
    const lineClone = line.replace('(', '').replace(')', '');
    const [node, paths] = lineClone.split(' = ');
    const [leftPath, rightPath] = paths.split(', ');

    if (node.endsWith('A')) {
        currentLocations.push(node)
    }

    maps[node] = { leftPath, rightPath };
}


const moveToLocations = (direction) => {
    for (let i = 0; i < currentLocations.length; i++) {
        const location = currentLocations[i]
        const {leftPath, rightPath} = maps[location];

        if (direction === 'L') {
            currentLocations[i] = leftPath;
        } else if (direction === 'R') {
            currentLocations[i] = rightPath;
        }
    }
}


let totalSteps = 0;

while (!currentLocations.every(item => item.endsWith('Z'))) {
    for (let i = 0; i < directions.length; i++) {
        moveToLocations(directions[i])
        totalSteps++
        console.log(currentLocations)
    }
}

console.log(totalSteps)