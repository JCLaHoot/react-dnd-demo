import React, { Component } from 'react';
import './App.css';

import { DragDropContext } from 'react-dnd'; //import into top level component
import HTML5Backend from 'react-dnd-html5-backend';


import Container from './Container';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      containers: [
        {id: "entity-bin", text: "I'm the initial entity bin", contents: [{id: 0, text: "I'm entity 0"},
          {id: 1, text: "I'm entity 1"}]},
        {id: 0, text: "I'm container 0", contents: [{id: 2, text: "I'm entity 2"}]},
        {id: 1, text: "I'm container 1", contents: []}
      ]
    }
  }

// methods run in the drop zones when an item is dropped in them
  onDrop = (container, entity) => {
    var droppedItemID = entity.id;
    var dropZoneID = container.id;
    var oldLocationID = entity.location;
    // if item isnt moving, stop function
    if(dropZoneID === oldLocationID) {
      return;
    }

// sets the values for the new containers
    var newContainers = this.state.containers.map((container) => {
      if(container.id === oldLocationID) { // removes droped item from container
        var newContents = container.contents.filter((entity) => {
          return entity.id !== droppedItemID;
        })
        container.contents = newContents;
        return container;
      }
      else if (container.id === dropZoneID) { // adds dropped item to new container
        container.contents.push(entity);
        return container;
      }
      else { // cases where container is unchanged
        return container;
      }
    })

// updates the state to then update the DOM
    this.setState({
      containers: newContainers
    })

  }



  render() {
    const { containers } = this.state;

    return (
      <div className="App">
        Some content

        {containers.map(({id, text, contents}, index) => {
          return <Container id={id} text={text} onDrop={this.onDrop} contents={contents}/>
        })}


      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
