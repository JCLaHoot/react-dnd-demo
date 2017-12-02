import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const entitySource = {
  // required
  beginDrag(props) {
    const item = {
      id: props.id,
      text: props.text,
      location: props.location
    };
    return item;
  },
  endDrag(props, monitor, component) {
    // return props.handleDrop(props.src)
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(), //required
    isDragging: monitor.isDragging()
  }
}

class Entity extends Component {
  render() {
    const { connectDragSource, isDragging, id, text, location} = this.props; //required
    //wrapping with connectDragSource required
    return connectDragSource(
      <div className={`entity ${isDragging ? `is-dragging` : ``}`}>
        {text}

      </div>
    );
  }
}

//required
export default DragSource(ItemTypes.ENTITY, entitySource, collect)(Entity);
