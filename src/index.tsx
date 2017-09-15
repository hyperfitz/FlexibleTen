import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

interface AppProps { }
interface AppState {
  name: string;
}

/**
 * Testing out jsdocs
 */
class App extends Component<AppProps, AppState> {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          Yay!!! :)
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
