const input = `................................#.......#......#.....#...........................#..........................................................
..........................................................#..........................................................#...........#..........
.....#.....................#.............................................................#..................................................
.............#..............................................................................................................................
.....................................................................................#....................#.................#...............
..................#..........................................#...................................#..............#...........................
...............................#....................................................................................................#.......
..........#..............#.............#................#...................#...............................................................
....#............................................................................#..........................................................
...............#................................#......................................................................#................#...
...................................#.............................#...............................................#..........#.....#.........
#...................................................................................#.....#.....#......#....................................
...............................#............................................................................................................
..........................................................#................#................................................................
.......#.......................................................................................................................#............
..#.........#.........................................................................#.....................................................
..........................................#........#.......................................#.......#..................#............#........
.................#..............#..............................#...............................................#..........................#.
...............................................................................................#........#...................................
......................#............................................#......................................................#.................
.....................................#.....................................#..........................................................#.....
......#......................#...................#......#...................................................................................
..........................................................................................................#.................................
......................................................................#.........................................#.............#.............
#............................................#.........................................#.................................................#..
.............................................................#.....................................#........................................
..............#..............................................................................................#....................#.........
.........#.........#...................................#....................................................................................
........................................#..............................#........................#......#.................#..................
......................................................................................#................................................#....
................#...........#...............................................................................................................
.....................................................#.........#............................................................................
....#.......#.......#.......................................................#.....................#.........................................
.....................................#...........#..............................................................#...........................
..........................................................................................................#.................................
.......................#.............................................#..........#...........................................................
#............................................................#...........................#.................................#.......#........
.............................#......................................................#.................................#.....................
.........................................#............#.................#......................#..............#................#.........#..
............................................................................................................................................
..........#.................................................................................................................................
..........................................................#.......................................#.........................................
#.....................#...............#..........#....................#.................................#...................#...............
............................................................................................................................................
.......#..........................#.........................................................................................................
.................#...............................................#..............................#.................................#.........
........................................................................................................................#...................
..............................#.................#.....#..............................#..........................#...........................
.....................................#.........................................#...........................#.........................#......
.............#.....................................................#............................................................#..........#
....#.........................................................#..................................#..........................................
............................................#...........................#..................................................#................
...............................#.........................................................................#..................................
............................................................................................................................................
.................#.........#....................#..........................#........................................................#.......
.......................................................#....................................#...............................................
............................................................................................................................................
...#...............................................................................#............................................#...........
..........#.....................#......................................................................#....................................
.........................................#..................................................................................................
.....................................................#.................#.............................................#..............#.......
......................#.......................#.............................................................................#...............
........#.............................#..........................#....................#.......................#.............................
.................#..........................................................................#.....#.............................#.........#.
............................................................................................................................................
.........................................................................#..................................................................
..............................................................#.............................................................................
..........................#.............#..........................#.......................................#..........#.....................
............................................................................................................................................
..............................#......................................................................#............#...............#.........
.............#..............................#.........#.................#...................................................................
.....................#............................................................#.......................................#.................
......................................#................................................#.................................................#..
.................#...............................#..........................................................#...............................
........#......................................................#...........#................................................................
.........................................#......................................#...........#.....................#.........................
.#.........................#................................................................................................................
................................................................................................#...................................#......#
...........................................................#............#.............#..................#..................................
..................................................#.........................................................................................
...........#................................#......................#................................................#..........#............
........................#.........#.........................................................................................................
.............................................................#.................................#...............#...........#................
................#............#.......................................................................#......................................
.#......................................................................#......#...........#................................................
........................................................#..................................................#................................
......................#...................#.....#..................#..............................#.........................................
............................................................................................................................................
...........#..........................#....................#............................................................#...................
...................#...................................................................#...............................................#....
...........................#...................................................................#.........#..................................
.....#...........................................#.........................................................................#................
......................#.............#......................................#......#.................#.......................................
...............#..............#...........................................................#.....................#...............#...........
...........................................................#.....#.........................................................................#
.......................................#...............................#....................................................................
.................................#..................#..................................................................................#....
...........................................#..................................#.........................#...................................
.........#..............................................................................#...................................................
................#.....#................................#.................................................................#..................
.................................................................................................#..........................................
#..............................................#........................#...........................................#................#......
..............................#...................................................#.......................#.................................
..................#.................................#......................................................................................#
..........#................................#..................................#...........#.................................................
.....................................................................#....................................................#.................
...............#.....................................................................................................#......................
#........................................................#......#..........................................#........................#.......
.......................#.........#......#...................................................................................................
.....#......................................................................................................................................
..................#...............................#....................................................................#....................
............................................#......................#........................................................................
.............#........................................#.........................#.........#........................#.....................#..
...................................................................................................#..............................#.........
..........................#.................................................................................................................
..#................#....................................................#.......................................#...........................
...........#.................................#.........................................#................................#.............#.....
......................................#.......................#.....#.....................................#.................................
.................................#...............................................................#..........................................
.................#..........#.............................................#.......#...............................#..........#..............
.......................................................#................................................................................#...
..#........................................................................................#................................................
............................................................................................................................................
...................................#..........................................#.............................................................
...........................................#........#...............................................#...........................#...........
................................................................#......#....................................................................
....#.................#.........................#...............................................................#...........................
............................#..............................................................................#................#.......#.......
........#................................#................#.............................#............................#......................
#....................................................#..................................................................................#...
............#........................................................#........................#.............................................
..................#................#.......................................#................................................................
...........................#...............#......#..........#..................#..................#.................................#.....#
..........................................................................................#......................#.........#................
.......................................#....................................................................#...............................
...............#..............#........................................#................................................................#...
..........#.................................................................#...............................................................
.....#...............................................#.....#.....................................#..................#.........#.............
...............................................#........................................................#...................................
.#....................#.............................................................#.................................................#.....`.split('\n').map(row => row.split(''));

const additionalCols = []

for (let i = 0; i < input[0].length; i++) {
    const vertArray = [];
    for (let y = 0; y < input.length; y++) {
        vertArray.push(input[y][i])
    }
    if (vertArray.every((char) => char === '.')) {
        additionalCols.push(i)
    }
}
additionalCols.reverse()

const additionalRows = []

for (const line of input) {
    if (line.every((char) => char === '.')) {
        additionalRows.push(input.indexOf(line))
    }
    for (const num of additionalCols) {
        line.splice(num, 0, '.')
    }
}

additionalRows.reverse()

for (const num of additionalRows) {
    input.splice(num, 0, Array(input[0].length).fill('.'))
}

const coords = []

for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
        if (input[row][col] === '#') {
            coords.push([row, col]);
        }
    }
}

let totalDistance = 0;


const galaxyPairsChecked = []
const doesNotContain = (g1, g2) => {
    for (const pair of galaxyPairsChecked) {
        if ((pair[0] === g1 && pair[1] === g2) || (pair[0] === g2 && pair[1] === g1)) {
            return false;
        }
    }
    return true;
};
const difference = (a, b) => { return Math.abs(a - b); }


for (const galaxy of coords) {
    for (const otherGalaxy of coords) {
        if (coords.indexOf(galaxy) !== coords.indexOf(otherGalaxy) && doesNotContain(coords.indexOf(galaxy), coords.indexOf(otherGalaxy))) {
            totalDistance += difference(galaxy[0], otherGalaxy[0]) + difference(galaxy[1], otherGalaxy[1])
            galaxyPairsChecked.push([coords.indexOf(galaxy), coords.indexOf(otherGalaxy)])
        }
    }
}

console.log(totalDistance)