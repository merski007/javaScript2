// create the angular "app" with "plugins" 
var app = angular.module('todoApp', ['firebase']);

app.controller('authCtrl', function ($scope, $firebaseAuth, $firebaseObject) {
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
		// get values from the form

		// validate input

		// create user - pass username and password to this method
		$scope.authObj.$createUserWithEmailAndPassword("my@email.com", "mypassword")
			.then(function (firebaseUser) {
				console.log("User " + firebaseUser.uid + " created successfully!");
			}).catch(function (error) {
				console.error("Error: ", error);
			});
	};

	$scope.login = function () {
		// get values from the form

		// validate input

		// login - pass username and password to this method
		$scope.authObj.$signInWithEmailAndPassword("my@email.com", "mypassword").then(function (firebaseUser) {
			console.log("Signed in as:", firebaseUser.uid);
		}).catch(function (error) {
			console.error("Authentication failed:", error);
		});
	};

	$scope.loginAnon = function () {
		// login anonymously
		$scope.authObj.$signInAnonymously().then(function (firebaseUser) {
			console.log("Signed in as:", firebaseUser.uid);
		}).catch(function (error) {
			console.error("Authentication failed:", error);
		});
	}

	$scope.updateUser = function () {
		// validate the form

		// create data (from a form) to store with user
		var data = { firstname: "Tyler", lastname: "Kowalchuk" };

		// store data with user
		// stores in /users/lkada9ae89slsekljklse/firstname = "Tyler"
		app.firebaseRef.child('users').child($scope.authUser.uid).update(data);
	};

	$scope.logout = function () {
		// sign out
		$scope.user.destroy();	// cancels event listeners before signout
		$scope.authObj.$signOut();
	};

}); // end authCtrl

app.controller('todoCtrl', function ($scope, $firebaseArray, $firebaseAuth, $firebaseObject) {
	// init firebase
	app.initFirebase();

	// initialize auth object
	$scope.authObj = $firebaseAuth();

	// used to store user object
	$scope.authUser = null; // authenticated user object	

	// bind a firebase array/collection to our model
	//$scope.todos = $firebaseArray(app.firebaseRef.child('ng-todos'));
	$scope.todos = [];

	// on login or logout
	$scope.authObj.$onAuthStateChanged(function (firebaseUser) {
		if (firebaseUser) {
			console.log("Signed in as:", firebaseUser.uid);
			$scope.authUser = firebaseUser;
			$scope.todos = $firebaseArray(app.firebaseRef.child('users').child($scope.authUser.uid).child('todos'));
			//$scope.user = $firebaseObject(app.firebaseRef.child('users').child($scope.authUser.uid));
		} else {
			console.log("Signed out");
			$scope.authUser = null;
			//$scope.user = null;
			$scope.todos = [];
		}
	});

	// example of a custom filter
	// returns an array of incomplete todos
	$scope.getIncompleteTodos = function () {
		return $scope.todos.filter(function (todo) {
			return !todo.done;
		});
	};

	// returns an array of complete todos
	$scope.getCompleteTodos = function () {
		return $scope.todos.filter(function (todo) {
			return todo.done;
		});
	};

	$scope.addTodo = function () {
		// add todo to the array
		//$scope.todos.push({text: $scope.newTodo, done: false});

		// add todo to Firebase
		// $add() is an AngularFire method
		//$scope.todos.push({text: $scope.newTodo, duedate: $scope.newDate, done: false});
		$scope.todos.$add({ text: $scope.newTodo, duedate: $scope.newDate, done: false });


		// clear the form
		$scope.newTodo = '';
		$scope.newDate = '';
	};

	$scope.updateTodo = function (todo) {
		$scope.todos.$save(todo);
	};

	$scope.clearCompleted = function () {
		//$scope.todos = $scope.getIncompleteTodos();
		// loop through completed todos and remove from database
		$scope.getCompleteTodos().forEach(function (todo) {
			$scope.todos.$remove(todo);
		});
	};

}); // end todoCtrl


app.initFirebase = function () {
	// Initialize Firebase
	// only if it's not already initialized
	if (!app.firebaseRef) {
		var config = {
			apiKey: "AIzaSyDPvvSA5qHqAiSNGAFKJbCXu5m7MEiK8JY",
			authDomain: "demo2018-509fb.firebaseapp.com",
			databaseURL: "https://demo2018-509fb.firebaseio.com",
			projectId: "demo2018-509fb",
			storageBucket: "demo2018-509fb.appspot.com",
			messagingSenderId: "54262448758"
		};
		firebase.initializeApp(config);

		// create database reference to root
		app.firebaseRef = firebase.database().ref('/');
	}
};


