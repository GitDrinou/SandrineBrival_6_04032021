/**
 * VARIABLES Declaration
 * CONST and LET
 * -------------------------------------------------------------------------
*/
const errorText = document.getElementById("error-json");
const dropFilterSelected = document.getElementById("filter-selected");
const dropMenuItems = document.querySelector(".dropdown-items");
const dropFilterIcon = document.getElementById("filterIcon");
const dropFilterItems = document.querySelectorAll(".dropdown-items_link");
const dropFilterItem1 = document.getElementById("filter-1");
const dropFilterItem2 = document.getElementById("filter-2");
const photographerWorks = document.querySelector(".b-works");
const mediaList = document.querySelector(".mediasList");
const photographerDetails = document.querySelector(".idDetails");
const photographerPicture = document.querySelector(".idPicture");
const myLightModal = document.getElementById("lightbox");
const closeBtn = document.querySelector(".close-lightbox");
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
let filterTag = parsedUrl.searchParams.get("tag");

let myFilterMedias = [];
let myTagFilterMedias = [];
let aggLikes = 0;
let dayPrice;
let srcType;

/**
 * FETCH METHOD
 * ------------------------------------------------------------
*/

fetch(requestURL)
    .then(function(resp) {
        if (resp.ok) {
            resp.json().then(function(datas) { 
                showAllDatas(datas); 
                carrousel(document.querySelectorAll(".vignette"));
                addLikes(document.querySelectorAll(".fa-heart"));
            });
        }
        else {
            errorText.style.display="block";
            errorText.innerHTML="Erreur<br>"+resp.status+" "+resp.statusText;
        }
    });


/**
 * CLASS PHOTOGRAOHER INFO
 * Function : createPhotographer
 * Description : display the photographer's info
 * --------------------------------------------------------------------------------------------------------
 */

class Photographer {
    constructor(id,info) {
        this.id = id;
        this.tags = info.tags;
        this.name = info.name;
        this.city = info.city;
        this.country = info.country;
        this.tagline = info.tagline;
        this.portrait = info.portrait;
        this.price = info.price;
    }

    getInfo() {
        let listTags = this.tags;
        let textTag=``;
        for (let tag in listTags) {
            textTag +=`<li class="idDetails_tagg_link"><a aria-label="tag" href="#">#${listTags[tag]}</a></li>`;
        }
        photographerDetails.innerHTML += `<h1 class="title-photographer">${this.name}</h1>
                                            <p class="idDetails_city">${this.city}, ${this.country}</p>
                                            <p class="idDetails_slogan">${this.tagline}</p>                                            
                                            <ul class="idDetails_tagg">
                                                ${textTag}
                                            </ul>
                                        `;    
        photographerPicture.innerHTML += `<img src="../images/IDPhotos/${this.portrait}" aria-label="${this.name}" alt="" class="photographer_photo">`;           

        dayPrice = this.price;
    }
}

/**
 * FACTORY METHOD
 * Use :Type of Media (image or video)
 * -----------------------------------------------------------
*/

class Image {
    getRender() {
        return "img";
    }
}

class Video {
    getRender() {
       return "video";
    }
}

function factory(type) {
    switch (type) {
    case "image":
        return new Image();
    case "video":
        return new Video();
    }
}

/**
 * EVENT LISTENER - Click
 * DOM Element : Filter button
 * Description : 
 * On click > display the list of filters .......   function toggleFilter()
 *          > reorder the content on selection ..   function moceToFirst(element-content)
 * -----------------------------------------------------------------------------------------------------
 */

dropFilterSelected.addEventListener("click", function(e) {
    e.preventDefault();
    toggleFilter();
    moveToFirst(this.innerHTML);   
});

/**
 * FUNCTION toggleFilter()
 * Description : 
 * display the filter menu with aria-expanded attribute
 * -----------------------------------------------------------------------------------------------------
 */

function toggleFilter () {
    if (!dropMenuItems.getAttribute("style") || dropMenuItems.getAttribute("style") === "display: none;" ) {
        dropMenuItems.style.display = "block";
        dropFilterSelected.setAttribute("aria-expanded", "true");
        dropFilterIcon.classList.remove("fa-chevron-down");
        dropFilterIcon.classList.add("fa-chevron-up");
    }
    else {
        dropMenuItems.style.display = "none";
        dropFilterSelected.setAttribute("aria-expanded", "false");        
        dropFilterIcon.classList.remove("fa-chevron-up");
        dropFilterIcon.classList.add("fa-chevron-down");
    }
}

/**
 * FUNCTION moveToFirst()
 * Parameter : element content (Popularité / Date / Titre)
 * Description : 
 * reorganize the menu according the user's choice
 * -----------------------------------------------------------------------------------------------------
 */

function moveToFirst (valItem) {
    switch (valItem) {
    case "Popularité" :
        dropFilterSelected.textContent = "Popularité";
        dropFilterItem1.textContent = "Date";
        dropFilterItem2.textContent = "Titre";
        break;
    case "Date" : 
        dropFilterSelected.textContent = "Date";
        dropFilterItem1.textContent = "Popularité";
        dropFilterItem2.textContent = "Titre";
        break;
    case "Titre" :
        dropFilterSelected.textContent = "Titre";
        dropFilterItem1.textContent = "Date";
        dropFilterItem2.textContent = "Popularité";
        break;
    }
}

/**
 * FILTER SELECTED VALUE  
 * Description : 
 * according the URL parameter "filt", change the filter selected
 * -----------------------------------------------------------------------------------------------------
 */
