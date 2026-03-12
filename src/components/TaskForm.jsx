import React, { useState } from 'react';

const LABEL_COLORS = {
    blue: '#3b82f6',
    red: '#ef4444',
    green: '#10b981',
    yellow: '#f59e0b',
    purple: '#8b5cf6',
    none: ''
};

const TaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedColor, setSelectedColor] = useState(LABEL_COLORS.none);
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAddTask({
            title: title.trim(),
            description: description.trim(),
            color: selectedColor,
            priority,
            dueDate
        });

        // Reset Form
        setTitle('');
        setDescription('');
        setSelectedColor(LABEL_COLORS.none);
        setPriority('Medium');
        setDueDate('');
    };

    return (
        <form className="task-input-container" onSubmit={handleSubmit}>
            <div className="input-group main-inputs">
                <input
                    type="text"
                    className="task-input flex-2"
                    placeholder="New Task Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="task-input flex-3"
                    placeholder="Description (optional)..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="input-group extras">
                <select
                    className="task-input select-input"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                </select>

                <input
                    type="date"
                    className="task-input date-input"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    title="Due Date"
                />

                <div className="color-picker">
                    {Object.entries(LABEL_COLORS).map(([name, code]) => {
                        if (name === 'none') {
                            return (
                                <div
                                    key={name}
                                    className={`color-btn ${selectedColor === code ? 'selected' : ''}`}
                                    style={{ background: '#e5e7eb', border: '1px dashed #9ca3af' }}
                                    title="No color"
                                    onClick={() => setSelectedColor(code)}
                                />
                            )
                        }
                        return (
                            <div
                                key={name}
                                className={`color-btn ${selectedColor === code ? 'selected' : ''}`}
                                style={{ backgroundColor: code }}
                                title={`Color: ${name}`}
                                onClick={() => setSelectedColor(code)}
                            />
                        )
                    })}
                </div>

                <button type="submit" className="add-btn">Add Task</button>
            </div>
        </form>
    );
};

export default TaskForm;
