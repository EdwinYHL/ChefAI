# visualizar.py
import sys
sys.path.append('src/')

from red_semantica import RedSemanticaIngredientes
from visualizar_red import visualizar_red

# Cargar red
red = RedSemanticaIngredientes()
red.cargar('modelo/red_semantica.pkl')

# Visualizar con ingredientes destacados
visualizar_red(red, ingredientes_destacados=['pollo', 'tomate', 'cebolla'])

print("✅ Visualización completada")
