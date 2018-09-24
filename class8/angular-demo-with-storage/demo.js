// create the angular "app" with any "plugins" you may need
var app = angular.module('todoApp', ['ngStorage']);

// add a controller - used to add BEHAVIOR
// BUSINESS LOGIC ONLY
// DO NOT manipulate the DOM or HTML/CSS
app.controller('todoCtrl', function($scope, $localStorage){
	'use strict';
	// think of scope as your "model" or data between the controller and view
	//$scope.yourName = 'Joe';
	
	// array to hold todos
	// "model properties"
	$scope.$storage = $localStorage.$default({todos: [
						{text: "Eat Breakfast", done: true},
						{text: "Learn Angular", done: false},
						{text: "Do Homework", done: false}
					]});

//	$scope.todos = [
//					{text: "Eat Breakfast", done: true},
//					{text: "Learn Angular", done: false},
//					{text: "Do Homework", done: false}
//				];
	
	// example of custom filter
	// return an array of complete todos
	$scope.getCompleteTodos = function(){
		// filter will call this function on each todo
		return $scope.$storage.todos.filter(function(todo){
			// return whether it should be included or not
			return todo.done;	
		});
	};
	
	$scope.getIncompleteTodos = function(){
		// filter will call this function on each todo
		return $scope.$storage.todos.filter(function(todo){
			// return whether it should be included or not
			return !todo.done;	
		});
	};
	
	// method to handle adding a todo
	$scope.addTodo = function(){
		// $scope.newTodo has the value of the text box
		$scope.$storage.todos.push({text: $scope.newTodo, done: false});
		
		// clear the input
		$scope.newTodo = '';
	};
	
	
	$scope.clearCompleted = function(){
		$scope.$storage.todos = $scope.getIncompleteTodos();
	};
});