import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

const App = () => {
    return <h1> Dashboard Here </h1>;
};

const rootElement = document.getElementById('app-dashboard');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}