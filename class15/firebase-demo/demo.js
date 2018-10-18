// JavaScript Document
// database reference
var databaseRef;

$(document).ready(function (e) {
	initFirebase();

	// form submit event
	$('#addTodoForm').submit(addTodo);
});

// initialize firebase
function initFirebase() {
	var config = {
		apiKey: "AIzaSyDPvvSA5qHqAiSNGAFKJbCXu5m7MEiK8JY",
		authDomain: "demo2018-509fb.firebaseapp.com",
		databaseURL: "https://demo2018-509fb.firebaseio.com",
		projectId: "demo2018-509fb",
		storageBucket: "demo2018-509fb.appspot.com",
		messagingSenderId: "54262448758"
	};
	firebase.initializeApp(config);

	// connect to the databse and create a reference to the root
	databaseRef = firebase.database().ref('/');

	// create firebase event handlers
	databaseRef.child('todos').on('child_added', addToList);
	databaseRef.child('todos').on('child_removed', removeFromList);
}



// process the form (add to database)
function addTodo(e) {
	e.preventDefault();

	// create object to store
	var todo = {
		todo: $('#newTodo').val(),
		duedate: $('#newDueDate').val()
	};

	// add to database
	// 'todos' is the folder/table/record/collection that we want to add to
	databaseRef.child('todos').push(todo);

	// clear form
	$('#addTodoForm input[type=text]').val('');
}


// called when record added to database
function addToList(snapshot) {
	// snapshot is the "record" or "child" that was added

	// get data from the record
	var todo = snapshot.val();

	// create an li and output
	var li = $('<li>').text(todo.todo + '(' + todo.duedate + ')');

	// add a key to each li
	li.attr('data-key', snapshot.key);

	// add a delete button
	var btn = $('<button>').text('X').click(removeTodo);
	li.append(btn);

	// output li
	$('#todoList').append(li);
}

// remove todo from databse
function removeTodo() {
	var key = $(this).parent('li').attr('data-key');

	// remove folder/table/record/collection/whatever
	if (key) { // some simple validation so the whole table is not wiped out accidently
		databaseRef.child('todos/' + key).remove();
		//databaseRef.child('todos/').remove(); //will remove entire todo list
	}
}

function removeFromList(snapshot) {
	// find matching li and remove it
	$('#todoList li[data-key=' + snapshot.key + ']').remove();
}