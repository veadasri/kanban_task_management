import React, { useState } from 'react';

const LABEL_COLORS = {
    blue: '#3b82f6',
    red: '#ef4444',
    green: '#10b981',
    yellow: '#f59e0b',
    purple: '#8b5cf6',
    none: ''
};

const TaskCard = ({ task, onDelete, onEdit, onDragStart, onMoveTask }) => {
    const [isEditing, setIsEditing] = useState(false);

    // Edit State
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDesc, setEditDesc] = useState(task.description || '');
    const [editPriority, setEditPriority] = useState(task.priority || 'Medium');
    const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
    const [editColor, setEditColor] = useState(task.color || '');

    const handleSave = () => {
        if (editTitle.trim()) {
            onEdit(task.id, {
                title: editTitle.trim(),
                description: editDesc.trim(),
                priority: editPriority,
                dueDate: editDueDate,
                color: editColor
            });
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditTitle(task.title);
        setEditDesc(task.description || '');
        setEditPriority(task.priority || 'Medium');
        setEditDueDate(task.dueDate || '');
        setEditColor(task.color || '');
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    // Check Overdue logic
    const isOverdue = () => {
        if (!task.dueDate || task.status === 'Done') return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const splitDate = task.dueDate.split('-'); // YYYY-MM-DD
        const due = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
        return due < today;
    };

    const overdueClass = isOverdue() ? 'overdue' : '';

    if (isEditing) {
        return (
            <div className={`task-card ${overdueClass}`}>
                <div className="edit-controls-row">
                    <select
                        className="edit-input w-auto mb-0"
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <input
                        type="date"
                        className="edit-input w-auto mb-0"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                    />
                </div>

                <input
                    autoFocus
                    className="edit-input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Task title"
                />
                <textarea
                    className="edit-input edit-textarea"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Task description"
                />

                <div className="color-picker" style={{ marginBottom: '10px' }}>
                    {Object.entries(LABEL_COLORS).map(([name, code]) => {
                        if (name === 'none') {
                            return (
                                <div
                                    key={name}
                                    className={`color-btn ${editColor === code ? 'selected' : ''}`}
                                    style={{ background: '#e5e7eb', border: '1px dashed #9ca3af', width: '20px', height: '20px' }}
                                    title="No color"
                                    onClick={() => setEditColor(code)}
                                />
                            )
                        }
                        return (
                            <div
                                key={name}
                                className={`color-btn ${editColor === code ? 'selected' : ''}`}
                                style={{ backgroundColor: code, width: '20px', height: '20px' }}
                                title={`Color: ${name}`}
                                onClick={() => setEditColor(code)}
                            />
                        )
                    })}
                </div>

                <div className="task-actions">
                    <button className="action-btn cancel-btn" onClick={handleCancel}>Cancel</button>
                    <button className="action-btn save-btn" onClick={handleSave}>Save</button>
                </div>
            </div>
        );
    }

    const priorityClass = task.priority ? `priority-${task.priority.toLowerCase()}` : '';

    return (
        <div
            className={`task-card ${overdueClass}`}
            draggable="true"
            onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', task.id);
                if (onDragStart) onDragStart(task);
            }}
        >
            {task.color && <div className="task-label" style={{ backgroundColor: task.color }}></div>}

            <div className="task-meta">
                {task.priority && (
                    <span className={`badge ${priorityClass}`}>{task.priority}</span>
                )}
                {task.dueDate && (
                    <span className={`badge due-date ${overdueClass ? 'overdue-text' : ''}`}>📅 {task.dueDate}</span>
                )}
            </div>

            <div className="task-title">{task.title}</div>
            {task.description && (
                <div className="task-desc">{task.description}</div>
            )}
            <div className="task-actions">
                {task.status !== 'Todo' && (
                    <button
                        className="action-btn move-btn"
                        onClick={() => onMoveTask(task.id, task.status === 'Done' ? 'In Progress' : 'Todo')}
                        title="Move back"
                    >
                        ←
                    </button>
                )}
                <button
                    className="action-btn edit-btn"
                    onClick={() => setIsEditing(true)}
                    title="Edit task"
                >
                    Edit
                </button>
                <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(task.id)}
                    title="Delete task"
                >
                    Delete
                </button>
                {task.status !== 'Done' && (
                    <button
                        className="action-btn move-btn"
                        onClick={() => onMoveTask(task.id, task.status === 'Todo' ? 'In Progress' : 'Done')}
                        title="Move forward"
                    >
                        →
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
