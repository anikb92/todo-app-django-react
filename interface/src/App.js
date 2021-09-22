import React, { Component } from "react"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currTask: {
            title: "",
            description: "",
            completed: false
          },
          tasks: [],
          showCompleted: false,
        };
    }

    async componentDidMount() {
      try {
        const response = await fetch('');
        const tasks = await response.json();
        this.setState({
          tasks
        });
      } catch (error) {
        console.log(error);
      }
    }

    renderTasks = () => {
      const { showCompleted } = this.state;
      const newTasks = this.state.tasks.filter(
        task => task.completed === showCompleted
      );
      return newTasks.map(task => (
        <li
          key={task.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className={`task-title mr-2 ${
              this.state.showCompleted ? "completed-task" : ""
            }`}
            title={task.description}
            >
              {task.title}
            </span>
        </li>
      ));
    };

    render() {
      return (
        <main className="content">
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                {this.renderTasks()}
              </ul>
            </div>
          </div>
        </div>
      </main>
      )
    }
  }

export default App;