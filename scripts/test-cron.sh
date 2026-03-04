#!/bin/bash
# Script de prueba para el cron job diario
# No hace commit real, solo simula el proceso

set -e

echo "🧪 TEST: Simulación de cron job diario"
echo "========================================"

PROJECT_DIR="/home/node/.openclaw/workspace/leyesridiculas"
DATA_FILE="$PROJECT_DIR/src/data/leyes.ts"
TEST_FILE="$PROJECT_DIR/scripts/test-output.ts"

# 1. Verificar que el archivo de datos existe
if [ ! -f "$DATA_FILE" ]; then
  echo "❌ ERROR: No se encuentra $DATA_FILE"
  exit 1
fi
echo "✅ Archivo de datos encontrado"

# 2. Obtener último ID
LAST_ID=$(grep -o "id: '[0-9]*'" "$DATA_FILE" | tail -1 | sed "s/id: '//" | sed "s/'//")
NEXT_ID=$((LAST_ID + 1))
echo "📊 Último ID: $LAST_ID"
echo "📊 Próximo ID: $NEXT_ID"
echo "📊 Total leyes actuales: $LAST_ID"

# 3. Verificar formato del archivo
INSERT_POINT=$(grep -n "^];$" "$DATA_FILE" | tail -1 | cut -d: -f1)
if [ -z "$INSERT_POINT" ]; then
  echo "❌ ERROR: No se encuentra el cierre del array (])"
  exit 1
fi
echo "✅ Formato del archivo válido"
echo "✅ Punto de inserción: línea $INSERT_POINT"

# 4. Generar contenido de prueba
cat > "$TEST_FILE" << EOF
  {
    id: '$NEXT_ID',
    numero: 'Ley TEST.001',
    nombre: 'Ley de Prueba Cron Job',
    descripcion: 'Esta es una ley de prueba generada por el script de cron job',
    año: 2026,
    categoria: 'Prueba',
    estado: 'Test',
    motivoObsoleto: 'Ley de prueba para verificar funcionamiento del cron job diario',
    contextoHistorico: 'Generada automáticamente el $(date)',
    impactoActual: 'Impacto de prueba para validar sistema automatizado',
    datosEconomicos: {
      dolarOficialEntonces: 1,
      dolarBlueEntonces: 1,
      dolarOficialAhora: 1200,
      dolarBlueAhora: 1350,
      inflacionAcumulada: 120000,
      ejemploConcreto: 'Ejemplo de prueba: $NEXT_ID'
    },
    tags: ['test', 'cron', 'automatizacion'],
    fuente: 'Sistema Automatizado Leyes Obsoletas',
    enlace: 'https://leyesobsoletas.vercel.app'
  }
EOF

echo "✅ Contenido de prueba generado en $TEST_FILE"

# 5. Simular inserción (sin modificar archivo real)
echo ""
echo "📝 SIMULACIÓN DE INSERCIÓN:"
echo "----------------------------"
echo "Se insertaría ANTES de la línea $INSERT_POINT (])"
echo ""
echo "Contenido a insertar:"
cat "$TEST_FILE"
echo ""

# 6. Verificar que se podría hacer commit
cd "$PROJECT_DIR"
if git status --porcelain | grep -q "$DATA_FILE"; then
  echo "⚠️  ADVERTENCIA: Hay cambios pendientes en $DATA_FILE"
else
  echo "✅ Archivo de datos sin cambios pendientes"
fi

# 7. Verificar conexión git
if git remote -v | grep -q "origin"; then
  echo "✅ Repositorio git configurado"
else
  echo "⚠️  ADVERTENCIA: No hay remote 'origin' configurado"
fi

# 8. Verificar que script principal es ejecutable
MAIN_SCRIPT="$PROJECT_DIR/scripts/agregar-ley-diaria.sh"
if [ -x "$MAIN_SCRIPT" ]; then
  echo "✅ Script principal es ejecutable"
else
  echo "❌ ERROR: Script principal no es ejecutable"
  echo "  Ejecutar: chmod +x $MAIN_SCRIPT"
fi

# 9. Limpiar
rm -f "$TEST_FILE"

echo ""
echo "========================================"
echo "🧪 RESULTADO DEL TEST:"
echo ""
echo "✅ Sistema listo para cron job diario"
echo "📅 Próxima ley: ID $NEXT_ID"
echo "📁 Logs: $PROJECT_DIR/scripts/cron.log"
echo "🔗 Deploy: https://leyesobsoletas.vercel.app/ley/$NEXT_ID"
echo ""
echo "Para configurar cron job real:"
echo "1. crontab -e"
echo "2. Agregar: 0 8 * * * $MAIN_SCRIPT"
echo "3. Guardar y salir"
echo ""
echo "Para prueba real (sin commit):"
echo "  $MAIN_SCRIPT --dry-run"
echo ""
echo "Test completado exitosamente! 🎉"