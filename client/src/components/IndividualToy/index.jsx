import React from 'react';
import { createRoot } from 'react-dom/client';
import IndividualToy from './IndividualToy.jsx';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<IndividualToy/>);
