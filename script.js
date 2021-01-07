let countries = [];
let url = 'https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json';



fetch(url).then((data)=>{
    return data.json(); 
}).then((data)=>{
    countries = getCountries(data); 
    createRows(countries);
}).catch((error)=>{
    console.log(error);
    let err = createElement('p', 'display-4 text-center')
    err.setAttribute('style', 'color: red')
    err.innerText = 'Oops! we encountered an error'
    document.getElementById('countrycards').append(err)
})

let createElement = (element, className='', id='')=>{
    let ele = document.createElement(element);
    ele.setAttribute('class', className);
    ele.id =  id;
    return ele;
}

let createli = (key, innerhtml) => {
    let li = createElement('li', 'list-group-item text-center');
    if(key === 'button'){
        let button = createElement('button', 'btn btn-light');
        button.onclick = ()=>{
            getWeather(innerhtml)
        }
        button.innerText = 'Get Weather'
        li.append(button);
        return li;
    }
    li.innerHTML = key+' : '+innerhtml;
    return li;

}

function getWeather(capital){
    console.log(capital)
    let api_key = '8b64dd88e9c8ef3360842ef7f6dc1a2d';
    let weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+capital+'&appid='+api_key
    fetch(weatherUrl).then((data)=>{
        return data.json();
    }).then((data)=>{
        alert(capital+' current weather : '+data.weather[0].description);
    }).catch((error)=>{
        alert('Weather not available for this Country');
    })
    
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
   let latLong = createli('Lat-Long', lat+', '+lng);
   let buttonli = createli('button', obj.capital)
   ul.append(capital, codes, region, latLong, buttonli);
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





