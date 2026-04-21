# app.py
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

from flask import Flask, request, jsonify
from flask_cors import CORS
from recomendador_semantico import RecomendadorSemantico

app = Flask(__name__)
CORS(app)

print("🔄 Cargando modelo ChefAI...")
recomendador = RecomendadorSemantico(
    ruta_modelo='modelo/chefai_brain.pkl',
    ruta_red='modelo/red_semantica.pkl'
)
print("✅ Modelo cargado")

@app.route('/')
def home():
    return jsonify({
        'nombre': 'ChefAI API',
        'version': '1.0',
        'endpoints': ['POST /recomendar', 'POST /complementos']
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
        
        resultados = recomendador.recomendar_con_semantica(ingredientes, top_n, filtros)
        
        return jsonify({
            'status': 'success',
            'ingredientes': ingredientes,
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
            'sugerencias': sugerencias
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
