import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  // makes sure the property showGraph is required whenever the object of class IState is passed
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      // initialises the App without the graph
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    // render Graph when render method is called and showGraph is true
    if (this.state.showGraph) {
      return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    let x = 0;
    // define an interval of fixed time delay using setInterval method
    const interval = setInterval(() => {
      // stream data from server
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        // Update the state using setState to create a pending state transition instead of mutating this.state directly
        this.setState ({
          // Creating a new array of data that consists of previous data in the state and the new data from server
          data: serverResponds,
          // Updating the graph state to call the render method and display the graph
          showGraph: true,
        });
      });
      x++;
      if (x > 1000) {
        // cancelling the previously established repeating action set be setInterval call
        clearInterval(interval);
      }
    }, 100);
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // When button is clicked, our react app tries to request new data from the server.
            // As part of your task, update the getDataFromServer() function to keep requesting the data every 100ms until the app is closed or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
