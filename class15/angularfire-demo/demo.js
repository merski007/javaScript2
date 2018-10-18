// create the angular "app" with "plugins" 
var app = angular.module('todoApp', ['firebase']);

// add a controller - used to add BEHAVIOR
// BUSINESS LOGIC ONLY
// DO NOT add/manipulate the dom or styles here
app.controller('todoCtrl', function ($scope, $firebaseArray) {
	// think of scope as your "model" or data between controller and view (html)

	// model "properties"
	/*
	$scope.todos = [
		{ text: 'Learn Angular', duedate: '10/1/18', done: true },
		{ text: 'Learn Firebase', duedate: '10/17/18', done: true },
		{ text: 'Learn AngularFire', duedate: '10/17/18', done: false }
	];
	*/
	// init firebase
	app.initFirebase();

	// bind a firebase array/collection to our model
	$scope.todos = $firebaseArray(app.firebaseRef.child('ng-todos'));

	// example of a custom filter
	// returns an array of incomplete todos
	$scope.getIncompleteTodos = function () {
		return $scope.todos.filter(function (todo) {
			return !todo.done;
		});
	};

	// returns an array of complete todos
	$scope.getCompleteTodos = function () {
		return $scope.todos.filter(function (todo) {
			return todo.done;
		});
	};

	$scope.addTodo = function () {
		// add todo to the array
		//$scope.todos.push({text: $scope.newTodo, done: false});

		// add todo to Firebase
		// $add() is an AngularFire method
		$scope.todos.$add({ text: $scope.newTodo, duedate: $scope.newDate, done: false });


		// clear the form
		$scope.newTodo = '';
		$scope.newDate = '';
	};

	$scope.updateTodo = function (todo) {
		$scope.todos.$save(todo);
	};

	$scope.clearCompleted = function () {
		//$scope.todos = $scope.getIncompleteTodos();
		// loop through completed todos and remove from database
		$scope.getCompleteTodos().forEach(function (todo) {
			$scope.todos.$remove(todo);
		});
	};

});


app.initFirebase = function () {
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyDPvvSA5qHqAiSNGAFKJbCXu5m7MEiK8JY",
		authDomain: "demo2018-509fb.firebaseapp.com",
		databaseURL: "https://demo2018-509fb.firebaseio.com",
		projectId: "demo2018-509fb",
		storageBucket: "demo2018-509fb.appspot.com",
		messagingSenderId: "54262448758"
	};
	firebase.initializeApp(config);

	// create database reference to root
	app.firebaseRef = firebase.database().ref('/');
}

