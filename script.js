const songs = [
    {
        title: "Blinding Lights",
        album: "Music Player • 1 Song",
        src: "songs/song1.mp3",
        cover: "images/cover1.jpg"
    },
    {
        title: "Starboy",
        album: "Music Player • 1 Song",
        src: "songs/song2.mp3",
        cover: "images/cover2.jpg"
    },
    {
        title: "Save Your Tears",
        album: "Music Player • 1 Song",
        src: "songs/song3.mp3",
        cover: "images/cover3.jpg"
    }
];

const audio = document.getElementById("audio");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const album = document.getElementById("album");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const playlist = document.querySelectorAll(".song");

let currentSong = 0;
let playing = false;

// -----------------------------

function loadSong(index){

    audio.src = songs[index].src;

    cover.src = songs[index].cover;

    title.textContent = songs[index].title;

    album.textContent = songs[index].album;

    playlist.forEach(song=>song.classList.remove("active"));

    playlist[index].classList.add("active");
}

loadSong(currentSong);

// -----------------------------

function playSong(){

    audio.play();

    playing=true;

    playBtn.innerHTML='<i class="fa-solid fa-pause"></i>';

    cover.classList.add("playing");
}

function pauseSong(){

    audio.pause();

    playing=false;

    playBtn.innerHTML='<i class="fa-solid fa-play"></i>';

    cover.classList.remove("playing");
}

// -----------------------------

playBtn.onclick=()=>{

    if(playing){

        pauseSong();

    }else{

        playSong();

    }

};

// -----------------------------

nextBtn.onclick=()=>{

    currentSong++;

    if(currentSong>=songs.length){

        currentSong=0;
    }

    loadSong(currentSong);

    playSong();

};

// -----------------------------

prevBtn.onclick=()=>{

    currentSong--;

    if(currentSong<0){

        currentSong=songs.length-1;
    }

    loadSong(currentSong);

    playSong();

};

// -----------------------------

audio.addEventListener("timeupdate",()=>{

    if(audio.duration){

        progress.value=(audio.currentTime/audio.duration)*100;

        current.textContent=format(audio.currentTime);

        duration.textContent=format(audio.duration);

    }

});

// -----------------------------

progress.oninput=()=>{

    audio.currentTime=(progress.value/100)*audio.duration;

};

// -----------------------------

volume.oninput=()=>{

    audio.volume=volume.value/100;

};

// -----------------------------

function format(time){

    let min=Math.floor(time/60);

    let sec=Math.floor(time%60);

    if(sec<10){

        sec="0"+sec;

    }

    return `${min}:${sec}`;

}

// -----------------------------

playlist.forEach(item=>{

    item.onclick=()=>{

        currentSong=item.dataset.index;

        loadSong(currentSong);

        playSong();

    }

});

// -----------------------------

audio.onended=()=>{

    currentSong++;

    if(currentSong>=songs.length){

        currentSong=0;
    }

    loadSong(currentSong);

    playSong();

};

// -----------------------------
// Keyboard Shortcuts

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        if(playing){

            pauseSong();

        }else{

            playSong();

        }

    }

    if(e.key==="ArrowRight"){

        nextBtn.click();

    }

    if(e.key==="ArrowLeft"){

        prevBtn.click();

    }

});