// Created by Lynsea Long

const yearList = [];
let fatSums = {};

function lineChartit() {

    //let sortedSums = fatSums.sort();

    const ctx = document.getElementById("myChart").getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: yearList,
            datasets: [{
                label: 'Fatalities by Year',
                data: fatSums,
                backgroundColor: 'gray',
                borderColor: 'blue',
                borderWidth: 1,
            }]
        }
    });
}

doWork();

async function doWork(){
    await getData();
    yearList.sort();
    lineChartit();
    console.log('finished');
}

async function getData() {

    const response = await fetch('full_test.csv');
    const data = await response.text();

    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const col = (row + ',').split(/(?: *?([^",]+?) *?,|" *?(.+?)" *?,|( *?),)/).slice(1).reduce((a, b) => (a.length > 0 && a[a.length - 1].length < 4) ? [...a.slice(0, a.length - 1), [...a[a.length - 1], b]] : [...a, [b]], []).map(e => e.reduce((a, b) => a !== undefined ? a : b, undefined));
        
        let year = col[0];
        year = year.slice(6);
        const fatalities = +col[10];
        //console.log(year, fatalities);

        if (yearList.includes(year)){
            //console.log('List already contains ' + location);
            fatSums[year] = (fatSums[year] + fatalities);
        }
        else {
            yearList.push(year);
            fatSums[year] = fatalities;
            //console.log(location + ' was added to list');
        }
    });
}
