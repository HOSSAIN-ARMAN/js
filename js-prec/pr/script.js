
'use strict'

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours={
    [weekdays[3]]: {
        open:12,
        close: 22,
    },
    [weekdays[4]]: {
        open:11,
        close:23,
    },
    [`day-${2 + 4}`]: {
        open: 0,
        close: 24,
    },
};

console.log(openingHours);

const resturent={
    name: 'Classico Italiano',
    location: 'Dhaka',
    categories: ['Italian', 'Pizzeria', 'Vegetarian'],
    starterMenu:['Apple', 'PineApple', 'Dalim', 'Coil', 'Jira'],
    mainMenu: ['Coke', 'Cake', 'chicken'],
    
    openingHours,

    order: function(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    }, 

    orderDelivery: function ({
        starterIndex = 1,
        mainIndex = 0,
        time = '20:00',
        address,
    }) {
        console.log(
            `Order recived! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
        );
    }
}


console.log(resturent);


// const menu = [...resturent.starterMenu, ...resturent.mainMenu];

// let i=0;

// while(i < menu.length){
//     console.log(menu[i]);
//     i++;
// }

// for (const item of menu) console.log(item);

// for (let i = 0; i < menu.length; i++){
//     console.log(i+1 + ": "+menu[i]);
// }

// for (const [i, el] of menu.entries()){
//     console.log(`${i+1} : ${el}`);
// }
