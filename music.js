const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const shuffBtn = document.querySelector('#shuffle')
const repBtn = document.querySelector('#repeat')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
const nameBlock = document.querySelector('#title span:first-child')





// console.log(songsofList)


//list
const listBtn = document.querySelector('#list')
const songsContainer = document.querySelector('.songs-container')

//songs
const songs = [
    {
        name: 'Summer Time',
        artist: 'Jarico',
        path: 'https://docs.google.com/uc?export=download&id=1EhrYGrrVAtX_lnfYToPI7ZKW1zw7cFiy',
        img: './data/Imgs/Summer Time - Jarico.jpg'
    },

    {
        name: 'Xin Mot Lan Ngoai Le',
        artist: 'Hi Anh Trai',
        path: 'https://docs.google.com/uc?export=download&id=1TSM_owq5VxLWPMgJGTHufcIIGqzOiOwx',
        img: './data/Imgs/xin 1 lan ngoai le.jpg'
    },

    {
        name: 'Careless Whisper',
        artist: 'George Micheal',
        path: 'https://docs.google.com/uc?export=download&id=109TIIlwaTnZhxsv6WNV7opv7vuFffyVd',
        img: './data/Imgs/careless whisper.jpg'
    },

    {
        name: 'Nam Son Nam Dang (Slowed)',
        artist: 'นำแดงนำสม',
        path: 'https://docs.google.com/uc?export=download&id=1k8Ck9pzuWPOlckQ3aY-CT-u7S82qTdW9',
        img: './data/Imgs/nam dang.jpg'
    },

    {
        name: 'Loved By You',
        artist: 'Justin Bieber',
        path: 'https://docs.google.com/uc?export=download&id=1_mrqOxseqxijvurDcYL-GjShPgVGSoNs',
        img: './data/Imgs/loved by you.jpg'
    },

    {
        name: 'Wavin\' Flag Cocacola Celebration Mix',
        artist: 'KNAAN',
        path: 'https://docs.google.com/uc?export=download&id=1YlI9dlJzhG0GhQ75_YgR4yPSxsKHXeRd',
        img: './data/Imgs/wavin flag.jpg'
    },

    {
        name: 'NUEST뉴이스트',
        artist: 'FACE',
        path: 'https://docs.google.com/uc?export=download&id=1-H5bOIYLBUQTcDRLd66rzY3r64q189A1',
        img: './data/Imgs/face nuest.jpeg'
    },

    {
        name: 'Thà Giết Người Yêu',
        artist: 'Trường Vũ',
        path: 'https://docs.google.com/uc?export=download&id=1Q_xT-ohjRBlGnts2y3xjGlOIwNZTXQ52',
        img: './data/Imgs/truo9ng vu.jpg'
    },

    {
        name: 'Legend',
        artist: 'The score',
        path: 'https://docs.google.com/uc?export=download&id=1PlicNwaM9LfRJ6BOVPih3PIfh2zPXKEc',
        img: './data/Imgs/legend.jpg'
    },

    {
        name: 'Lose Yourself',
        artist: 'Eminem',
        path: 'https://docs.google.com/uc?export=download&id=1PUS89PS2tPLgZULoLGq5Lq0huIm_FItq',
        img: './data/Imgs/lose youself.jpg'
    }
]

//keep track of songs
let songIndex = 0


//event listeners
window.addEventListener('DOMContentLoaded', loadList)
playBtn.addEventListener('click', function() {
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})
listBtn.addEventListener('click', clickList)
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended', endSong)
repBtn.addEventListener('click', repeatSong)
shuffBtn.addEventListener('click', shuffleSong)



