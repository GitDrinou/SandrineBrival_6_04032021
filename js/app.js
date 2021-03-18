
/**
 * EVENT LISTENER - Click
 * DOM Element : Filter button
 * Description : 
 * On click > display the list of filters .......   function toggleFilter()
 *          > reorder the content on selection ..   function moceToFirst(element-content)
 * -----------------------------------------------------------------------------------------------------
 */

dropFilterSelected.addEventListener('click', function(e) {
    e.preventDefault();
    toggleFilter();
    moveToFirst(this.innerHTML);   
});

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
    item.addEventListener('click', function(e) {  
        e.preventDefault();       
        toggleFilter();
        moveToFirst(this.innerHTML);  

        switch (dropFilterSelected.textContent) {
            case "Popularité" :
                document.location.assign(document.URL.replace(document.URL.substring(document.URL.indexOf("&filt=")),"&filt=Popular&tag=off"));
                break;
            case "Date" :
                document.location.assign(document.URL.replace(document.URL.substring(document.URL.indexOf("&filt=")),"&filt=Date&tag=off"));
                break;
            case "Titre" :
                document.location.assign(document.URL.replace(document.URL.substring(document.URL.indexOf("&filt=")),"&filt=Title&tag=off"));
                break;
        }
    });
});

/**
 * FUNCTION toggleFilter()
 * Description : 
 * display the filter menu with aria-expanded attribute
 * -----------------------------------------------------------------------------------------------------
 */

function toggleFilter () {
    if (!dropMenuItems.getAttribute('style') || dropMenuItems.getAttribute('style') === "display: none;" ) {
        dropMenuItems.style.display = "block";
        dropFilterSelected.setAttribute('aria-expanded', 'true');
        dropFilterIcon.classList.remove("fa-chevron-down");
        dropFilterIcon.classList.add("fa-chevron-up");
    }
    else {
        dropMenuItems.style.display = 'none';
        dropFilterSelected.setAttribute('aria-expanded', 'false');        
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

closeBtn.addEventListener("click", function(e) {
    e.preventDefault();
    closeLightbox();
});


btnContact.addEventListener("click", function(e) {
    e.preventDefault();
    onpenContact();
})

function openLightbox() {
    myLightModal.style.display= "block";
}
function onpenContact() {
    myContactModal.style.display= "block";
}

function closeLightbox() {
    myLightModal.style.display = 'none';
};

//console.log(document.querySelector(".title-photographer"));