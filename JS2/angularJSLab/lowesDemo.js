// define our app "name" and "plugins" used
var app = angular.module('lowesApp', ['ngStorage', 'ngMaterial', 'ngMessages']);

// controller for the pdf file download view
app.controller('pdfFileCtrl', function ($scope, $localStorage, $http) {
    // data for weeks dropdown menu
    //$scope.weeks = ["week1", "week2"];
    $http.get('dataFile.json').then(function (data) {
        $scope.weeks = data.data;
    });

});


// controller for the tracking view
app.controller('trackingCtrl', function ($scope, $localStorage, $http) {

});

