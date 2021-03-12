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

                myMediasTags.push(
                    { 
                        "tag" : listTags[j]
                    }
                );  
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
    for (let i=0; i < photographerWork.length; i++) {
        if (photographerWork[i].photographerId == idWorker) {
            myFilterMedias.push(
                { 
                    "id": photographerWork[i].id,
                    "likes": photographerWork[i].likes,
                    "date": photographerWork[i].date,
                    "title": photographerWork[i].title,
                    "tag" : photographerWork[i].tags
                }
            );  
            aggLikes += photographerWork[i].likes;      
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
            let myItem = item.textContent;
            e.preventDefault();
            
            // tableau           
            for (let i of myFilterMedias) {
                for (let j=0; j < i.tag.length; j++) {
                    if (i.tag[j] == myItem) {
                        myTagFilterMedias.push(
                            { 
                                "id": i.id,
                                "likes": i.likes,
                                "date": i.date,
                                "title": i.title,
                                "tag" : i.tag
                        }); 
                  
                    }                   
                }
            } 

            if (myTagFilterMedias.length!=0) {
                myFilterMedias = myTagFilterMedias;
            }
                    
        });
    }); 

   console.log(myFilterMedias)
    
    
    //console.log(myFilterMedias);

    // Medias - display the medias filtered      
    let myList = document.createElement("ul");   
    for (let i of myFilterMedias) {
        for (let j = 0; j < photographerWork.length; j++) {
            if((i.id === photographerWork[j].id) && (photographerWork[j].photographerId == idWorker)) {                            
                let myWorks = document.createElement("li");                
                myWorks.setAttribute("id",j);
                myWorks.classList.add("medias-card");
                if ((photographerWork[j].image !== null) && (photographerWork[j].video == null)){    
                    let myMediaImage = document.createElement("img");            
                    myMediaImage.src = "images/Medias/" + idWorker + "/" + photographerWork[j].image;
                    myMediaImage.classList.add("vignette");
                    myWorks.appendChild(myMediaImage);
                }
                if ((photographerWork[j].video !== null) && (photographerWork[j].image == null)){  
                    let myMediaVideo = document.createElement("video");
                    myMediaVideo.src = "images/Medias/" + idWorker + "/" + photographerWork[j].video;
                    myMediaVideo.classList.add("vignette");
                    myWorks.appendChild(myMediaVideo);
                }

                let myPictureInfo = document.createElement("div");
                let myPictureText = document.createElement("span");
                let myPicturePrice = document.createElement("span");
                let myPictureLikes = document.createElement("span");
                
                myPictureText.textContent = photographerWork[j].title;
                myPicturePrice.textContent = photographerWork[j].price + " €";
                myPictureLikes.innerHTML = photographerWork[j].likes + " <i class='fas fa-heart'></i>";

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
