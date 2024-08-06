console.log("Welcome to Music");

let songIndex = 0;
let audioElement = new Audio('songs/Dhoom Dhaam Dhosthaan.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let song = Array.from(document.getElementsByClassName('songs'));

let songItems=[
    {songName: "Dhoom Dhaam Dhosthaan", filePath: "songs/Dhoom Dhaam Dhosthaan.mp3"},
    {songName: "Mass Raja", filePath: "songs/Mass Raja.mp3"},
    {songName: "All Most Padipoyinde Pilla", filePath: "songs/All Most Padipoyinde Pilla.mp3"},
    {songName: "Thaar Maar Thakkar Maar", filePath: "songs/Thaar Maar Thakkar Maar.mp3"},
    {songName: "Pranam Pothunna", filePath: "songs/Pranam Pothunna.mp3"},
    {songName: "Ninnele", filePath: "songs/Ninnele.mp3"},
    {songName: "Jai Balayya Mass Anthem", filePath: "songs/Jai Balayya Mass Anthem.mp3"},
]

song.forEach((element, i)=>{ 
    element.getElementsByClassName("songName")[0].innerText = songItems[i].songName; 
})

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle-o');
        masterPlay.classList.add('fa-pause-circle-o');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle-o');
        masterPlay.classList.add('fa-play-circle-o');
    }
})
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    progressBar.value = progress;
})

progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle-o');
            masterPlay.classList.add('fa-pause-circle-o');
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle-o');
            masterPlay.classList.add('fa-play-circle-o');
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=7){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songItems[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})
