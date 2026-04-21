# test_sistema.py
import sys
import os

# Agregar src al path para poder importar
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

from recomendador_semantico import RecomendadorSemantico
import time

def test_recomendaciones():
    """Prueba el sistema de recomendaciones"""
    
    print("🧪 CHEFAI - PRUEBAS DEL SISTEMA")
    print("="*50)
    
    # Verificar que el modelo existe
    modelo_path = 'modelo/chefai_brain.pkl'
    red_path = 'modelo/red_semantica.pkl'
    
    if not os.path.exists(modelo_path):
        print(f"❌ Error: No se encuentra el modelo en {modelo_path}")
        print("Primero ejecuta: python train_completo.py")
        return
    
    if not os.path.exists(red_path):
        print(f"⚠️ Advertencia: No se encuentra la red semántica")
        print("Se usará el recomendador sin red semántica")
    
    try:
        recomendador = RecomendadorSemantico(
            ruta_modelo=modelo_path,
            ruta_red=red_path
        )
        print("✅ Modelo cargado correctamente")
    except Exception as e:
        print(f"❌ Error al cargar modelo: {e}")
        return
    
    # Casos de prueba
    casos_prueba = [
        {
            'nombre': '🥘 Arroz con pollo',
            'ingredientes': ['pollo', 'arroz', 'cebolla', 'zanahoria'],
            'top_n': 3
        },
        {
            'nombre': '🍅 Sinónimo (jitomate = tomate)',
            'ingredientes': ['jitomate', 'cebolla', 'ajo', 'albahaca'],
            'top_n': 3
        },
        {
            'nombre': '🍳 Huevos con papa',
            'ingredientes': ['huevo', 'papa', 'cebolla'],
            'top_n': 3
        },
        {
            'nombre': '🥗 Solo vegetales',
            'ingredientes': ['tomate', 'cebolla', 'lechuga', 'aguacate'],
            'top_n': 3
        },
        {
            'nombre': '🐔 Solo pollo (pocos ingredientes)',
            'ingredientes': ['pollo'],
            'top_n': 3
        }
    ]
    
    for caso in casos_prueba:
        print(f"\n{'='*50}")
        print(f"📝 Caso: {caso['nombre']}")
        print(f"   Ingredientes: {', '.join(caso['ingredientes'])}")
        print('='*50)
        
        start_time = time.time()
        
        try:
            resultados = recomendador.recomendar_con_semantica(
                caso['ingredientes'],
                top_n=caso.get('top_n', 3),
                usar_semantica=True
            )
            
            elapsed = (time.time() - start_time) * 1000
            print(f"⏱️  Tiempo respuesta: {elapsed:.2f} ms")
            
            if not resultados:
                print("   ❌ No se encontraron recomendaciones")
                continue
            
            for i, rec in enumerate(resultados, 1):
                print(f"\n   {i}. {rec['nombre']}")
                print(f"      🎯 Coincidencia: {rec['coincidencia']}")
                print(f"      📝 Ingredientes: {', '.join(rec['ingredientes'][:4])}...")
                if rec['ingredientes_faltantes']:
                    print(f"      ❌ Faltantes: {', '.join(rec['ingredientes_faltantes'][:3])}")
                if 'coherencia_semantica' in rec:
                    print(f"      🔗 Coherencia: {rec['coherencia_semantica']:.2%}")
        
        except Exception as e:
            print(f"   ❌ Error en prueba: {e}")
    
    print("\n" + "="*50)
    print("✅ PRUEBAS COMPLETADAS")


def test_complementos():
    """Prueba sugerencias de complementos"""
    print("\n" + "="*50)
    print("🧪 PRUEBA DE COMPLEMENTOS")
    print("="*50)
    
    modelo_path = 'modelo/chefai_brain.pkl'
    red_path = 'modelo/red_semantica.pkl'
    
    if not os.path.exists(red_path):
        print("⚠️ Red semántica no encontrada, omitiendo prueba de complementos")
        return
    
    try:
        recomendador = RecomendadorSemantico(
            ruta_modelo=modelo_path,
            ruta_red=red_path
        )
    except Exception as e:
        print(f"❌ Error al cargar: {e}")
        return
    
    ingredientes_prueba = [
        ["pollo"],
        ["tomate"],
        ["pasta"],
        ["huevo"]
    ]
    
    for ingredientes in ingredientes_prueba:
        print(f"\n📝 Ingrediente base: {', '.join(ingredientes)}")
        complementos = recomendador.sugerir_complementos(ingredientes, top_n=5)
        
        if complementos:
            print(f"   💡 Complementos sugeridos:")
            for comp in complementos:
                print(f"      → {comp['ingrediente']} (peso: {comp['peso']:.2f})")
        else:
            print("   ⚠️ No se encontraron complementos")


