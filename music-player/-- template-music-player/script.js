const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// music

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Eroot gha Redix',
        artist: 'Metric Design',
    },
];

let isPlaying = false;

function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pushSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

playBtn.addEventListener('click', ()=>(isPlaying ? pushSong() : playSong()));


function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

let songIndex = 0;

function nextSong(){
  songIndex++;
  if(songIndex > songs.length - 1){
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

loadSong(songs[songIndex]);

function updateProgressBar(e){
   if(isPlaying){
    const {duration, currentTime} = e.srcElement;
    let progressBar = (currentTime / duration) * 100;
    // console.log(progressBar);
    
    progress.style.width = `${progressBar}%`; 
    // display song duration time
    const durationMinutes = Math.floor(duration/60);
    console.log('min', durationMinutes);
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds < 10){
        durationSeconds = `0${durationSeconds}`;
    }
    console.log('sec', durationSeconds);
    // currentTimeEl.textContent = `${durationSeconds}`;
    if(durationSeconds){
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // display currentTime when song is playing

    const currentMinutes = Math.floor(currentTime/60);
    console.log('c', currentMinutes);
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds < 10){
        currentSeconds = `0${currentSeconds}`;
    }
    
    currentTimeEl.textContent = `${currentMinutes}: ${currentSeconds}`;

   }
}

function setprogress(e){
//    console.log(e);
   const width = this.clientWidth;
   const clickX = e.offsetX;
   const {duration} = music;
   music.currentTime =  (clickX/width)*duration;
}

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setprogress);

