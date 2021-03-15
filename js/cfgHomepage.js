/**
 * Definitions
*/
const photographersList = document.querySelector(".photographer");
const requestURL = "./js/json/FishEyeDataFR.json";
const request = new XMLHttpRequest();

/**
 * Work with JSON file
 * Part 1 : open the file JSON, access to the photographer's data
 * Part 2 : function which construct the page content with JSON's datas
 * Part 2.1 : for each photographer in the datas, create a list element (<li>)
 * Part 2.1.1 : apply a style for each data, and filled the tag element
 * Part 2.1.2 : attach all the elements to the list element (<li>)
 * Part 2.1.3 : attach all the <li> elements to the <ul> element
*/

// Part 1 -----------------------------------------------------
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function() {
    let photographer = request.response;
    showPhotographers(photographer);
}

// Part 2 -----------------------------------------------------
function showPhotographers(obj) {
    let photographers = obj["photographers"];

    // Part 2.1 ----------------------------------------------
    for (let i=0; i < photographers.length; i++) {
        let myItem = document.createElement("li");
        let myIDPicLink = document.createElement("a");
        let myIDPicture = document.createElement("img");
        let myH2 = document.createElement("h2");
        let myLocation = document.createElement("p");
        let mySlogan = document.createElement("p");
        let myPrice = document.createElement("p");

        ;let myTagsList = document.createElement("ul")
        let listTags = photographers[i].tags;

        for (let j=0; j < listTags.length; j++) {
            let myTags = document.createElement("li");
            let myTagsLink = document.createElement("a");
            myTagsLink.textContent = listTags[j];
            myTags.classList.add("photographer_tagg_link");
            myTagsList.appendChild(myTags);
            myTags.appendChild(myTagsLink);
        }

        // Part 2.1.1 ----------------------------------------------
        myIDPicLink.href = "pages/photographer.html?id=" + photographers[i].id + "&filt=Popular&tag=off";
        myIDPicture.src = "./images/IDPhotos/"+ photographers[i].portrait;
        myIDPicture.alt = photographers[i].name;
        myIDPicture.classList.add("photographer_photo");
        myH2.textContent = photographers[i].name;
        myH2.classList.add("photographer_name");
        myLocation.textContent = photographers[i].city + ", " + photographers[i].country;
        myLocation.classList.add("photographer_city");
        mySlogan.textContent = photographers[i].tagline;
        mySlogan.classList.add("photographer_desc");
        myPrice.textContent = photographers[i].price + "€/jour";
        myPrice.classList.add("photographer_price");
        myTagsList.classList.add("photographer_tagg");

        // Part 2.1.2 ----------------------------------------------
        myItem.appendChild(myIDPicLink);
        myIDPicLink.appendChild(myIDPicture);
        myItem.appendChild(myH2);
        myItem.appendChild(myLocation);
        myItem.appendChild(mySlogan);
        myItem.appendChild(myPrice);
        myItem.appendChild(myTagsList);
        myItem.classList.add("space-card");

        // Part 2.1.3 ----------------------------------------------
        photographersList.appendChild(myItem);
    }
}


