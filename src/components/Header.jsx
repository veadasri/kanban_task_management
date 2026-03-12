import React, { useRef } from 'react';

const Header = ({
    searchQuery,
    setSearchQuery,
    theme,
    toggleTheme,
    onExport,
    onImport,
    onClearAll
}) => {
    const fileInputRef = useRef(null);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            onImport(file);
        }
        // Reset to allow importing same file again if needed
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <header className="header">
            <div className="header-title-container">
                <h1>Kanban Board Pro</h1>
            </div>
            <div className="controls-row">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="action-group">
                    <button className="icon-btn" onClick={onExport} title="Export to JSON">
                        💾
                    </button>

                    <button className="icon-btn" onClick={handleImportClick} title="Import from JSON">
                        📂
                    </button>
                    <input
                        type="file"
                        accept=".json"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />

                    <button className="icon-btn danger-icon" onClick={onClearAll} title="Clear All Tasks">
                        🗑️
                    </button>

                    <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Dark/Light Mode">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
