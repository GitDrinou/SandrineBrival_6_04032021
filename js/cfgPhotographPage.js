/**
 * Definitions
*/
const photographerDetails = document.querySelector(".idDetails");
const photographerPicture = document.querySelector(".idPicture");
const photographerWorks = document.querySelector(".b-works");
const requestURL = "./js/json/FishEyeDataFR.json";
const request = new XMLHttpRequest();

const idWorker = document.URL.substring(document.URL.indexOf("id")+3,document.URL.length);

request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function() {
    let photographer = request.response;
    showAllDatas(photographer);
}


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