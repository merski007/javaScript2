// define our app "name" and "plugins" used
var app = angular.module('lowesApp', ['ngStorage', 'ngMaterial', 'ngMessages', 'checklist-model']);

// path variable that can be switched one posting files to a different server
var path = 'http://mmersenski.bitlampsites.com/js2/'

// controller for the pdf file download view
app.controller('pdfFileCtrl', function ($scope, $localStorage, $http, $timeout) {
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
        // create a new instance of zip
        var zip = new JSZip();

        // check array for data, if data exists package is up 
        if ($scope.selected) {
            angular.forEach($scope.selected.files, function (value, key) {
                // load the file from server and add it to the zip file
                JSZipUtils.getBinaryContent("http://127.0.0.1:5500/pdfFiles/" + value.fileName + ".pdf", function (err, data) {
                    if (err) {
                        throw err; // TODO, handle error or notify user an error occurred
                    }
                    // add files to zip
                    zip.file(value.fileName + ".pdf", data, { binary: true });
                });
            })
        }
        else {
            // TODO, throw message to user that no files are selected
        }

        // putting a timer around zip function so files have time to download from server
        // combine files for download
        $timeout(function () {
            zip.generateAsync({ type: "blob" })
                .then(function (content) {
                    // see FileSaver.js
                    saveAs(content, "documents.zip");
                });
        }, 5000);
    };

});


// controller for the tracking view
app.controller('trackingCtrl', function ($scope, $localStorage, $http) {

});