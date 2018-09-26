// define our app "name" and "plugins" used
var app = angular.module('todoApp', ['ngStorage']);

// add a controller - used to handle requests
// BUSINESS LOGIC ONLY
// don't want to manipulate the dom or HTML/CSS here
app.controller('todoCtrl', function ($scope, $localStorage, $http) {
    // $scope provides models to your view (and vice-versa) (kind of like a java bean)
    //$scope.yourName = 'Joe';

    // create a "model" for a list of todos
    $scope.todos = [
        { text: 'eat dinner', done: true },
        { text: 'learn angularjs', done: false },
        { text: 'sleep', done: false }
    ];

    $scope.$storage = $localStorage.$default({
        todos: [
            { text: 'eat dinner', done: true },
            { text: 'learn angularjs', done: false },
            { text: 'sleep', done: false }
        ]
    });

    // custom filter to get completed todos
    $scope.getCompleteTodos = function () {
        return $scope.$storage.todos.filter(function (todo) {
            // return true if we want to keep this item
            return todo.done;
        });
    };

    // custom filter to get incomplete todos
    $scope.getIncompleteTodos = function () {
        return $scope.$storage.todos.filter(function (todo) {
            // return false if we want to keep this item
            return !todo.done;
        });
    };

    $scope.clearCompleted = function () {
        $scope.$storage.todos = $scope.getIncompleteTodos();
    }


    // add a method to respond to a button click
    $scope.addTodo = function () {
        // $scope.newTodo will be the value from the text box
        $scope.$storage.todos.push({ text: $scope.newTodo, done: false });
        // update model to celar text box
        $scope.newTodo = '';
    }

    // example 20, fetching json, currently not working

    $http.get('countries.json').then(function (data) {
        //console.log(data);
        $scope.countries = data.data;
    });




});