# test_sistema.py
import sys
import os

# Agregar la carpeta src al path para poder importar los módulos
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from recomendador_semantico import RecomendadorSemantico
import time

def test_recomendaciones():
    """Prueba el sistema de recomendaciones"""
    print("🧪 CHEFAI - PRUEBAS DEL SISTEMA")
    print("="*50)
    
    modelo_path = 'modelo/chefai_brain.pkl'
    red_path = 'modelo/red_semantica.pkl'
    
    if not os.path.exists(modelo_path):
        print(f"❌ Error: No se encuentra el modelo en {modelo_path}")
        print("Primero ejecuta: python train_completo.py")
        return
    
    try:
        recomendador = RecomendadorSemantico(
            ruta_modelo=modelo_path,
            ruta_red=red_path
        )
        print("✅ Modelo cargado correctamente")
    except Exception as e:
        print(f"❌ Error al cargar modelo: {e}")
        return
    
    casos_prueba = [
        {'nombre': '🥘 Arroz con pollo', 'ingredientes': ['pollo', 'arroz', 'cebolla'], 'top_n': 3},
        {'nombre': '🍅 Sinónimo', 'ingredientes': ['jitomate', 'cebolla'], 'top_n': 3},
        {'nombre': '🍳 Huevos con papa', 'ingredientes': ['huevo', 'papa'], 'top_n': 3},
    ]
    
    for caso in casos_prueba:
        print(f"\n{'='*50}")
        print(f"📝 Caso: {caso['nombre']}")
        print(f"   Ingredientes: {', '.join(caso['ingredientes'])}")
        print('='*50)
        
        start_time = time.time()
        try:
            resultados = recomendador.recomendar_con_semantica(
                caso['ingredientes'], top_n=caso.get('top_n', 3), usar_semantica=True
            )
            elapsed = (time.time() - start_time) * 1000
            print(f"⏱️ Tiempo respuesta: {elapsed:.2f} ms")
            if not resultados:
                print("   ❌ No se encontraron recomendaciones")
                continue
            for i, rec in enumerate(resultados, 1):
                print(f"\n   {i}. {rec['nombre']}")
                print(f"      Coincidencia: {rec['coincidencia']}")
                print(f"      Faltantes: {', '.join(rec['ingredientes_faltantes'][:3])}")
        except Exception as e:
            print(f"   ❌ Error: {e}")
    
    print("\n" + "="*50)
    print("✅ PRUEBAS COMPLETADAS")

if __name__ == "__main__":
    test_recomendaciones()
