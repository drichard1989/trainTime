$(document).ready(function(){


// Initialize Firebase
var config = {
apiKey: "AIzaSyASP0BMFErLc8U9D2HbHjXubP9oCowyEoM",
authDomain: "traintime-f9b02.firebaseapp.com",
databaseURL: "https://traintime-f9b02.firebaseio.com",
storageBucket: "traintime-f9b02.appspot.com",
messagingSenderId: "1004491004655"
};

firebase.initializeApp(config);


// Created the database variable for the firebase
var database = firebase.database();


// Creating some Global Variables
var trainName;
var destination;
var time;
var frequency;
var nextTrain;
var nextTrainTime;


// Adding an event listener for the submit button to submit trains
$("#submitButton").on("click", function() {


	// This keeps the page from refreshing when the submit button is clicked
  	event.preventDefault();
// Here I am grabbing the data submitted from the text fields

	trainName = $("#trainNameInput").val().trim();
	destination = $("#destinationInput").val().trim();
	time = $("#timeInput").val().trim();
	frequency = $("#frequencyInput").val().trim();

	// Create local "temporary" object for holding train information. Need to ask more about this, as I do not fully understand it.
	var newTrain = {
		trainName: trainName,
		destination: destination,
		time: time,
		frequency: frequency
	};

	// Uploads new train to the database
	database.ref().push(newTrain);

	// Alerts that a train has been added
  	$("#addTrainModal").modal();

	// Logs the information to the console
	console.log(newTrain.trainName);
	console.log(newTrain.destination);
	console.log(newTrain.time);
	console.log(newTrain.frequency);

	 

	// Clear all of the text boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#timeInput").val("");
	$("#frequencyInput").val("");

	// Prevents moving to a new page, or refreshing
	return false;

}); /*Closes the adding train event listener.*/




// Creating a firebase event when adding a new employee to the database
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());


	// Store all new values into a variable.
	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var time = childSnapshot.val().time;
	var frequency = childSnapshot.val().frequency;


	// Consoling Train information
	console.log(trainName);
	console.log(destination);
	console.log(time);
	console.log(frequency);


	// This takes the time and formats it to the readable HH:mm format
	var timeFormat = moment(time, "HH:mm MM DD YYYY").subtract(1, "years");

	// This does the math to convert the time to minutes.
	var diffTime = moment().diff(moment(timeFormat), "minutes");

	// Creates a remainder variable from the diffTime variable
	var tRemainder = diffTime % frequency;

	// Subtracts the remainder from the frequency for the table
	var minutesAway = frequency - tRemainder;

	nextTrain = moment().add(minutesAway, "minutes");

	// Formats the next trains time for the table
	nextTrainTime = moment(nextTrain).format("hh:mm A");


	// Adding each train's data into the table (copy pasta)
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nextTrainTime + "</td><td>" + frequency + "</td><td>" + minutesAway + "</td></tr>");
});


















});