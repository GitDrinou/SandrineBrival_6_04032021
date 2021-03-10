

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
            document.location.href = document.URL.replace(document.URL.substring(document.URL.indexOf("&filt=")),"&filt=Popular");
        } 
        if (dropFilterSelected.textContent == "Date") {
            document.location.href = document.URL.replace(document.URL.substring(document.URL.indexOf("&filt=")),"&filt=Date");
        }
        if (dropFilterSelected.textContent == "Titre") {
            document.location.href = document.URL.replace(document.URL.substring(document.URL.indexOf("&filt=")),"&filt=Title");
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
if (numFilter == "Popular") { dropFilterSelected.textContent = "Popularité"; }
if (numFilter == "Date") { dropFilterSelected.textContent = "Date"; }
if (numFilter == "Title") { dropFilterSelected.textContent = "Titre"; }


// Modal Medias
/*myMedias.forEach(elt => {
    elt.addEventListener('click', function(e) {  
        e.preventDefault(); 
        console.log("ok");
    });
});
*/