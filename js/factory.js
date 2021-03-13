/**
 * Filter Factory
 *  ------------------------------------------------------------------------------
 * */ 

function mediasFactory() {
    this.createMedias = function (filter) {
        let medias;
        
        if (filter === "Popular") {
            mediasFiltered = new popularFilter();
        } else if (filter === "Date") {        
            mediasFiltered = new dateFilter();
        } else if (filter === "Title") {
            mediasFiltered = new titleFilter();
        } else if (filter === "Tag") {
            mediasFiltered = new tagFilter();
        } 
        
        mediasFiltered.filter = filter; 
 
       return mediasFiltered;
    }
}
 
let popularFilter = function () {
    this.array = myFilterMedias.sort((a, b) => b.likes - a.likes);
};
 
let dateFilter = function () {    
   this.array = myFilterMedias.reverse((a, b) => a.date - b.date);
};
 
let titleFilter = function () {
	this.array = myFilterMedias.sort(function(a,b) {
            string1 = a.title;
            string2 = b.title;
            return string1.toString().localeCompare(string2.toString());
        });
};

let tagFilter = function () {  
    this.array = myTagFilterMedias;
};
 
let mediasFilt = [];
let myMediasFactory = new mediasFactory();
mediasFilt.push(myMediasFactory.createMedias("Popular")); 
mediasFilt.push(myMediasFactory.createMedias("Date")); 
mediasFilt.push(myMediasFactory.createMedias("Title"));
mediasFilt.push(myMediasFactory.createMedias("Tag"));






