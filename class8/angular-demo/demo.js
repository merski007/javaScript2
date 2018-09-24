// define our app "name" and "plugins" used
var app = angular.module('todoApp', ['ngStorage']);

// add a controller - used to handle requests
// BUSINESS LOGIC ONLY
// don't want to manipulate the dom or HTML/CSS here
app.controller('todoCtrl', function($scope, $localStorage){
	// $scope provide models to your view (and vise-versa)
	//$scope.yourName = 'Joe';
	
	// create a "model" for a list todos
	$scope.$storage = $localStorage.$default(
				{todos: [
					{text: 'Eat Dinner', done: true},
					{text: 'Learn Angular', done: false},
					{text: 'Sleep', done: false}
				]}
	);
	
	// custom filter to get completed todos
	$scope.getCompleteTodos = function(){
		return $scope.$storage.todos.filter(function(todo){
			// return true if we want to keep this item
			return todo.done;
		});
	};
	
	$scope.getIncompleteTodos = function(){
		return $scope.$storage.todos.filter(function(todo){
			// return true if we want to keep this item
			return !todo.done;
		});
	};
	
	// add a method to respond to a button click
	$scope.addTodo = function(){
		// $scope.newTodo will be the value from the text box
		$scope.$storage.todos.push({text: $scope.newTodo, done: false});
		
		// update model to clear text box
		$scope.newTodo = '';
	};
	
	$scope.clearCompleted = function(){
		$scope.$storage.todos = $scope.getIncompleteTodos();	
	};
});