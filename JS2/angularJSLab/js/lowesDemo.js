// define our app "name" and "plugins" used
var app = angular.module('lowesApp', ['ngStorage', 'ngMaterial', 'ngMessages', 'checklist-model']);

// path variable that can be switched one posting files to a different server
var path = 'http://mmersenski.bitlampsites.com/js2/'

// create an instance of jsZip
var zip = new JSZip();

//zip.file("nested/hello.txt", "Hello World\n")

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

        //zip.file("readme.txt", "This zip file was created using JSZip.");
        //var docs = zip.folder("documents");
        //docs.file("hello.txt", "hello world!");
        //docs.file("goodmorning.txt", "good morning everyone!");

        //insert loop here
        if ($scope.selected) {
            angular.forEach($scope.selected.files, function (value, key) {
                //console.log(value.fileName); // this works to retrieve fileName

                // grab file from server before zipping
                //var tempFile = $http.get("http://127.0.0.1:5500/pdfFiles/" + value.fileName + ".pdf");
                // loading a file and add it in a zip file
                JSZipUtils.getBinaryContent("http://127.0.0.1:5500/pdfFiles/" + value.fileName + ".pdf", function (err, data) {
                    if (err) {
                        throw err; // or handle the error
                    }
                    //var zip = new JSZip();
                    zip.file(value.fileName + ".pdf", data, { binary: true });
                });

                //docs.file(value.fileName + ".pdf", "http://127.0.0.1:5500/pdfFiles/" + value.fileName + ".pdf");
                //zip.file(value.fileName + ".pdf", tempFile);

                // TODO, call the files from the server before zipping them up
            })
        }
        else {
            //throw error
        }

        // putting a timer around zip function so files have time to download from server
        // combine files for download
        $timeout(function () {
            zip.generateAsync({ type: "blob" })
                .then(function (content) {
                    // see FileSaver.js
                    saveAs(content, "example.zip");
                });
        }, 5000);
    };


    $scope.getFileName = function () {
        if ($scope.selected) {
            angular.forEach($scope.selected.files, function (value, key) {
                //console.log(value.fileName); // this works to retrieve fileName


                // zip up the checked files
                //zip.file(value.fileName, urlToPromise(url), { binary: true });
            })
            //console.log($scope.selected);
        }
    };



});


// controller for the tracking view
app.controller('trackingCtrl', function ($scope, $localStorage, $http) {

});