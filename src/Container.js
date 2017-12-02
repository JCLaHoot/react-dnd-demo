import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

import Entity from './Entity';



const containerTarget = {
  drop(props, monitor) {
    console.log("item dragged: ", monitor.getItem());
    console.log("container: ", props)
    props.onDrop(props, monitor.getItem());
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  };
}


class Container extends Component {

  constructor(props, contents) {
    super(props);
    this.state = {
      contents
    }
  }


  render() {

    const {connectDropTarget, text, contents} = this.props;

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

export default DropTarget(ItemTypes.ENTITY, containerTarget, collect)(Container);
