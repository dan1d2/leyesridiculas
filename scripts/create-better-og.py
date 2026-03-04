#!/usr/bin/env python3
"""
Script para crear una imagen Open Graph atractiva usando Pillow
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Configuración
WIDTH = 1200
HEIGHT = 630
OUTPUT_PATH = "public/og-image.png"

# Colores (RGB)
COLORS = {
    "primary": (26, 54, 93),      # #1a365d
    "secondary": (45, 55, 72),    # #2d3748
    "accent": (229, 62, 62),      # #e53e3e
    "white": (255, 255, 255),
    "light": (247, 250, 252),     # #f7fafc
    "gray": (113, 128, 150),      # #718096
    "dark": (45, 55, 72)          # #2d3748
}

def create_gradient(width, height, color1, color2):
    """Crear gradiente lineal"""
    base = Image.new('RGB', (width, height), color1)
    top = Image.new('RGB', (width, height), color2)
    mask = Image.new('L', (width, height))
    mask_data = []
    
    for y in range(height):
        for x in range(width):
            mask_data.append(int(255 * (x / width)))
    
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

def rounded_rectangle(draw, xy, radius, fill):
    """Dibujar rectángulo con bordes redondeados"""
    x1, y1, x2, y2 = xy
    
    # Dibujar rectángulo principal
    draw.rectangle([x1 + radius, y1, x2 - radius, y2], fill=fill)
    draw.rectangle([x1, y1 + radius, x2, y2 - radius], fill=fill)
    
    # Dibujar círculos para las esquinas
    draw.ellipse([x1, y1, x1 + 2*radius, y1 + 2*radius], fill=fill)
    draw.ellipse([x2 - 2*radius, y1, x2, y1 + 2*radius], fill=fill)
    draw.ellipse([x1, y2 - 2*radius, x1 + 2*radius, y2], fill=fill)
    draw.ellipse([x2 - 2*radius, y2 - 2*radius, x2, y2], fill=fill)

def create_og_image():
    print("🎨 Creando imagen Open Graph mejorada...")
    
    # Crear imagen base con gradiente
    image = create_gradient(WIDTH, HEIGHT, COLORS["primary"], COLORS["secondary"])
    draw = ImageDraw.Draw(image)
    
    # Contenedor blanco central
    padding = 40
    container_xy = (padding, padding, WIDTH - padding, HEIGHT - padding)
    rounded_rectangle(draw, container_xy, 20, COLORS["white"])
    
    # Cargar fuentes (usar fuentes por defecto)
    try:
        title_font = ImageFont.truetype("Arial", 48)
        subtitle_font = ImageFont.truetype("Arial", 28)
        stat_font = ImageFont.truetype("Arial", 32)
        label_font = ImageFont.truetype("Arial", 20)
        quote_font = ImageFont.truetype("Arial", 24)
        footer_font = ImageFont.truetype("Arial", 22)
        date_font = ImageFont.truetype("Arial", 18)
    except:
        # Fallback a fuentes por defecto
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        stat_font = ImageFont.load_default()
        label_font = ImageFont.load_default()
        quote_font = ImageFont.load_default()
        footer_font = ImageFont.load_default()
        date_font = ImageFont.load_default()
    
    # Título
    title = "⚖️ LEYES OBSOLETAS ARGENTINA"
    title_width = draw.textlength(title, font=title_font)
    draw.text(((WIDTH - title_width) / 2, 80), title, fill=COLORS["primary"], font=title_font)
    
    # Subtítulo
    subtitle = "Descubre las leyes más ridículas que siguen vigentes"
    subtitle_width = draw.textlength(subtitle, font=subtitle_font)
    draw.text(((WIDTH - subtitle_width) / 2, 140), subtitle, fill=COLORS["gray"], font=subtitle_font)
    
    # Línea decorativa
    draw.line([(140, 200), (WIDTH - 140, 200)], fill=COLORS["accent"], width=4)
    
    # Estadísticas
    stats = [
        {"emoji": "📚", "value": "20+", "label": "Leyes documentadas", "x": 150},
        {"emoji": "💰", "value": "$1,200", "label": "Dólar oficial actual", "x": 400},
        {"emoji": "📅", "value": "Diario", "label": "Nueva ley cada día", "x": 650},
        {"emoji": "🎯", "value": "100%", "label": "Cálculos reales", "x": 900}
    ]
    
    for stat in stats:
        y = 280
        # Emoji (dibujamos texto ya que PIL no soporta emojis bien)
        draw.text((stat["x"], y), stat["emoji"], fill=COLORS["dark"], font=title_font)
        # Valor
        draw.text((stat["x"], y + 60), stat["value"], fill=COLORS["primary"], font=stat_font)
        # Label
        draw.text((stat["x"], y + 100), stat["label"], fill=COLORS["gray"], font=label_font)
    
    # Cita
    quote_box = [200, 420, 1000, 560]
    rounded_rectangle(draw, quote_box, 15, COLORS["light"])
    
    # Borde izquierdo de cita
    draw.rectangle([200, 420, 208, 560], fill=COLORS["accent"])
    
    # Texto de cita
    quote_lines = [
        "Una ley de 1973 que usa pesos de entonces",
        "para calcular impuestos en 2026 es absurdo."
    ]
    
    for i, line in enumerate(quote_lines):
        draw.text((230, 440 + i * 30), line, fill=COLORS["dark"], font=quote_font)
    
    # Autor de cita
    author = "— Ley de Ganancias (1973)"
    author_width = draw.textlength(author, font=date_font)
    draw.text((1000 - author_width, 520), author, fill=COLORS["gray"], font=date_font)
    
    # Footer
    # URL
    draw.text((60, HEIGHT - 60), "leyesobsoletas.vercel.app", fill=COLORS["gray"], font=footer_font)
    
    # Fecha
    date = "Actualizado: 4 de Marzo 2026"
    date_width = draw.textlength(date, font=date_font)
    draw.text((WIDTH - 60 - date_width, HEIGHT - 60), date, fill=COLORS["gray"], font=date_font)
    
    # Guardar imagen
    image.save(OUTPUT_PATH, "PNG")
    
    print(f"✅ Imagen generada: {OUTPUT_PATH}")
    print(f"📏 Dimensiones: {WIDTH}x{HEIGHT}px")
    
    # Mostrar información del archivo
    file_size = os.path.getsize(OUTPUT_PATH)
    print(f"📦 Tamaño: {file_size / 1024:.2f} KB")

if __name__ == "__main__":
    try:
        create_og_image()
        print("🎉 Imagen Open Graph creada exitosamente!")
    except Exception as e:
        print(f"❌ Error creando imagen: {e}")
        exit(1)