def test_filtros():
    """Prueba filtros de recomendación"""
    print("\n" + "="*50)
    print("🧪 PRUEBA DE FILTROS")
    print("="*50)
    
    modelo_path = 'modelo/chefai_brain.pkl'
    
    if not os.path.exists(modelo_path):
        print("❌ Modelo no encontrado")
        return
    
    try:
        from recomendador import ChefAI_Recomendador
        recomendador = ChefAI_Recomendador(ruta_modelo=modelo_path)
    except Exception as e:
        print(f"❌ Error al cargar: {e}")
        return
    
    ingredientes = ["tomate", "cebolla"]
    
    print(f"📝 Ingredientes: {ingredientes}")
    
    # Sin filtros
    print("\n   📌 Sin filtros:")
    resultados = recomendador.recomendar(ingredientes, top_n=3)
    for rec in resultados:
        print(f"      → {rec['nombre']} ({rec['coincidencia']})")
    
    # Con filtro vegetariano
    print("\n   📌 Con filtro 'vegetariano':")
    resultados = recomendador.recomendar(ingredientes, top_n=3, filtros={'tags': ['vegetariano']})
    for rec in resultados:
        vegetariano = "✓" if 'vegetariano' in rec.get('tags', []) else "✗"
        print(f"      → {rec['nombre']} ({rec['coincidencia']}) [vegetariano: {vegetariano}]")


def test_explicacion():
    """Prueba explicación de recomendaciones"""
    print("\n" + "="*50)
    print("🧪 PRUEBA DE EXPLICACIÓN")
    print("="*50)
    
    modelo_path = 'modelo/chefai_brain.pkl'
    red_path = 'modelo/red_semantica.pkl'
    
    if not os.path.exists(red_path):
        print("⚠️ Red semántica no encontrada")
        return
    
    try:
        recomendador = RecomendadorSemantico(
            ruta_modelo=modelo_path,
            ruta_red=red_path
        )
    except Exception as e:
        print(f"❌ Error al cargar: {e}")
        return
    
    ingredientes = ["pollo", "limón"]
    print(f"📝 Ingredientes: {ingredientes}")
    
    resultados = recomendador.recomendar_con_semantica(ingredientes, top_n=1)
    
    if resultados:
        receta = resultados[0]
        print(f"\n   🍳 Receta recomendada: {receta['nombre']}")
        
        explicacion = recomendador.explicar_recomendacion(receta, ingredientes)
        
        print(f"\n   📖 Explicación:")
        if explicacion['coincidencia_directa']:
            print(f"      ✓ Coincidencia directa: {', '.join(explicacion['coincidencia_directa'])}")
        if explicacion['coincidencia_semantica']:
            print(f"      🔗 Coincidencia semántica:")
            for cs in explicacion['coincidencia_semantica'][:3]:
                print(f"         - '{cs['usuario_tiene']}' ≈ '{cs['receta_necesita']}' (sim: {cs['similitud']:.0%})")
        if explicacion['sustitutos_usados']:
            print(f"      🔄 Sustitutos sugeridos:")
            for sus in explicacion['sustitutos_usados'][:3]:
                print(f"         - '{sus['receta_pide']}' → '{sus['puede_usar']}'")


if __name__ == "__main__":
    print("🍳 CHEFAI - SISTEMA DE PRUEBAS")
    print("Ejecutando pruebas...\n")
    
    # Ejecutar todas las pruebas
    test_recomendaciones()
    test_complementos()
    test_filtros()
    test_explicacion()
    
    print("\n" + "="*50)
    print("🎉 FIN DE LAS PRUEBAS")
