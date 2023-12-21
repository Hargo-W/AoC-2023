const input = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`.split('\n')

const getArrangements = (springs, schema) => {
    const springArr = springs.split('');
    const groupSizes = schema.split(',').map((s) => Number(s));

    const isValidPosition = (index, groupSize) => {
        const groupEnd = index + groupSize
        const slice = springArr.slice(index, groupEnd)
        console.log(slice, groupSize, springArr[index - 1], springArr[groupEnd + 1])

        // exits if there is a broken spring before or after the group
        if (index !== 0 && springArr[index - 1] === '#' || groupEnd !== springArr.length && springArr[groupEnd + 1] === '#' || groupEnd > springArr.length) return false

        for (const spring of slice) {
            if (spring === '.') return false
        }
        return true
    }

    for (let i = 0; i < groupSizes.length; i++) {
        let index = 0
        for (let y = 0; y < i; y++) {
            index += groupSizes[y]
        }
        console.log(index, isValidPosition(index, groupSizes[i]))
    }
}

let total = 0;
for (const line of input) {
    const [springs, schema] = line.split(' ');
    total += getArrangements(springs, schema);
}

// console.log(total)