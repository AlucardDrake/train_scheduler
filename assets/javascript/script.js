
  var config = {
    apiKey: "AIzaSyCL91bmTqWxDw-EayVkAshJ87SCjlPN9OU",
    authDomain: "elaborate-night-130915.firebaseapp.com",
    databaseURL: "https://elaborate-night-130915.firebaseio.com",
    projectId: "elaborate-night-130915",
    storageBucket: "elaborate-night-130915.appspot.com",
    messagingSenderId: "902095338566"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#employee-name-input").val().trim();
  var destination = $("#role-input").val().trim();
  var firstTrain = $("#start-input").val().trim();
  var frequency = $("#rate-input").val().trim();

  var newTrain = {
    name: trainName,
    des: destination,
    freq: frequency,
    first: firstTrain,
    freq: frequency
  };

  database.ref().push(newTrain);

  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().des;
  var frequency = childSnapshot.val().freq;
  var firstTrain = childSnapshot.val().first;
  var startTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(startTimeConverted), "minutes");
  var remainder = diffTime % frequency;
  var minutesAway = frequency - remainder;
  var nextTrain = moment().add(minutesAway, "minutes");
  var catchTrain = moment(nextTrain).format("HH:mm");


  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(catchTrain),
    $("<td>").text(minutesAway),
  );

  $("#employee-table > tbody").append(newRow);
});