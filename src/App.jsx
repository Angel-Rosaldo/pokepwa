import React, { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const limit = 20;

  useEffect(() => { fetchList(); }, [page]);

  async function fetchList() {
    try {
      const offset = page * limit;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const data = await res.json();
      const mapped = data.results.map(r => {
        const parts = r.url.split('/').filter(Boolean);
        const id = parts[parts.length - 1];
        return {
          name: r.name,
          id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        };
      });
      setPokemons(mapped);
    } catch (err) {
      console.error('Error fetch:', err);
    }
  }

  const filtered = pokemons.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || query === '');

  const askPermission = async () => {
    if (!('Notification' in window)) {
      alert('Este navegador no soporta notificaciones.');
      return;
    }
    const permission = await Notification.requestPermission();
    alert(permission === 'granted' ? 'Notificaciones activadas' : 'Notificaciones bloqueadas');
  };

  return (
    <div className="app">
      <header>
        <h1>PokePWA</h1>
        <p>Tu Pokédex Progresiva — muestra 20 Pokémon por página</p>
        <div className="controls">
          <input placeholder="Buscar por nombre..." value={query} onChange={e => setQuery(e.target.value)} />
          <button onClick={askPermission}>Activar Notificaciones</button>
        </div>
      </header>
      <main>
        <div className="grid">
          {filtered.map(p => <PokemonCard key={p.id} pokemon={p} />)}
        </div>
        <div className="pagination">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>Anterior</button>
          <span>Página {page + 1}</span>
          <button onClick={() => setPage(p => p + 1)}>Siguiente</button>
        </div>
      </main>
    </div>
  );
}
