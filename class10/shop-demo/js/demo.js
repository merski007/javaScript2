// JavaScript Document
var app = angular.module('shopDemo', ['ui.bootstrap', 'ngRoute']);

// define some global variables available to the entire app
app.run(function ($rootScope, $location) {
	var d = new Date();
	$rootScope.appName = 'Shop Demo';
	$rootScope.copyright = d.getFullYear();
	$rootScope.isActive = function (viewPath) {
		return viewPath == $location.path();
	}
});

// configure our routes
// urls that map to views/controllers
app.config(function ($routeProvider) {
	$routeProvider
		//home
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'homeController'
		})
		//product
		.when('/product', {
			templateUrl: 'pages/product.html',
			controller: 'productController'
		})
		.when('/about', {
			template: '<h1>this is my about page!</h1>'
		})
		.otherwise({
			template: '<h1>404. Page not found!</h1>'
		});
});

// Product controller
app.controller('productController', function ($scope) {
	// sample product
	// ideally, add image, rating, description, etc to this array
	$scope.product = [
		{ id: 1, name: "Item One", price: 21.99 },
		{ id: 2, name: "Item Two", price: 22.99 },
		{ id: 3, name: "Item Three", price: 23.99 },
		{ id: 4, name: "Item Four", price: 24.99 },
		{ id: 5, name: "Item Five", price: 25.99 },
		{ id: 6, name: "Item Six", price: 26.99 }
	];

	// https://morgul.github.io/ui-bootstrap4/#!#carousel
	$scope.slides = [
		{ image: '//unsplash.it/900/350?random&1', text: 'Hey, look at me!', id: 0 },
		{ image: '//unsplash.it/900/350?random&2', text: 'You need this!', id: 1 },
		{ image: '//unsplash.it/900/350?random&3', text: 'Give me your money!', id: 2 }
	];

	// demo of alerts
	// https://morgul.github.io/ui-bootstrap4/#!#alert
	$scope.alerts = [];

	$scope.changeCategory = function (category) {
		$scope.alerts = [{ type: 'danger', msg: 'Oops! This functionality isn\'t complete yet!' }];
	};

	$scope.closeAlert = function (index) {
		$scope.alerts.splice(index, 1);
	};
});

// Home controler
app.controller('homeController', function ($scope) {

});