
let queue = [];
function producer() {
    if (queue !== undefined) {
        queue.push(Math.floor(Math.random() * 21))
        return true;
    }
}

function consumer() {
    if (queue.length > 0) {
        queue.forEach(ele => console.log(ele));
        return true;
    }
}

while (true) {
    producer();
    consumer();
}