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

    // bind "this" to the callback function when the objext is created
    this.handleTextChange = this.handleTextChange.bind(this);
  }


  handleTextChange(event) {
    this.setState({
      newTodo: event.target.value
    });
  }

  handleAddItem = (event) => {
    event.preventDefault();

    var newItem = {
      id: Date.now(),
      text: this.state.newTodo,
      done: false
    }

    this.setState((prevState) => ({
      items: prevState.items.concat(newItem), // add to array
      newTodo: '' //clear form
    }));

    //alert(this.state.newTodo);
  }

  markItemCompleted = (itemId) => {
    var updatedItems = this.state.items.map(item => {
      if (itemId === item.id) {
        item.done = !item.done;
      }
      return item;
    });
    this.setState({
      items: updatedItems
    });
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <div className="row">
          <div className="col-md-3">
            <TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} />
          </div>
        </div>

        <form className="row">
          <div className="col-md-3">
            <input type="text" className="form-control" onChange={this.handleTextChange} value={this.state.newTodo} />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary" onClick={this.handleAddItem}>Add</button>
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
    return (
      <ul>
        {this.props.items.map(item => (
          <TodoItem key={item.id} id={item.id} text={item.text} completed={item.done} onItemCompleted={this.props.onItemCompleted} />
        ))}
      </ul>
    );
  }
}

// the "list item" or individual todo item component
class TodoItem extends React.Component {
  markCompleted = (event) => {
    this.props.onItemCompleted(this.props.id);
  }


  render() {
    var itemClass = this.props.completed ? "done" : "";
    return (
      <li className={itemClass}>
        <label>
          <input type="checkbox" onChange={this.markCompleted} />
          {this.props.text}
        </label>
      </li>
    );
  }
}


// run app
ReactDOM.render(<TodoApp />, document.getElementById("app"));