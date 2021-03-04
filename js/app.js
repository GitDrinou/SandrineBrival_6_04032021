/**
 * Filter By
 * This part is about the filter choice
 * how the items appear and disappear
 * -------------------------------------------------------------------------
*/

// Part 1  : DOM Elements ------------------------------------------
const dropMenuItems = document.querySelector(".dropdown-items");
const dropFilterLink = document.querySelector(".filter-dropdown_link");  
const dropFilterIcon = document.getElementById("filterIcon");

const dropFilterItem0 = document.getElementById("filter-0");
const dropFilterItem1 = document.getElementById("filter-1");
const dropFilterItem2 = document.getElementById("filter-2");
const dropFilterSelected = document.getElementById("filter-selected");

// Part 2  : 
// Function display filter -------------------------------------------------------------------------
function toggleFilter () {
    if (!dropMenuItems.getAttribute('style') || dropMenuItems.getAttribute('style') === "display: none;" ) {
        dropMenuItems.style.display = "block";
        dropFilterItem0.setAttribute('aria-expanded', 'true');
        dropFilterIcon.classList.remove("fa-chevron-down");
        dropFilterIcon.classList.add("fa-chevron-up");
    }
    else {
        dropMenuItems.style.display = 'none';
        dropFilterItem0.setAttribute('aria-expanded', 'false');        
        dropFilterIcon.classList.remove("fa-chevron-up");
        dropFilterIcon.classList.add("fa-chevron-down");
    }
}

// Function move the item selected to first level
function moveToFirst (valItem) {
   if(valItem=="Popularité") {
    dropFilterSelected.innerHTML = "Popularité";
    dropFilterItem1.innerHTML = "Date";
    dropFilterItem2.innerHTML = "Titre";
   }
   if(valItem=="Date") {
    dropFilterSelected.innerHTML = "Date";
    dropFilterItem1.innerHTML = "Popularité";
    dropFilterItem2.innerHTML = "Titre";
   }
   if(valItem=="Titre") {
    dropFilterSelected.innerHTML = "Titre";
    dropFilterItem1.innerHTML = "Date";
    dropFilterItem2.innerHTML = "Popularité";
   }
}


// Part 3 : Events Click -----------------------------------------------
dropFilterItem0.addEventListener('click', function(e) {
    e.preventDefault();
    toggleFilter();
    moveToFirst(this.innerHTML);
});

dropFilterItem1.addEventListener('click', function(e) {
    e.preventDefault();
    toggleFilter();
    moveToFirst(this.innerHTML);
});

dropFilterItem2.addEventListener('click', function(e) {
    e.preventDefault();
    toggleFilter();
    moveToFirst(this.innerHTML);
});

