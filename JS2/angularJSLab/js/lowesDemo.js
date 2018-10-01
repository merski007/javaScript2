// define our app "name" and "plugins" used
var app = angular.module('lowesApp', ['ngStorage', 'ngMaterial', 'ngMessages', 'checklist-model', 'ngRoute']);

// define some global variables available to the entire app
app.run(function ($rootScope) {
    var d = new Date();
    $rootScope.appName = 'Lowes App';
    $rootScope.copyright = d.getFullYear();
});


// configure our routes
// urls that map to views/controllers
app.config(function ($routeProvider, $mdThemingProvider) {
    $routeProvider
        // pdf file download
        .when('/pdfDownload', {
            templateUrl: 'pages/pdfDownload.html',
            controller: 'pdfDownloadCtrl'
        })
        // tracking page
        .when('/tracking', {
            templateUrl: 'pages/tracking.html',
            controller: 'trackingCtrl'
        })
        .otherwise({
            template: '<h1>404. Page not found!</h1>'
        });

    $mdThemingProvider.theme('default')
        .primaryPalette('blue');
});


// controller for the pdf file download view
app.controller('pdfDownloadCtrl', function ($scope, $localStorage, $http, $timeout) {
    // title variable
    $scope.title = 'PDF File Download';

    // data for weeks dropdown menu
    $http.get('dataFile.json').then(function (data) {
        $scope.weeks = data.data;
    });

    // test list to make sure md-list was working
    //$scope.testList = ['one', 'two', 'three'];

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

        // loop through checked items and package them up
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
app.controller('trackingCtrl', function ($scope) {

});
