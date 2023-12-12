const input = `Time:        47     84     74     67
Distance:   207   1394   1209   1014`.split('\n')

const removeWhiteSpaceFromArray = (inputArray) => {
    return inputArray.filter((str) => /\S/.test(str));
}

let times = removeWhiteSpaceFromArray(input[0].split(' '))
times.shift()
times = times.map(Number)

let distances = removeWhiteSpaceFromArray(input[1].split(' '))
distances.shift()
distances = distances.map(Number)

let waysToBeat = []

const getWinningOptions = (time, distance) => {
    let winOptionCount = 0;

    for (let i = 0; i < time; i++) {
        const timeLeftToMove = time - i

        const isWinningOption = (i * timeLeftToMove) > distance

        if (isWinningOption) {
            winOptionCount++
        }
    }

    return winOptionCount
}

for (let y = 0; y < times.length; y++) {
    waysToBeat.push(getWinningOptions(times[y], distances[y]))
}

console.log(waysToBeat.reduce((accumulator, currentValue) => accumulator * currentValue))