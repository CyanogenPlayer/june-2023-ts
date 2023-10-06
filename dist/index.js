function* genFileNames() {
    let index = 0;
    while (true) {
        yield `file${index++}.jpg`;
    }
}
const fileGen = genFileNames();
console.log(fileGen.next().value);
console.log(fileGen.next().value);
console.log(fileGen.next());
//# sourceMappingURL=index.js.map