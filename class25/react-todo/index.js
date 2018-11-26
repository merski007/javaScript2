// the "app" component

// Components let you split the UI into independent, 
// reusable pieces, and think about each piece in isolation. 
// Conceptually, components are like JavaScript functions. 
// They accept arbitrary inputs (called “props”) and return 
// React elements describing what should appear on the screen.
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    
	// similar to $scope in angular
    this.state = {
      items: [],
      newTodo: ""
    };
  }
	
  render() {
    return (
      <div>
        <h1>Todo List</h1>
		  <div className="row">
			<div className="col-md-3">
				{/* todo list go here */}
			</div>
		  </div>
		
		 <form className="row">
          <div className="col-md-3">
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

// the "list" component
// separating this allow us to have multiple todo lists
class TodoList extends React.Component {
  render() {
    return '';
  }
}

// the "list item" or individual todo item component
class TodoItem extends React.Component {
  render() {
    return '';
  }
}


// run app
ReactDOM.render(<TodoApp />, document.getElementById("app"));