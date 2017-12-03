import React, { Component } from 'react';

import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

import Entity from './Entity';


// required. This contains methods that will describe how the container
// will react when items are dragged into it.
const containerTarget = {
  drop(props, monitor) {
    // console.log("item dragged: ", monitor.getItem());
    // console.log("container: ", props)
    props.onDrop(props, monitor.getItem()); //onDrop is defined in the top-level component
  }
};

// collect function is required.
const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  };
}


class Container extends Component {

  render() {
    const {connectDropTarget, text, contents} = this.props;
    //wrapping the component with connectDropTarget is required
    return connectDropTarget(
      <div className="container">
        {text}
        {contents.map(({id, text}) => {
          return <Entity id={id} text={text} location={this.props.id}/>
        })}
      </div>
    );
  }
}

//The draggable item is wrapped in a DropTarget. Item type accepted is specified here as well.
export default DropTarget(ItemTypes.ENTITY, containerTarget, collect)(Container);
