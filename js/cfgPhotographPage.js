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

console.log(numFilter);

let photographer;
let myChoice;
let url = new URL(document.URL);
let myFilter = url.search;


// Part 3 : Events Click -----------------------------------------------
dropFilterSelected.addEventListener('click', function(e) {
    e.preventDefault();
    toggleFilter();
    moveToFirst(this.innerHTML);   
});

dropFilterItems.forEach(item => {
    item.addEventListener('click', function(e) {  
        e.preventDefault();       
        toggleFilter();
        moveToFirst(this.innerHTML);  
        
        if (dropFilterSelected.textContent == "Popularité") {
            document.location.href = document.URL.replace(document.URL.substring(document.URL.indexOf("&filt=")),"&filt=1");
        } 
        if (dropFilterSelected.textContent == "Date") {
            document.location.href = document.URL.replace(document.URL.substring(document.URL.indexOf("&filt=")),"&filt=2");
        }
        if (dropFilterSelected.textContent == "Titre") {
            document.location.href = document.URL.replace(document.URL.substring(document.URL.indexOf("&filt=")),"&filt=3");
        }  
    });
});
 
        
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function() {
    photographer = request.response;
    showAllDatas(photographer);
}

// Function display filter -------------------------------------------------------------------------
function toggleFilter () {
    if (!dropMenuItems.getAttribute('style') || dropMenuItems.getAttribute('style') === "display: none;" ) {
        dropMenuItems.style.display = "block";
        dropFilterSelected.setAttribute('aria-expanded', 'true');
        dropFilterIcon.classList.remove("fa-chevron-down");
        dropFilterIcon.classList.add("fa-chevron-up");
    }
    else {
        dropMenuItems.style.display = 'none';
        dropFilterSelected.setAttribute('aria-expanded', 'false');        
        dropFilterIcon.classList.remove("fa-chevron-up");
        dropFilterIcon.classList.add("fa-chevron-down");
    }
}

// Function move the item selected to first level
function moveToFirst (valItem) {
   if(valItem=="Popularité") {
    dropFilterSelected.textContent = "Popularité";
    dropFilterItem1.textContent = "Date";
    dropFilterItem2.textContent = "Titre";
   }
   if(valItem=="Date") {
    dropFilterSelected.textContent = "Date";
    dropFilterItem1.textContent = "Popularité";
    dropFilterItem2.textContent = "Titre";
   }
   if(valItem=="Titre") {
    dropFilterSelected.textContent = "Titre";
    dropFilterItem1.textContent = "Date";
    dropFilterItem2.textContent = "Popularité";
   }
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
        }
    } 
    
    // Medias --------------------------------------------
    let photographerWork = obj["media"]; 
    if(numFilter == 1) {
        photographerWork.sort(function (a, b) {
            return b.likes - a.likes;
        });
    }  
    else if (numFilter == 2) {
        photographerWork.sort(function (a, b) {
            return a.date - b.date;
        });
        console.log(photographerWork);
    }   
    else if (numFilter == 3) {
        photographerWork.sort(function (a, b) {
            return a.text - b.text;
        });
    }    
    console.log(photographerWork);

    let myList = document.createElement("ul");
    for (let k=0; k < photographerWork.length; k++) {
        if (photographerWork[k].photographerId == idWorker) {
            

            let myWorks = document.createElement("li");
            if ((photographerWork[k].image !== null) && (photographerWork[k].video == null)){    
                let myMediaImage = document.createElement("img");            
                myMediaImage.src = "images/Medias/" + idWorker + "/" + photographerWork[k].image;
                myMediaImage.classList.add("vignette");
                myWorks.appendChild(myMediaImage);
            }
            if ((photographerWork[k].video !== null) && (photographerWork[k].image == null)){  
                let myMediaVideo = document.createElement("video");
                myMediaVideo.src = "images/Medias/" + idWorker + "/" + photographerWork[k].video;
                myMediaVideo.classList.add("vignette");
                myWorks.appendChild(myMediaVideo);
            }
            let myPictureInfo = document.createElement("div");
            let myPictureText = document.createElement("span");
            let myPicturePrice = document.createElement("span");
            let myPictureLikes = document.createElement("span");

            myPictureText.textContent = photographerWork[k].text;
            myPicturePrice.textContent = photographerWork[k].price + " €";
            myPictureLikes.innerHTML = photographerWork[k].likes + " <i class='fas fa-heart'></i>";

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
