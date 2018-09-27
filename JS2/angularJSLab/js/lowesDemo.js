// define our app "name" and "plugins" used
var app = angular.module('lowesApp', ['ngStorage', 'ngMaterial', 'ngMessages', 'checklist-model']);

// path variable that can be switched one posting files to a different server
var path = 'http://mmersenski.bitlampsites.com/js2/'

// controller for the pdf file download view
app.controller('pdfFileCtrl', function ($scope, $localStorage, $http) {
    // data for weeks dropdown menu
    $http.get('dataFile.json').then(function (data) {
        $scope.weeks = data.data;
    });

    //create a blank array to store selected objects.
    $scope.selected = {
        files: []
    };

    // check all the boxes
    $scope.checkAll = function () {
        $scope.selected.files = angular.copy($scope.selectedWeek.pdfFiles);
    };

    // uncheck all the boxes
    $scope.uncheckAll = function () {
        $scope.selected.files = [];
    };

    // download files function
    $scope.download = function () {
        // TODO, make the download happen

        // check to see if there is anything in the array
        if ($scope.selected) {
            angular.forEach($scope.selected, function (value, key) {
                console.log(value); // this works
            })
        }
        else {
            // throw an alert to user
        }
    }

});


// controller for the tracking view
app.controller('trackingCtrl', function ($scope, $localStorage, $http) {

});

