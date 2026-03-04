#!/bin/bash
# Crear imagen OG final mejorada usando ImageMagick

echo "🎨 Creando imagen Open Graph mejorada..."

WIDTH=1200
HEIGHT=630
OUTPUT="public/og-image.png"
TEMP="scripts/temp-og.png"

# Colores
BLUE_DARK="#1a365d"
BLUE_MEDIUM="#2d3748"
RED_ACCENT="#e53e3e"
WHITE="#ffffff"
GRAY_LIGHT="#f7fafc"
GRAY_MEDIUM="#718096"
GRAY_DARK="#4a5568"

# 1. Crear fondo con gradiente
convert -size ${WIDTH}x${HEIGHT} gradient:${BLUE_DARK}-${BLUE_MEDIUM} ${TEMP}

# 2. Agregar rectángulo blanco central con bordes redondeados
# Crear máscara para bordes redondeados
convert -size ${WIDTH}x${HEIGHT} xc:black -fill white -draw "roundrectangle 40,40,$((WIDTH-40)),$((HEIGHT-40)),30,30" scripts/mask.png

# Crear rectángulo blanco
convert -size ${WIDTH}x${HEIGHT} xc:${WHITE} scripts/white.png

# Aplicar máscara
convert scripts/white.png scripts/mask.png -alpha Off -compose CopyOpacity -composite scripts/rounded-white.png

# Superponer
composite -geometry +0+0 scripts/rounded-white.png ${TEMP} ${TEMP}

# 3. Agregar icono de balance (posición superior izquierda)
convert -size 100x100 xc:none -fill "${BLUE_DARK}" -draw "circle 50,50 50,10" \
  -font "Arial" -pointsize 60 -fill white -gravity center -annotate +0+0 "⚖️" \
  scripts/balance.png
composite -geometry +60+60 scripts/balance.png ${TEMP} ${TEMP}

# 4. Título principal
convert ${TEMP} \
  -font "Arial-Bold" -pointsize 56 -fill "${BLUE_DARK}" -gravity north \
  -annotate +0+100 "LEYES OBSOLETAS ARGENTINA" \
  ${TEMP}

# 5. Subtítulo
convert ${TEMP} \
  -font "Arial" -pointsize 28 -fill "${GRAY_MEDIUM}" -gravity north \
  -annotate +0+170 "Descubre las leyes más absurdas que siguen vigentes" \
  ${TEMP}

# 6. Línea decorativa
convert ${TEMP} \
  -stroke "${RED_ACCENT}" -strokewidth 5 \
  -draw "line 100,230 $((WIDTH-100)),230" \
  ${TEMP}

# 7. Estadísticas (4 cards)
# Card 1: Leyes documentadas
convert ${TEMP} \
  -fill "${GRAY_LIGHT}" -stroke "${GRAY_MEDIUM}" -strokewidth 2 \
  -draw "roundrectangle 100,280,375,430,20,20" \
  ${TEMP}

convert ${TEMP} \
  -font "Arial" -pointsize 48 -fill black -gravity northwest \
  -annotate +140+300 "📚" \
  -font "Arial-Bold" -pointsize 36 -fill "${BLUE_DARK}" -gravity northwest \
  -annotate +140+370 "20+" \
  -font "Arial" -pointsize 20 -fill "${GRAY_MEDIUM}" -gravity northwest \
  -annotate +140+420 "Leyes documentadas" \
  ${TEMP}

# Card 2: Dólar actual
convert ${TEMP} \
  -fill "${GRAY_LIGHT}" -stroke "${GRAY_MEDIUM}" -strokewidth 2 \
  -draw "roundrectangle 425,280,700,430,20,20" \
  ${TEMP}

convert ${TEMP} \
  -font "Arial" -pointsize 48 -fill black -gravity northwest \
  -annotate +465+300 "💰" \
  -font "Arial-Bold" -pointsize 36 -fill "${BLUE_DARK}" -gravity northwest \
  -annotate +465+370 "$1,200" \
  -font "Arial" -pointsize 20 -fill "${GRAY_MEDIUM}" -gravity northwest \
  -annotate +465+420 "Dólar oficial 2026" \
  ${TEMP}

# Card 3: Años obsoletos
convert ${TEMP} \
  -fill "${GRAY_LIGHT}" -stroke "${GRAY_MEDIUM}" -strokewidth 2 \
  -draw "roundrectangle 750,280,1025,430,20,20" \
  ${TEMP}

