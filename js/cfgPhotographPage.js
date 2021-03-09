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
const requestURL = "./js/json/FishEyeDataFR.json";
const request = new XMLHttpRequest();
let myIndexId = document.URL.indexOf("id")+3;
let myIndexFilt = document.URL.indexOf("&filt=")+6;
const idWorker = document.URL.substring(myIndexId,document.URL.indexOf("&"));
const numFilter = document.URL.substring(myIndexFilt,document.URL.length);

let photographer;
let myFilterMedias = new Array();
let aggLikes = 0;
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
    for (let i=0; i < photographerInfo.length; i++) {
        if (photographerInfo[i].id == idWorker) {
            let myH1 = document.createElement("h1");
            let myLocation = document.createElement("p");
            let mySlogan = document.createElement("p");
            let myIDPicture = document.createElement("img");
            let myTagsList = document.createElement("ul");
            let listTags = photographerInfo[i].tags;

            for (let j=0; j < listTags.length; j++) {
                let myTags = document.createElement("li");
                let myTagsLink = document.createElement("a");
                myTagsLink.textContent = listTags[j];
                myTags.classList.add("idDetails_tagg_link");
                myTagsList.appendChild(myTags);
                myTags.appendChild(myTagsLink);
            }

            myH1.textContent = photographerInfo[i].name;
            myH1.classList.add("title-photographer"); 
            myLocation.textContent = photographerInfo[i].city + ", " + photographerInfo[i].country;
            myLocation.classList.add("idDetails_city");
            mySlogan.textContent = photographerInfo[i].tagline;
            mySlogan.classList.add("idDetails_slogan");
            myTagsList.classList.add("idDetails_tagg");
            myIDPicture.src = "./images/IDPhotos/"+ photographerInfo[i].portrait;
            myIDPicture.alt = "Vignette " + photographerInfo[i].name;
            myIDPicture.classList.add("photographer_photo");

            
            photographerDetails.appendChild(myH1);
            photographerDetails.appendChild(myLocation);
            photographerDetails.appendChild(mySlogan);
            photographerDetails.appendChild(myTagsList);
            photographerPicture.appendChild(myIDPicture);

            dayPrice = photographerInfo[i].price;
        }
    } 
    
    // Medias - Fill the filter array --------------------------------------------
    let photographerWork = obj["media"];     
    myFilterMedias.splice(0,myFilterMedias.length);  
    for (let k=0; k < photographerWork.length; k++) {
        if (photographerWork[k].photographerId == idWorker) {
            myFilterMedias.push(
                { 
                    "id": photographerWork[k].id,
                    "likes": photographerWork[k].likes,
                    "date": photographerWork[k].date,
                    "title": photographerWork[k].title
                }
            );  
            aggLikes += photographerWork[k].likes;      
        }           
    }

    // Meduas - order by filter selected    
    if(numFilter == 1) { 
        myFilterMedias.sort((a, b) => b.likes - a.likes); 
    }  
    if (numFilter == 2) { 
        myFilterMedias.reverse((a, b) => a.date - b.date); 
    }
    if (numFilter == 3) { 
        myFilterMedias.sort(function(a,b) {
            string1 = a.title;
            string2 = b.title;
            return string1.toString().localeCompare(string2.toString());
        });
    }

    // Medias - display the medias filtered      
    let myList = document.createElement("ul");   
    for (let m of myFilterMedias) {
        for (let l=0; l < photographerWork.length; l++) {
            if((m.id === photographerWork[l].id) && (photographerWork[l].photographerId == idWorker)) {                            
                let myWorks = document.createElement("li");
                if ((photographerWork[l].image !== null) && (photographerWork[l].video == null)){    
                    let myMediaImage = document.createElement("img");            
                    myMediaImage.src = "images/Medias/" + idWorker + "/" + photographerWork[l].image;
                    myMediaImage.classList.add("vignette");
                    myWorks.appendChild(myMediaImage);
                }
                if ((photographerWork[l].video !== null) && (photographerWork[l].image == null)){  
                    let myMediaVideo = document.createElement("video");
                    myMediaVideo.src = "images/Medias/" + idWorker + "/" + photographerWork[l].video;
                    myMediaVideo.classList.add("vignette");
                    myWorks.appendChild(myMediaVideo);
                }

                let myPictureInfo = document.createElement("div");
                let myPictureText = document.createElement("span");
                let myPicturePrice = document.createElement("span");
                let myPictureLikes = document.createElement("span");

                myPictureText.textContent = photographerWork[l].title;
                myPicturePrice.textContent = photographerWork[l].price + " €";
                myPictureLikes.innerHTML = photographerWork[l].likes + " <i class='fas fa-heart'></i>";

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

    console.log(myFilterMedias);   
    console.log(aggLikes); 
    console.log(dayPrice); 
}

