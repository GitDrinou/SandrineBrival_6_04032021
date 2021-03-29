/**
 * VARIABLES
 */

const photographerDetails = document.querySelector(".idDetails");
const photographerPicture = document.querySelector(".idPicture");

/**
 * CLASS PHOTOGRAOHER INFO
 * Function : createPhotographer
 * Description : display the photographer's info
 * Parameters :
 *      >> id : id Photographer
 *      >> type : type of medias (image or video)
 *      >> source : name of the media's file
 *      >> title : title's media
 *      >> likes : number of likes
 *      >> price : media's price
 *      >> counter : index for the slideshow
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

    getHomeInfo() {
        let myItem = document.createElement("li");
        let myIDPicLink = document.createElement("a");
        let myIDPicture = document.createElement("img");
        let myH2 = document.createElement("h2");
        let myLocation = document.createElement("p");
        let mySlogan = document.createElement("p");
        let myPrice = document.createElement("p");

        let myTagsList = document.createElement("ul")
        let listTags = this.tags;
        
        for (let tag in listTags) {
            let myTags = document.createElement("li");
            let myTagsLink = document.createElement("a");
            myTagsLink.textContent = "#" + listTags[tag];
            myTags.classList.add("photographer_tagg_link");
            myTagsList.appendChild(myTags);
            myTags.appendChild(myTagsLink);
        }
        
        myIDPicLink.href = "pages/photographer.html?id=" + this.id + "&filt=Popular&tag=off";
        myIDPicture.src = "./images/IDPhotos/"+ this.portrait;
        myIDPicture.alt = "Photo de " + this.name + " - cliquez pour accéder à son travail.";
        myIDPicture.classList.add("photographer_photo--home");
        myH2.textContent = this.name;
        myH2.classList.add("photographer_name");
        myLocation.textContent = this.city + ", " + this.country;
        myLocation.classList.add("photographer_city");
        mySlogan.textContent = this.tagline;
        mySlogan.classList.add("photographer_desc");
        myPrice.textContent = this.price + "€/jour";
        myPrice.classList.add("photographer_price");
        myTagsList.classList.add("photographer_tagg");

        myItem.appendChild(myIDPicLink);
        myIDPicLink.appendChild(myIDPicture);
        myItem.appendChild(myH2);
        myItem.appendChild(myLocation);
        myItem.appendChild(mySlogan);
        myItem.appendChild(myPrice);
        myItem.appendChild(myTagsList);
        myItem.classList.add("space-card");

        photographersList.appendChild(myItem);
    }

    getInfo() {
        let myH1 = document.createElement("h1");
        let myLocation = document.createElement("p");
        let mySlogan = document.createElement("p");
        let myIDPicture = document.createElement("img");
        let myTagsList = document.createElement("ul");
        let listTags = this.tags;

        for (let tag in listTags) {
            let myTags = document.createElement("li");
            let myTagsLink = document.createElement("a");
            myTagsLink.textContent = "#" + listTags[tag];
            myTags.classList.add("idDetails_tagg_link");
            myTagsList.appendChild(myTags);
            myTags.appendChild(myTagsLink);
        }

        myH1.textContent = this.name;
        myH1.classList.add("title-photographer"); 
        myLocation.textContent = this.city + ", " + this.country;
        myLocation.classList.add("idDetails_city");
        mySlogan.textContent = this.tagline;
        mySlogan.classList.add("idDetails_slogan");
        myTagsList.classList.add("idDetails_tagg");
        myIDPicture.src = "../images/IDPhotos/"+ this.portrait;
        myIDPicture.alt = "Vignette de " + this.name;
        myIDPicture.classList.add("photographer_photo");
        
        photographerDetails.appendChild(myH1);
        photographerDetails.appendChild(myLocation);
        photographerDetails.appendChild(mySlogan);
        photographerDetails.appendChild(myTagsList);
        photographerPicture.appendChild(myIDPicture);

        dayPrice = this.price;
    }
}

