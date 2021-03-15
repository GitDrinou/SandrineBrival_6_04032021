/**
 * VARIABLES Declaration
 * CONST and LET
 * -------------------------------------------------------------------------
*/
const dropMenuItems = document.querySelector(".dropdown-items");
const dropFilterLink = document.querySelector(".filter-dropdown_link");  
const dropFilterIcon = document.getElementById("filterIcon");
const dropFilterItems = document.querySelectorAll(".dropdown-items_link");
const dropFilterItem0 = document.getElementById("filter-0");
const dropFilterItem1 = document.getElementById("filter-1");
const dropFilterItem2 = document.getElementById("filter-2");
const dropFilterSelected = document.getElementById("filter-selected");
const photographerDetails = document.querySelector(".idDetails");
const photographerPicture = document.querySelector(".idPicture");
const photographerWorks = document.querySelector(".b-works");
const myMedias = document.querySelectorAll(".medias-card");
const myLightModal = document.getElementById("lightbox");
const closeBtn = document.querySelector(".close-lightbox");
const myContentLight = document.querySelector(".modalLight-content");
const prevIcon = document.querySelector(".previous");
const nextIcon = document.querySelector(".next");
const requestURL = "../js/json/FishEyeDataFR.json";

let parsedUrl = new URL(window.location.href);
const request = new XMLHttpRequest();
const idWorker = parsedUrl.searchParams.get("id")
const filterType = parsedUrl.searchParams.get("filt");
let filterTag = parsedUrl.searchParams.get("tag");

let photographer;
let myFilterMedias = [];
let myTagFilterMedias = [];
let myContentModalMedias = [];
let aggLikes = 0;
let lenTagArray = 0;
let dayPrice;


/**
 * CALL JSON FILE
 * Description : 
 *      onload  > create object "photographer" for the JSON request response
 *              > call the function showAllDatas with the photographer object as parameter
 * -----------------------------------------------------------------------------------------------------
 */
       
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function() {
    photographer = request.response;
    showAllDatas(photographer);
}

/**
 * FUNCTION showAllDatas(object JSON)
 * Description : 
 *      > PART 1 : display the photographer informations (name, picture, slogan, ...) according the URL parameter "id"
 *      > PART 2 : create an array "myFilterMedias" of the photographer's medias 
 *      > PART 3 : according the url parameter "filt" the array "myFilterMedias" will be filtered by popularity, date or title
 *      > PART 4 : reload page and replace the value of the tag utl parameter according the tag selected by the user
 *      > PART 5 : create a new array "myTagFilterMedias" according the url parameter "tag" selected for filter and display the right medias
 *      > PART 6 : condition to replace the myFilterMedias content by myTagFilterMedias content
 *      > PART 7 : display the photographer's medias with the myFilterMedias's array
 *      > PART 8 : display the price per day, total likes
 *      > PART 9 : condiguration of the lightbox modal
 *      > PART 10 : functions for animate and displaying lightbox modal
 * ----------------------------------------------------------------------------------------------------------------------------
 */

