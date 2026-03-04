#!/bin/bash
# Script para crear una imagen Open Graph simple usando ImageMagick

set -e

echo "🎨 Creando imagen Open Graph simple..."

# Configuración
WIDTH=1200
HEIGHT=630
OUTPUT_FILE="public/og-image.png"
TEMP_FILE="scripts/temp-og.png"

# Colores (formato ImageMagick)
COLOR_PRIMARY="#1a365d"
COLOR_SECONDARY="#2d3748"
COLOR_ACCENT="#e53e3e"
COLOR_WHITE="#ffffff"
COLOR_GRAY="#718096"
COLOR_LIGHT="#f7fafc"

# Crear imagen base con gradiente
convert -size ${WIDTH}x${HEIGHT} gradient:${COLOR_PRIMARY}-${COLOR_SECONDARY} ${TEMP_FILE}

# Agregar rectángulo blanco central (con bordes redondeados)
# Primero crear máscara para bordes redondeados
convert -size ${WIDTH}x${HEIGHT} xc:none -draw "roundrectangle 40,40,$((WIDTH-40)),$((HEIGHT-40)),20,20" scripts/mask.png

# Crear rectángulo blanco
convert -size ${WIDTH}x${HEIGHT} xc:${COLOR_WHITE} scripts/white.png

# Aplicar máscara para bordes redondeados
convert scripts/white.png scripts/mask.png -alpha Off -compose CopyOpacity -composite scripts/rounded.png

# Superponer sobre imagen base
composite -geometry +0+0 scripts/rounded.png ${TEMP_FILE} ${TEMP_FILE}

# Agregar texto principal
convert ${TEMP_FILE} \
  -font Arial -pointsize 48 -fill ${COLOR_PRIMARY} -gravity north \
  -annotate +0+80 "⚖️ LEYES OBSOLETAS ARGENTINA" \
  ${TEMP_FILE}

# Agregar subtítulo
convert ${TEMP_FILE} \
  -font Arial -pointsize 28 -fill ${COLOR_GRAY} -gravity north \
  -annotate +0+140 "Descubre las leyes más ridículas que siguen vigentes" \
  ${TEMP_FILE}

# Agregar línea decorativa
convert ${TEMP_FILE} \
  -stroke ${COLOR_ACCENT} -strokewidth 4 \
  -draw "line 140,200 $((WIDTH-140)),200" \
  ${TEMP_FILE}

# Agregar estadísticas
# Leyes documentadas
convert ${TEMP_FILE} \
  -font Arial -pointsize 48 -fill black -gravity northwest \
  -annotate +150+280 "📚" \
  -font Arial -pointsize 32 -fill ${COLOR_PRIMARY} -gravity northwest \
  -annotate +150+340 "20+" \
  -font Arial -pointsize 20 -fill ${COLOR_GRAY} -gravity northwest \
  -annotate +150+390 "Leyes documentadas" \
  ${TEMP_FILE}

# Dólar actual
convert ${TEMP_FILE} \
  -font Arial -pointsize 48 -fill black -gravity northwest \
  -annotate +300+280 "💰" \
  -font Arial -pointsize 32 -fill ${COLOR_PRIMARY} -gravity northwest \
  -annotate +300+340 "$1,200" \
  -font Arial -pointsize 20 -fill ${COLOR_GRAY} -gravity northwest \
  -annotate +300+390 "Dólar oficial actual" \
  ${TEMP_FILE}

# Actualización diaria
convert ${TEMP_FILE} \
  -font Arial -pointsize 48 -fill black -gravity northwest \
  -annotate +450+280 "📅" \
  -font Arial -pointsize 32 -fill ${COLOR_PRIMARY} -gravity northwest \
  -annotate +450+340 "Diario" \
  -font Arial -pointsize 20 -fill ${COLOR_GRAY} -gravity northwest \
  -annotate +450+390 "Nueva ley cada día" \
  ${TEMP_FILE}

# Cálculos reales
convert ${TEMP_FILE} \
  -font Arial -pointsize 48 -fill black -gravity northwest \
  -annotate +600+280 "🎯" \
  -font Arial -pointsize 32 -fill ${COLOR_PRIMARY} -gravity northwest \
  -annotate +600+340 "100%" \
  -font Arial -pointsize 20 -fill ${COLOR_GRAY} -gravity northwest \
  -annotate +600+390 "Cálculos reales" \
  ${TEMP_FILE}

# Agregar cita
# Fondo de cita
convert ${TEMP_FILE} \
  -fill ${COLOR_LIGHT} -stroke ${COLOR_ACCENT} -strokewidth 8 \
  -draw "rectangle 200,460 1000,560" \
  ${TEMP_FILE}

# Texto de cita
convert ${TEMP_FILE} \
  -font Arial -pointsize 22 -fill ${COLOR_PRIMARY} -style italic -gravity northwest \
  -annotate +220+480 "Una ley de 1973 que usa pesos de entonces" \
  -annotate +220+510 "para calcular impuestos en 2026 es absurdo." \
  ${TEMP_FILE}

# Autor de cita
convert ${TEMP_FILE} \
  -font Arial -pointsize 18 -fill ${COLOR_GRAY} -gravity northeast \
  -annotate +220+530 "— Ley de Ganancias (1973)" \
  ${TEMP_FILE}

# Agregar footer
# URL
convert ${TEMP_FILE} \
  -font "Courier-New" -pointsize 22 -fill ${COLOR_GRAY} -gravity southwest \
  -annotate +60+40 "leyesobsoletas.vercel.app" \
  ${TEMP_FILE}

# Fecha
convert ${TEMP_FILE} \
  -font Arial -pointsize 18 -fill ${COLOR_GRAY} -gravity southeast \
  -annotate +60+40 "Actualizado: 4 de Marzo 2026" \
  ${TEMP_FILE}

# Mover a ubicación final
mv ${TEMP_FILE} ${OUTPUT_FILE}

# Limpiar archivos temporales
rm -f scripts/mask.png scripts/white.png scripts/rounded.png

echo "✅ Imagen generada: ${OUTPUT_FILE}"
echo "📏 Dimensiones: ${WIDTH}x${HEIGHT}px"
echo ""
echo "Para usar la imagen, agregar en index.html:"
echo '<meta property="og:image" content="https://leyesobsoletas.vercel.app/og-image.png">'
echo '<meta property="og:image:width" content="1200">'
echo '<meta property="og:image:height" content="630">'
echo '<meta property="twitter:image" content="https://leyesobsoletas.vercel.app/og-image.png">'