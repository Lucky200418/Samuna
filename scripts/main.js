"use strict"
import mySongs from "../../my songs.js";
import albums from "../../myAlbums.js";

const musicListBox = document.querySelector(".musicListBox")
const myAudio = document.querySelector("#myAudio");
const musicContainerbtn = document.querySelector(".musicContainerbtn")

// ALBUM DOMS
const playAllAlbum = document.querySelector(".playAllAlbum")

// /////// Album Dom
const albumDisplayContainer = document.querySelector(".albumDisplayContainer")
const mainSiteContainer = document.querySelector(".mainSiteContainer")
const albumboxContainer= document.querySelectorAll(".AlbumBox")
const albumBtn = document.querySelector(".albumBtn")



let sortedArr = [...mySongs];
let clicks = 1
let curSondId = 0
let defaultPlayAll = false
let albumName

let Isalbum = false
let albumArr = []



let curSong 


const styleaTag = function(){
   const images = [...document.querySelectorAll(".party")]
   images.forEach(el=>{
    el.style.display = ""
})
}


const musicList = function(songArr){

  let musiclistdata =   songArr.map((el,i)=>{
    
    return `
        <li class="musicListItem ${i}">
            <div class="musicListItem--1">
                <p class="music-num">0${i}</p>
                <div class="music-details">
                    <img src=${el.coverImg}>
                    <div class="music-name">
                        <span>Mobe Grick</span>
                        <span>Rick Grick</span>
                    </div>
                </div>
            </div>
            <div class="music-settings ${i}">
                <ion-icon name="play" class="musiclistplaybtn"></ion-icon>
                <div>
                    <ion-icon name="ellipsis-horizontal-outline" class="musicdetails"></ion-icon>
                    <div class="musicspopUp  hidden">
                        <p class="popupOption"><a href="https://audiomack.com/Samuna">AudioMark</a></p>
                        <p class="popupOption"><a href="">sportify</a></p>
                        <p class="popupOption">Like <ion-icon name="heart" class="likebtn ${el.likes >= 1 && "liked"}"></ion-icon></p>
                    </div>
                </div>
            </div>
        </li>    
`
})


musicListBox.innerHTML =  musiclistdata.join("")
}

musicList(albumArr)


const Options = function(e){
    if(e.target.innerText.includes("Like")){
    // add liked to icon
    e.target.children[0].classList.add("liked")
    let LikedSongid = e.target.parentElement.parentElement.parentElement.className.slice(-1)
    let likedSong = mySongs[LikedSongid]
    likedSong.likes++
    }
}



const playSong = function(e){
        if(e.target.className.includes("musiclistplaybtn")){
            let el = e.target
            let id = +e.target.parentElement.className.slice(-1)

            if(el.name === "play"){
                defaultPlayAll = true;
                curSong = mySongs[id];
                myAudio.src = curSong.song;
                myAudio.load();
                myAudio.play()
                el.name = "pause-outline"
            }
           else{
                myAudio.pause()
                el.name = "play"
           }

        }

}

 const ShuftleBtn = function(){

        if(clicks === 2){
            sortedArr = []
            albumArr.forEach(el => {
                sortedArr.push(el) 
            })
            clicks--
            musicList(sortedArr)
        } 
        else{
            sortedArr = []
            albumArr.forEach(el => {
                sortedArr.unshift(el) 
            })
            
                clicks++
            musicList(sortedArr)

        }
}

const setPausePlay = function(songList,status = "pause-outline"){
    let curSong =  songList.find(el => {
        return el.className.includes(curSondId) ? el : ""
    })
    curSong.querySelector(".musiclistplaybtn").name = status
    }
    
    
const playAllSongs = function(songStatus){
    let songList =  [...musicListBox.children]
 
    defaultPlayAll = false
    setPausePlay(songList, songStatus)
    
    myAudio.src = sortedArr[curSondId].song
    myAudio.load()
    myAudio.play()
}

const SongEnded = function(){
    if(curSondId <= sortedArr.length && !defaultPlayAll){
        setPausePlay([...musicListBox.children],"play")
        curSondId++
        playAllSongs()
    }
}
const DisplayOptionPopUp = function(){
    let popup = e.target.nextElementSibling
    popup.classList.toggle("hidden") 
}


//Display the right album
const displayAlbums = function(e){
    albumName = e.target.getAttribute("data-info")
    

     albumArr = mySongs.filter(album =>{
        return album.albumName === albumName.toLowerCase() ? album : ""
    })
    // Store Albums in local storage
    // Display music List
    musicList(albumArr)
    
    // AddEventListeners for Alnum songs to click and play
    musicListBox.querySelectorAll(".musicListItem ")?.forEach(el =>{   
        el.querySelector(".musiclistplaybtn")
        .addEventListener("click", playSong.bind(this) )
    })
    
    // Add EventListeners for popups to click and drop
    document.querySelectorAll(".musicdetails").forEach(el =>{
        el.addEventListener("click", el => el.target.nextElementSibling?.classList.toggle("hidden")) 
    })
    
    // Options Funcs
    const popupOptions =  document.querySelector(".musicspopUp").querySelectorAll(".popupOption")
    popupOptions.forEach(el => el.addEventListener("click",  Options.bind(this)))
    
    
    albumDisplayContainer.classList.remove("hidden")
    albumDisplayContainer.style.backgroundImage =  `url(${albumArr[0].albumSrcImage})`;
    mainSiteContainer.innerHTML = ""
    Isalbum = true
}

const DisplayAlbumOptionList = function(e){
    let popup = e.target.nextElementSibling
    popup.classList.toggle("hidden")
}



const AddLikes = function(){
    let curAlbum = albums.filter(album =>{
         return album.albumName === albumName.toLowerCase() ? album : ""
     })
 
     curAlbum[0].likes++
     document.querySelector(".likebtnAlbum").classList.toggle("liked")
 }



// ////// EVENT LISTENERS /////////////////////////////////


myAudio.addEventListener("ended" , SongEnded)

musicContainerbtn.addEventListener("click", ShuftleBtn )

musicListBox.querySelector(".musicdetails")?.addEventListener("click",DisplayOptionPopUp.bind(this))

// /Album list
let allalbums = [...albumboxContainer]  
// AddEventListners to listButtons
allalbums.forEach(el=>{  
    el.querySelector(".viewAblbumBtn").addEventListener("click", displayAlbums.bind(this))
})

// shufle song list
albumBtn.addEventListener("click", ShuftleBtn)

// playall album
playAllAlbum.addEventListener("click", () => playAllSongs("pause-outline"))




musicListBox.querySelector(".musicdetails")?.addEventListener("click", DisplayAlbumOptionList.bind(this))

// })
document.querySelector(".likebtnAlbum").addEventListener("click", AddLikes)
