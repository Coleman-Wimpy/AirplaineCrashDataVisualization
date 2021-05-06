*************************************************************************************************************
Readme file CSCI3000 Project
*************************************************************************************************************


Developers: 
Coleman Wimpy - (cpwimp9719@ung.edu)
Mauricio Piraquive - (Mauricio.Piraquive@ung.edu)
Lynsea Long - (lalong1415@ung.edu)
Richard Dykes - (rmdyke7151@ung.edu)



* CSS, IMG, JS, SCSS, and VENDOR Folders
   * These were all provided with the bootstrap template that we used for the html
   * JS/DEMO/
      * Chart-pie-demo.js 
         * Edited by Mauricio Piraquive to display data about how many crashes from the 3 different flight types
      * line-Chart-demo.js 
         * Edited by Mauricio Piraquive to display data about crashes by decades.


* 404.html, gulpfile.js, LICENSE, package-lock.json, package.json, README.md
   * Provided by the bootstrap template




* Index.html
   * Base Bootstrap Dashboard template used for this page and other html pages
   * Links to fonts used inside the header
   * Inside the body tag
      * A sidebar navbar that hold a dashboard link that will take the user back to this page, also displayed on other pages
      * A header for visualizations
      * A collapsed pages button that opens when clicked to show links to each different page
      * A sidebar toggle button that minimizes the sidebar
      * A sidebar card that has all the students names and emails
      * An empty topbar to add margin at the top
      * A page header displaying Airplane Crash Data Visualization Dashboard
      * A bootstrap card to display total Accidents and the number
      * A bootstrap card to display fatalities and the total number of fatalities
      * A bootstrap card to display fatality rate and the number
      * A bootstrap card that show Histogram and hold a canvas with id myAreaChart to hold the chart
      * A Bootstrap card that shows Flight Type with a canvas with id myPieChart to hold the pieChart
      * Script tags at the end for the jquery, bootstrap, and javascript files that create the charts
   * This is the same base page used for each html page with the only thing being changed is the chart that is displayed in the main content




* mapVisualGeo.html - Mauricio Piraquive
   * Base template provided by template
   * Took out or commented out html elements that were not relevant to the project
   * Nav Sidebar set to navigate between pages or home dashboard
      * Add a collapsible menu for pages, when expanded it lists the other html pages that can be navigated to
   * In main content add the div element that will hold the map and the subsequent source link to the mapVisualization javascript file




* MapVisualization.js - Coleman Wimpy
   * Initialize variables to set the map to the div element with the id of mapVisId and set the map tiles
   * Initialize an array to hold the names of all the crash locations
   * Initialize a JSON object to hold the number of crashes for each location
   * Initialize the global count variable to 0, this will be used to loop through the location array
   * Try catch statement to call the getData function and log any errors if they occur
   * Async function getData
      * Set variable response to await the response of fetch function that grabs ‘full_test.csv’
      * Set variable data to the text version of the response
      * Set variable table to an array, each array element is a line from the csv file, which is a data point
      * For loop
         * Split each line in the array by commas, unless the comma is inside quotes, and assign this array to a variable col
         * Variable location is set to the 3rd item from a line of data
         * If statement checks if locationList contains that location, if yes increase the count for that location by 1 in the total crash object ,if no then add that location into the array of locations, and set the value of that location to 1 in the total crash object
      * Once the for loop is over, call the getCoords function
   * Async Function getCoords
      * setTimeout that calls an anonymous async function after 300 ms
         * Set the url to contain the location that needs coordinates 
         * Fetch the response from that url 
         * Set the popup message to be displayed when a marker is clicked on
         * Set the icon that the markers will use
         * Add the marker at the latitude and longitude that is returned from the api and assign it the icon and popup message
         * Increase the count variable by 1
         * If count is less than the length of the locationList array call the getCoords function again






* Line-crashes-airline.html - Mauricio Piraquive and Coleman Wimpy
   * Base template provided by template
   * Took out or commented out html elements that were not relevant to the project
   * Nav Sidebar set to navigate between pages or home dashboard
      * Add a collapsible menu for pages, when expanded it lists the other html pages that can be navigated to
   * Add a dropdown for buttons that will call functions in the javascript file to update the chart
   * In main content add the canvas element that will hold the map and the subsequent source link to the barChart javascript file and chart.js script dependencies
   * Add a button to call the reset zoom function when clicked to reset the zoom of the chart


