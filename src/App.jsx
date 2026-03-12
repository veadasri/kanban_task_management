import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import Board from './components/Board';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban-tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('kanban-theme') || 'light';
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('kanban-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAddTask = (newTaskData) => {
    const newTask = {
      id: Date.now().toString(),
      status: 'Todo',
      ...newTaskData
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleEditTask = (taskId, updatedData) => {
    setTasks(prev => prev.map(t =>
      t.id === taskId ? { ...t, ...updatedData } : t
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleDropTask = (taskId, newStatus) => {
    setTasks(prev => prev.map(t =>
      t.id === taskId ? { ...t, status: newStatus } : t
    ));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
      setTasks([]);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kanban-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target.result);
        if (Array.isArray(importedTasks)) {
          if (window.confirm(`Found ${importedTasks.length} tasks. Do you want to replace your current board?`)) {
            setTasks(importedTasks);
          }
        } else {
          alert('Invalid JSON file format. Expected an array of tasks.');
        }
      } catch (err) {
        alert('Error reading the file. Ensure it is a valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  // Filter tasks based on searchQuery
  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="app-container">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        theme={theme}
        toggleTheme={toggleTheme}
        onExport={handleExport}
        onImport={handleImport}
        onClearAll={handleClearAll}
      />

      <TaskForm onAddTask={handleAddTask} />

      <Board
        tasks={filteredTasks}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
        onMoveTask={handleDropTask}
      />
    </div>
  );
}

export default App;
