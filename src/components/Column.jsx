import React from "react";
import styled from "styled-components";
import { Droppable } from 'react-beautiful-dnd';

import Task from "./Task";

const Container = styled.div`
  margin: 8px;
  display: flex;
  min-width: 220px;
  border-radius: 2px;
  flex-direction: column;
  border: 1px solid lightgrey;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>

        <Droppable 
          droppableId={this.props.column.id}
          isDropDisabled={this.props.isDropDisabled}
        >
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
              {...provided.droppableProps}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}

              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
