import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TagVerifier from "./Components/TagVerifier";

class App extends Component {
  render() {
    const string1 = `The following text<C><B>is centred and in boldface</B></C>`;
    const string2 = `<B>This <\\g>is <B>boldface</B> in <<*> a</B> <6> <<d>sentence`;
    const string3 = `<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>`;
    const string4 = `<B>This should be in boldface, but there is an extra closing tag</B></C>`;
    const string5 = `<B><C>This should be centred and in boldface, but there is a missing closing tag</C>`;
    
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <TagVerifier tag={string1} />
        <TagVerifier tag={string2} />
        <TagVerifier tag={string3} />
        <TagVerifier tag={string4} />
        <TagVerifier tag={string5} />
      </div>
    );
  }
}

export default App;
