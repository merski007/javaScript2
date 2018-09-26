// JavaScript Document
var app = angular.module('shopDemo', ['ui.bootstrap']);

// define some global variables available to the entire app
app.run(function($rootScope) {
	var d = new Date();
    $rootScope.appName = 'Shop Demo';
	$rootScope.copyright = d.getFullYear();
});


// Products controller
app.controller('productsController', function($scope){
	// sample products
	// ideally, add image, rating, description, etc to this array
	$scope.products = [
						{id: 1, name: "Item One", price: 21.99},
						{id: 2, name: "Item Two", price: 22.99},
						{id: 3, name: "Item Three", price: 23.99},
						{id: 4, name: "Item Four", price: 24.99},
						{id: 5, name: "Item Five", price: 25.99},
						{id: 6, name: "Item Six", price: 26.99}
					];
	
	// https://morgul.github.io/ui-bootstrap4/#!#carousel
	$scope.slides = [
						{image: '//unsplash.it/900/350?random&1', text: 'Hey, look at me!', id: 0},
						{image: '//unsplash.it/900/350?random&2', text: 'You need this!', id: 1},
						{image: '//unsplash.it/900/350?random&3', text: 'Give me your money!', id: 2}
					];
	
	// demo of alerts
	// https://morgul.github.io/ui-bootstrap4/#!#alert
	$scope.alerts = [];
	
	$scope.changeCategory = function(category){
		$scope.alerts = [{ type: 'danger', msg: 'Oops! This functionality isn\'t complete yet!' }];
	};
	
	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
});	

