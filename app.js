const sidebar = document.getElementById("sidebar-container");
const mainImgDiv = document.getElementById("music-container-img");
const mainSongName = document.getElementById("music-container-songName");
const mainArtistName = document.getElementById("music-container-artistName");
const inputRange = document.getElementById("input-range");
const volumeRange = document.getElementById("volume-range");
const sliderIconParent = document.getElementById("sliderIconParent");
const mainContainer = document.getElementById("main-container");

let isSidebarOpen = true;

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("play-prev");
const nextBtn = document.getElementById("play-next");

const allSongs = [
    {
        name:"Azul",
        artist:"Guru Randhawa",
        image:"./media/album/azul-song-image.jpg",
        trackName:"Azul.mp3",
    },
    {
        name:"Boyfriend",
        artist:"Karan Aujhla",
        image:"./media/album/boyfriend-song-image.jpg",
        trackName:"Boyfriend.mp3",
    },
    {
        name:"Dooron Dooron",
        artist:"Paresh Pahuja",
        image:"./media/album/dooronDooron-song-image.jpg",
        trackName:"Dooron Dooron.mp3",
    },
    {
        name:"For A Reason",
        artist:"Karan Aujhla",
        image:"./media/album/forAReason-song-image.jpg",
        trackName:"For A Reason.mp3",
    },
];

let currentIndex = 0;
let isPlaying = false;

/* ================= SINGLE AUDIO OBJECT ================= */

const audio = new Audio();

/* ================= LOAD SONG ================= */

function loadSong(index){

    currentIndex = index;

    audio.src = `./media/songs/${allSongs[index].trackName}`;
    audio.load();   // 🔥 Important fix

    mainImgDiv.style.backgroundImage = `url(${allSongs[index].image})`;
    mainImgDiv.style.backgroundSize = "cover";
    mainImgDiv.style.backgroundPosition = "center";

    mainSongName.innerText = allSongs[index].name;
    mainArtistName.innerText = allSongs[index].artist;

    inputRange.value = 0;   // reset slider
}

/* ================= PLAY ================= */

function playSong(){
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

/* ================= PAUSE ================= */

function pauseSong(){
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
}

/* ================= NEXT ================= */

function nextSong(){
    currentIndex++;
    if(currentIndex >= allSongs.length){
        currentIndex = 0;
    }
    loadSong(currentIndex);
    playSong();
}

/* ================= PREVIOUS ================= */

function prevSong(){
    currentIndex--;
    if(currentIndex < 0){
        currentIndex = allSongs.length - 1;
    }
    loadSong(currentIndex);
    playSong();
}

/* ================= DEFAULT LOAD FIRST SONG ================= */

window.addEventListener("DOMContentLoaded",()=>{
    loadSong(0);   // only load UI
});

/* ================= SIDEBAR RENDER ================= */

allSongs.forEach((item,index)=>{

    const songOuterDiv = document.createElement("div");
    const image = document.createElement("img");
    const infoDiv = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    songOuterDiv.classList.add("songOuterDiv");
    image.classList.add("songImg");
    infoDiv.classList.add("songInfoDiv");

    image.src = item.image;
    h3.innerText = item.name;
    p.innerText = item.artist;

    infoDiv.append(h3,p);
    songOuterDiv.append(image,infoDiv);
    sidebar.append(songOuterDiv);

    songOuterDiv.addEventListener("click",()=>{
        loadSong(index);
        playSong();
    });

});

/* ================= PLAY BUTTON ================= */

playBtn.addEventListener("click",()=>{

    if(!isPlaying){
        playSong();
    }else{
        pauseSong();
    }

});

/* ================= NEXT BUTTON ================= */

nextBtn.addEventListener("click",()=>{
    nextSong();
});

/* ================= PREV BUTTON ================= */

prevBtn.addEventListener("click",()=>{
    prevSong();
});

/* ================= SLIDER UPDATE ================= */

audio.addEventListener("timeupdate",()=>{

    if(audio.duration){
        inputRange.value =
            (audio.currentTime / audio.duration) * 100;
    }

});

/* ================= SEEK ================= */

inputRange.addEventListener("input",()=>{

    if(audio.duration){
        audio.currentTime =
            (inputRange.value * audio.duration)/100;
    }

});

/* ================= AUTO NEXT ON END ================= */

audio.addEventListener("ended",()=>{
    nextSong();
});

/*================== VOLUME CONTROL =================*/

volumeRange.addEventListener("input",(e)=>{
    audio.volume = e.target.value / 100;
});

/*=============== SIDEBAR TOGGLE FUNCTIONALITY ============*/

sliderIconParent.addEventListener("click",()=>{
    if(isSidebarOpen){
        mainContainer.style.width="100vw";
        sliderIconParent.style.right="4vw";
        isSidebarOpen=false;
    }else{
        mainContainer.style.width="80vw";
        sliderIconParent.style.right="24vw";
        isSidebarOpen=true;
    }
});
