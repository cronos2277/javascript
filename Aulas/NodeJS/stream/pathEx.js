const path = require('path');
const paths = {
    resolve: path.resolve(__dirname,__filename),
    basename: path.basename(__filename,'.js'),
    dirname: path.dirname(__filename),
    extname: path.extname(__filename),
    isAbsolute:path.isAbsolute(`${__dirname}/${__filename}`),    
    sep: path.sep,
    delimiter:path.delimiter,
}

console.log(`Windows: ${path.win32.resolve(__dirname,__filename)}`);
console.log(`Posix: ${path.posix.resolve(__dirname,__filename)}`);

//Resolvendo Path em sistemas Unix
console.log('\n');
let linuxPaths = `./stream1.js:./stream2.js:./stream3.js`;
linuxPaths = linuxPaths.split(path.posix.delimiter);
linuxPaths[0] = path.normalize(linuxPaths[0]);
linuxPaths[1] = path.normalize(linuxPaths[1]);
linuxPaths[2] = path.normalize(linuxPaths[2]);
console.log(linuxPaths);

//Resolvendo Path no windows
console.log('\n');
let winPaths = `/;${__dirname}/../../;${__filename}/../`;
winPaths = winPaths.split(path.win32.delimiter)
winPaths[0] = path.normalize(winPaths[0]);
winPaths[1] = path.normalize(winPaths[1]);
winPaths[2] = path.normalize(winPaths[2]);
console.log(winPaths);
console.log('\n');
console.log(paths);
