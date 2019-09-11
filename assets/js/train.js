//Variables 
var trainName = "";
var destination = "";
var arrival = "16:45";
var frequency = "5";

// // Assumptions
// var tFrequency = 3;

// // Time is 3:30 AM
// var firstTime = "03:30";

// Train arrival time
var arrivalConverted = moment(arrival, "HH:mm").subtract(1, "years");
console.log(arrivalConverted);

// Current Time
var currentTime = moment();
console.log("Current time: " + moment(currentTime).format("hh:mm"));

// Difference between arrival time and current time
var diffTime = moment().diff(moment(arrivalConverted), "minutes");
console.log("Difference between times: " + diffTime);

// Remainder
var remainder = diffTime % frequency;
console.log(remainder);

// Minute Away
var timeNextTrain = frequency - remainder;
console.log("Minutes till next train: " + timeNextTrain);

// Arrival
var nextTrain = moment().add(timeNextTrain, "minutes");
console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));