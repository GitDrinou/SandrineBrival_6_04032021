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
const idWorker = document.URL.substring(document.URL.indexOf("id")+3,document.URL.length);

let photographer;
let myArrayMediaFilter = new Array();



// Part 3 : Events Click -----------------------------------------------
dropFilterSelected.addEventListener('click', function(e) {
    e.preventDefault();
    toggleFilter();
    moveToFirst(this.innerHTML);
});

dropFilterItems.forEach(item => {
    item.addEventListener('click', function(e) {  
        e.preventDefault();        toggleFilter();
        moveToFirst(this.innerHTML); 
        filterBy(document.querySelector(".filter-dropdown_link--content").textContent);
               
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
    dropFilterItem1.innerHTML = "Date";
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

function filterBy(filter) {  
    let medias = photographer["media"]; 
    myArrayMediaFilter = myArrayMediaFilter.splice(0,myArrayMediaFilter.lengh);
    for (let i=0; i < medias.length; i++) {
        if(medias[i].photographerId == idWorker) {
            if(filter === "Popularité" && (!(filter === "Date" || filter === "Titre"))) {
                myArrayMediaFilter.push(medias[i].likes);
                myArrayMediaFilter.sort((a, b) => b - a);
            } 
            if(filter === "Date" && (!(filter === "Titre" || filter === "Popularité"))) {
                myArrayMediaFilter.push(medias[i].date);
                myArrayMediaFilter.sort((a, b) => a - b);
            }  
            if(filter === "Titre" && (!(filter === "Popularité" || filter === "Date"))) {
                myArrayMediaFilter.push(medias[i].text);
                myArrayMediaFilter.sort();
            }    
        }
    }
    /**
     * let myList = document.createElement("ul");
     * for (let j=0; j < myArrayMediaFilter.length; j++) {
     *   let myWorks = document.createElement("li");
     *   if ((myArrayMediaFilter[j].image !== null) && (myArrayMediaFilter[j].video == null)){    
     *       let myMediaImage = document.createElement("img");            
     *       myMediaImage.src = "images/Medias/" + idWorker + "/" + myArrayMediaFilter[j].image;
     *       myMediaImage.classList.add("vignette");
     *       myWorks.appendChild(myMediaImage);
     *   }
     *   if ((myArrayMediaFilter[j].video !== null) && (myArrayMediaFilter[j].image == null)){  
     *       let myMediaVideo = document.createElement("video");
     *       myMediaVideo.src = "images/Medias/" + idWorker + "/" + myArrayMediaFilter[j].video;
     *       myMediaVideo.classList.add("vignette");
     *       myWorks.appendChild(myMediaVideo);
     *   }
     *
     *   let myPictureInfo = document.createElement("div");
     *   let myPictureText = document.createElement("span");
     *   let myPicturePrice = document.createElement("span");
     *   let myPictureLikes = document.createElement("span");
     * 
     *
     *   myPictureText.textContent = myArrayMediaFilter[j].text;
     *   myPicturePrice.textContent = myArrayMediaFilter[j].price + " €";
     *   myPictureLikes.innerHTML = myArrayMediaFilter[j].likes + " <i class='fas fa-heart'></i>";
     * 
     *   myPictureInfo.classList.add("b-pictureInfo");
     *   myPictureText.classList.add("mediaText");
     *   myPicturePrice.classList.add("mediaPrice");
     *   myPictureLikes.classList.add("mediaLikes");
     * 
     *   myPictureInfo.appendChild(myPictureText);
     *   myPictureInfo.appendChild(myPicturePrice);
     *   myPictureInfo.appendChild(myPictureLikes);
     * 
     *   myWorks.appendChild(myPictureInfo);
     *   myList.appendChild(myWorks);
     *   photographerWorks.appendChild(myList); 
     *
     * 
     * } 
     */              
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
    //let photographerWork = obj["media"];
    //    
    //for (let k=0; k < photographerWork.length; k++) {
    //    if (photographerWork[k].photographerId == idWorker) {
    //        // Filter by 
    //    }            
    //}
    
}

