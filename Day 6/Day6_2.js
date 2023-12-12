const input = `Time: 47847467
Distance: 207139412091014`.split('\n')

let time = Number(input[0].split(' ')[1])

let distance = Number(input[1].split(' ')[1])

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

console.log(getWinningOptions(time, distance))