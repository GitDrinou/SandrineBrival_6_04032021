
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

function openLightbox() {
    myLightModal.style.display= "block";
}

function closeLightbox() {
    myLightModal.style.display = 'none';
};

/**
 * FORMULARY ACTIONS
 */
const frmContact = document.getElementById("frmContact");
const firstName = document.getElementById("fName");
const lastName = document.getElementById("lName");
const mail = document.getElementById("eMail");
const message = document.getElementById("message");
const btnSubmit = document.querySelector(".btn-submit");
let mailReg = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i);
let isStrReg = new RegExp(/[0-9]/g);


btnContact.addEventListener("click", function(e) {
    e.preventDefault();
    onpenContact();
})

btnSubmit.addEventListener("click",(e) => {
    e.preventDefault();
    if(frmValidation()) {
        console.log("PRENOM : " + firstName.value);
        console.log("NOM : " + lastName.value);
        console.log("EMAIL : " + mail.value);
        console.log("MESSAGE : " + message.value);
        myContactModal.style.display = 'none';
    } 
});

function onpenContact() {
    myContactModal.style.display= "block"; 
    firstName.value="";
    lastName.value="";
    mail.value="";
    message.value="";   
}

closeBtnFrm.addEventListener("click", function(e) {
    e.preventDefault();
    closeFrmContact();
});

function closeFrmContact() {
    myContactModal.style.display = 'none';
};

function frmValidation() {
    let valid = true;
    let valFirstName = firstName.value;
    let valLastName = lastName.value;
    let valMessage = message.value
    let valMail = mail.value;
    let isStr_firstName, isStr_lastName;

    // check if there are numbers on first and last name ------------------------
    (valFirstName.match(isStrReg) == null) ? isStr_firstName = 0 : isStr_firstName = valFirstName.match(isStrReg).length;
    (valLastName.match(isStrReg) == null) ? isStr_lastName = 0 : isStr_lastName = valLastName.match(isStrReg).length;


    // check by field
    if ((valFirstName == "") || (isStr_firstName > 0 ))  {
        firstName.nextElementSibling.innerHTML = "Veuillez saisir votre prénom (pas de chiffres).";
        firstName.className = "field--error";
        valid = false;
    } else {
        firstName.nextElementSibling.innerHTML = "";
        firstName.classList.remove("field--error");
    }

    if ((valLastName == "") || (isStr_lastName > 0 ))  {
        lastName.nextElementSibling.innerHTML = "Veuillez saisir votre nom (pas de chiffres).";
        lastName.className = "field--error";
        valid = false;
    } else {
        lastName.nextElementSibling.innerHTML = "";
        lastName.classList.remove("field--error");
    }

    if ((valMail=="") || (!mailReg.test(valMail)))  {
        mail.nextElementSibling.innerHTML = "Veuillez entrer une adresse mail valide.";
        mail.className = "field--error";
        valid = false;
    } else {
        mail.nextElementSibling.innerHTML = "";
        mail.classList.remove("field--error");
    }
    
    if (valMessage=="") {
        message.nextElementSibling.innerHTML = "Veuillez saisir un message pour le photographe.";
        message.className = "field--error";
        valid = false;
    } else {
        message.nextElementSibling.innerHTML = "";
        message.classList.remove("field--error");
    }
    
    return valid;
    
}