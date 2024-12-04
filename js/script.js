const d = document
, slider = d.getElementById('slider')
, selector = d.getElementById('selector')
, progressBar = d.getElementById('progressBar')
, covrTag = d.getElementById('coverTag')
, playBtn = d.getElementById('play_btn')
, backWardBtn = d.getElementById('bacward_btn')
, forWardBtn = d.getElementById('forward_btn')
, audioTag = d.getElementById('audioTag')
, nameTag = d.getElementById('nameTag')
, artistTag = d.getElementById('artistTag')
, currentTimeTag = d.getElementById('currentTimeTag')
, durationTimeTag = d.getElementById('durationTimeTag')

const timeLineInputAndUpdate = (value)=> {
  selector.style.left = ((value / audioTag.duration) * 100) + '%'
  progressBar.style.width = ((value / audioTag.duration) * 100) + '%'
  audioTag.currentTime = value
  if (isPlaying) {
    setTimeout(() => {
      playBtn.innerHTML = `<i class="bi bi-pause-fill"></i>`
    }, 50);
  }
};
slider.oninput = (e)=>timeLineInputAndUpdate(e.target.value);

let counter = 0;
let isload = false;
let isPlaying = false;

const timeUpdating = ()=>{

  let currentTime = Math.floor(audioTag.currentTime).toString()
    if (currentTime < 60) {
      currentTime = `00:${currentTime}`
    }else if (currentTime > 59) {
      let math = Math.floor(currentTime / 60)
      currentTime = `${math}:${currentTime - (math * 60)}`
    }else if(currentTime > 3599){
      let math1 = Math.floor(currentTime / 3600)
      let math2 = currentTime - (math1 * 3600)
      let math3 = Math.floor(math2 / 60)
      currentTime = `${math1}:${math3}:${math2 - (math3 * 60)}`
    }
  currentTimeTag.innerHTML = currentTime


  let nandurationTime = Math.floor(audioTag.duration).toString()
  let durationTime = isNaN(nandurationTime) ? '00:00' : nandurationTime
      if (durationTime < 60) {
      durationTime = `00:${durationTime}`
    }else if (durationTime > 59) {
      let math4 = Math.floor(durationTime / 60)
      durationTime = `${math4}:${durationTime - (math4 * 60)}`
    }else if(durationTime > 3599){
      let math5 = Math.floor(durationTime / 3600)
      let math6 = durationTime - (math5 * 3600)
      let math7 = Math.floor(math6 / 60)
      durationTime = `${math5}:${math7}:${math6 - (math7 * 60)}`
    }
  durationTimeTag.innerHTML = durationTime

  selector.style.left = ((audioTag.currentTime / audioTag.duration) * 100) + '%'
  progressBar.style.width = ((audioTag.currentTime / audioTag.duration) * 100) + '%'

  setTimeout(() => {
    if (isPlaying) {
    playBtn.innerHTML = `<i class="bi bi-pause-fill"></i>`
    }
  }, 50);
}
audioTag.ontimeupdate = ()=>timeUpdating();

// suonds is array on data.js
const getSound = ()=>{
covrTag.src = sounds[counter].cover
audioTag.src = sounds[counter].src
nameTag.title = sounds[counter].name
nameTag.innerHTML = sounds[counter].name
artistTag.innerHTML = sounds[counter].artist
};

window.onload = ()=>getSound();

const readyToPlay = ()=>{
  slider.max = Math.floor(audioTag.duration)
  playBtn.innerHTML = `<i class="bi bi-play-fill"></i>`
  isload = true
}

audioTag.oncanplay = ()=>{
  readyToPlay()

  let nandurationTime = Math.floor(audioTag.duration).toString()
  let durationTime = isNaN(nandurationTime) ? '00:00' : nandurationTime
      if (durationTime < 60) {
      durationTime = `00:${durationTime}`
    }else if (durationTime > 59) {
      let math4 = Math.floor(durationTime / 60)
      durationTime = `${math4}:${durationTime - (math4 * 60)}`
    }else if(durationTime > 3599){
      let math5 = Math.floor(durationTime / 3600)
      let math6 = durationTime - (math5 * 3600)
      let math7 = Math.floor(math6 / 60)
      durationTime = `${math5}:${math7}:${math6 - (math7 * 60)}`
    }
  durationTimeTag.innerHTML = durationTime
};

backWardBtn.onclick = ()=>{
  if (counter > 0) {
    counter--
  }else{
    counter = sounds.length - 1
  }
  selector.style.left = 0 + '%'
  progressBar.style.width = 0 + '%'
  playBtn.innerHTML = `<i class="bi bi-hourglass-split"></i>`
  isload = false
  audioTag.pause()
  isPlaying = false
  getSound();
}
forWardBtn.onclick = ()=>{
  if (counter < sounds.length - 1) {
    counter++
  }else{
    counter = 0
  }
  selector.style.left = 0 + '%'
  progressBar.style.width = 0 + '%'
  playBtn.innerHTML = `<i class="bi bi-hourglass-split"></i>`
  isload = false
  audioTag.pause()
  isPlaying = false
  getSound();
};

playBtn.onclick = ()=>{
  if (isload) {
    if (isPlaying) {
      audioTag.pause()
      playBtn.innerHTML = `<i class="bi bi-play-fill"></i>`
      isPlaying = false
    }else{
      audioTag.play()
      playBtn.innerHTML = `<i class="bi bi-pause-fill"></i>`
      isPlaying = true
    }
  }
};

audioTag.onplay = ()=>{
  playBtn.innerHTML = `<i class="bi bi-pause-fill"></i>`
  isPlaying = true
}
audioTag.onpause = ()=>{
  playBtn.innerHTML = `<i class="bi bi-play-fill"></i>`
  isPlaying = false
}