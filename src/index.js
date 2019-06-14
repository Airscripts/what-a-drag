import React from "react";
import ReactDOM from "react-dom";
import initalData from "./initial-data";
import Column from "./column";
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import "@atlaskit/css-reset/dist/bundle.css";

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = initalData;

  onDragStart = (start) => {
    document.body.style.color = 'orange';
    document.body.style.transition = 'background-color 0.2s ease';

    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);

    this.setState({
      homeIndex,
    });
  }; 

  onDragUpdate = update => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(this.state.tasks).length
      : 0;

    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  onDragEnd = result => {
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';

    this.setState({
      homeIndex: null,
    });

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
  
      const newState = {
        ...this.state,
  
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };
  
      this.setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,

      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    };

    this.setState(newState);
  }

  render() {
    return (
        <DragDropContext 
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
          onDragEnd={this.onDragEnd}
        >
          <Container>
          {this.state.columnOrder.map((columnId, index) => {    
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

            const isDropDisabled = index < this.state.homeIndex;
    
            return <Column key={column.id} column={column} tasks={tasks} isDropDisabled={isDropDisabled} />;
          })}
          </Container>
        </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
