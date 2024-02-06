import mySongs from "../../my songs.js";


const songListContainer = document.querySelector(".box-container-songs")
const shopSection = document.querySelector(".shop")
const moreSongs = document.querySelector(".MoreSongsBtn")
const PlayMusicModal = document.querySelector(".playMusicModal")
const overlay = document.querySelector(".overlay")
const closeModal = document.querySelector(".close-modal")
const ImagePopPup = document.querySelector(".musicImagePopUp")
const titleMusic = document.querySelector(".titleMusic")
const artistName = document.querySelector(".artistName")
const playIcon = document.querySelector(".playIcon")
const readmoreebtn = document.querySelector(".readmorebtn")
const optionMusic = document.querySelector(".optionMusic")
const hamburgerPlayIcon = document.querySelector(".hamburgerPlayIcon")
const myAudio = document.querySelector("#myAudio");
const audioSource = myAudio.querySelector('.audioSource');
const myAudiolistTopSongs = document.querySelector("#myAudiolistTopSongs")
const playbtn = document.querySelector(".playbtn")
const playback = document.querySelector(".playback")
const playforward = document.querySelector(".playforward")
const progressMusicBar = document.querySelector("#progressMusicBar")
const gallery = document.querySelector(".box-gallery")
const spinner = document.querySelector(".spinner-border")
const Body = document.body
// //////////////////////////////// FORM ACTION /////////////////////////////////
const submitBtn = document.querySelector(".submitBtn")
const formInputName = document.querySelector(".formInputName")
const EmailInput = document.querySelector(".emailInput")
const formNumberInput = document.querySelector(".formNumberInput")
const formSubjectInput = document.querySelector(".formSubjectInput")
const textareaInput = document.querySelector(".textareaInput")
// /////// Top Songs //////////////////////////////////////////////
const dynamicGrid = document.getElementById('dynamicGrid');
const songContainerList = document.querySelectorAll(".grid-item")



let songlistnumDisplay  = 6
let startListnum = 0
let pageNum = 0
let navbar = document.querySelector('.navbar');
let id
let loaded = false





document.querySelector('#menu').onclick = () =>{
    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
}


$(document).ready(function(){

    $('.button').click(function(){
        $(this).addClass('active').siblings().removeClass('active');

        var filter = $(this).attr('data-filter')

        if(filter == 'all'){
            $('.gallery .image').show(400);
        }
        else{
            $('.gallery .image').not('.' +filter).hide(200);
            $('.gallery .image').filter('.' +filter).show(200);
        }

    });

    $('.gallery').magnificPopup({
        delegate:'a',
        type:'image',
        gallery:{
            enabled:true,
        }
    });

});

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })



const DisplaySongs = function(){

let songDisplayList = mySongs.slice(startListnum,songlistnumDisplay )

 let songsTemplate =  songDisplayList.map((el,i) => {

return  `
                <div class="box songbox">
                    <div class="image">
                        <img src=${el.coverImg} alt="">
                        <div class="share">
                            <a  class="fas fa-heart" data-info=${i}></a>
                        </div>
                    </div>
                    <div class="content">
                        <h3>${el.name}</h3>
                        <svg
                            class="audioPlayIcon ${i}"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License -
                            https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                            <path  class="audioPlayIcon ${i}" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 
                            20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                            />
                        </svg>
                    </div>
                </div>    `
        
    })
   
    songListContainer.innerHTML = songsTemplate.join("")
    
}
DisplaySongs()




const AddMoreSongs = function(){
let mySongList = mySongs.length

 let pageNumber = Math.floor(+mySongList / +songlistnumDisplay)

  if(pageNumber === 1) {
    songlistnumDisplay = 6
    startListnum = 0
  }else{
    startListnum  += +songlistnumDisplay
    songlistnumDisplay +=  songlistnumDisplay
    pageNum++
  }


 DisplaySongs()
}


    


