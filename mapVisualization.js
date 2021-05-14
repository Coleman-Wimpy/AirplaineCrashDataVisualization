//Created By Coleman Wimpy


const mymap = L.map('mapVisId').setView([0, 0], 2);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

const locationList = [];
const crashSums = {};

let count = 0;

async function getCoords() {
     //console.log(locationList[i]);

    setTimeout(async function (){
        try{
            
            const geolocUrl = 'https://api.tomtom.com/search/2/search/' + locationList[count] + '.json?key=1Z9wmRePAzJtGiGGrzgiC6sRBAqv2ry7';

            const locationResponse = await fetch(geolocUrl)
            const results = await locationResponse.json();

            const position = results.results[0].position;
            const numOfCrashes = crashSums[locationList[count]];

            let lat = position.lat;
            let lon = position.lon;
            const address = results.results[0].address.freeformAddress;
            const popUp = '<p>Location: ' + locationList[count] + '</p><p>Crashes at this location: ' + numOfCrashes + '</p>';
            

            //console.log(address);
            //console.log(lat, lon);
            //console.log(location);
            
            let myIcon = L.icon({
                iconUrl: 'airplane-sharp.svg',
                iconSize: [10, 15]
            });
            
            

            L.marker([lat, lon], {icon: myIcon}).bindPopup(popUp).addTo(mymap);

            count++;

            if(count < locationList.length) {
                getCoords();
            }
            
        }catch(error) {
            console.log(error.message);
        }},300);
}

async function getData() {

    const response = await fetch('full_test.csv');

    //const response = await fetch('test.csv');
    const data = await response.text();

    const table = data.split('\n').slice(1);

    for (let i  = 0; i < table.length; i++) {
        const col = (table[i] + ',').split(/(?: *?([^",]+?) *?,|" *?(.+?)" *?,|( *?),)/).slice(1).reduce((a, b) => (a.length > 0 && a[a.length - 1].length < 4) ? [...a.slice(0, a.length - 1), [...a[a.length - 1], b]] : [...a, [b]], []).map(e => e.reduce((a, b) => a !== undefined ? a : b, undefined));
        //const date = col[0];
        const location = col[2];

        if (locationList.includes(location)){
            //console.log('List already contains ' + location);
            crashSums[location]++;
        }
        else {
            locationList.push(location);
            crashSums[location] = 1;
            //console.log(location + ' was added to list');
        }   

    }
        //console.log(crashSums);

    getCoords();
}

try {
	//Commented out to prevent using up all the allowed api calls
    getData();
}
catch (e) {
    console.log(e.message);
}

