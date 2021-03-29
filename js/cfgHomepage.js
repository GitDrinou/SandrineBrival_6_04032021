/**
 * VARIABLES Declaration
 * CONST and LET
 * -------------------------------------------------------------------------
*/
const photographersList = document.querySelector(".photographer");
const navTags = document.querySelector(".navigation_tagg");
const requestURL = "./js/json/FishEyeDataFR.json";
let photographers;
let parsedUrl = new URL(window.location.href);
let filterTag = parsedUrl.searchParams.get("tag");

let myTagArray = [];
let myTagFilter = [];

/**
 * FETCH METHOD
 * -----------------------------------------------------------------------------------------------------
*/

fetch(requestURL)
    .then(response => {
        if (response.ok) {
            response.json().then(datas => {
                showAllTags(datas.photographers)
                showPhotographers(datas.photographers)
            })
        }
        else {
            document.getElementById("error-json").style.display="block"
            document.getElementById("error-json").innerHTML = "Erreur avec le fichier JSON<br>" + response.status + " " + response.statusText;
        }
    })

/**
 * FUNCTION showAllTags()
 * Description : create an array of tags and display them in a list
 * Parameter : JSON object 'photographers'
 * -----------------------------------------------------------------------------------------------------
*/

function showAllTags(obj) {
    for (let i=0; i < obj.length; i++) {
        for(let tag of obj[i].tags) {
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

/**
 * FUNCTION showPhotographers()
 * Description : 
 *      display the photographers's list
 *      and by a tag's click, filtering the list * 
 * Parameter : JSON object 'photographers'
 * -----------------------------------------------------------------------------------------------------
*/
function showPhotographers(obj) {
    for (let item of obj) {
        for (let tag of item.tags) {
            if (filterTag != null && tag == filterTag) {
                myTagFilter.push(item);
            }            
        }
    }
    
    myTagFilter.length > 0 ? obj = myTagFilter : obj = obj;
   
    for (let info of obj) {
        const newPhotographer = new Photographer(info.id,info);
        newPhotographer.getHomeInfo();         
    }

    const tagItems = document.querySelectorAll(".photographer_tagg_link");
    
    tagItems.forEach(item => {
        item.addEventListener('click', function(e) {  
            let valueTag = item.textContent;            
            let myItem = valueTag.substring(1,valueTag.length);
            e.preventDefault();
          
            for (let photographer of obj) {
                for (let j=0; j < photographer.tags.length; j++) {
                    if (myItem == photographer.tags[j]) {
                        document.location.assign(document.URL.replace(document.URL.substring(document.URL.indexOf("?tag=")),"?tag=" + myItem));
                    }                   
                }
            }              
        });
    }); 
    
}   