const openModal = function(e){
    e.preventDefault()
    
    if(!(e.target.tagName === 'svg' || e.target.tagName === 'path' ))  return
    
    

    // Calculate the position based on the viewport size
    let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    let viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Set the modal position
    let modalWidth = PlayMusicModal.offsetWidth;
    let modalHeight = PlayMusicModal.offsetHeight;
    let leftPosition = (viewportWidth - modalWidth) / 2;
    let topPosition = (viewportHeight - modalHeight) / 2;
    
    PlayMusicModal.style.left = leftPosition + 'px';
    PlayMusicModal.style.top = topPosition + 'px';
    
    
    PlayMusicModal.classList.remove("hidden") 
    overlay.classList.remove("hidden")
    
    if( e.target.tagName === 'svg' ||  e.target.tagName === "path"){
        id = e.target.className.animVal.slice(-1)
    }else{
            return
    }

        let songId = mySongs[id]
        ImagePopPup.src = songId.coverImg
        titleMusic.textContent = songId.name
        artistName.textContent = songId.description
        audioSource.src = `${songId.song}`
        console.log(audioSource)
        myAudio.load()
        myAudio.addEventListener('loadeddata', function () {
        spinner.style.display = 'none';
        playbtn.classList.remove("hide")

    });
    
    if( playbtn.name === "pause-outline") playbtn.name = "play"
    
}


const CloseModal = function(e){
    PlayMusicModal.classList.add("hidden")
    overlay.classList.add("hidden")
}

const ToggleRead = function(){
    document.querySelector(".aboutlist").classList.toggle("hidden")
    readmoreebtn.textContent = "Read Less"
    
    if(document.querySelector(".aboutlist").className.includes("hidden")){
        readmoreebtn.textContent = "Read More"
    }
}

const DisplayOptions = function(){
    optionMusic.classList.toggle("closedSlide")
    optionMusic.classList.toggle("openslide")
}

const playBtnFunc = function(){
  
    if(myAudio.paused){
        myAudio.play()
        playbtn.name = "pause-outline"
    }else{
        myAudio.pause()
        playbtn.name = "play"
    
    }
}

const scrollFunc = function(e){
    const observer = new IntersectionObserver(callback, {threshold: 0.1});
    observer.observe(shopSection)
    
    function callback(entries, observer) {
        entries.forEach(entry => {
            // Perform actions based on entry data
            if (entry.isIntersecting) {
                moreSongs.classList.remove("hidden")
                moreSongs.classList.add("fixedel")
            } else {
                moreSongs.classList.remove("fixedel")
                moreSongs.classList.add("hidden")
            }
        });
    }
}

const progressMusicBarChange = function(){
    myAudio.play()
    myAudio.currentTime = progressMusicBar.value
    playbtn.name = "pause-outline"
}

const LoadedMetaDataFunc = function(){
    progressMusicBar.max = myAudio.duration
    progressMusicBar.value = myAudio.currentTime
}

const DOMContentLoadedFunc = function(){
    songListContainer.onclick = function(e){

        if(!(e.target.tagName === "A")) return

       e.target.classList.toggle("activeLikes")
       let songData = mySongs[e.target.getAttribute("data-info")]
        songData.likes++  
    }
}

const  sendEmail = function(e){
    e.preventDefault()

    emailjs.init("CsuFNGnYrrCgb9_zP");

    const params = {
        to: "samunama8@gmail.com",
        subject: formSubjectInput.value,
        message: textareaInput.value,
        from: EmailInput.value,
        senderName: formInputName.value,
        phoneNumber: formNumberInput.value
    }

    let serviceID = "service_d0750iq" // Email serviceID
    let templateID = "template_uav1b2f" //Email TemplateID

    emailjs.send(serviceID,templateID,params)
    .then(res => {
        alert("Email Sent Successfully")
    })
    .catch(err => {
        console.log(err)
    })
    
    formSubjectInput.value = "",
   textareaInput.value = "",
   EmailInput.value = "",
    formInputName.value = "",
    formNumberInput.value = ""
}



const DisplaybottomOptions = function(e){
    var player = document.getElementById('musicPlayerOptionBottom');
    if (player.style.bottom === '-100%') {
      player.style.bottom = '0'; // Slide up the player
    } else {
      player.style.bottom = '-100%'; // Slide down the player
    }
}
// Example data (you can replace this with your actual data)
{/* <ion-icon name="pause-circle" class="playSongIcon pause hide" ></ion-icon> */}

