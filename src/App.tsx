import React from 'react';

import Layout from './components/ui/Layout';
import TodosManager from './components/TodosManager';

const App: React.FC = () => {
  return (
    <Layout>
      <TodosManager />
    </Layout>
  );
}

export default App;
