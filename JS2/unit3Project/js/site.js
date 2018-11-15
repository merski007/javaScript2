var app = angular.module('todoApp', []);

app.controller('todoCtrl', function ($scope) {
    $scope.greeting = 'This is where the magic happens :)';
});