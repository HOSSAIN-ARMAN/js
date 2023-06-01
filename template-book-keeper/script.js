
const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalColse = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmark-container');


let bookmarks = [];


function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

modalShow.addEventListener('click', showModal);
modalColse.addEventListener('click', ()=> modal.classList.remove('show-modal'));

window.addEventListener('click', (e)=> e.target === modal ? modal.classList.remove('show-modal'): false);

// build bookmarks

function buildBookMarks(){


    // remove bookmark
    bookmarksContainer.textContent = '';

    bookmarks.forEach((bookmark) => {
        const {name, url} = bookmark;
        // console.log(name, url);
        const item = document.createElement('div');
        item.classList.add('item');
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('tittle', 'Delete Bookmarks');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);

        //Favicon /link Container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        //Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        //Link

        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;

        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);

        bookmarksContainer.appendChild(item);

    });
}


//Fetch Bookmarks

function fetchBookmarks(){
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }else{
        bookmarks = [
            {
                name: 'Jacinto design',
                url: 'https://jacinto.design',
            },
        ];

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    buildBookMarks();
}

// delete bookmark


function deleteBookmark(url) {
  // Loop through the bookmarks array
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  // Update bookmarks array in localStorage, re-populate DOM
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}



// validate form

function validate(nameValue, urlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(!nameValue || !urlValue){
        alert('please submit values for both field!!');
    }
    if(urlValue.match(regex)){
        alert('match');
    }

    if(!urlValue.match(regex)){
        alert('please enter a valid url web address');
        return false;
    }
}


function storeBookMark(e){
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if(!urlValue.includes('http://', 'https://')){
        urlValue = `https://${urlValue}`;
    }
    // if(!validate(nameValue, urlValue)){
    //     return false;
    // }

    const bookmark = {
        name: nameValue,
        url: urlValue,
    }

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteUrlEl.focus();

}
bookmarkForm.addEventListener('submit', storeBookMark);

// on load fetch bookmarks

fetchBookmarks();

