import React, { Component } from 'react';
import './App.css';

import { DragDropContext } from 'react-dnd'; // required in top-level component
// import HTML5Backend from 'react-dnd-html5-backend'; // disabled in order to try Touch backend
import TouchBackend from 'react-dnd-touch-backend'; // required in top-level component
import EntityPreview from './EntityPreview'; //required if using the Touch backend

import Container from './Container'; // drop-zone components. Not part of react-dnd

// tests whether its a touch screen or not. The makers of the touch backend recomment using the HTML5 one on desktop
// const isTouchDevice = 'ontouchstart' in document.documentElement;
// if (isTouchDevice) {
//   import TouchBackend from 'react-dnd-touch-backend'; // required in top-level component
// }
// else {
//   import HTML5Backend from 'react-dnd-html5-backend'; // disabled in order to try Touch backend
// }

class App extends Component {


  constructor(props) {
    super(props);
/*    There may be other design patterns that work with react-dnd,
      but the common one involves describing your draggable entities
      and their drop zones within the state of your top-level component.
      All fields are optional, but it's a good idea to have some sort of
      unique identifier for draggable items and drop containers.
*/
    this.state = {
      containers: [
        {id: "entity-bin", text: "I'm the initial entity bin", contents: [{id: 0, text: "I'm entity 0"},
          {id: 1, text: "I'm entity 1"}]},
        {id: 0, text: "I'm container 0", contents: [{id: 2, text: "I'm entity 2"}]},
        {id: 1, text: "I'm container 1", contents: []}
      ]
    }
  }


  // Runs when an item is dropped into the drop zone.
    onDrop = (container, entity) => {
    var droppedItemID = entity.id;
    var dropZoneID = container.id; //Where the item is being dragged TO
    var oldLocationID = entity.location; //Where the item was dragged FROM

    // if item isn't going anywhere, there's nothing to do in most cases.
    if(dropZoneID === oldLocationID) {
      return;
    }

    // We want to re-create the data structure for the containers
    var newContainers = this.state.containers.map((container) => {
      if(container.id === oldLocationID) { // removes droped item from container it was dragged FROM
        var newContents = container.contents.filter((entity) => {
          return entity.id !== droppedItemID; //filters out the dragged item
        })
        container.contents = newContents;
        return container;
      }
      else if (container.id === dropZoneID) { // adds dropped item to container it's being dragged TO
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
    // We map through the list of containers and populate the right data into them
    // The Entity Preview is ONLY required when implementing the touch backend.
    return (
      <div className="App">
        {containers.map(({id, text, contents}, index) => {
          return <Container id={id} text={text} onDrop={this.onDrop} contents={contents}/>
        })}
        <EntityPreview key="__preview" name="Item" />
      </div>
    );
  }
}

// The entire top-level component is wrapped in the DragDropContext, like so:
// DragDropContext(BACKEND_GOES_HERE)(YOUR_TOP_LEVEL_COMPONENT_NAME)
export default DragDropContext(TouchBackend({enableMouseEvents:true}))(App);
