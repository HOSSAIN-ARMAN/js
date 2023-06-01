
// Unspals API

const imageContainer = document.getElementById('image-container');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let imageArray = [];

const count = 10;
const apiKey = '2ajxxErLj69LlNsG_NxYBj6bI_ysGK0KDpnjw3kcBws';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// using dry for img
function setAttributes(element, attribute){
  for(const key in attribute){
    element.setAttribute(key, attribute[key]);
  }
}

function imageLoaded(){
  imagesLoaded++;
  if(imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

function displayImage(){
  imagesLoaded = 0;
  totalImages = imageArray.length;
  console.log(totalImages);

  imageArray.forEach((image)=>{   
     const item = document.createElement('a');
     item.setAttribute('href', image.links.html);
     item.setAttribute('target', '_blank');

     const img = document.createElement('img');
     
    //  img.setAttribute('src', image.urls.regular);
    //  img.setAttribute('alt', image.alt_description);
    //  img.setAttribute('title', image.alt_description);
    setAttributes(img, {
      src: image.urls.regular,
      alt: image.alt_description,
      title: image.alt_description
    })

     img.addEventListener('load', imageLoaded)

     item.appendChild(img);
     imageContainer.appendChild(item);
  });
} 

async function getPhotos(){
  try{
    const response = await fetch(apiUrl);
    imageArray = await response.json();
    displayImage();
  }catch(error){
    console.log(error);
  }
}

window.addEventListener('scroll', ()=>{
  
  if(window.innerHeight + scrollY >= document.body.offsetHeight - 1000 && ready){
    loader.hidden = false;
    getPhotos();
  }
  
})

getPhotos();