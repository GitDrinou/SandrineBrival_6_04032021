/**
 * VARIABLES
 */

const btnContact = document.querySelector(".btn-contact");
const myContactModal = document.getElementById("formContact");
const closeBtnFrm = document.querySelector(".close-form");
const focusElts = "input,label,button,h1,span";
let listFocus = [];

/**
 * FORMULARY ACTIONS
 */
const firstName = document.getElementById("fName");
const lastName = document.getElementById("lName");
const mail = document.getElementById("eMail");
const message = document.getElementById("message");
const btnSubmit = document.querySelector(".btn-submit");
let mailReg = new RegExp(/^([\w-.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i);
let isStrReg = new RegExp(/[0-9]/g);

btnContact.addEventListener("click", function(e) {
    e.preventDefault();
    openContact();
});
       
function openContact() {
    myContactModal.style.display= "block";
    myContactModal.setAttribute("aria-hidden", false);
    myContactModal.setAttribute("aria-modal",true); 
    listFocus = Array.from(myContactModal.querySelectorAll(focusElts));
    firstName.value="";
    lastName.value="";
    mail.value="";
    message.value="";  
}

    


function focusModal() {
    let index = listFocus.findIndex(f => f === myContactModal.querySelector(":focus"));
    index++;
    if(index >= listFocus.length) {
        index = 0;
    }
    listFocus[index].focus();
}


btnSubmit.addEventListener("click",(e) => {
    e.preventDefault();
    if(frmValidation()) {
        console.log("PRENOM : " + firstName.value);
        console.log("NOM : " + lastName.value);
        console.log("EMAIL : " + mail.value);
        console.log("MESSAGE : " + message.value);
        myContactModal.style.display = "none";
    } 
});


closeBtnFrm.addEventListener("click", function(e) {
    e.preventDefault();
    closeFrmContact();
});

function closeFrmContact() {
    myContactModal.style.display = "none";
}

function frmValidation() {
    let valid = true;
    let valFirstName = firstName.value;
    let valLastName = lastName.value;
    let valMessage = message.value;
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

/**
 * KEYBOARD NAVIAGATION - CONFIGURATION 
 * Description :  contact form configuration 
 * Keys :
 *      >> ESCAPE : close the form
 *      >> ENTER : submit the form
 *      >> TAB : navigate on fields
 * ------------------------------------------------
 *
 */ 

window.addEventListener("keydown", function(e) {
    if(e.defaultPrevented){
        return;     // comportement par défaut inhibé
    }
    if (e.key === "Escape" || e.key === "Esc") {
        closeFrmContact();
    } 
    if (e.key==="Tab" && myContactModal.style.display=="block") {
        focusModal();
    }   
});

