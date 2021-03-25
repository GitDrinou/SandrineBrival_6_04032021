/**
 * VARIABLES Declaration
 * CONST and LET
 * -------------------------------------------------------------------------
*/
const photographersList = document.querySelector(".photographer");
const navTags = document.querySelector(".navigation_tagg");
const requestURL = "./js/json/FishEyeDataFR.json";
const request = new XMLHttpRequest();
let photographers;
let parsedUrl = new URL(window.location.href);
let filterTag = parsedUrl.searchParams.get("tag");

let myTagArray = [];
let myTagFilter = [];

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
    let photographer = request.response;
    showAllTags(photographer);
    showPhotographers(photographer);
}

// list of tags
function showAllTags(obj) {
    photographers = obj["photographers"];   

    for (let i=0; i < photographers.length; i++) {
        for(let tag of photographers[i].tags) {
            if (myTagArray.indexOf(tag) == -1) {
                myTagArray.push(tag);
            }
        }
    }
    for (let tags of myTagArray) {
        let myTag = document.createElement("li");
        let myTagLink = document.createElement("a");
        myTag.classList.add("tagg_link");
        myTagLink.textContent = "#" + tags;
        myTagLink.setAttribute("href", "index.html?tag=" + tags);
        myTag.appendChild(myTagLink);
        navTags.appendChild(myTag);
    }
}

function showPhotographers(obj) {
    photographers = obj["photographers"]; 

    for (let item of photographers) {
        for (let tag of item.tags) {
            if (filterTag != null && tag == filterTag) {
                myTagFilter.push(item);
            }            
        }
    }
    
    myTagFilter.length > 0 ? photographers = myTagFilter : photographers = photographers;
   
    // Part 2.1 ----------------------------------------------
    for (let info of photographers) {
        const newPhotographer = new Photographer(info.id,info);
        newPhotographer.getHomeInfo();         
    }

   // filter By Tags
    const tagItems = document.querySelectorAll(".photographer_tagg_link");
    
    tagItems.forEach(item => {
        item.addEventListener('click', function(e) {  
            let valueTag = item.textContent;            
            let myItem = valueTag.substring(1,valueTag.length);
            e.preventDefault();
          
            for (let photographer of photographers) {
                for (let j=0; j < photographer.tags.length; j++) {
                    if (myItem == photographer.tags[j]) {
                        document.location.assign(document.URL.replace(document.URL.substring(document.URL.indexOf("?tag=")),"?tag=" + myItem));
                    }                   
                }
            }              
        });
    }); 
    
}   