* barChart.js - Richard Dykes and Coleman Wimpy
   * Initialize all the arrays and objects that will hold the data parsed from the csv data file
   * Call the doWork function
      * Async Function
      * Call await getData function
      * Set the default label, labels, and data to be added to the chart
      * Call chartIt function with the label, labels, and data
   * Async getData function
      * Call the fetch method to get the csv file
      * Split the data into an array that hold each row of the file
      * Split each row into an array of columns 
      * Get the type of flight from the col array at index 3
      * Initialize two regular expressions to find the word Military or Private at the beginning of flight type string
      * For loop for each row in the table
         * If the string contain the word Military at the beginning
            * Add that string to the militaryFlight array
            * Increase the count of military flights by 1 and the count of crashes from that flight by 1
         * Do the same thing if the string contains Private at the beginning of the string
         * If it doesn’t match either of those expression add to the commercial flights arrays
   * Async chartIt function
      * Get the context of the canvas from the html file
      * Create a new chart with labels, label, and data that was passed in the function call
      * The options of the chart allow the chart to be zoomed and panned 
      * Set onlick event listeners for each dropdown button from the html by using jquery id selector
         * For each button update the chart with new data and labels corresponding with the button selected
      * Set onclick event listener for the reset zoom to reset the zoom of the cart back to normal


* Line-fatalities-year.html - Mauricio Piraquive
   * Base template used from bootstrap
   * In main content area
      * Add a canvas with id myChart that will be used to hold the chart created in the javascript
      * Add corresponding javascript tag to link the lineGraph.js file


* lineGraph.js - Lynsea Long
   * Base template used with modifications to fit this data.
   * Const yearList function
      * Defines constant reference to a value
      * Cannot be reassigned
      * Assigned to yearList
   * Assign variable fatSums with a let function
   * Create function lineChartit()
      * getElementById returns element by specific ID. In this case, the ID is myChart 
      * Create new chart called myChart
         * Set type to line for line graph
         * Insert data: label to Fatalities by Year 
         * the variable fatSums for data for fatality sums
         * Set background color to gray
         * Set border color to blue
         * Set border width to 1
      * Call the doWork function
         * Async function: wait to grab work and data 
         * Async function getData: set variable response to await to fetch data from full_test.csv
         * For loop:
            * Split each row with a comma
            * Let year be the column
            * If the statement checks the year and it is within the range, then that year will equal the fatality sums plus the number of fatalities. Else, push the year away.




* bar-chart-race-frame.html - Mauricio Piraquive
   * Base template provided by template
   * Took out or commented out html elements that were not relevant to the project
   * Link to the fonts sources 
   * Nav Sidebar set to navigate between pages or home dashboard
      * Add a collapsible menu for pages, when expanded it lists the other html pages that can be navigated to


   * In main content add the div element that will hold the map
   * <style> tag with the style definitions of the chart
      * Style 
      * Animations
      * Screen definitions
   * In main content add the div element that will hold the map and the subsequent source link to the mapVisualization javascript file
   *    * <script> tag with the Javascript code with the logic of the chart
      * Source url to d3js vidualization libraries 
      * d3js color llibraries 
   * Define width for small device
   * Initialice d3 transition base on interval
   * Initialice svg object
   * Initialice data to rawdata on github = https://raw.githubusercontent.com/empira8840/AirplaineCrashDataVisualization/main/Book1.csv
   * Define automatic ejecution of animation at loading the page
   * Create function createBarChartRace 
      * Get info from csv 
      * Conditional to validate key value base on country country name
      * Get data for each key 
   * Function Draw barchart        
   * Get images deleted due to server off line
   * Function Draw bars
      * Draw bars base on axis and dat and select color to each bar base on palette defined
   * Function imageSize 
   * Show replay buton to replay char 


* Bar-airline-fatalities.html - Mauricio Piraquive
   * Base template provided by the template
   * Took out or commented out HTML elements that were not relevant to the project
   * Nav Sidebar set to navigate between pages or home dashboard
      * Add a collapsible menu for pages, when expanded it lists the other HTML pages that can be navigated to
   * Div with class observablehw to load all the elements of the chart from observable
   * In the main content add the div element that will hold the script tag to the observable reference to load the chart
      * Define API to access observable profile
         * "https://api.observablehq.com/@maupt/first.js?v=3
   * Observable: link https://observablehq.com/@maupt/first