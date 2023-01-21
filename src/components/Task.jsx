import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  padding: 8px;
  display: flex;
  border-radius: 2px;
  margin-bottom: 8px;
  border: 1px solid lightgrey;

  background-color: ${props =>
    props.isDragDisabled ? 'Lightgrey' : props.isDragging
      ? 'Lightgreen'
      : 'white'
  };
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border-radius: 4px;
  background-color: orange;
`;

export default class Task extends React.Component {
  render() {
    const isDragDisabled = this.props.task.id === 'task-1';

    return (
      <Draggable 
        index={this.props.index}
        isDragDisabled={isDragDisabled}
        draggableId={this.props.task.id}
      >
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            isDragDisabled={isDragDisabled}
            isDragging={snapshot.isDragging}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Handle {...provided.dragHandleProps} />
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}