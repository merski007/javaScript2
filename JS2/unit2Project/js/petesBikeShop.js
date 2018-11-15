// JavaScript Document
var app = angular.module('petesBikeShop', ['ngStorage', 'ui.bootstrap', 'ngRoute', 'firebase']);


// define some global variables available to the entire app
app.run(function ($rootScope, $location, $route) {
    var d = new Date();
    $rootScope.appName = 'Pete\'s Bike Shop';
    $rootScope.copyright = d.getFullYear();
    $rootScope.isActive = function (viewPath) {
        return viewPath == $location.path();
    }
    // assign in controllers
    $rootScope.startText = '';

    // global cart
    $rootScope.cart = [];
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
        .when('/products/:category/:type', {
            templateUrl: 'pages/products.html',
            controller: 'productsController'
        })
        //signin
        .when('/signIn', {
            templateUrl: 'pages/signIn.html',
            controller: 'authCtrl'
        })
        .when('/about', {
            template: '<h1>this is my about page!</h1>'
        })
        .otherwise({
            template: '<h1>404. Page not found!</h1>'
        });
});


// Home controller
app.controller('homeController', function ($scope, $rootScope) {
    $rootScope.startText = 'Start Here';
});


// Product controller
app.controller('productsController', function ($scope, $routeParams, $route, $rootScope, $localStorage, $firebaseArray, $firebaseAuth) {
    // update start text value when this contoller is loaded
    $rootScope.startText = 'Start Over';


    // init firebase
    app.initFirebase();

    // initialize auth object
    $scope.authObj = $firebaseAuth();

    // used to store user object
    $scope.authUser = null; // authenticated user object	

    // bind a firebase array/collection to our model
    //$scope.todos = $firebaseArray(app.firebaseRef.child('ng-todos'));
    //$scope.cart = [];

    // on login or logout
    $scope.authObj.$onAuthStateChanged(function (firebaseUser) {
        if (firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
            $scope.authUser = firebaseUser;
            //$scope.cart = $firebaseArray(app.firebaseRef.child('users').child($scope.authUser.uid).child('cart'));
            //$scope.user = $firebaseObject(app.firebaseRef.child('users').child($scope.authUser.uid));
        } else {
            console.log("Signed out");
            $scope.authUser = null;
            //$scope.user = null;
            //$scope.cart = [];
        }
    });


    // set category value based on route params for product filtering
    $scope.category = $routeParams.category;
    $scope.type = $routeParams.type;

    // sample product model
    // ideally, add image, rating, description, etc to this array
    $scope.inventory = [
        { id: 1, category: "road", type: "bike", description: "Trek Madone SLR 8 - 2019", price: 7799.99, qty: 1, img: "trekMadone.jpg" },
        { id: 2, category: "road", type: "bike", description: "Trek Emonda ALR 5 - 2019", price: 1659.99, qty: 1, img: "trekEmonda.jpg" },
        { id: 3, category: "road", type: "helmet", description: "POC Octal Aero Raceday", price: 270.00, qty: 1, img: "pocRoadHelmet.jpg" },
        { id: 4, category: "road", type: "helmet", description: "Bontrager Circuit MIPS Road Helemt", price: 149.99, qty: 1, img: "bontragerRoadHelmet.jpg" },
        { id: 5, category: "mountain", type: "bike", description: "Trek Top Fuel 9.9 SL - 2019", price: 8799.99, qty: 1, img: "trekTopFuel.jpg" },
        { id: 6, category: "mountain", type: "bike", description: "Salsa Woodsmoke 27.5+ X01-2017", price: 2199.99, qty: 1, img: "salsaWoodsmoke.jpg" },
        { id: 7, category: "mountain", type: "helmet", description: "Fox Racing Rampage Pro Carbon MIPS Helmet", price: 449.95, qty: 1, img: "foxMountainHelmet.jpg" },
        { id: 8, category: "mountain", type: "helmet", description: "Kali Protectives Interceptor Helmet", price: 180.00, qty: 1, img: "kaliMountainHelmet.jpg" },
        { id: 9, category: "cruiser", type: "bike", description: "Electra Townie Go! 8i - 2018", price: 119.99, qty: 1, img: "electraTownie.jpg" },
        { id: 10, category: "cruiser", type: "bike", description: "Electra Townie Ballon 3i EQ - 2018", price: 169.99, qty: 1, img: "electraBalloon.jpg" },
        { id: 11, category: "cruiser", type: "helmet", description: "Giro Raze", price: 45.00, qty: 1, img: "giroCruiserHelmet.jpg" },
        { id: 12, category: "cruiser", type: "helmet", description: "Bern Berkeley w/Visor", price: 69.99, qty: 1, img: "bernCruiserHelmet.jpg" }
    ];


    // create a cart array to hold products
    //$scope.cart = [];

    // find the item by id
    var findItemById = function (items, id) {
        return _.find(items, function (item) {
            return item.id === id;
        });
    };

    // get the cost
    $scope.getCost = function (item) {
        return item.qty * item.price;
    };

    // add item to cart
    /*
    $scope.addItem = function (itemToAdd) {
        var found = findItemById($scope.cart, itemToAdd.id);
        if (found) {
            found.qty += itemToAdd.qty;
        }
        else {
            $scope.cart.push(angular.copy(itemToAdd));
        }
        // send user to helmet screen when they click add to cart
        window.location.href = '#!products/' + itemToAdd.category + '/helmet';
    };
    */

    // marks add item
    $scope.addItem = function (itemToAdd) {
        //console.log(itemToAdd);
        //alert('hi');
        $rootScope.cart.push(itemToAdd);
        window.location.href = '#!products/' + itemToAdd.category + '/helmet';
    };



    // get cart total
    $scope.getTotal = function () {
        var total = _.reduce($scope.cart, function (sum, item) {
            return sum + $scope.getCost(item);
        }, 0);
        console.log('total: ' + total);
        return total;
    };

    // clear cart
    $scope.clearCart = function () {
        $scope.cart.length = 0;
    };

    // remove item from cart
    $scope.removeItem = function (item) {
        var index = $scope.cart.indexOf(item);
        $scope.cart.splice(index, 1);
    };

});


