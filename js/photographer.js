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

let counter = 1;
let filterTag = parsedUrl.searchParams.get("tag");

let myFilterMedias = [];
let myTagFilterMedias = [];
let aggLikes = 0;
let dayPrice;
let srcType;
let slideIndex = 1;

/**
 * FETCH
 * ------------------------------------------------------------
*/

fetch(requestURL)
    .then(function(resp) {
        if (resp.ok) {
            resp.json().then(function(datas) { 
                showAllDatas(datas); 
                carrousel(document.querySelectorAll(".vignette"));
                updateLikes(document.querySelectorAll(".fa-heart"), document.querySelectorAll(".mediaLikes"));                
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
            photographerDetails.innerHTML += `<h1 class="title-photographer" role="header" tabindex="2">${this.name}</h1>
                                                <p class="idDetails_city" role="text" tabindex="3">${this.city}, ${this.country}</p>
                                                <p class="idDetails_slogan" role="text" tabindex="3">${this.tagline}</p>                                            
                                                <ul class="idDetails_tagg" tabindex="4">
                                                    ${textTag}
                                                </ul>
                                        `;    
            photographerPicture.innerHTML += `<img src="../images/IDPhotos/${this.portrait}" tabindex="6" aria-label="${this.name}" alt="" class="photographer_photo">`;           

            dayPrice = this.price;
            frmPhotoName.textContent = this.name;
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



function addLikes(id) {
    let listOfLikes = getLikes(); 
    listOfLikes.push(id);
    saveLikes(listOfLikes);   
}

function getLikes() {
    let listId = localStorage.getItem("newLikes");
    
    if (listId == null) { 
        return [];
    }
    else {
       return JSON.parse(listId);
    }
}

function saveLikes(list) {
    localStorage.setItem("newLikes",JSON.stringify(list));
}

    
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
    constructor(medias,filter,type,source,counter) {
        this.id = medias.id;
        this.photographId = medias.photographerId;
        this.likes = medias.likes;
        this.date = medias.date;
        this.title = medias["alt-text"];
        this.tags = medias.tags;
        this.price = medias.price;
        this.filter = filter;
        this.type = type;
        this.source = source;
        this.counter = counter;
    }
    
    getCreateArray() {
        myFilterMedias.push({
            "id": this.id,
            "photographerId": this.photographId,
            "type": this.type,
            "source": this.source,
            "likes": this.likes,
            "date": this.date,
            "alt-text": this.title,
            "price": this.price,
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
                let string1=a["alt-text"];
                let string2=b["alt-text"];
                return(string1.toString().localeCompare(string2.toString()));
            });
            break;
        }
    }

    getMedias(){

        // Factory Use ---------------------------        
        const mediaType = factory(this.type);
        let medType = mediaType.getRender();            

        mediaList.innerHTML += `<li class="medias-card">
                                    <a href="#"><${medType} src="../images/Medias/${this.photographId}/${this.source}"  tabindex="10" class="vignette" id="${this.id}" slide="${this.counter}" title="${this.title}"></${medType}></a> 
                                    <div class="b-pictureInfo">
                                        <span class="mediaText">${this.title}</span>
                                        <span class="mediaPrice">${this.price}€</span>
                                        <span class="mediaLikes" data-id="${this.id}">${this.likes}</span>
                                        <span class="mediaHeart"><i class="fas fa-heart like" data-id="${this.id}"></i></span>
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
        photographerWorks.innerHTML += `<div class="b-likes-price" tabindex="7">
                                            <span class="b-likes-price_content">${this.total} <i class="fas fa-heart"></i></span>
                                            <xpan class="b-likes-price_content">${this.price}€ / jour</span>
                                        </div
                                        `;

    }
};


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
 * FUNCTION showAllDatas(object JSON)
 * ---------------------------------------------------------------------
 */

function showAllDatas(obj) {

    // display the photographer info
    let photographerInfo = obj.photographers;
    for (let info of photographerInfo) {
        if (info.id == idWorker) {
            new Photographer(idWorker,info).getInfo();
        }
    }
    // create and do filter of medias
    let photographerWork = obj.media;
    myFilterMedias.splice(0,myFilterMedias.length);
    for (let media of photographerWork) {
        if (media.photographerId == idWorker) {
            let type, source;
            if((media.image !=null) && (media.video == null)) {
                type = "image";
                source = media.image;
            } else if((media.video !=null) && (media.image == null)) {
                type = "video";
                source = media.video;
            }
            new ArrayFilterBy(media,filterType,type,source,counter).getCreateArray();
            new ArrayFilterBy(media,filterType,type,source,counter).getFilterBy();
          
        }
    }
    
    // do filter by tag
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
    
    for (let tagMedia of myFilterMedias) {
        if (filterTag !="off" && filterTag == tagMedia.tag) {
            myTagFilterMedias.push(tagMedia);
        }
    }
    if (filterTag !=null && filterTag !="off") {
        myFilterMedias = myTagFilterMedias;
    }
    
    // display medias filtered or by default
    for (let media of myFilterMedias) {
        new ArrayFilterBy(media,media.filterType,media.type,media.source,counter).getMedias();
        counter ++;
    }

    // display the total of likes
    new Likes(aggLikes,dayPrice).getTotal();
    
} 

/**
 * FUNCTIONS FOR LIGHTBOX
 * Description: 
 *      > carrousel : modal lightbox calling next functions :
 *              >> openLightbox : open the modal
 *              >> closeLightbox : close the modal
 *              >> showSlide : display media as slide
 *              >> changeSlide : navigate on slide
 *              >> toSlide : display the media clicked
 */

function carrousel(listMedia) {    
    let slideContent = ``;
    let videoAttribute; 
    
    for(let media of listMedia) {      
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
            openLightbox(myLightModal);
            toSlide(parseInt(media.getAttribute("slide")));
        });
    });

    showSlide(slideIndex);
    
    closeBtn.addEventListener("click", function(e) {
        e.preventDefault();
        closeLightbox(myLightModal);
    });

    prevIcon.addEventListener("click", function(e) {
        e.preventDefault();
        changeSlide(-1);
    });

    nextIcon.addEventListener("click", function(e) {
        e.preventDefault();
        changeSlide(1);
    });    
}

function openLightbox(modal) {
    modal.style.display= "block";
}

function closeLightbox(modal) {
    modal.style.display = "none";
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

function changeSlide(n) {
    showSlide(slideIndex += parseInt(n));
}

function toSlide(n) {
    showSlide(slideIndex = n);
}

/**
 * FUNCTIONS/EVENTLISTENER FOR LIKES
 * Description: 
 *      > upgrade the total of likes and the number of likes
 */
//localStorage.clear();
 function updateLikes(likes,nbLikes) {
    likes.forEach(like => {
        like.addEventListener("click", function(e) {
            e.preventDefault();
            if(!like.classList.contains("liked")) {
                console.log(aggLikes);
                addLikes(this.dataset.id, this.dataset.likes);             
                like.classList.add("liked");
                aggLikes+=1;

                nbLikes.forEach(nb => {
                    if (nb.dataset.id == like.dataset.id) {
                        nb.textContent = parseInt(nb.textContent) + 1;                      
                        document.querySelector(".b-likes-price_content").textContent = parseInt(document.querySelector(".b-likes-price_content").textContent) + 1;
                    }
                });  
            }                
        });
        
        if(localStorage.getItem("newLikes") !=null) {
            for(let i of JSON.parse(localStorage.getItem("newLikes"))) {
               if (i == like.dataset.id ) {
                like.classList.add("liked");
                nbLikes.forEach(nb => {
                    if (nb.dataset.id == like.dataset.id) {
                        nb.textContent = parseInt(nb.textContent) + 1;
                        document.querySelector(".b-likes-price_content").textContent = parseInt(document.querySelector(".b-likes-price_content").textContent) + 1;
                    }
                });  
               }
            }
        }
        
    });     
}