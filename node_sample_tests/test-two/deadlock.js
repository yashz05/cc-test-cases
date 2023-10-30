
let queue = [];

async function producer(){
    // waits for consumer to finish
    await consumer();
    if(queue !== undefined)
    {
        queue.push(Math.floor(Math.random() * 21))
        return true;
    }
}

async function consumer(){
    // waits for producer to finish
    await producer();
    if(queue.length > 0){
        queue.forEach(ele => console.log(ele));
        return true;
    }
}

while(true){
    producer();
    consumer();

}



