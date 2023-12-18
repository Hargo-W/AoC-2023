const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`.split('\n').map(row => row.split(''));

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