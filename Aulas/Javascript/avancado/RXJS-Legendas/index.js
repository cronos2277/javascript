const {toArray} = require("rxjs/operators");
const { 
        filterBy,readFile,splitAll,removeEmpty,
        removeNumberLine,removeChars,removeTag,
        byWord,countElements
    } = require("./functions");

const option = {
    folder: "./subtitles",
    extension: "srt",
    functionsFile: "./functions"
}

const fn = require(option.functionsFile);
fn.readDir(option.folder)
.pipe(
    filterBy(option.extension),
    readFile(),
    splitAll('\n'),
    removeEmpty(),
    removeNumberLine(),
    removeChars(),
    removeTag('i'),
    removeTag('font.*'),
    byWord(),
    removeEmpty(),
    toArray(),
    countElements()
)
.subscribe(console.log);