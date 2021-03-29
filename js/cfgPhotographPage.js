/**
 * VARIABLES Declaration
 * CONST and LET
 * -------------------------------------------------------------------------
*/
const errorText = document.getElementById("error-json");
const photographerWorks = document.querySelector(".b-works");
//const myMedias = document.querySelectorAll(".medias-card");
const myLightModal = document.getElementById("lightbox");
const myContentLight = document.querySelector(".modalLight-content");
const prevIcon = document.querySelector(".previous");
const nextIcon = document.querySelector(".next");
const frmPhotoName = document.querySelector(".photographerName");
const requestURL = "../js/json/FishEyeDataFR.json";
const parsedUrl = new URL(window.location.href);
const loc = document.location;
const url = document.URL;
const idWorker = parsedUrl.searchParams.get("id");
const filterType = parsedUrl.searchParams.get("filt");

let cpt = 1;
let myList = document.createElement("ul");
let filterTag = parsedUrl.searchParams.get("tag");

//let photographer;
let mediaVignette;
let myFilterMedias = [];
let myTagFilterMedias = [];
//let myContentModalMedias = [];
let aggLikes = 0;
//let lenTagArray = 0;
let dayPrice;
let srcType;

/**
 * FETCH METHOD
 * ------------------------------------------------------------
*/

fetch(requestURL)
    .then(function(resp) {
        if (resp.ok) {
            resp.json().then(function(datas) { showAllDatas(datas); });
        }
        else {
            errorText.style.display="block";
            errorText.innerHTML="Erreur<br>"+resp.status+" "+resp.statusText;
        }
    });

/**
 * FACTORY METHOD
 * Use :Type of Media (image or video)
 * -----------------------------------------------------------
*/

class Image {
    getRender() {
        mediaVignette = document.createElement("img");
    }
}

class Video {
    getRender() {
        mediaVignette = document.createElement("video");
    }
}

function factory(type) {
    switch (type) {
    case "image":
        return new Image;
    case "video":
        return new Video;
    }
}


/**
 * CREATE NEW ARRAY MEDIAS FILTERED
 * Class : ArrayFilterBy
 * Description : creating a new array of medias filtered
 * Constructor :
 *      >> id : id of the media
 *      >> likes : number of likes
 *      >> date : the date of the media
 *      >> title : the media's title
 *      >> tags : array of tags linked to the media
 * Method :
 *       >> getCreateArray() : create a new array of media's photographer
 *       >> getFilterBy() : sort the previous array according url parameter
 * -----------------------------------------------------------------------------
 */

const ArrayFilterBy = class {
    constructor(medias,filter) {
        this.id = medias.id;
        this.likes = medias.likes;
        this.date = medias.date;
        this.title = medias["alt-text"];
        this.tags = medias.tags;
        this.filter = filter;
    }
    getCreateArray() {
        myFilterMedias.push({
            "id": this.id,
            "likes": this.likes,
            "date": this.date,
            "title": this.title,
            "tag" : this.tags
        });
        aggLikes += this.likes;
    }
    getFilterBy(){
        switch (this.filter) {
        case "Popular":
            myFilterMedias.sort((a,b)=>{
                return b.likes - a.likes;
            });
            break;
        case "Date" :
            myFilterMedias.reverse((a,b)=>{
                return a.date - b.date;
            });
            break;
        case "Title" :
            myFilterMedias.sort(function(a,b){                
                let string1=a.title;
                let string2=b.title;
                return(string1.toString().localeCompare(string2.toString()));
            });
            break;
        }
    }
};

/**
 * MEDIAS LIST
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
 *       >> getMedias() : display the medias's photographer
 * --------------------------------------------------------------
 */
const Medias = class {
    constructor(id,type,source,medias,counter) {
        this.id = id;
        this.type = type;
        this.source = source;
        this.medId = medias.id;
        this.title = medias["alt-text"];
        this.likes = medias.likes;
        this.price = medias.price;
        this.counter = counter;
    }

    getMedias() {
        let mediaCard = document.createElement("li");
        mediaCard.classList.add("medias-card");

        // Factory Use ---------------------------        
        const mediaType = factory(this.type);
        mediaType.getRender();

        mediaVignette.src = "../images/Medias/" + this.id + "/" + this.source ;
        mediaVignette.classList.add("vignette");
        mediaVignette.setAttribute("slide", this.counter);
        mediaVignette.setAttribute("id", this.medId);
        mediaVignette.setAttribute("title", this.title);
        mediaCard.appendChild(mediaVignette);

        let mediaInfo = document.createElement("div");
        let mediaTitle = document.createElement("span");
        let mediaPrice = document.createElement("span");
        let mediaLikes = document.createElement("span");
        let mediaHeart = document.createElement("span");

        mediaTitle.textContent = this.title;
        mediaPrice.textContent = this.price + " €";
        mediaLikes.textContent = this.likes;
        mediaHeart.innerHTML="<i class='fas fa-heart' id="+this.medId+"></i>";

        mediaInfo.classList.add("b-pictureInfo");
        mediaTitle.classList.add("mediaText");
        mediaPrice.classList.add("mediaPrice");
        mediaLikes.classList.add("mediaLikes");
        mediaHeart.classList.add("mediaHeart");

        mediaInfo.appendChild(mediaTitle);
        mediaInfo.appendChild(mediaPrice);
        mediaInfo.appendChild(mediaLikes);
        mediaInfo.appendChild(mediaHeart);
        mediaCard.appendChild(mediaInfo);
        myList.appendChild(mediaCard);
        photographerWorks.appendChild(myList);
    }
};

