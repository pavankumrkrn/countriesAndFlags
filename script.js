let countries = [];

let p =  new Promise((resolve, reject)=>{
    let request = new XMLHttpRequest();
    request.open('GET', 'https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json', true);
    request.onerror = function(){
        console.log('Error');
        reject('An error occured');
    }
    request.send();
    request.onload = function () {
       let data = JSON.parse(this.response);
       resolve(data)
    }
})
p.then((data)=>{
    countries = getCountries(data); 
    createRows(countries);
}).catch((error)=>{
    console.log(error)
})

let createElement = (element, className='', id='')=>{
    let ele = document.createElement(element);
    ele.setAttribute('class', className);
    ele.id =  id;
    return ele;
}

let createli = (key, innerhtml) => {
    let li = createElement('li', 'list-group-item');
    li.innerHTML = key+' : '+innerhtml;
    return li;

}

let createCard = (obj) =>{
   let column = createElement('div', 'col col-sm-3 mt-5');
   let card = createElement('div', 'card');
   let cardHeader = createElement('div', 'card-header');
   cardHeader.innerText = obj.name;
   let img = createElement('img', 'card-img-top');
   let imgURL = `https://www.countryflags.io/${obj.alpha2Code}/shiny/64.png`
   img.setAttribute('src', imgURL);
   img.setAttribute('alt', obj.name);
   let ul = createElement('ul', 'list-group list-group-flush');
   let span = `<span class="badge badge-success">${obj.capital}</span>`
   let countryCodes = obj.alpha2Code+', '+obj.alpha3Code
   let capital = createli('Capital', span);
   let codes = createli('Country Codes', countryCodes);
   let region = createli('Region', obj.region);
   let lat = (+obj.latlng[0]).toFixed(2)
   let lng = (+obj.latlng[1]).toFixed(2)
   let latLong = createli('Lat-Long', lat+', '+lng)
   ul.append(capital, codes, region, latLong);
   card.append(cardHeader, img, ul);
   column.append(card);
   return column;
}

let createRows = (obj) => {
    let row = createElement('div', 'row');
    obj.forEach(i=>{
        i.forEach(element => {
            if(typeof(element) !== 'undefined'){
                let col = createCard(element);
                row.append(col);
            }
         });
        })    
    document.getElementById('countrycards').append(row)
}

let getCountries =  (obj)=>{
    let countries1 = [] 
    for(let i=0; i<obj.length; i+=4){
        let ar = [];
        ar.push(obj[i]);
        ar.push(obj[i+1]);
        ar.push(obj[i+2]);
        ar.push(obj[i+3]);
        countries1.push(ar);

    }
    return countries1;
}



