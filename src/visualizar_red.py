# src/visualizar_red.py
import matplotlib.pyplot as plt
import networkx as nx
from red_semantica import RedSemanticaIngredientes
from typing import List
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def visualizar_red(red: RedSemanticaIngredientes, 
                   ingredientes_destacados: List[str] = None,
                   max_nodos: int = 30,
                   figsize: tuple = (14, 10)):
    """
    Visualiza la red semántica
    """
    if len(red.grafo.nodes) == 0:
        logger.warning("La red está vacía, no hay nada que visualizar")
        return
    
    # Seleccionar subgrafo
    if ingredientes_destacados:
        nodos_interes = set(ingredientes_destacados)
        
        for ing in ingredientes_destacados:
            if ing in red.grafo:
                nodos_interes.update(red.grafo.neighbors(ing))
        
        nodos_interes = list(nodos_interes)[:max_nodos]
        subgrafo = red.grafo.subgraph(nodos_interes)
    else:
        nodos = list(red.grafo.nodes)[:max_nodos]
        subgrafo = red.grafo.subgraph(nodos)
    
    # Configurar figura
    plt.figure(figsize=figsize)
    
    # Layout
    try:
        pos = nx.spring_layout(subgrafo, k=2, iterations=50)
    except:
        pos = nx.random_layout(subgrafo)
    
    # Colorear nodos
    node_colors = []
    for node in subgrafo.nodes:
        if ingredientes_destacados and node in ingredientes_destacados:
            node_colors.append('red')
        elif red.grafo.nodes[node].get('categoria') == 'categoria':
            node_colors.append('gold')
        else:
            node_colors.append('lightblue')
    
    # Dibujar nodos
    nx.draw_networkx_nodes(subgrafo, pos, node_color=node_colors, 
                           node_size=2000, alpha=0.8)
    
    # Dibujar aristas por tipo
    colores_aristas = {
        'sinonimo': 'green',
        'tipo_de': 'blue',
        'complementa': 'orange',
        'sustituto': 'purple',
        'derivado_de': 'brown'
    }
    
    for tipo, color in colores_aristas.items():
        aristas = [(u, v) for u, v, d in subgrafo.edges(data=True) 
                   if d.get('tipo') == tipo]
        if aristas:
            nx.draw_networkx_edges(subgrafo, pos, edgelist=aristas,
                                   edge_color=color, width=1.5, alpha=0.6)
    
    # Dibujar etiquetas
    labels = {node: node for node in subgrafo.nodes}
    nx.draw_networkx_labels(subgrafo, pos, labels, font_size=8, font_weight='bold')
    
    plt.title("Red Semántica de Ingredientes", fontsize=14, fontweight='bold')
    plt.axis('off')
    plt.tight_layout()
    plt.show()


def exportar_html(red: RedSemanticaIngredientes, ruta: str = 'modelo/red_visual.html'):
    """
    Exporta la red a HTML interactivo
    """
    import json
    
    datos = {
        'nodes': [],
        'links': []
    }
    
    for nodo, attrs in red.grafo.nodes(data=True):
        datos['nodes'].append({
            'id': nodo,
            'categoria': attrs.get('categoria', 'general'),
            'size': 10
        })
    
    for origen, destino, attrs in red.grafo.edges(data=True):
        datos['links'].append({
            'source': origen,
            'target': destino,
            'tipo': attrs.get('tipo', 'desconocido'),
            'value': attrs.get('peso', 0.5)
        })
    
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Red Semántica ChefAI</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"></script>
        <style>
            #network { width: 100%; height: 700px; border: 1px solid lightgray; }
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
        </style>
    </head>
    <body>
        <h1>🍳 Red Semántica de Ingredientes - ChefAI</h1>
        <div id="network"></div>
        <script>
            var nodes = new vis.DataSet(DATA_NODES);
            var edges = new vis.DataSet(DATA_EDGES);
            var container = document.getElementById('network');
            var data = { nodes: nodes, edges: edges };
            var options = {
                nodes: { shape: 'dot', size: 20, font: { size: 12 } },
                edges: { smooth: { type: 'cubicBezier' } },
                physics: { stabilization: true }
            };
            var network = new vis.Network(container, data, options);
        </script>
    </body>
    </html>
    """
    
    html = html_template.replace('DATA_NODES', json.dumps(datos['nodes']))
    html = html.replace('DATA_EDGES', json.dumps(datos['links']))
    
    with open(ruta, 'w', encoding='utf-8') as f:
        f.write(html)
    
    logger.info(f"Red exportada a HTML en {ruta}")


if __name__ == "__main__":
    red = RedSemanticaIngredientes()
    try:
        red.cargar('modelo/red_semantica.pkl')
        visualizar_red(red, ingredientes_destacados=['pollo', 'tomate', 'cebolla'])
        exportar_html(red)
    except FileNotFoundError:
        print("Primero entrena el modelo ejecutando train_completo.py")
