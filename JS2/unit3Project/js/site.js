var app = angular.module('todoApp', []);

app.controller('todoCtrl', function ($scope) {
    // default array for todo list
    $scope.todos = [
        { text: 'eat dinner', done: true },
        { text: 'learn angularjs', done: false },
        { text: 'sleep', done: false }
    ];

    // custom filter to get completed todos
    $scope.getCompleteTodos = function () {
        return $scope.todos.filter(function (todo) {
            return todo.done;
        });
    };

    // custom filter to get incomplete todos
    $scope.getIncompleteTodos = function () {
        return $scope.todos.filter(function (todo) {
            return !todo.done;
        });
    };

    // clear completed todos
    $scope.clearCompleted = function () {
        // resets todos array value so only incomplete tasks are in there (uses the custom filter)
        $scope.todos = $scope.getIncompleteTodos();
    }

    // add a new todo
    $scope.addTodo = function () {
        // $scope.newTodo will be the value from the text box
        $scope.todos.push({ text: $scope.newTodo, done: false });
        // update model to clear text box
        $scope.newTodo = '';
    }

});