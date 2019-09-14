// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB1xubcyA_eSIfZttAgHYGYgWdadcInfRg",
    authDomain: "week-7-31c4b.firebaseapp.com",
    databaseURL: "https://week-7-31c4b.firebaseio.com",
    projectId: "week-7-31c4b",
    storageBucket: "week-7-31c4b.appspot.com",
    messagingSenderId: "626159568732",
    appId: "1:626159568732:web:1c4e490eb4ec76d2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Variables 
var database = firebase.database();
var trainName = "";
var destination = "";
var arrival = "";
var frequency = "";

//Submit button
$("#add-train").on("click", function (event) {
    event.preventDefault();
    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    arrival = $("#arrival-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    console.log("Train name: " + trainName);
    console.log("Destination: " + destination);
    console.log("Arrival: " + arrival);
    console.log("Frequency: " + frequency);

    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#arrival-input").val("");
    $("#frequency-input").val("");

    database.ref().push({
        trainName: trainName,
        destination: destination,
        arrival: arrival,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    trainName = childSnapshot.val().trainName;
    destination = childSnapshot.val().destination;
    arrival = childSnapshot.val().arrival;
    frequency = childSnapshot.val().frequency;

    // Train arrival time
    var arrivalConverted = moment(arrival, "HH:mm").subtract(1, "years");
    console.log(arrivalConverted);

    // Current Time
    var currentTime = moment();
    console.log("Current time: " + currentTime);

    // Difference between arrival time and current time
    var diffTime = currentTime.diff(arrivalConverted, "minutes");
    console.log("Difference between times: " + diffTime);

    // Remainder
    var remainder = diffTime % frequency;
    console.log(remainder);

    // Minute Away
    var timeNextTrain = frequency - remainder;
    console.log("Minutes till next train: " + timeNextTrain);

    // Arrival
    var nextTrain = currentTime.add(timeNextTrain, "minutes");
    console.log("Arrival time: " + nextTrain);

    var nextArrival = nextTrain.format("HH:mm");
    console.log("Arrival:" + nextArrival);

    $("#appendNewTrain").append("<tr><th>" + trainName +
        "</th><td>" + destination +
        "</td><td>" + frequency +
        "</td><td>" + arrival + 
        "</td><td>" + timeNextTrain +
        "</td></tr>");

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

});
