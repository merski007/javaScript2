var app = angular.module('todoApp', ['firebase', 'ngMaterial', 'ngMessages']);

// define some global variables available to the entire app
app.run(function ($rootScope) {
    var d = new Date();
    $rootScope.appName = 'TaskMaster - 2018';
    $rootScope.copyright = d.getFullYear();
    $rootScope.isActive = function (viewPath) {
        return viewPath == $location.path();
    }
    $rootScope.newUser = false;
});


app.controller('todoCtrl', function ($scope, $rootScope, $firebaseArray, $firebaseAuth, $mdDialog) {
    // init firebase
    app.initFirebase();

    // initialize auth object
    $scope.authObj = $firebaseAuth();

    // used to store user object
    $scope.authUser = null; // authenticated user object	

    // create array var
    $scope.todos = [];

    // on login or logout
    $scope.authObj.$onAuthStateChanged(function (firebaseUser) {
        if (firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
            $scope.authUser = firebaseUser;
            $scope.todos = $firebaseArray(app.firebaseRef.child('users').child($scope.authUser.uid).child('ng-todos'));
            if ($rootScope.newUser) {
                //alert('new user');
                $scope.newTodo0 = { text: 'I\'m the most important, do me first!', cb1: true, cb2: false, cb3: false, cb4: false, done: false };
                $scope.newTodo1 = { text: 'New Year resolution, eat healthier', cb1: false, cb2: true, cb3: false, cb4: false, done: false };
                $scope.newTodo2 = { text: 'Pick up milk on the way home', cb1: false, cb2: false, cb3: true, cb4: false, done: false };
                $scope.newTodo3 = { text: 'Plan the Charleston vacation', cb1: false, cb2: false, cb3: false, cb4: true, done: false };
                $scope.newTodo4 = { text: 'Sort me!!!!', cb1: false, cb2: false, cb3: false, cb4: false, done: false };
                $scope.newTodo5 = { text: 'Looky here!! I\'m already done!!!', cb1: false, cb2: false, cb3: false, cb4: false, done: true };

                $scope.todos.$add($scope.newTodo0);
                $scope.todos.$add($scope.newTodo1);
                $scope.todos.$add($scope.newTodo2);
                $scope.todos.$add($scope.newTodo3);
                $scope.todos.$add($scope.newTodo4);
                $scope.todos.$add($scope.newTodo5);

                $rootScope.newUser = false;
            };
            //$scope.user = $firebaseObject(app.firebaseRef.child('users').child($scope.authUser.uid));
        } else {
            console.log("Signed out");
            $scope.authUser = null;
            //$scope.user = null;
            $scope.todos = [];
        }
    });

    // custom filter to get completed todos
    $scope.getCompleteTodos = function () {
        return $scope.todos.filter(function (todo) {
            return todo.done;
        });
    };

    // custom filter to get incomplete todos
    $scope.getIncompleteTodos = function () {
        return $scope.todos.filter(function (todo) {
            return !todo.done && !todo.cb1 && !todo.cb2 && !todo.cb3 && !todo.cb4;
        });
    };

    // custom filter to get incomplete todos
    $scope.getIncompleteCb1Todos = function () {
        return $scope.todos.filter(function (todo) {
            return !todo.done && todo.cb1;
        });
    };

    // custom filter to get incomplete todos
    $scope.getIncompleteCb2Todos = function () {
        return $scope.todos.filter(function (todo) {
            return !todo.done && todo.cb2;
        });
    };

    // custom filter to get incomplete todos
    $scope.getIncompleteCb3Todos = function () {
        return $scope.todos.filter(function (todo) {
            return !todo.done && todo.cb3;
        });
    };

    // custom filter to get incomplete todos
    $scope.getIncompleteCb4Todos = function () {
        return $scope.todos.filter(function (todo) {
            return !todo.done && todo.cb4;
        });
    };

    // clear completed todos
    $scope.clearCompleted = function () {
        // resets todos array value so only incomplete tasks are in there (uses the custom filter)
        $scope.todos = $scope.getIncompleteTodos();
    }

    $scope.toggleBoxes = function (obj) {
        if (!obj.newcb1) {
            return obj.newcb2 = false, obj.newcb3 = false, obj.newcb4 = false;
        }
        else if (!obj.newcb2) {
            return obj.newcb1 = false, obj.newcb3 = false, obj.newcb4 = false;
        }
        else if (!obj.newcb3) {
            return obj.newcb1 = false, obj.newcb2 = false, obj.newcb4 = false;
        }
        else if (!obj.newcb4) {
            return obj.newcb1 = false, obj.newcb2 = false, obj.newcb3 = false;
        }
    }

    // add a new todo
    $scope.newTodo = { text: '', cb1: false, cb2: false, cb3: false, cb4: false, done: false };
    $scope.addTodo = function () {
        // $scope.newTodo will be the value from the text box
        $scope.newTodo.cb1 = $scope.newTodo.newcb1;
        $scope.newTodo.cb2 = $scope.newTodo.newcb2;
        $scope.newTodo.cb3 = $scope.newTodo.newcb3;
        $scope.newTodo.cb4 = $scope.newTodo.newcb4;

        // add new todo to database
        $scope.todos.$add($scope.newTodo);

        // update model to clear todo fields
        $scope.newTodo.text = '';
        $scope.newTodo.cb1 = false;
        $scope.newTodo.cb2 = false;
        $scope.newTodo.cb3 = false;
        $scope.newTodo.cb4 = false;
    };

    $scope.editTodo = function (todo) {
        // edit the todo object
        // objects are passed by reference
        // string/number/boolean are passed by value
        //todo.text += " EDITED";
        todo.edit = !todo.edit;

        todo.cb1 = todo.newcb1;
        todo.cb2 = todo.newcb2;
        todo.cb3 = todo.newcb3;
        todo.cb4 = todo.newcb4;

        $scope.todos.$save(todo);
    };

    $scope.completeTodo = function (todo) {
        $scope.todos.$save(todo);
    };

    $scope.deleteTodo = function (todo) {
        $scope.todos.$remove(todo);
    };

    $scope.showConfirm = function (ev, todo) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this TODO?')
            .textContent('Once it\'s gone, it\'s gone. Forever...')
            .ariaLabel('Delete confirmation')
            .targetEvent(ev)
            .ok('Delete it!')
            .cancel('Keep it!');

        $mdDialog.show(confirm).then(function () {
            $scope.deleteTodo(todo);
        }, function () {
            $scope.status = 'You decided to keep your debt.';
        });
    };

    $scope.clearCompleted = function () {
        // loop through completed todos and remove from database
        $scope.getCompleteTodos().forEach(function (todo) {
            $scope.todos.$remove(todo);
        });
    };


});


