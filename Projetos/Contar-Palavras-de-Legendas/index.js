const option = {
    folder: "./subtitles",
    extension: "srt",
    functionsFile: "./functions"
}


const fn = require(option.functionsFile);
fn.readDir(option.folder).then(
    files => fn.filterBy(
        files,option.extension
        )
)
.then(fn.readFiles)
.then(fn.joinArrayInString)
.then(fn.splitAll)
.then(fn.removeEmpty)
.then(lines => fn.removeByPattern(lines,'-->'))
.then(fn.removeNumberLine)
.then(console.log);

