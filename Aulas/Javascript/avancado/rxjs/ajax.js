const {XMLHttpRequest} = require('xmlhttprequest');
const {ajax} = require('rxjs/ajax');
ajax({
    method:"get",
    url: "https://httpbin.org/get",
    createXHR: () => new XMLHttpRequest()
}).subscribe(console.log,console.error);