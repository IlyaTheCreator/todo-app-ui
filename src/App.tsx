import React from 'react';

import Layout from './components/ui/Layout';
import TodosManager from './components/TodosManager';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/**
 * App's root component 
 */
const App: React.FC = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path={'/lists/:id'} element={<TodosManager />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
