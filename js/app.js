

// Part 3 : Events Click -----------------------------------------------
dropFilterSelected.addEventListener('click', function(e) {
    e.preventDefault();
    toggleFilter();
    moveToFirst(this.innerHTML);   
});

dropFilterItems.forEach(item => {
    item.addEventListener('click', function(e) {  
        e.preventDefault();       
        toggleFilter();
        moveToFirst(this.innerHTML);  
        
        if (dropFilterSelected.textContent == "Popularité") {
            document.location.assign(document.URL.replace(document.URL.substring(document.URL.indexOf("&filt=")),"&filt=Popular&tag=off"));
        } 
        if (dropFilterSelected.textContent == "Date") {
            document.location.assign(document.URL.replace(document.URL.substring(document.URL.indexOf("&filt=")),"&filt=Date&tag=off"));
        }
        if (dropFilterSelected.textContent == "Titre") {
            document.location.assign(document.URL.replace(document.URL.substring(document.URL.indexOf("&filt=")),"&filt=Title&tag=off"));
        }  
    });
});



// Function display filter -------------------------------------------------------------------------
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

// Function move the item selected to first level
function moveToFirst (valItem) {
   if(valItem=="Popularité") {
    dropFilterSelected.textContent = "Popularité";
    dropFilterItem1.textContent = "Date";
    dropFilterItem2.textContent = "Titre";
   }
   if(valItem=="Date") {
    dropFilterSelected.textContent = "Date";
    dropFilterItem1.textContent = "Popularité";
    dropFilterItem2.textContent = "Titre";
   }
   if(valItem=="Titre") {
    dropFilterSelected.textContent = "Titre";
    dropFilterItem1.textContent = "Date";
    dropFilterItem2.textContent = "Popularité";
   }
}

// display the right filter selected
if (filterType == "Popular") { dropFilterSelected.textContent = "Popularité"; }
if (filterType == "Date") { dropFilterSelected.textContent = "Date"; }
if (filterType == "Title") { dropFilterSelected.textContent = "Titre"; }



