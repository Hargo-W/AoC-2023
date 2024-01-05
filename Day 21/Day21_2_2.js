const input = [3882, 34441, 95442, 186885];

const setupMatrices = (sequence) => {
    let differences = [];
    for (let i = 1; i < sequence.length; i++) {
        differences.push(sequence[i] - sequence[i - 1]);
    }

    let matrices = [differences];
    let currentSequence = differences;

    while (true) {
        let newDifferences = [];
        for (let i = 1; i < currentSequence.length; i++) {
            newDifferences.push(currentSequence[i] - currentSequence[i - 1]);
        }

        if (newDifferences.every(num => num === 0)) {
            break;
        }

        matrices.push(newDifferences);
        currentSequence = newDifferences;
    }

    return matrices;
}

const getExtrapolatedNumber = (matrices) => {
    return matrices.reduce((acc, curr) => acc + curr[curr.length - 1], 0);
}

const calculateExtrapolation = (iterations) => {
    let matrices = setupMatrices(input);
    for (let i = 0; i < iterations; i++) {
        const lastNumber = input[input.length - 1];
        const extrapolatedNumber = getExtrapolatedNumber(matrices);
        const nextNumber = lastNumber + extrapolatedNumber;
        input.push(nextNumber);

        let newDiff = nextNumber - lastNumber;
        matrices[0].push(newDiff);
        for (let j = 1; j < matrices.length; j++) {
            newDiff = matrices[j-1][matrices[j-1].length-1] - matrices[j-1][matrices[j-1].length-2];
            matrices[j].push(newDiff);
            if (newDiff === 0) {
                break;
            }
        }
    }
}

// I DO NOT UNDERSTAND WHY I HAD TO BUMP THE NUMBER BY ONE. I WAS STUCK HERE FRUSTRATED FOR HOURS AND JUST RANDOMLY TRIED THIS AND IT WORKED
const iterations = 202300 - input.length + 1;
calculateExtrapolation(iterations);

console.log(input[input.length - 1]);