convert ${TEMP} \
  -font "Arial" -pointsize 48 -fill black -gravity northwest \
  -annotate +790+300 "📅" \
  -font "Arial-Bold" -pointsize 36 -fill "${BLUE_DARK}" -gravity northwest \
  -annotate +790+370 "24 años" \
  -font "Arial" -pointsize 20 -fill "${GRAY_MEDIUM}" -gravity northwest \
  -annotate +790+420 "Promedio obsoleto" \
  ${TEMP}

# Card 4: Cálculos reales
convert ${TEMP} \
  -fill "${GRAY_LIGHT}" -stroke "${GRAY_MEDIUM}" -strokewidth 2 \
  -draw "roundrectangle 1075,280,1350,430,20,20" \
  ${TEMP}

convert ${TEMP} \
  -font "Arial" -pointsize 48 -fill black -gravity northwest \
  -annotate +1115+300 "🎯" \
  -font "Arial-Bold" -pointsize 36 -fill "${BLUE_DARK}" -gravity northwest \
  -annotate +1115+370 "100%" \
  -font "Arial" -pointsize 20 -fill "${GRAY_MEDIUM}" -gravity northwest \
  -annotate +1115+420 "Cálculos reales" \
  ${TEMP}

# 8. Cita destacada
convert ${TEMP} \
  -fill "${BLUE_DARK}" -stroke "${RED_ACCENT}" -strokewidth 8 \
  -draw "roundrectangle 100,470,1100,580,20,20" \
  ${TEMP}

convert ${TEMP} \
  -font "Arial-Italic" -pointsize 24 -fill white -gravity northwest \
  -annotate +130+490 "Un auto popular de \$15,000 paga 'impuesto al lujo'" \
  -annotate +130+525 "por una ley de 1998 que considera lujoso todo auto" \
  -annotate +130+560 "sobre \$29,000... en pesos de 1998." \
  ${TEMP}

convert ${TEMP} \
  -font "Arial" -pointsize 20 -fill "#cbd5e0" -gravity northeast \
  -annotate +130+560 "— Impuesto al Lujo Automotor" \
  ${TEMP}

# 9. Footer
# Línea divisoria
convert ${TEMP} \
  -stroke "${GRAY_MEDIUM}" -strokewidth 3 \
  -draw "line 100,600 $((WIDTH-100)),600" \
  ${TEMP}

# URL
convert ${TEMP} \
  -font "Courier-Bold" -pointsize 24 -fill "${GRAY_DARK}" -gravity southwest \
  -annotate +100+40 "leyesobsoletas.vercel.app" \
  ${TEMP}

# Fecha
convert ${TEMP} \
  -font "Arial" -pointsize 20 -fill "${GRAY_MEDIUM}" -gravity southeast \
  -annotate +100+40 "Actualizado: 4 de Marzo 2026" \
  ${TEMP}

# 10. Badge "ABSURDO PERO REAL"
convert -size 300x60 xc:"${RED_ACCENT}" \
  -font "Arial-Bold" -pointsize 22 -fill white -gravity center \
  -annotate +0+0 "¡ABSURDO PERO REAL!" \
  -bordercolor "${RED_ACCENT}" -border 5x5 \
  scripts/badge.png
composite -geometry +850+540 scripts/badge.png ${TEMP} ${TEMP}

# Mover a ubicación final
mv ${TEMP} ${OUTPUT}

# Limpiar
rm -f scripts/*.png scripts/mask.png

echo "✅ Imagen OG mejorada creada: ${OUTPUT}"
echo "📏 Dimensiones: ${WIDTH}x${HEIGHT}px"
echo ""
echo "🎯 Características:"
echo "  • Diseño profesional con gradientes"
echo "  • 4 cards con estadísticas clave"
echo "  • Cita real de ley absurda"
echo "  • Badge '¡ABSURDO PERO REAL!'"
echo "  • Branding consistente (azules Argentina + rojo acento)"
echo ""
echo "🔗 URL: https://leyesobsoletas.vercel.app/og-image.png"
echo ""
echo "Para testear en redes sociales:"
echo "• Facebook: https://developers.facebook.com/tools/debug/"
echo "• Twitter: https://cards-dev.twitter.com/validator"
echo "• WhatsApp: Compartir link y ver preview"