/**
 * FOR THE TOTAL LIKES
 * class : Likes
 * Description : display the total of likes and price per day
 * Parameters :
 *      >> totalLikes : sum of likes for the photographer
 *      >> pricePerDay : price per day
 * Method :
 *      >> getTotal() : display the total of likes and the price per day
 * ---------------------------------------------------------------------
 */
const Likes = class {
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
};

/**
 * FUNCTION showAllDatas(object JSON)
 * Description :
 * >> P1 : display the photographer informations
 * >> P2 : create/filter array to display the photographer's medias
 * >> P3 : reload page and replace the tag url parameter
 * >> P4 : create a new array
 * >> P5 : condition to replace an array by another
 * >> P6 : display medias with the myFilterMedias's array
 * >> P7 : display the price per day, total likes
 * >> P8 : configuration of the lightbox modal
 * >> P9 : functions for animate and displaying lightbox modal
 * >> P10 : fill the photographer name for the contact form modal
 * ---------------------------------------------------------------------
 */

function showAllDatas(obj) {

    // P1 -----------------------------------------------------------
    let photographerInfo = obj.photographers;
    for (let info of photographerInfo) {
        if (info.id == idWorker) {
            const newPhotographer = new Photographer(idWorker,info);
            newPhotographer.getInfo();
        }
    }
    // End P1 -------------------------------------------------------
    // P2 -----------------------------------------------------------
    let photographerWork = obj.media;
    myFilterMedias.splice(0,myFilterMedias.length);
    for (let photographerMedia of photographerWork) {
        if (photographerMedia.photographerId == idWorker) {
            new ArrayFilterBy(photographerMedia,filterType).getCreateArray();
            new ArrayFilterBy(photographerMedia,filterType).getFilterBy();
        }
    }
    // End P2 -------------------------------------------------------
    // P3 -----------------------------------------------------------
    const tagItems = document.querySelectorAll(".idDetails_tagg_link");
    tagItems.forEach(item => {
        item.addEventListener("click", function(e) {
            let valueTag = item.textContent;
            let myItem = (filterTag=="off") ? valueTag.substring(1,valueTag.length) : filterTag;
            e.preventDefault();
            for (let media of myFilterMedias) {
                for (let j=0; j < media.tag.length; j++) {
                    if (myItem == media.tag[j] || filterTag == media.tag[j]) {
                        loc.assign(url.replace(url.substring(url.indexOf("&tag=")),"&tag=" + myItem));
                    }
                }
            }
        });
    });
    // End P3 ------------------------------------------------
    // P4 -------------------------------------------------------
    for (let tagMedia of myFilterMedias) {
        if (filterTag !="off" && filterTag == tagMedia.tag) {
            myTagFilterMedias.push(tagMedia);
        }
    }
    // End P4 ------------------------------------------------
    // P5 -------------------------------------------------------
    if (filterTag !=null && filterTag !="off") {
        myFilterMedias = myTagFilterMedias;
    }
    // End P5 ------------------------------------------------
    // P6 -------------------------------------------------------
    for (let filterMedia of myFilterMedias) {
        for (let media of photographerWork) {
            if((filterMedia.id === media.id) && (media.photographerId == idWorker)) {
                let typeMedia, sourceMedia;
                if((media.image !=null) && (media.video == null)) {
                    typeMedia = "image";
                    sourceMedia = media.image;
                } else if((media.video !=null) && (media.image == null)) {
                    typeMedia = "video";
                    sourceMedia = media.video;
                }

                new Medias(idWorker,typeMedia,sourceMedia,media,cpt).getMedias();
                cpt ++;
            }
        }
    }
    // End P6 ------------------------------------------------
    // P7 -------------------------------------------------------
    new Likes(aggLikes,dayPrice).getTotal();
    // End P7 ------------------------------------------------
    // P8 -------------------------------------------------------
    const mediaItems = document.querySelectorAll(".vignette");
    let slideIndex = 1;    
    for(let media of mediaItems) {
        let myContentSlide = document.createElement("div");
        let myFigure = document.createElement("figure");
        let myFigCaption = document.createElement("figcaption");
        myContentSlide.classList.add("slide");

        // Factory Use ---------------------------
        media.localName == "img" ? srcType = "image" : srcType = "video";
        const mediaSlide = factory(srcType);
        mediaSlide.getRender();

        mediaVignette.src = media.src;
        mediaVignette.classList.add("media-slide");
        if(media.localName =="video") { mediaVignette.setAttribute("controls", true); }
        myFigure.appendChild(mediaVignette);
        
        myFigCaption.textContent = media["alt-text"];
        myFigCaption.classList.add("mediaText");
        myFigure.appendChild(myFigCaption);
        myContentSlide.appendChild(myFigure);
        myContentLight.appendChild(myContentSlide);
    }

    myLightModal.appendChild(myContentLight);
    // End >> PART 8 ------------------------------------------------
    // PART 9 ------------------------------------------------------
    mediaItems.forEach(media => {
        media.addEventListener("click", function(e) {
            e.preventDefault();
            openLightbox();
            toSlide(parseInt(media.getAttribute("slide")));
        });
    });

    prevIcon.addEventListener("click", function(e) {
        e.preventDefault();
        changeSlide(-1);
    });

    nextIcon.addEventListener("click", function(e) {
        e.preventDefault();
        changeSlide(1);
    });

    showSlide(slideIndex);

    function changeSlide(n) {
        showSlide(slideIndex += parseInt(n));
    }
    
    function toSlide(n) {
        showSlide(slideIndex = n);
    }

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
        
        mediaSlides[slideIndex - 1].style.display = "block";
    }
    // End P9 ------------------------------------------------
    // P10 ------------------------------------------------------
    for(let pInfo of photographerInfo) {
        if (pInfo.id == idWorker) {
            frmPhotoName.textContent = pInfo.name;
        }
    }
        
    // End P10 -----------------------------------------------
}
