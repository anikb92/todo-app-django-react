import React, { Component } from "react"

const tasks = [
  {
    id: 1,
    title: "Backend",
    description: "Create processing module plus backend",
    completed: true
  },
  {
    id: 2,
    title: "Frontend",
    description: "Create frontend using React",
    completed: true
  },
];

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {tasks};
    };

    render() {
      return (
        <main className="content">
            <div className="row">
              <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                  <ul className="list-group list-group-flush">
                  {this.state.tasks.map(item => (
                  <div>
                    <h1>{item.title}</h1>
                    <span>{item.description}</span>
                  </div>
                  ))}
                  </ul>
                </div>
              </div>
            </div>
        </main>
      )
    }
}

export default App;
