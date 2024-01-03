const input = `%jx -> rt, rs
&cc -> cd, fc, qr, nl, gk, zr
%qs -> cl, rs
%zr -> cq
%mx -> nr, pm
%mj -> qr, cc
%cj -> cc, nt
%jv -> sp
%dj -> bd, zc
%kt -> lt
broadcaster -> gz, xg, cd, sg
&dn -> rx
%br -> nf, bd
%cd -> cc, nl
%zc -> jq, bd
%xg -> cf, pm
%nz -> gm, bd
&dd -> dn
%nb -> sl
&pm -> kt, xg, xp, jv, sp
&fh -> dn
%rt -> qq
%qq -> rs, hd
%hd -> qs, rs
&xp -> dn
%pj -> cc, mj
%gz -> bd, kb
%zd -> jv, pm
%cq -> cj, cc
%qr -> gk
%ng -> jk, bd
%kb -> bd, sv
%cl -> zx, rs
%gj -> zd, pm
%sl -> kx
%sv -> br
%nf -> bd, nz
%zx -> rs
%nt -> mn, cc
%rh -> nb, rs
%gk -> ln
&bd -> gm, gz, fh, sv
%jq -> ng, bd
%sp -> pc
%sg -> rs, rh
%kx -> jx
&fc -> dn
%cf -> gj, pm
%pc -> kt, pm
%jk -> bd
%vf -> pm
&rs -> sg, dd, sl, kx, nb, rt
%nr -> vf, pm
%ln -> zr, cc
%lt -> pm, mx
%gm -> dj
%nl -> pj
%mn -> cc`.split('\n').map(line => line.split(' -> ')).map(line => [line[0], line[1].split(', ')]);

// prep
const extractModules = (input, symbol) => {
    return input.filter(line => line[0].startsWith(symbol)).map(line => ({
        name: line[0].replace(symbol, ''),
        destinations: line[1],
        ...(symbol === '&' && {memory: createMemoryArray(input, line[0].replace(symbol, ''))})
    }));
}

const createMemoryArray = (input, name) => {
    const memoryToAdd = input.filter(module => module[1].includes(name)).map(module => module[0].replace('&', '').replace('%', ''));
    return memoryToAdd.map(mem => ({name: mem, lastPulse: 'lp'}));
}

const flipFlops = extractModules(input, '%');
const conjunctions = extractModules(input, '&');

let queue = [];

const sendPulse = (origin, destination, type) => {
    const isFlipFlop = flipFlops.some(ff => ff.name === destination);

    // calculate the buttonpress cycles for dd, fh, xp, fc
    if (type === 'hp' && origin === 'fc') {
        console.log(buttonPressCount)
        continueLoop = false;
        return
    }

    if (isFlipFlop && type === 'lp') {
        toggleFlipFlop(destination);
    } else if (!isFlipFlop) {
        updateConjunction(origin, destination, type);
    }
}

const toggleFlipFlop = (destination) => {
    const ffToUpdate = flipFlops.find(ff => ff.name === destination);
    ffToUpdate.on = !ffToUpdate.on;
    ffToUpdate.destinations.forEach(dest => queue.push([destination, ffToUpdate.on ? 'hp' : 'lp', dest]));
}

const updateConjunction = (origin, destination, type) => {
    const conToUpdate = conjunctions.find(con => con.name === destination);
    if (!conToUpdate) return;
    const memoryToUpdate = conToUpdate.memory.find(m => m.name === origin);
    memoryToUpdate.lastPulse = type;

    const newType = conToUpdate.memory.every(m => m.lastPulse === 'hp') ? 'lp' : 'hp';
    conToUpdate.destinations.forEach(dest => queue.push([destination, newType, dest]));
}

const broadCasterDestinations = input.find(line => line[0] === 'broadcaster')[1];

let buttonPressCount = 0;
let continueLoop = true;
const pushButtonModule = () => {
    buttonPressCount++
    broadCasterDestinations.forEach(destination => queue.push(['broadcaster', 'lp', destination]));
}

while (continueLoop) {
    pushButtonModule();

    while (queue.length) {
        const [origin, type, destination] = queue.shift();
        sendPulse(origin, destination, type);
    }
}

// dd - 4003, fh - 4027, fc - 3917, xp - 3919 get least common multiple -> 247454898168563