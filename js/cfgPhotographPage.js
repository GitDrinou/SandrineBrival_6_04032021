
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
const btnContact = document.querySelector(".btn-contact");
const frmPhotoName = document.querySelector(".photographerName");
const myContactModal = document.getElementById("formContact"); 
const closeBtnFrm = document.querySelector(".close-form");
const requestURL = "../js/json/FishEyeDataFR.json";

let cpt = 1;  
let myList = document.createElement("ul"); 

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
 * FACTORY METHOD FILTER BY POPULARITY,DATE AND TITLE
 * Class : FilterBy
 * Description : filtering medias by popularity, date, title according the URL parameters
 * Constructor :
 *      >> id : id of the media
 *      >> likes : number of likes
 *      >> date : the date of the media
 *      >> title : the media's title
 *      >> tags : array of tags linked to the media
 * Methods : 
 *      >> getCreateArray() : create a new array of media's photographer
 *      >> getMediasFilterBy() : filtered the previous new array by popularity, date or title according the URL parameters(selection's user)
 * --------------------------------------------------------------------------------------------------------
 */

class FilterBy {
    constructor(id,likes,date,title,tags,filter) {
        this.id = id;
        this.likes = likes;
        this.date = date;
        this.title = title;
        this.tags = tags;
        this.filter = filter;
    }

    getCreateArray() {
        myFilterMedias.push(
            { 
                "id": this.id,
                "likes": this.likes,
                "date": this.date,
                "title": this.title,
                "tag" : this.tags
            }
        );  
        aggLikes += this.likes;
    }

    getMediasFilterBy() {
        switch (this.filter) {
            case "Popular" : 
                myFilterMedias.sort((a, b) => b.likes - a.likes);
                break;
            case "Date" :
                myFilterMedias.reverse((a, b) => a.date - b.date);
                break;
            case "Title" :
                myFilterMedias.sort(function(a,b) {
                    let string1 = a.title;
                    let string2 = b.title;
                    return string1.toString().localeCompare(string2.toString());
                });
                break;
        }
    }
}

/**
 * FACTORY METHOD MEDIAS LIST
 * Class : Medias
 * Description : display the list of the photographer's medias
 * Constructor :
 *      >> id : id Photographer
 *      >> type : type of medias (image or video)
 *      >> source : name of the media's file
 *      >> title : title's media
 *      >> likes : number of likes
 *      >> price : media's price
 *      >> counter : index for the slideshow
 * Method : 
 *      >> getMedias() : display the medias's photographer
 * --------------------------------------------------------------------------------------------------------
 */
class Medias {
    constructor(id,type,source,title,likes,price,counter) {
        this.id = id;
        this.type = type;
        this.source = source;
        this.title = title;
        this.likes = likes;
        this.price = price;
        this.counter = counter;
    }

    getMedias() {
        let mediaCard = document.createElement("li"); 
        mediaCard.classList.add("medias-card");
        switch (this.type) {
            case "image" :    
                let mediaImage = document.createElement("img");            
                mediaImage.src = "../images/Medias/" + this.id + "/" + this.source ;
                mediaImage.classList.add("vignette");
                mediaImage.setAttribute("id", this.counter);
                mediaImage.setAttribute("title", this.title);
                mediaCard.appendChild(mediaImage);
                break;
            case "video" :
                let mediaVideo = document.createElement("video");
                mediaVideo.src = "../images/Medias/" + this.id + "/" + this.source;
                mediaVideo.classList.add("vignette");
                mediaVideo.setAttribute("id", this.counter)
                mediaVideo.setAttribute("title", this.title);
                mediaCard.appendChild(mediaVideo);
                break;
        }
        
        let mediaInfo = document.createElement("div");
        let mediaTitle = document.createElement("span");
        let mediaPrice = document.createElement("span");
        let mediaLikes = document.createElement("span");
                
        mediaTitle.textContent = this.title;
        mediaPrice.textContent = this.price + " €";
        mediaLikes.innerHTML = this.likes + " <i class='fas fa-heart'></i>";

        mediaInfo.classList.add("b-pictureInfo");
        mediaTitle.classList.add("mediaText");
        mediaPrice.classList.add("mediaPrice");
        mediaLikes.classList.add("mediaLikes");

        mediaInfo.appendChild(mediaTitle);
        mediaInfo.appendChild(mediaPrice);
        mediaInfo.appendChild(mediaLikes);

        mediaCard.appendChild(mediaInfo);
        myList.appendChild(mediaCard);
        photographerWorks.appendChild(myList);
    }
}

/**
 * FACTORY METHOD TOTAL LIKES
 * Function : sumLikes
 * Description : display the total of likes and price per day
 * Parameters :
 *      >> totalLikes : sum of likes for the photographer
 *      >> pricePerDay : price per day
 * --------------------------------------------------------------------------------------------------------
 */
class Likes {
    constructor(total,price) {
        this.total = total;
        this.price = price;
    }
    
    getTotal() {
        let infoLikes = document.createElement("div");
        let totalLikes = document.createElement("span");
        let pricePerDay = document.createElement("span");

        totalLikes.innerHTML = this.total + " <i class='fas fa-heart'></i>";
        pricePerDay.textContent = this.price + "€ / jour";

        infoLikes.classList.add("b-likes-price");
        infoLikes.classList.add("b-likes-price_content");
        pricePerDay.classList.add("b-likes-price_content");

        infoLikes.appendChild(totalLikes);
        infoLikes.appendChild(pricePerDay);
        photographerWorks.appendChild(infoLikes);
    }
}


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
 *      > PART 1 : display the photographer informations according the URL parameter "id" - use factory Method >> createPhotographer
 *      > PART 2 : create / filter array "myFilterMedias" to display the photographer's medias according the URL parameter "filt" 
 *      > PART 3 : reload page and replace the value of the tag utl parameter according the tag selected by the user
 *      > PART 4 : create a new array "myTagFilterMedias" according the url parameter "tag" selected for filter and display the right medias
 *      > PART 5 : condition to replace the myFilterMedias content by myTagFilterMedias content
 *      > PART 6 : display the photographer's medias with the myFilterMedias's array - use factory Method >> createPhotographerMedias
 *      > PART 7 : display the price per day, total likes
 *      > PART 8 : condiguration of the lightbox modal
 *      > PART 9 : functions for animate and displaying lightbox modal
 * ----------------------------------------------------------------------------------------------------------------------------
 */

function showAllDatas(obj) {

    // PART 1 -----------------------------------------------------------------------
    let photographerInfo = obj["photographers"];
    for (let info of photographerInfo) {
        if (info.id == idWorker) {            
            const newPhotographer = new Photographer(idWorker,info.tags,info.name,info.city,info.country,info.tagline,info.portrait,info.price);
            newPhotographer.getInfo();            
        }
    } 
    // End >> PART 1 -----------------------------------------------------------------------
    
    // PART 2 -----------------------------------------------------------------------
    let photographerWork = obj["media"];     
    myFilterMedias.splice(0,myFilterMedias.length);  
    for (let photographerMedia of photographerWork) {
        if (photographerMedia.photographerId == idWorker) {
            const newFilterBy = new FilterBy(photographerMedia.id,photographerMedia.likes,photographerMedia.date,photographerMedia.title,photographerMedia.tags,filterType);
            newFilterBy.getCreateArray();
            newFilterBy.getMediasFilterBy(); 
        }           
    }
    // End >> PART 2 -----------------------------------------------------------------------

    // PART 3 -----------------------------------------------------------------------   
    const tagItems = document.querySelectorAll(".idDetails_tagg_link");
    
    tagItems.forEach(item => {
        item.addEventListener('click', function(e) {  
            let valueTag = item.textContent;
            let myItem = (filterTag=="off") ? valueTag.substring(1,valueTag.length) : filterTag;
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
    // End >> PART 3 -----------------------------------------------------------------------

    // PART 4 -----------------------------------------------------------------------   
    for (let tagMedia of myFilterMedias) {
        if (filterTag !=null && filterTag !="off" && filterTag == tagMedia.tag) {
            myTagFilterMedias.push(tagMedia);
        }
    }
    // End >> PART 4 -----------------------------------------------------------------------

    // PART 5 -----------------------------------------------------------------------   
    if (filterTag !=null && filterTag !="off") {
        myFilterMedias = myTagFilterMedias;
    }
    // End >> PART 5 -----------------------------------------------------------------------

    // PART 6 -----------------------------------------------------------------------    
            
    for (let filterMedia of myFilterMedias) {       
        for (let photographerMedia of photographerWork) {
            if((filterMedia.id === photographerMedia.id) && (photographerMedia.photographerId == idWorker)) {  
                let typeMedia, sourceMedia;
                if((photographerMedia.image !=null) && (photographerMedia.video == null)) {
                    typeMedia = "image";
                    sourceMedia = photographerMedia.image;
                } else if((photographerMedia.video !=null) && (photographerMedia.image == null)) {
                    typeMedia = "video";
                    sourceMedia = photographerMedia.video;
                }

                const newMedias = new Medias(idWorker,typeMedia,sourceMedia,photographerMedia.title,photographerMedia.likes,photographerMedia.price,cpt);
                newMedias.getMedias(); 
                
                cpt ++;
            }
        }         
    }
    // End >> PART 5 -----------------------------------------------------------------------

    // PART 7 -----------------------------------------------------------------------      
    
    const newLikes = new Likes(aggLikes,dayPrice);
    newLikes.getTotal(); 
    

    // End >> PART 7 -----------------------------------------------------------------------

    // PART 8 -----------------------------------------------------------------------  
    const mediaItems = document.querySelectorAll(".vignette");
    let slideIndex = 1;     
    
    for(let media of mediaItems) {
        let myContentSlide = document.createElement("div");
        let myFigure = document.createElement("figure");
        let myFigCaption = document.createElement("figcaption");
        myContentSlide.classList.add("slide");
        switch (media.localName) {
            case "video" :
                let myVideoSlide = document.createElement("video");
                myVideoSlide.src = media.src;
                myVideoSlide.classList.add("media-slide");
                myVideoSlide.setAttribute("controls", true);
                myFigure.appendChild(myVideoSlide);
                break;
            case "img" :
                let myImageSlide = document.createElement("img");
                myImageSlide.src = media.src;
                myImageSlide.classList.add("media-slide");
                myFigure.appendChild(myImageSlide);
                break;
        }
        myFigCaption.textContent = media.title;
        myFigCaption.classList.add("mediaText");
        myFigure.appendChild(myFigCaption);
        myContentSlide.appendChild(myFigure);
        myContentLight.appendChild(myContentSlide);        
    }
    
    myLightModal.appendChild(myContentLight); 

    // End >> PART 8 -----------------------------------------------------------------------

    // PART 9 -----------------------------------------------------------------------  
    mediaItems.forEach(media => {   
        media.addEventListener('click', function(e) {  
            e.preventDefault();
            openLightbox();
            toSlide(parseInt(media.getAttribute("id")));
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

    showSlide(slideIndex);  

    function changeSlide(n) {
        showSlide(slideIndex += parseInt(n));
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



    // FORMULAIRE
    for( let pInfo of photographerInfo)
    if (pInfo.id == idWorker) {
        frmPhotoName.textContent = pInfo.name;
    }
}
