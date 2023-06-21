import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<IndividualToy/>); //Fix me before pull request ----------------

import IndividualToy from './components/IndividualToy/index.jsx';
