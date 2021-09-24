import React, { Component } from "react"
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
    state = {
      currTask: {
        title: "",
        description: "",
        completed: false
      },
      tasks: [],
      showCompleted: false,
    };

    async componentDidMount() {
      try {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();
        this.setState({
          tasks
        });
      } catch (error) {
        console.log(error);
      }
    }

    createTask = () => {
      const task = {title: "", description: "", completed: false };
      this.setState({ currTask: task, modal: !this.state.modal });
    };

    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };

    handleSubmit = (task) => {
      this.toggle();
      if (task.id) {
        axios
          .put(`/api/tasks/${task.id}/`, task)
        return;
      }
      axios
        .post("/api/tasks/", task)
    };

    displayCompleted = (status) => {
      if (status) {
        return this.setState({ showCompleted: true});
      }
      return this.setState({ showCompleted: false});
    };

    renderTabList = () => {
      return (
        <div className="my-5 tab-list">
          <button
            onClick={() => this.displayCompleted(true)}
            className={this.state.showCompleted ? "active" : ""}
          >
            Complete
          </button>
          <button
            onClick={() => this.displayCompleted(false)}
            className={this.state.showCompleted ? "" : "active"}
          >
            Incomplete
          </button>
        </div>
      );
    };

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
        <h1 className="text-white text-uppercase text-center my-4">Todo App</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createTask} className="btn btn-success">Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderTasks()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            currTask={this.state.currTask}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ): null}
      </main>
      )
    }
  }

export default App;