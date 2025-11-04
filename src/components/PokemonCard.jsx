import React, { useState } from 'react';

export default function PokemonCard({ pokemon }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Función general para enviar mensaje al service worker
  const sendNotification = (title, message, image) => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SHOW_NOTIFICATION',
        payload: { name: title, image, body: message }
      });
    } else {
      console.warn('Service worker no disponible para notificación.');
    }
  };

  // Clic en la tarjeta (consultar Pokémon)
  const handleClick = () => {
    sendNotification(
      pokemon.name,
      `Has consultado a ${pokemon.name.toUpperCase()} en tu Pokédex.`,
      pokemon.image
    );
  };

  // Clic en botón de favoritos
  const handleFavorite = (e) => {
    e.stopPropagation(); // evita que dispare también el evento del card
    setIsFavorite(!isFavorite);

    const action = !isFavorite ? 'capturaste' : 'liberaste';
    sendNotification(
      pokemon.name,
      `¡Has ${action} a ${pokemon.name.toUpperCase()}!`,
      pokemon.image
    );
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={pokemon.image} alt={pokemon.name} />
      <div className="card-body">
        <h3>{pokemon.name}</h3>
        <p>ID: {pokemon.id}</p>
        <button
          className={`fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavorite}
        >
          {isFavorite ? '★ Favorito' : '☆ Agregar a favoritos'}
        </button>
      </div>
    </div>
  );
}
