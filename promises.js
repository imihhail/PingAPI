
// function test() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("first text");
//         }, 2000);
//     })
// }

// test().then((text) => {
//         console.log(text)
//         console.log("second text");
//     }
// )


// function doAsync(i) {
//   return new Promise(resolve => setTimeout(() => {
//     console.log('async finished', i);
//     resolve();
//   }, Math.random() * 500));
// }

// const promises = [];
// for (let i = 0; i < 5; i++) {
//   promises.push(doAsync(i));
// }

// Promise.all(promises).then(() => {
//   console.log('all async work finished',promises);
// });

const hasNewline = (s) => /\r?\n/.test(s);

console.log( hasNewline("") ); // true
console.log( hasNewline("hello\r\nworld") ); // true
console.log( hasNewline("hello world") ); // false
