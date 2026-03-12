import React, { useState } from 'react';
import TaskCard from './TaskCard';

const Column = ({ title, tasks, onDeleteTask, onEditTask, onMoveTask, onDragStart }) => {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const draggedTaskId = e.dataTransfer.getData('text/plain');
        if (draggedTaskId) {
            onMoveTask(draggedTaskId, title);
        }
    };

    return (
        <div
            className={`column ${isDragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="column-header">
                <h2>{title}</h2>
                <span className="task-count">{tasks.length}</span>
            </div>
            <div className="column-tasks">
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onDelete={onDeleteTask}
                        onEdit={onEditTask}
                        onMoveTask={onMoveTask}
                        onDragStart={onDragStart}
                    />
                ))}
            </div>
        </div>
    );
};

export default Column;
