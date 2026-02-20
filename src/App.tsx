import { useEffect } from 'react';
import './styles/global.css';
import useSetList from './hooks/useSetList';

const App = () => {
  const { sets, isLoading, error } = useSetList();

  useEffect(() => {
    if (!isLoading && !error) {
      console.log('[App] Réponse API — nombre de sets :', sets.length);
      console.log('[App] Premier set :', sets[0]);
      console.log('[App] Données complètes :', sets);
    }
  }, [sets, isLoading, error]);

  return (
    <main>
        Wilkomen
    </main>
  );
};

export default App;
