
const quoteContaner = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];


//part 1

// // show loading

// function loading(){
//     loader.hidden = false;
//     quoteContaner.hidden = true;
// }

// //complte loading

// function complete(){
//     loader.hidden = true;
//     quoteContaner.hidden = false;
// }

// function newQuotes(){
//     loading();
//     //pick random quote from apiQuotes
//     const quote =apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//     if(!quote.text){
//         quoteText.textContent = "Unknown";
//     }else{
//         quoteText.textContent = quote.text;
//     }

//     if(quote.text.length > 50){
//         quoteText.classList.add('log-quote');
//     }else{
//         quoteText.classList.remove('log-quote');
//     }
    
//     quoteAuthor.textContent = quote.author;

//     complete();
// }

// // Get Quote Api
// async function getQuotes(){
//     loading();
//     const apiUrl = 'https://type.fit/api/quotes';
//     try{
//         const response = await fetch(apiUrl);
//         apiQuotes = await response.json();
//         // console.log(apiQuotes[5]);
//         newQuotes();
//     }catch(error){
//        //Catch Error Here
//     }
// }

// function tweetQuote(){
//     const twitteUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${quoteAuthor.textContent}`;
//     window.open(twitteUrl, '_blank');
// }

// newQuoteBtn.addEventListener('click', newQuotes);
// twitterBtn.addEventListener('click', tweetQuote)


// // //on load

// getQuotes();



// if using loaclArray then use it that given below 2

// function newQuotes(){
//     //pick random quote from apiQuotes
//     const quote =localQuots[Math.floor(Math.random() * localQuots.length)];
//     console.log(quote);
// }
// newQuotes();



//real life loading example part 3

function loading(){
    quoteContaner.hidden = true;
    loader.hidden = false;
}

function complete(){
    loader.hidden = true;
    quoteContaner.hidden = false;
}

async function getQuotes(){
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        apiQuotes = await response.json();
        quoteText.textContent = apiQuotes.quoteText;
        quoteAuthor.textContent = apiQuotes.quoteAuthor;
          
    }catch(error){
        quoteAuthor.textContent = error + "Please Reloade agin";
    }
    complete();
}

function twitterQuote(){
    const twitteUrl = `https://twitter.com/intent/tweet?text=${apiQuotes.quoteText} - ${apiQuotes.quoteAuthor}`;
    window.open(twitteUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', twitterQuote);

getQuotes();