app.controller('authCtrl', function ($scope, $rootScope, $firebaseAuth, $firebaseObject, $mdSidenav, $log) {
    // right side nav functions
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function () {
        return $mdSidenav('right').isOpen();
    };

    function buildToggler(navID) {
        return function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });

            // clear out user input fields and reset form field condition 
            $scope.userLogin.$setPristine();
            $scope.userLogin.$setUntouched();
            $scope.userEmail = '';
            $scope.userPassword = '';
        };
    }

    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('right').close()
            .then(function () {
                $log.debug("close RIGHT is done");
            });
    };

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
            console.log("Signed in as: auth state change", firebaseUser.uid);
            $scope.authUser = firebaseUser;
            $scope.user = $firebaseObject(app.firebaseRef.child('users').child($scope.authUser.uid));
            $scope.close();
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
        $scope.authObj.$createUserWithEmailAndPassword($scope.userEmail, $scope.userPassword)
            .then(function (firebaseUser) {
                console.log("User " + firebaseUser.uid + " created successfully!");
                $rootScope.newUser = true;
                $scope.close();
            }).catch(function (error) {
                console.error("Error: ", error);
            });
    };

    $scope.login = function () {
        // get values from the form

        // validate input

        // login - pass username and password to this method
        $scope.authObj.$signInWithEmailAndPassword($scope.userEmail, $scope.userPassword).then(function (firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
            $scope.close();
        }).catch(function (error) {
            console.error("Authentication failed:", error);
        });
    };

    $scope.updateUser = function () {
        // validate the form

        // create data (from a form) to store with user
        var data = { firstname: "Tyler", lastname: "Kowalchuk" };

        // store data with user
        // stores in /users/lkada9ae89slsekljklse/firstname = "Tyler"
        //app.firebaseRef.child('users').child($scope.authUser.uid).update(data);
    };

    $scope.logout = function () {
        // sign out
        //$scope.user.$destroy();	// cancels event listeners before signout
        $scope.authObj.$signOut();
    };

});


app.initFirebase = function () {
    // Initialize Firebase
    // only if it's not already initialized
    if (!app.firebaseRef) {
        var config = {
            apiKey: "AIzaSyDV8RpDq5XTf9LvDgkkBgyZbgyWSNlrxng",
            authDomain: "todoapp-999a1.firebaseapp.com",
            databaseURL: "https://todoapp-999a1.firebaseio.com",
            projectId: "todoapp-999a1",
            storageBucket: "",
            messagingSenderId: "828610305376"
        };
        firebase.initializeApp(config);

        // create database reference to root
        app.firebaseRef = firebase.database().ref('/');
    }
};

// customize the them
app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('orange');
});


// custom directive
app.directive('todo', function () {
    return {
        templateUrl: 'templates/todo.html'
        // ,controller: ... could specify a custom controller
        // $scope
        // etc...
        // restrict: 'EA'
    };
});

// custom directive
app.directive('sort', function () {
    return {
        templateUrl: 'templates/sortBoxes.html',
        // ,controller: ... could specify a custom controller
        scope: {
            sortObj: '=obj'
        }
        // etc...
        // restrict: 'EA'
    };
});