switch (filterType) {
    case "Popular" : 
        dropFilterSelected.textContent = "Popularité"; 
        break;
    case "Date" :
        dropFilterSelected.textContent = "Date";
        break;
    case "Title" :
        dropFilterSelected.textContent = "Titre";
        break;
}

/**
 * EVENT LISTENER - Click
 * DOM Element : filter list element
 * Description : 
 * On click > display the list of filters .......   function toggleFilter()
 *          > reorder the content on selection ..   function moceToFirst(element-content)
 *          > reload page and replace the value of the filter selected by the user
 * -----------------------------------------------------------------------------------------------------
 */

dropFilterItems.forEach(item => {
    item.addEventListener("click", function(e) {  
        e.preventDefault();       
        toggleFilter();
        moveToFirst(this.innerHTML);  

        switch (dropFilterSelected.textContent) {
            case "Popularité" :
                loc.assign(url.replace(url.substring(url.indexOf("&filt=")),"&filt=Popular&tag=off"));
                break;
            case "Date" :
                loc.assign(url.replace(url.substring(url.indexOf("&filt=")),"&filt=Date&tag=off"));
                break;
            case "Titre" :
                loc.assign(url.replace(url.substring(url.indexOf("&filt=")),"&filt=Title&tag=off"));
                break;
        }
    });
});
    
/**
 * CREATE NEW ARRAY MEDIAS FILTERED
 * Class : ArrayFilterBy
 * Description : creating a new array of medias filtered
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
        // Factory Use ---------------------------        
        const mediaType = factory(this.type);
        let medType = mediaType.getRender();

        mediaList.innerHTML += `<li class="medias-card">
                                            <${medType} src="../images/Medias/${this.id}/${this.source}" class="vignette" slide="${this.counter}" id="${this.medId}" title="${this.title}"></${medType}> 
                                            <div class="b-pictureInfo">
                                                <span class="mediaText">${this.title}</span>
                                                <span class="mediaPrice">${this.price}€</span>
                                                <span class="mediaLikes">${this.likes}</span>
                                                <span class="mediaHeart"><i class='fas fa-heart' name="mediaHeart" id="${this.medId}"></i></span>
                                            </div>
                                        </li>`;
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
        photographerWorks.innerHTML += `<div class="b-likes-price">
                                            <span class="b-likes-price_content">${this.total} <i class="fas fa-heart"></i></span>
                                            <xpan class="b-likes-price_content">${this.price}€ / jour</span>
                                        </div
                                        `;

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
            new Photographer(idWorker,info).getInfo();
        }
    }
    // P2 -----------------------------------------------------------
    let photographerWork = obj.media;
    myFilterMedias.splice(0,myFilterMedias.length);
    for (let photographerMedia of photographerWork) {
        if (photographerMedia.photographerId == idWorker) {
            new ArrayFilterBy(photographerMedia,filterType).getCreateArray();
            new ArrayFilterBy(photographerMedia,filterType).getFilterBy();
        }
    }
    
    // P3 -----------------------------------------------------------
    const tagItems = document.querySelectorAll(".idDetails_tagg_link");
    tagItems.forEach(item => {
        item.addEventListener("click", function(e) {
            let valueTag = item.textContent;
            valueTag = valueTag.substring(1,valueTag.length);
            let myItem = (filterTag=="off" || filterTag!= valueTag) ? valueTag : filterTag;
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
    
    // P4 -------------------------------------------------------
    for (let tagMedia of myFilterMedias) {
        if (filterTag !="off" && filterTag == tagMedia.tag) {
            myTagFilterMedias.push(tagMedia);
        }
    }
    
    // P5 -------------------------------------------------------
    if (filterTag !=null && filterTag !="off") {
        myFilterMedias = myTagFilterMedias;
    }
    
    // P6 ------------------------------------------------------
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

    // P7 -------------------------------------------------------
    new Likes(aggLikes,dayPrice).getTotal();
    
    
    // P10 ------------------------------------------------------
    for(let pInfo of photographerInfo) {
        if (pInfo.id == idWorker) {
            frmPhotoName.textContent = pInfo.name;
        }
    }
    // End P10 -----------------------------------------------
} 

function carrousel(listMedia) {
    let slideIndex = 1;
    let slideContent = ``;
    let videoAttribute; 
    
    for(let media of listMedia) {
        
        // Factory Use ---------------------------
        media.localName == "img" ? srcType = "image" : srcType = "video";
        const mediaType = factory(srcType).getRender();

        media.localName =="video" ? videoAttribute="controls" : videoAttribute = "";

        slideContent +=`<div class="slide">
                            <figure>
                                <${mediaType} src="${media.src}" class="media-slide" ${videoAttribute}></${mediaType}>
                                <figcaption class="mediaText">${media.title}</figcaption>
                            </figure>
                        </div>`;
    }

    myContentLight.innerHTML += slideContent;

    listMedia.forEach(media => {
        media.addEventListener("click", function(e) {
            e.preventDefault();
            openLightbox();
            toSlide(parseInt(media.getAttribute("slide")));
        });
    });

    showSlide(slideIndex);
    
    function openLightbox() {
        myLightModal.style.display= "block";
    }

    closeBtn.addEventListener("click", function(e) {
        e.preventDefault();
        closeLightbox();
    });

    prevIcon.addEventListener("click", function(e) {
        e.preventDefault();
        changeSlide(-1);
    });

    nextIcon.addEventListener("click", function(e) {
        e.preventDefault();
        changeSlide(1);
    });

    function closeLightbox() {
        myLightModal.style.display = "none";
    }

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
}

function addLikes(likes) {
    console.log(likes);
    likes.forEach(like => {
        like.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(like.id);
        });
    });
}
console.log(localStorage);
