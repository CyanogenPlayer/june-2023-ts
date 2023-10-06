// function asd() {
//     const a = 5;
//     return a;
//     console.log('!!!');
// }
//
// console.log(asd());

// function* asd() {
//     const a = 5;
//     yield a;
//     console.log('!!!');
// }
//
// const gen = asd();
// const next = gen.next();
// console.log(next);
// const next2 = gen.next();
// console.log(next2);

// function* asd() {
//     yield 1;
//     yield 2;
//     yield 3;
// }
//
// const gen = asd();
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());

// function* genFileNames(): Generator<string> {
//     let index = 0
//     while (true) {
//         yield `file${index++}.jpg`;
//     }
// }
//
// const fileGen = genFileNames();
// console.log(fileGen.next().value);
// console.log(fileGen.next().value);
// console.log(fileGen.next());

function* team1(n: number): Generator<string> {
    for (let i = 1; i <= n; i++) {
        yield `team1 -- worker ${i}`;
    }
}

function* team2(n: number): Generator<string> {
    for (let i = 1; i <= n; i++) {
        yield `team2 -- worker ${i}`;
    }
}

const teams = [team1(5), team2(8)];

while (teams.length) {
    const team = teams.shift();
    const next = team.next();

    if (next.done) {
        continue;
    }

    console.log(next.value);
    teams.push(team);
}
