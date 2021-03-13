/**
 * Declarations
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
const requestURL = "./js/json/FishEyeDataFR.json";


let parsedUrl = new URL(window.location.href);
const request = new XMLHttpRequest();
const idWorker = parsedUrl.searchParams.get("id")
const filterType = parsedUrl.searchParams.get("filt");
let filterTag = parsedUrl.searchParams.get("tag");


let photographer;
let myFilterMedias = [];
let myTagFilterMedias = [];
let myMediasTags = [];
let myContentModalMedias = [];
let aggLikes = 0;
let lenTagArray = 0;
let dayPrice;
       
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function() {
    photographer = request.response;
    showAllDatas(photographer);
}

// Display medias and ID of photographer
function showAllDatas(obj) {
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

                myMediasTags.push(
                    { 
                        "tag" : tag
                    }
                );  
            }

            myH1.textContent = info.name;
            myH1.classList.add("title-photographer"); 
            myLocation.textContent = info.city + ", " + info.country;
            myLocation.classList.add("idDetails_city");
            mySlogan.textContent = info.tagline;
            mySlogan.classList.add("idDetails_slogan");
            myTagsList.classList.add("idDetails_tagg");
            myIDPicture.src = "./images/IDPhotos/"+ info.portrait;
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
    
    // Medias - Fill the filter array --------------------------------------------
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
    // END >> Medias - Fill the filter array --------------------------------------------

    // Medias - order by filter selected      
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

    // Filter by Tag -------------------------------------------------------
    const tagItems = document.querySelectorAll(".idDetails_tagg_link");
    tagItems.forEach(item => {
        item.addEventListener('click', function(e) {  
            let myItem = (filterTag!="oof") ? item.textContent : filterTag;
            e.preventDefault();
            
            // tableau           
            for (let myMedia of myFilterMedias) {
                for (let j=0; j < myMedia.tag.length; j++) {
                    if (myItem == myMedia.tag[j] || filterTag == myMedia.tag[j]) {
                        document.location.assign(document.URL.replace(document.URL.substring(document.URL.indexOf("&tag=")),"&tag=" + myItem));
                    }                   
                }
            }                  
        });
    }); 

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
   if (filterTag !=null && filterTag !="off") {
        myFilterMedias = myMediasFactory.createMedias("Tag").array;
   }
    

    // Medias - display the medias filtered      
    let myList = document.createElement("ul");   
    for (let filterMedia of myFilterMedias) {
        for (let photographerMedia of photographerWork) {
            if((filterMedia.id === photographerMedia.id) && (photographerMedia.photographerId == idWorker)) {                            
                let myWorks = document.createElement("li");                
                myWorks.setAttribute("id",filterMedia.id);
                myWorks.classList.add("medias-card");
                if ((photographerMedia.image !== null) && (photographerMedia.video == null)){    
                    let myMediaImage = document.createElement("img");            
                    myMediaImage.src = "images/Medias/" + idWorker + "/" + photographerMedia.image;
                    myMediaImage.classList.add("vignette");
                    myWorks.appendChild(myMediaImage);
                }
                if ((photographerMedia.video !== null) && (photographerMedia.image == null)){  
                    let myMediaVideo = document.createElement("video");
                    myMediaVideo.src = "images/Medias/" + idWorker + "/" + photographerMedia.video;
                    myMediaVideo.classList.add("vignette");
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
            }
        }         
    }
    
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


}
