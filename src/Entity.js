import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

// required. This contains methods that will describe how the draggable item
// will react when dragged.
// see http://react-dnd.github.io/react-dnd/docs-drag-source.html for more details
const entitySource = {
  // beginDrag must be implemented. It returns a plain JS object describing the object being dragged
  beginDrag(props) {
    const item = {
      id: props.id,
      text: props.text,
      location: props.location
    };
    return item;
  }
};

// retrieves info on the drag and drop state from the monitor.
const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(), //required
    connectDragPreview: connect.dragPreview(), //required if using the touch backend

    isDragging: monitor.isDragging()
  }
}

class Entity extends Component {
  render() {
    const { connectDragSource, connectDragPreview, isDragging, id, text, location} = this.props;
    // wrapping the component with connectDragSource is required
    // wrapping in connectDragPreview required if using the touch backend
    // here I also change the class name depending on whether the component is being dragged or not.
    return connectDragPreview(connectDragSource(
      <div className={`entity ${isDragging ? `is-dragging` : ``}`}>
        {text}
      </div>
    ));
  }
}

//The draggable item is wrapped in DragSource. Item type is specified here as well.
export default DragSource(ItemTypes.ENTITY, entitySource, collect)(Entity);
