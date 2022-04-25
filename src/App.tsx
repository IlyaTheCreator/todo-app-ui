import React from 'react';

import Layout from './components/ui/Layout';
import TodosManager from './components/TodosManager';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListManager from './components/ListManager';

/**
 * App's root component 
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<ListManager />} />
          <Route path={'/lists/:id'} element={<TodosManager />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
