
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progrssContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const durationEl = document.getElementById('duration');
const currentTimeEl = document.getElementById('current-time');
const volumeProgress = document.getElementById('volume-progress');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');


 const songs = [
    {
        name:'jacinto-1',
        display: 'Metalica Rock',
        artist: 'Metalica',
    },

    {
        name:'jacinto-2',
        display:'Sweet World',
        artist: 'Sweet Bird'
    },

    {
        name:'jacinto-3',
        display: 'Rupkotha old is Gold',
        artist: 'Rupkotha'
    }
 ];


let isplay = false

function playSong(){
    isplay = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'play');
    music.play();
}
function playPause(){
    isplay = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'pause');
    music.pause();
}

playBtn.addEventListener('click', ()=>{
    isplay? playPause() : playSong();
    updateProgressBar();
});

function loadSong(song){
    title.textContent = song.display;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

let songIndex = 0;

function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1){
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}


loadSong(songs[songIndex]);

function updateProgressBar(e){
  if(isplay){
    const {duration, currentTime} = e.srcElement;
    // console.log(duration, currentTime);
    const progresPercent = (currentTime / duration) * 100;
    progress.style.width = `${progresPercent}%`;
    const durationMinutes = Math.floor(duration/60);
    // console.log('min', durationMinutes);
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds < 10){
        durationSeconds = `0${durationSeconds}`;
    }
    // console.log('sec', durationSeconds);
    // durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    if(durationSeconds){
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    const currentMinutes = Math.floor(currentTime/60);
    let currentSeconds = Math.floor(currentTime % 60);

    if(currentSeconds < 10){
        currentSeconds = `0${currentSeconds}`;
    }

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

  }
}

function setProgressBar(e){
   console.log(e);
   const width = this.clientWidth;
//    console.log('width', width);
   const offsetX = e.offsetX;
//    console.log('clickX', offsetX);
   const { duration } = music;
//    console.log(offsetX / width);
   music.currentTime = (offsetX / width) * duration;
}

function setVolume(e){
    music.volume = 0.5;
}

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progrssContainer.addEventListener('click', setProgressBar);
volumeProgress.addEventListener('click', setVolume);