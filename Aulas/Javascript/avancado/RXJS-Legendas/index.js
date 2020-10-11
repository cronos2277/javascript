const { filterBy,readFile,splitAll,removeEmpty } = require("./functions");

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
    removeEmpty()
)
.subscribe(console.log);