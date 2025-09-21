// Basic player and content displayer logic
const fileInput = document.getElementById('fileInput');
const mediaWrapper = document.getElementById('mediaWrapper');
const playPauseBtn = document.getElementById('playPause');
const stopBtn = document.getElementById('stop');
const seek = document.getElementById('seek');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volume = document.getElementById('volume');
const loop = document.getElementById('loop');
const contentArea = document.getElementById('contentArea');
const clearText = document.getElementById('clearText');
const loadSample = document.getElementById('loadSample');

let media = null; // audio or video element

function formatTime(s){
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s/60);
  const sec = Math.floor(s%60).toString().padStart(2,'0');
  return `${m}:${sec}`;
}

function resetPlayer(){
  if(media){
    media.pause();
    try{ URL.revokeObjectURL(media.src); }catch(e){}
  }
  mediaWrapper.innerHTML = '<div class="placeholder">No media loaded</div>';
  media = null;
  playPauseBtn.disabled = true;
  stopBtn.disabled = true;
  seek.disabled = true;
  seek.value = 0;
  currentTimeEl.textContent = '0:00';
  durationEl.textContent = '0:00';
}

function attachMediaObject(url, type){
  const isVideo = type && type.startsWith('video');
  media = document.createElement(isVideo ? 'video' : 'audio');
  media.controls = false;
  media.src = url;
  media.preload = 'metadata';
  media.style.maxHeight = '100%';
  media.style.maxWidth = '100%';
  mediaWrapper.innerHTML = '';
  mediaWrapper.appendChild(media);

  // wire events
  media.addEventListener('loadedmetadata', ()=>{
    durationEl.textContent = formatTime(media.duration);
    seek.disabled = false;
    playPauseBtn.disabled = false;
    stopBtn.disabled = false;
    seek.max = Math.max(0, media.duration);
  });

  media.addEventListener('timeupdate', ()=>{
    currentTimeEl.textContent = formatTime(media.currentTime);
    if(!seek.dragging) seek.value = media.currentTime;
  });

  media.addEventListener('ended', ()=>{
    playPauseBtn.textContent = 'Play';
  });

  volume.addEventListener('input', ()=>{
    if(media) media.volume = parseFloat(volume.value);
  });

  loop.addEventListener('change', ()=>{
    if(media) media.loop = loop.checked;
  });
}

fileInput.addEventListener('change', (e)=>{
  const f = e.target.files && e.target.files[0];
  if(!f) return;
  resetPlayer();
  const url = URL.createObjectURL(f);
  attachMediaObject(url, f.type);
});

// drag and drop onto label
const label = document.querySelector('.file-label');
label.addEventListener('dragover', (e)=>{ e.preventDefault(); label.classList.add('drag'); });
label.addEventListener('dragleave', ()=>{ label.classList.remove('drag'); });
label.addEventListener('drop', (e)=>{
  e.preventDefault(); label.classList.remove('drag');
  const f = e.dataTransfer.files && e.dataTransfer.files[0];
  if(!f) return;
  fileInput.files = e.dataTransfer.files;
  const url = URL.createObjectURL(f);
  resetPlayer();
  attachMediaObject(url, f.type);
});

playPauseBtn.addEventListener('click', ()=>{
  if(!media) return;
  if(media.paused){ media.play(); playPauseBtn.textContent = 'Pause'; }
  else { media.pause(); playPauseBtn.textContent = 'Play'; }
});

stopBtn.addEventListener('click', ()=>{
  if(!media) return;
  media.pause();
  media.currentTime = 0;
  playPauseBtn.textContent = 'Play';
});

let seeking = false;
seek.addEventListener('input', ()=>{
  if(!media) return;
  seeking = true;
  currentTimeEl.textContent = formatTime(seek.value);
});
seek.addEventListener('change', ()=>{
  if(!media) return;
  media.currentTime = parseFloat(seek.value);
  seeking = false;
});

// content displayer controls
clearText.addEventListener('click', ()=>{ contentArea.value = ''; });
loadSample.addEventListener('click', ()=>{
  contentArea.value = `Sample content:\n\nThis is an example text loaded into the content displayer. Use this area to paste any notes, transcripts, or captions that go with the media.`;
});

// init
resetPlayer();
