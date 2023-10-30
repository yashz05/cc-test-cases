const randomDelay = () => new Promise(resolve =>
    setTimeout(resolve, Math.random() * 100)
  )

amount = 0;
async function loadAmount () {
      await randomDelay();
      return amount;
}
   
async function saveAmount (value) {
      await randomDelay();
      return amount += value;
}

async function addFifty(value)
{
    const amount = await loadAmount();
    console.log ("Adding fifty, the current amount is " + amount);
    const newAmount = amount + 50;
    await saveAmount(newAmount);
    console.log("The amount after adding 50 is " + newAmount);
}

async function addSixty(value)
{
    const amount = await loadAmount();
    setTimeout(()=> {}, 4500);
    console.log ("Adding sixty, the current amount is " + amount);
    const newAmount = amount + 60;
    await saveAmount(newAmount);
    console.log("The amount after adding 60 is " + newAmount);
}

async function main () {
    const transaction1 = addFifty();
    const transaction2 = addSixty();
    await transaction1;
    await transaction2;
    const amount = await loadAmount();
    console.log("Final amount is: " + amount);
  }
  main()