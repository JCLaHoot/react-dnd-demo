import React from 'react';
import { DragLayer } from 'react-dnd';

import Entity from './Entity';

// gets the data about the item being dragged.
const collect = (monitor) => {
  var item = monitor.getItem();
  return {
    id: item && item.id,
    text: item && item.text,
    location: item && item.location,
    currentOffset: monitor.getSourceClientOffset(), //required
    isDragging: monitor.isDragging()
  }
}

const getItemStyles = (currentOffset) => {
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    var x = currentOffset.x;
    var y = currentOffset.y;
    var transform = `translate(${x}px, ${y}px)`;

    return {
        pointerEvents: 'none',
        transform: transform,
        WebkitTransform: transform
    };
}


const ItemPreview = ({
    id,
    text,
    location,
    isDragging,
    currentOffset
}) => {
    if (!isDragging) {
        return null;
    }

    // the div makes the magic happen for the preview. The contents should match the item being dragged
    return (
      <div className="item-preview" style={getItemStyles(currentOffset)} >
          <Entity id={id} text={text} location={location}/>
      </div>
    );
}


//The preview is wrapped in DragLayer. There is no item type.
export default DragLayer(collect)(ItemPreview);