// Function to create and append grid items
function createGridItem(content,i) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');

            let songTemplate = ` 
                                <div class="musicPlayImage" style="background-image: url(${content.coverImg});">
                                    <div class="music-loader">
                                        <ion-icon name="caret-forward-circle" class="playSongIcon play" data-info="${i}"></ion-icon>
                                        
                                        <div class="spinner-border text-light hide" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="musicdetails">
                                    <div>
                                        <h4>Big Man Thing</h4>
                                        <p>Samuna</p>
                                    </div>
                                    <div>
                                        <span><a href="https://audiomack.com/Samuna"><ion-icon name="musical-note-outline"></ion-icon>AudioMark</a></span>
                                        <bold><ion-icon name="ellipsis-vertical-outline" class="optionsdetails" ></ion-icon></bold>
                                        <!-- <ion-icon name="pause-circle"></ion-icon> -->
                                    </div>
                                </div>
                          
            `

            gridItem.innerHTML = songTemplate;
            gridItem.querySelector(".optionsdetails").addEventListener("click",DisplaybottomOptions.bind(this))
            dynamicGrid.appendChild(gridItem);
           
        }

        // Add content dynamically
mySongs.forEach((content, index) => {
            // Create a new column for every three items
            if (index % 3 === 0) {
                dynamicGrid.style.gridTemplateColumns += ' 1fr';
            }
            createGridItem(content,index);
        });


const playPauseSong = function(e){
            if(!(e.target.className.includes("playSongIcon"))) return
       
            let playBtn = e.target
            let spinner = playBtn.nextElementSibling
            let songId = e.target.getAttribute("data-info")
          
            if(!(e.target.getAttribute("data-info") === songId)) return
        
            if(playBtn.name === "caret-forward-circle"){
        
                let songData = mySongs[songId]
        
                spinner.classList.remove("hide")
                playBtn.style.display ="none"
                myAudiolistTopSongs.src = songData.song
                myAudiolistTopSongs.load()
        
                myAudiolistTopSongs.addEventListener('loadeddata', function () {
                    spinner.classList.add("hide") 
                    playBtn.style.display ="block"
                   loaded = true     
                    myAudiolistTopSongs.play()
                });
        
                setTimeout(() => {
                    loaded ?  playBtn.name = "pause-circle" : ""    
                }, 1000);
                
        }else
          {
            playBtn.name = "caret-forward-circle"
            myAudiolistTopSongs.pause()
        } 
        
            }

            

// Event Listeners //////////////////////////////////////////////////////////////////
moreSongs.addEventListener("click", AddMoreSongs)

playIcon.addEventListener("click",CloseModal.bind(this))

songListContainer.addEventListener("click",openModal.bind(this))

// Read More 
readmoreebtn.addEventListener("click",ToggleRead)

// Hambuger Display
hamburgerPlayIcon.addEventListener("click", DisplayOptions )

// Play/pause Song
playbtn.addEventListener("click", playBtnFunc)


// Add More Songs
// Enable Fixed Scrolling
window.addEventListener("scroll",scrollFunc.bind(this))

myAudiolistTopSongs.addEventListener("timeupdate", () =>  progressMusicBar.value = myAudio.currentTime)

myAudio.addEventListener("loadedmetadata", LoadedMetaDataFunc)

// Progress Bar
progressMusicBar.addEventListener("change",  progressMusicBarChange)

// Rewind
playback.addEventListener("click", ()=> myAudio.currentTime -= 2)
// Fast Forward
playforward.addEventListener("click", ()=>myAudio.currentTime += 2)

document.addEventListener("DOMContentLoaded", DOMContentLoadedFunc)

submitBtn.addEventListener("click", sendEmail.bind(this))
// /////// Top Songs //////////////////////////////////////////////
dynamicGrid.addEventListener("click", playPauseSong.bind(this)) 
// /////// Top Songs //////////////////////////////////////////////

// Event Listeners //////////////////////////////////////////////////////////////////