import React from 'react';
import Column from './Column';

const Board = ({ tasks, onDeleteTask, onEditTask, onMoveTask, onDragStart }) => {
    const columns = ['Todo', 'In Progress', 'Done'];

    return (
        <div className="board">
            {columns.map(status => (
                <Column
                    key={status}
                    title={status}
                    tasks={tasks.filter(t => t.status === status)}
                    onDeleteTask={onDeleteTask}
                    onEditTask={onEditTask}
                    onMoveTask={onMoveTask}
                    onDragStart={onDragStart}
                />
            ))}
        </div>
    );
};

export default Board;