function showAllDatas(obj) {

    // PART 1 -----------------------------------------------------------------------
    let photographerInfo = obj["photographers"];
    for (let info of photographerInfo) {
        if (info.id == idWorker) {
            let myH1 = document.createElement("h1");
            let myLocation = document.createElement("p");
            let mySlogan = document.createElement("p");
            let myIDPicture = document.createElement("img");
            let myTagsList = document.createElement("ul");
            let listTags = info.tags;

            for (let tag of listTags) {
                let myTags = document.createElement("li");
                let myTagsLink = document.createElement("a");
                myTagsLink.textContent = tag;
                myTags.classList.add("idDetails_tagg_link");
                myTagsList.appendChild(myTags);
                myTags.appendChild(myTagsLink);
            }

            myH1.textContent = info.name;
            myH1.classList.add("title-photographer"); 
            myLocation.textContent = info.city + ", " + info.country;
            myLocation.classList.add("idDetails_city");
            mySlogan.textContent = info.tagline;
            mySlogan.classList.add("idDetails_slogan");
            myTagsList.classList.add("idDetails_tagg");
            myIDPicture.src = "../images/IDPhotos/"+ info.portrait;
            myIDPicture.alt = "Vignette " + info.name;
            myIDPicture.classList.add("photographer_photo");
            
            photographerDetails.appendChild(myH1);
            photographerDetails.appendChild(myLocation);
            photographerDetails.appendChild(mySlogan);
            photographerDetails.appendChild(myTagsList);
            photographerPicture.appendChild(myIDPicture);

            dayPrice = info.price;
        }
    } 
    // End >> PART 1 -----------------------------------------------------------------------
    
    // PART 2 -----------------------------------------------------------------------
    let photographerWork = obj["media"];     
    myFilterMedias.splice(0,myFilterMedias.length);  
    for (let photographerMedia of photographerWork) {
        if (photographerMedia.photographerId == idWorker) {
            myFilterMedias.push(
                { 
                    "id": photographerMedia.id,
                    "likes": photographerMedia.likes,
                    "date": photographerMedia.date,
                    "title": photographerMedia.title,
                    "tag" : photographerMedia.tags
                }
            );  
            aggLikes += photographerMedia.likes;      
        }           
    }
    // End >> PART 2 -----------------------------------------------------------------------

    // PART 3 -----------------------------------------------------------------------      
    switch (filterType) {
        case "Popular" : 
            myMediasFactory.createMedias("Popular");
            break;
        case "Date" : 
            myMediasFactory.createMedias("Date");
            break;
        case "Title" : 
            myMediasFactory.createMedias("Title"); 
            break;
    }
    // End >> PART 3 -----------------------------------------------------------------------

    // PART 4 -----------------------------------------------------------------------   
    const tagItems = document.querySelectorAll(".idDetails_tagg_link");
    tagItems.forEach(item => {
        item.addEventListener('click', function(e) {  
            let myItem = (filterTag!="oof") ? item.textContent : filterTag;
            e.preventDefault();
       
            for (let myMedia of myFilterMedias) {
                for (let j=0; j < myMedia.tag.length; j++) {
                    if (myItem == myMedia.tag[j] || filterTag == myMedia.tag[j]) {
                        document.location.assign(document.URL.replace(document.URL.substring(document.URL.indexOf("&tag=")),"&tag=" + myItem));
                    }                   
                }
            }                  
        });
    }); 
    // End >> PART 4 -----------------------------------------------------------------------

    // PART 5 -----------------------------------------------------------------------   
    for (let tagMedia of myFilterMedias) {
        if (filterTag !=null && filterTag !="off" && filterTag == tagMedia.tag) {
            myTagFilterMedias.push(
                { 
                    "id": tagMedia.id,
                    "likes": tagMedia.likes,
                    "date": tagMedia.date,
                    "title": tagMedia.title,
                    "tag" : tagMedia.tag
            }); 
        }
    }
    // End >> PART 5 -----------------------------------------------------------------------

    // PART 6 -----------------------------------------------------------------------   
    if (filterTag !=null && filterTag !="off") {
     myFilterMedias = myMediasFactory.createMedias("Tag").array;
    }
    // End >> PART 6 -----------------------------------------------------------------------

    // PART 7 -----------------------------------------------------------------------      
    let myList = document.createElement("ul"); 
    let cpt = 1;  
    for (let filterMedia of myFilterMedias) {
       
        for (let photographerMedia of photographerWork) {
            if((filterMedia.id === photographerMedia.id) && (photographerMedia.photographerId == idWorker)) {                            
                let myWorks = document.createElement("li");                
                myWorks.setAttribute("id",filterMedia.id);
                myWorks.classList.add("medias-card");
                if ((photographerMedia.image !== null) && (photographerMedia.video == null)){    
                    let myMediaImage = document.createElement("img");            
                    myMediaImage.src = "../images/Medias/" + idWorker + "/" + photographerMedia.image;
                    myMediaImage.classList.add("vignette");
                    myMediaImage.setAttribute("id", cpt )
                    myMediaImage.setAttribute("alt", photographerMedia.title);
                    myWorks.appendChild(myMediaImage);
                }
                if ((photographerMedia.video !== null) && (photographerMedia.image == null)){  
                    let myMediaVideo = document.createElement("video");
                    myMediaVideo.src = "../images/Medias/" + idWorker + "/" + photographerMedia.video;
                    myMediaVideo.classList.add("vignette");
                    myMediaVideo.setAttribute("id", cpt)
                    myWorks.appendChild(myMediaVideo);
                }

                let myPictureInfo = document.createElement("div");
                let myPictureText = document.createElement("span");
                let myPicturePrice = document.createElement("span");
                let myPictureLikes = document.createElement("span");
                
                myPictureText.textContent = photographerMedia.title;
                myPicturePrice.textContent = photographerMedia.price + " €";
                myPictureLikes.innerHTML = photographerMedia.likes + " <i class='fas fa-heart'></i>";

                myPictureInfo.classList.add("b-pictureInfo");
                myPictureText.classList.add("mediaText");
                myPicturePrice.classList.add("mediaPrice");
                myPictureLikes.classList.add("mediaLikes");

                myPictureInfo.appendChild(myPictureText);
                myPictureInfo.appendChild(myPicturePrice);
                myPictureInfo.appendChild(myPictureLikes);

                myWorks.appendChild(myPictureInfo);
                myList.appendChild(myWorks);
                photographerWorks.appendChild(myList);   
                
                cpt ++;
            }
        }         
    }
    // End >> PART 7 -----------------------------------------------------------------------

    // PART 8 -----------------------------------------------------------------------      
    let myInfoLikesPrice = document.createElement("div");
    let myAggrLikes = document.createElement("span");
    let myDayPrice = document.createElement("span");

    myAggrLikes.innerHTML = aggLikes + " <i class='fas fa-heart'></i>";
    myDayPrice.textContent = dayPrice + "€ / jour";

    myInfoLikesPrice.classList.add("b-likes-price");
    myInfoLikesPrice.classList.add("b-likes-price_content");
    myDayPrice.classList.add("b-likes-price_content");

    myInfoLikesPrice.appendChild(myAggrLikes);
    myInfoLikesPrice.appendChild(myDayPrice);
    photographerWorks.appendChild(myInfoLikesPrice);    

    // End >> PART 8 -----------------------------------------------------------------------

    // PART 9 -----------------------------------------------------------------------  
    const mediaItems = document.querySelectorAll(".vignette");
    let slideIndex = 1;     

    for(let media of mediaItems) {
        let myContentSlide = document.createElement("div");
        myContentSlide.classList.add("slide");
        switch (media.localName) {
            case "video" :
                let myVideoSlide = document.createElement("video");
                myVideoSlide.src = media.src;
                myVideoSlide.classList.add("media-slide");
                myContentSlide.appendChild(myVideoSlide);
                break;
            case "img" :
                let myImageSlide = document.createElement("img");
                myImageSlide.src = media.src;
                myImageSlide.classList.add("media-slide");
                myContentSlide.appendChild(myImageSlide);
                break;
        }
        myContentLight.appendChild(myContentSlide);
    }
    
    myLightModal.appendChild(myContentLight); 

    // End >> PART 9 -----------------------------------------------------------------------

    // PART 10 -----------------------------------------------------------------------  
    mediaItems.forEach(media => {   
        media.addEventListener('click', function(e) {  
            e.preventDefault();
            openLightbox();
            toSlide(media.getAttribute("id"));
        });
    }); 

    prevIcon.addEventListener("click", function(e) {
        e.preventDefault();
        changeSlide(-1);
    });

    nextIcon.addEventListener("click", function(e) {
        e.preventDefault();
        changeSlide(1);
    })
     /* 
    onclick : prevIcon.changeSlide(-1);
    onclieck : nextIcon.changeSlice(1);
    */

    showSlide(slideIndex);  

    function changeSlide(n) {
        showSlide(slideIndex += n);
    };
    
    function toSlide(n) {
        showSlide(slideIndex = n);
    };

    function showSlide(n) {
        let mediaSlides = document.querySelectorAll(".slide");

        if (n > mediaSlides.length) {
        slideIndex = 1;	
        }
    
        if (n < 1) {
        slideIndex = mediaSlides.length;
        }
    
        for (let i = 0; i < mediaSlides.length; i++) {
            mediaSlides[i].style.display = "none";
        }        
        
        mediaSlides[slideIndex - 1].style.display = 'block';    
    }
}
