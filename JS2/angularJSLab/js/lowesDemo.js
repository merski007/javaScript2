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

    $scope.zipFiles = function pack() {
        var zip = new JSZip();
        zip.file("readme.txt", "This zip file was created using JSZip.");
        var docs = zip.folder("documents");
        docs.file("hello.txt", "hello world!");
        docs.file("goodmorning.txt", "good morning everyone!");
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                // see FileSaver.js
                saveAs(content, "example.zip");
            });
    }

});


// controller for the tracking view
app.controller('trackingCtrl', function ($scope, $localStorage, $http) {

});

