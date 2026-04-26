# backend/app.py
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from src.recomendador_semantico import RecomendadorSemantico

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])  # Permitir frontend

# Cargar modelo al inicio
print("🔄 Cargando modelo ChefAI...")
recomendador = RecomendadorSemantico(
    ruta_modelo='modelo/chefai_brain.pkl',
    ruta_red='modelo/red_semantica.pkl'
)
print("✅ Modelo listo")

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'nombre': 'ChefAI API',
        'version': '2.0',
        'status': 'online',
        'endpoints': [
            'POST /recomendar',
            'POST /complementos',
            'GET /sustitutos/<ingrediente>'
        ]
    })

@app.route('/recomendar', methods=['POST'])
def recomendar():
    try:
        data = request.get_json()
        ingredientes = data.get('ingredientes', [])
        top_n = data.get('top_n', 5)
        filtros = data.get('filtros', None)
        
        if not ingredientes:
            return jsonify({'error': 'No se proporcionaron ingredientes'}), 400
        
        # Usar recomendador semántico
        resultados = recomendador.recomendar_con_semantica(
            ingredientes, 
            top_n=top_n, 
            filtros=filtros,
            usar_semantica=True
        )
        
        # Formatear para frontend
        return jsonify({
            'status': 'success',
            'ingredientes': ingredientes,
            'filtros': filtros,
            'recomendaciones': resultados
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/complementos', methods=['POST'])
def complementos():
    try:
        data = request.get_json()
        ingredientes = data.get('ingredientes', [])
        top_n = data.get('top_n', 5)
        
        sugerencias = recomendador.sugerir_complementos(ingredientes, top_n)
        
        return jsonify({
            'status': 'success',
            'ingredientes': ingredientes,
            'sugerencias': sugerencias
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/sustitutos/<ingrediente>', methods=['GET'])
def sustitutos(ingrediente):
    try:
        sustitutos = recomendador.red_semantica.sugerir_sustitutos(ingrediente)
        return jsonify({
            'status': 'success',
            'ingrediente': ingrediente,
            'sustitutos': sustitutos
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('API_PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