// Login authorizing controller
app.controller('authCtrl', function ($scope, $firebaseAuth, $firebaseObject, $uibModal, $uibModalStack) {
    // initalize new user
    $scope.newUser = {
        email: '',
        password: ''
    }
    // initalize exist user
    $scope.existUser = {
        email: '',
        password: ''
    }

    // initalize database
    app.initFirebase();

    // initialize auth object
    $scope.authObj = $firebaseAuth();

    // store user objects
    $scope.authUser = null; // authenticated user object
    $scope.user = null; // our user's details or record

    // on login or logout
    $scope.authObj.$onAuthStateChanged(function (firebaseUser) {
        if (firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
            $scope.authUser = firebaseUser;
            $scope.user = $firebaseObject(app.firebaseRef.child('users').child($scope.authUser.uid));
        } else {
            console.log("Signed out");
            $scope.authUser = null;
            $scope.user = null;
        }
    });


    // button methods
    $scope.createUser = function () {
        // validate input
        if ($scope.newUser.email == 0 || $scope.newUser.password == 0) {
            alert('Fields cannot be blank');
        }
        else {
            // create user - pass username and password to this method
            $scope.authObj.$createUserWithEmailAndPassword($scope.newUser.email, $scope.newUser.password)
                .then(function (firebaseUser) {
                    console.log("User " + firebaseUser.uid + " created successfully!");
                    $uibModalStack.dismissAll();
                }).catch(function (error) {
                    console.error("Error: ", error);
                });

            // add email to user data
            var data = { email: $scope.newUser.email };
            app.firebaseRef.child('users').child($scope.authUser.uid).update(data);
        }
    };

    $scope.login = function () {
        // get values from the form

        // validate input
        if ($scope.existUser.email == 0 || $scope.existUser.password == 0) {
            alert('Fields cannot be blank');
        }
        // login - pass username and password to this method
        $scope.authObj.$signInWithEmailAndPassword($scope.existUser.email, $scope.existUser.password).then(function (firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
            $uibModalStack.dismissAll();
        }).catch(function (error) {
            console.error("Authentication failed:", error);
        });
    };

    $scope.loginAnon = function () {
        // login anonymously
        $scope.authObj.$signInAnonymously().then(function (firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
            $uibModalStack.dismissAll();
        }).catch(function (error) {
            console.error("Authentication failed:", error);
        });
    }

    /* not using this on the project
    $scope.updateUser = function () {
        // validate the form

        // create data (from a form) to store with user
        var data = { firstname: "Tyler", lastname: "Kowalchuk" };

        // store data with user
        // stores in /users/lkada9ae89slsekljklse/firstname = "Tyler"
        app.firebaseRef.child('users').child($scope.authUser.uid).update(data);
    };
    */

    $scope.logout = function () {
        // sign out
        $scope.user.$destroy();	// cancels event listeners before signout
        $scope.authObj.$signOut();
    };

    // modal code
    'use strict';

    $scope.openModal = function () {
        $uibModal.open({
            templateUrl: 'pages/signIn.html',
            controller: function ($scope, $uibModalInstance) {
                $scope.ok = function () {
                    $uibModalInstance.close();
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            size: 'lg'
        })
    };

});



app.initFirebase = function () {
    // Initialize Firebase
    // only if it's not already initialized
    if (!app.firebaseRef) {
        var config = {
            apiKey: "AIzaSyA40qj1vR9TRoiI9dQ-4ldeM14DKa-19yQ",
            authDomain: "petesbikeshop-bf7ff.firebaseapp.com",
            databaseURL: "https://petesbikeshop-bf7ff.firebaseio.com",
            projectId: "petesbikeshop-bf7ff",
            storageBucket: "petesbikeshop-bf7ff.appspot.com",
            messagingSenderId: "386310594458"
        };
        firebase.initializeApp(config);

        // create database reference to root
        app.firebaseRef = firebase.database().ref('/');
    }
};

