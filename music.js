const nameBlock = document.querySelector('#title span')
const nameWidth = nameBlock.clientWidth
const listBtn = document.querySelector('#list')
const songsContainer = document.querySelector('.songs-container')
console.log(songsContainer.style.display)

listBtn.addEventListener('click', clickList)

function clickList () {
    if(songsContainer.style.display === 'none') {
        songsContainer.style.display = 'block' 
    } else {
        songsContainer.style.display = 'none' 
    }
}

if(nameWidth > 194) {
    nameBlock.classList.add('scroll')
}