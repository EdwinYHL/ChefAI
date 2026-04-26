# app.py
import sys
import os

# Agregar el directorio src al path para que las importaciones funcionen
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from recomendador_semantico import RecomendadorSemantico

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])

print("🔄 Cargando modelo ChefAI...")
try:
    recomendador = RecomendadorSemantico(
        ruta_modelo='modelo/chefai_brain.pkl',
        ruta_red='modelo/red_semantica.pkl'
    )
    print("✅ Modelo cargado correctamente")
except Exception as e:
    print(f"⚠️ Error al cargar modelo: {e}")
    print("El modelo se cargará cuando se haga la primera petición (si existe).")
    recomendador = None

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
    global recomendador
    if recomendador is None:
        try:
            recomendador = RecomendadorSemantico(
                ruta_modelo='modelo/chefai_brain.pkl',
                ruta_red='modelo/red_semantica.pkl'
            )
        except Exception as e:
            return jsonify({'error': f'Modelo no disponible: {str(e)}'}), 500

    try:
        data = request.get_json()
        ingredientes = data.get('ingredientes', [])
        top_n = data.get('top_n', 5)
        filtros = data.get('filtros', None)
        
        if not ingredientes:
            return jsonify({'error': 'No se proporcionaron ingredientes'}), 400
        
        resultados = recomendador.recomendar_con_semantica(
            ingredientes, top_n=top_n, filtros=filtros, usar_semantica=True
        )
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
    global recomendador
    if recomendador is None:
        return jsonify({'error': 'Modelo no disponible'}), 500
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
    global recomendador
    if recomendador is None:
        return jsonify({'error': 'Modelo no disponible'}), 500
    try:
        sustitutos = recomendador.red_semantica.sugerir_sustitutos(ingrediente) if recomendador.red_semantica else []
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
