const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const chefaiService = {
  async recomendar(ingredientes, top_n = 1, filtros = {}) {
    const response = await fetch(`${API_URL}/recomendar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredientes, top_n, filtros })
    });
    if (!response.ok) throw new Error('Error al generar receta');
    return response.json();
  },

  async sugerirComplementos(ingredientes, top_n = 5) {
    const response = await fetch(`${API_URL}/complementos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredientes, top_n })
    });
    if (!response.ok) throw new Error('Error al obtener complementos');
    return response.json();
  },

  async obtenerSustitutos(ingrediente) {
    const response = await fetch(`${API_URL}/sustitutos/${ingrediente}`);
    if (!response.ok) throw new Error('Error al obtener sustitutos');
    return response.json();
  }
};