//load list songs 
function loadList () {
    
    //load information
    songs.forEach(asong => {
        const song = document.createElement('div')
        const songImg = document.createElement('img')
        const songInfo = document.createElement('div')
        const songName = document.createElement('h5')
        const songArtist = document.createElement('p')
        song.classList.add('song')
        songImg.classList.add('song-img')
        songInfo.classList.add('song-info')
        songName.classList.add('song-name')
        songArtist.classList.add('song-artist')
        song.appendChild(songImg)
        song.appendChild(songInfo)
        songInfo.appendChild(songName)
        songInfo.appendChild(songArtist)
        songsContainer.appendChild(song)
        songName.innerText = asong.name
        songArtist.innerText = asong.artist
        songImg.setAttribute('src', asong.img)
    }) 
    

    //click song
    const allSongs = document.querySelectorAll('.song')
    allSongs.forEach(function(song, index) {
        song.addEventListener('click', function() {
            loadSong(songs[index])
            playSong();
            songsContainer.style.display = 'none' 
        })
    })
}


//load song
loadSong(songs[songIndex])
//load song
function loadSong (songobj) {
    stopScroll()
    nameBlock.innerText = songobj.name + ' - ' +songobj.artist;
    audio.src = songobj.path;
    cover.src = songobj.img;
}

//playsong
function playSong () {
    scroll()
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

//pause song
function pauseSong () {
    stopScroll()
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    audio.pause()
} 

//prevsong
function prevSong () {
    if(repBtn.classList.contains('active')) {
        loadSong(songs[songIndex])
        playSong()
    } else if (shuffBtn.classList.contains('active')) {
        randomIndex = Math.floor(Math.random()*songs.length)
        if(randomIndex === songIndex) {
            songIndex = randomIndex + 1
        } else {
            songIndex = randomIndex
        }
        loadSong(songs[songIndex])
        playSong()
    } else {
        songIndex--
        if(songIndex < 0) {
            songIndex = songs.length - 1
        }
    
        loadSong(songs[songIndex])
        playSong()
    }

}

//nextsong
function nextSong () {
    if (shuffBtn.classList.contains('active')) {
        randomIndex = Math.floor(Math.random()*songs.length)
        if(randomIndex === songIndex) {
            songIndex = randomIndex + 1
        } else {
            songIndex = randomIndex
        }
        loadSong(songs[songIndex])
        playSong()
    } else {
        songIndex++
        if(songIndex > songs.length - 1) {
            songIndex = 0
        }
        loadSong(songs[songIndex])
        playSong()
    }
    
}

//update progress
function updateProgress (e) {
    // console.log(e.srcElement.currentTime)
    let currentTime = e.srcElement.currentTime
    const songDuration = e.srcElement.duration
    const progressPercent = (currentTime / songDuration) * 100
    progress.style.width = `${progressPercent}%`
}

//set Progress
function setProgress (e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration;
    playSong()
}

//end song
function endSong () {
    if(repBtn.classList.contains('active')) {
        playSong()
    } else if (shuffBtn.classList.contains('active')) {
        randomIndex = Math.floor(Math.random()*songs.length)
        if(randomIndex === songIndex) {
            songIndex = randomIndex + 1
        } else {
            songIndex = randomIndex
        }
        loadSong(songs[songIndex])
        playSong()
    } else {
        songIndex++
        if(songIndex > songs.length - 1) {
            songIndex = 0
        }
        loadSong(songs[songIndex])
        playSong()
    }
}

//repeat Song
function repeatSong () {
    if(repBtn.classList.contains('active')) {
        repBtn.classList.remove('active')
    } else {
        repBtn.classList.add('active')
    }
}

//shuffle Songs
function shuffleSong () {
    if(shuffBtn.classList.contains('active')) {
        shuffBtn.classList.remove('active')
    } else {
        shuffBtn.classList.add('active')
    }
}

//list reveal
function clickList () {
    if(songsContainer.style.display === 'none') {
        songsContainer.style.display = 'block' 
    } else {
        songsContainer.style.display = 'none' 
    }
}


//title scroll
function scroll () {
    const nameWidth = nameBlock.clientWidth
    if(nameWidth > 194) {
        nameBlock.classList.add('scroll')
    } else {
        nameBlock.classList.remove('scroll')
    }
    
}

function stopScroll () {
    nameBlock.classList.remove('scroll')
}

