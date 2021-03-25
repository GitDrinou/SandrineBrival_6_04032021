/**
 * FACTORY METHOD FILTER BY 
 * 
*/
class DoFilter {
    filterBy() {
        myFilterMedias.sort((a, b) => b.likes - a.likes);
    }
}
class PopularFilter extends DoFilter{
    filterBy() {
       myFilterMedias.sort((a, b) => b.likes - a.likes);
    }    
}

class DateFilter extends DoFilter {
    filterBy() {
        myFilterMedias.reverse((a, b) => a.date - b.date);
    }
}

class TitleFilter extends DoFilter {
    filterBy() {
        myFilterMedias.sort(function(a,b) {
            let string1 = a.title;
            let string2 = b.title;
            return string1.toString().localeCompare(string2.toString());
        });
    }
}


function factoryFilterBy(type) {
    switch (type) {
        case "Popular" : 
            return new PopularFilter;
        case "Date" :
            return new DateFilter;
        case "Title" : 
            return new TitleFilter;
        default:
            return new DoFilter;
    }
}