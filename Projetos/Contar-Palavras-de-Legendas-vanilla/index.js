const option = {
    folder: "./subtitles",
    extension: "srt",
    functionsFile: "./functions"
}


const fn = require(option.functionsFile);
fn.readDir(option.folder)
.then(fn.filterBy(option.extension))
.then(fn.readFiles)
.then(fn.joinArrayInString)
.then(fn.splitAll)
.then(fn.removeEmpty)
.then(fn.removeByPattern('-->'))
.then(fn.removeNumberLine)
.then(fn.removeChars)
.then(fn.removeTag(''))
.then(fn.removeEmpty)
.then(fn.byWord)
.then(fn.removeEmpty)
.then(fn.countElements)
.then(fn.ordering('q'))
.then(console.log);