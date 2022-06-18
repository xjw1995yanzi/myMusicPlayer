// 1.declare variables
const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

const title = document.getElementById("title");
const cover = document.getElementById("cover");
const currTime = document.querySelector("#currTime");
const durTime = document.querySelector("#durTime");

const songs = [
  "晴天",
  "Slow Dancing In a Burning Room",
  "Stephanie Says",
  "开不了口",
  "天外来物",
  "这世界那么多人",
];
let songIndex = 0;

// console.log(playBtn);
// console.log(prevBtn);
// console.log(nextBtn);

//2. make up all the functions.

//initially load song
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `../music/${song}.mp3`;
  cover.src = `../images/${song}.jpg`;
}

// play song function
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

//pause song function
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

//two change song functions
function preSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  //   const progressPercent =
  // (e.srcElement.currentTime / e.srcElement.duration) * 100;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

//3. add Event Listeners

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//change song events
prevBtn.addEventListener("click", preSong);
nextBtn.addEventListener("click", nextSong);

// audio.addEventListener("timeupdate", updateProgress());
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);
