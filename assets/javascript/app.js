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


// Adding an event listener for the submit button to submit the data to firebase
$("#submitButton").on("click", function() {

	console.log("Ian Sucks");

// Here I am grabbing the data submitted from the text fields

	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var time = $("#timeInput").val().trim();
	var frequency = $("#frequencyInput").val().trim();

	// Create local "temporary" object for holding train information. Need to ask more about this, as I do not fully understand it.

	var newTrain = {
		trainName: trainName,
		destination: destination,
		time: time,
		frequency: frequency
	};

	// Uploads new train to the database
	database.ref().push(newTrain);

	// Logs the information to the console
	console.log(newTrain.trainName);
	console.log(newTrain.destination);
	console.log(newTrain.time);
	console.log(newTrain.frequency);

	// Alert that the train has been added successfully
	alert("The Train is added you sly minx");

	// Clear all of the text boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#timeInput").val("");
	$("#frequencyInput").val("");

	// Prevents moving to a new page, or refreshing
	return false;

});




// Creating a firebase event when adding a new employee to the database
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());


	// Store all new values into a variable.
	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var time = childSnapshot.val().time;
	var frequency = childSnapshot.val().frequency;
	var minutesAway = 2;

	// Consoling Train information
	console.log(trainName);
	console.log(destination);
	console.log(time);
	console.log(frequency);

	// **THIS IS WHERE I AM GOING TO ADD THE CALCULATION FOR THE ARRIVAL TIME


	// Adding each train's data into the table (copy pasta)
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + time + "</td><td>" + frequency + "</td><td>" + minutesAway + "</td></tr>");
});


















});