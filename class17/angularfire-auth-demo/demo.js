// create the angular "app" with "plugins" 
var app = angular.module('todoApp', ['firebase']);

app.controller('authCtrl', function($scope, $firebaseAuth, $firebaseObject){
	// initalize database
	app.initFirebase();
	
	// initialize auth object
	$scope.authObj = $firebaseAuth();
	
	// store user objects
	$scope.authUser = null; // authenticated user object
	$scope.user = null; // our user's details or record
	
	// on login or logout
	// ...
	
	
	// button methods
	$scope.createUser = function(){
		// get values from the form
		
		// validate input
		
		// create user - pass username and password to this method
		// ...
	};
	
	$scope.login = function(){
		// get values from the form
		
		// validate input
		
		// login - pass username and password to this method
		// ...
	};
	
	$scope.updateUser = function(){
		// validate the form
		
		// create data (from a form) to store with user
		var data = {firstname: "Tyler", lastname: "Kowalchuk"};
		
		// store data with user
		// stores in /users/lkada9ae89slsekljklse/firstname = "Tyler"
		// ...
	};
	
	$scope.logout = function(){
		// sign out
		// ...
	};
	
}); // end authCtrl

app.controller('todoCtrl', function($scope, $firebaseArray, $firebaseAuth, $firebaseObject){
	// init firebase
	app.initFirebase();
	
	// initialize auth object
	$scope.authObj = $firebaseAuth();
	
	// used to store user object
	$scope.authUser = null; // authenticated user object	
	
	// bind a firebase array/collection to our model
	$scope.todos = $firebaseArray(app.firebaseRef.child('ng-todos'));
	
	// example of a custom filter
	// returns an array of incomplete todos
	$scope.getIncompleteTodos = function(){
		return $scope.todos.filter(function(todo){
			return !todo.done;
		});	
	};
	
	// returns an array of complete todos
	$scope.getCompleteTodos = function(){
		return $scope.todos.filter(function(todo){
			return todo.done;
		});	
	};
	
	$scope.addTodo = function(){
		// add todo to the array
		//$scope.todos.push({text: $scope.newTodo, done: false});
		
		// add todo to Firebase
		// $add() is an AngularFire method
		//$scope.todos.push({text: $scope.newTodo, duedate: $scope.newDate, done: false});
		$scope.todos.$add({text: $scope.newTodo, duedate: $scope.newDate, done: false});
		
		
		// clear the form
		$scope.newTodo = '';
		$scope.newDate = '';
	};
	
	$scope.updateTodo = function(todo){
		$scope.todos.$save(todo);
	};
	
	$scope.clearCompleted = function(){
		//$scope.todos = $scope.getIncompleteTodos();
		// loop through completed todos and remove from database
		$scope.getCompleteTodos().forEach(function(todo){
			$scope.todos.$remove(todo);
		});
	};
	
}); // end todoCtrl


app.initFirebase = function(){
	// Initialize Firebase
	// only if it's not already initialized
	if(!app.firebaseRef){
		var config = {
			apiKey: "AIzaSyARq1jNHB0IJsAFYDmToLd6BVmNgXyYV8Q",
			authDomain: "todos2018night.firebaseapp.com",
			databaseURL: "https://todos2018night.firebaseio.com",
			projectId: "todos2018night",
			storageBucket: "todos2018night.appspot.com",
			messagingSenderId: "92174913534"
		};
		firebase.initializeApp(config);

		// create database reference to root
		app.firebaseRef = firebase.database().ref('/');
  	}
};


