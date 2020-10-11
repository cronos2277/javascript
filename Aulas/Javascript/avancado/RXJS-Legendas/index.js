const { 
        filterBy,readFile,splitAll,removeEmpty,
        removeNumberLine,removeChars,removeTag,
        byWord
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
    removeEmpty()
)
.subscribe(console.log);