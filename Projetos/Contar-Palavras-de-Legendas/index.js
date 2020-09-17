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
).then(console.log);
