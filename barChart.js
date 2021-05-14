//Created By Richard Dykes, Further Edited by Coleman Wimpy

let militaryFlights = [];
let militaryFlightSums = {};
let militaryTotalFlights = 0;

let commercialFlights = [];
let commercialFlightSums = {};
let commericalTotalFlights = 0;

let privateFlights = [];
let privateFlightSums = {};
let privateTotalFlights = 0;

doWork();

//Added by Richard Dykes
async function getData() {

    const response = await fetch('full_test.csv');

    //const response = await fetch('test.csv');
    const data = await response.text();

    const table = data.split('\n').slice(1);

    for (let i  = 0; i < table.length; i++) {
        const col = (table[i] + ',').split(/(?: *?([^",]+?) *?,|" *?(.+?)" *?,|( *?),)/).slice(1).reduce((a, b) => (a.length > 0 && a[a.length - 1].length < 4) ? [...a.slice(0, a.length - 1), [...a[a.length - 1], b]] : [...a, [b]], []).map(e => e.reduce((a, b) => a !== undefined ? a : b, undefined));
        const operator = col[3];
		
		//console.log(operator);

		// implemented by coleman wimpy to offer different data and labels to be able to update the graph
		let reM = /^Military/;
		let reP = /^Private/;
		if(reM.test(operator)) {
			//console.log(operator, 'includes military in string');
			if(militaryFlights.includes(operator)) {
				militaryFlightSums[operator]++;
				militaryTotalFlights++;
			}
			else {
				militaryFlights.push(operator);
				militaryFlightSums[operator] = 1;	
				militaryTotalFlights++;
			}
		}
		else if(reP.test(operator)) {
			if(privateFlights.includes(operator)) {
				privateFlightSums[operator]++;
				privateTotalFlights++;
			}
			else {
				privateFlights.push(operator);
				privateFlightSums[operator] = 1;
				privateTotalFlights++;
			}
		}
		else {
			if(commercialFlights.includes(operator)) {
				commercialFlightSums[operator]++;
				commericalTotalFlights++;
			}
			else {
				commercialFlights.push(operator);
				commercialFlightSums[operator] = 1;
				commericalTotalFlights++;
			}
		}
	}
}


// Added By Richard Dykes
async function chartIt(blabels, blabel, bdata) {
	
	//console.log(militaryFlightSums);

	const ctx = document.getElementById('myChart').getContext('2d');
	let myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: blabels,
			datasets: [{
				label: blabel,
				data: bdata,
				backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(99, 255, 132, 0.2)', 'rgba(99, 132, 255, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)','rgba(99, 255, 132, 1)', 'rgba(99, 132, 255, 1)'],
				borderWidth: 1
			}]
		},   // added by coleman wimpy
		 options: {
         	plugins: {
                 zoom: {
                     pan: {
                         enabled: true,
                         mode: 'xy',
                         overScaleMode: 'y'
                     },
					 linits: {
						x: {
							min: 0,
							max: 100
						},
						y: {
							min: 0,
							max: 100
						}
					 },
                     zoom: {
                         enabled: true,
                         mode: 'xy',
                         overScaleMode: 'y'
                     }
                 }
             }
         }
    });


	//on click listeners added to update the chart with different data : Coleman Wimpy
	$('#compareByType').on('click', function updateChartT() {
		console.log('updating chart');
		myChart.data.labels = ['Commercial', 'Military', 'Private'];
		myChart.data.datasets[0].label = 'Total Flights by Type';
		myChart.data.datasets[0].data = [commericalTotalFlights, militaryTotalFlights, privateTotalFlights];
	
		myChart.update();
	});

	$('#militaryOnly').on('click', function updateChartM() {
		myChart.data.labels = militaryFlights;
		myChart.data.datasets[0].label = 'Military Flights';
		myChart.data.datasets[0].data = militaryFlightSums;

		myChart.update();
	});

	$('#privateOnly').on('click', function updateChartP() {
		myChart.data.labels = privateFlights;
		myChart.data.datasets[0].label = 'Private Flights';
		myChart.data.datasets[0].data = privateFlightSums;

		myChart.update();
	});

	$('#commercialOnly').on('click', function updateChartC() {
		myChart.data.labels = commercialFlights;
		myChart.data.datasets[0].label = 'Commercial Flights';
		myChart.data.datasets[0].data = commercialFlightSums;

		myChart.update();
	});

	$('#zoomReset').on('click', function() {
		myChart.resetZoom();	
	});

}

// Added by Richard Dykes
async function doWork() {

	await getData();

	let labels = ['Commercial', 'Military', 'Private'];
	let label = 'Total Flights by Type';
	let data = [commericalTotalFlights, militaryTotalFlights, privateTotalFlights];
	//console.log(commericalTotalFlights, militaryTotalFlights, privateTotalFlights);	

	chartIt(labels, label, data);
	
	console.log('finished');
}




 