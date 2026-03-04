#!/usr/bin/env node

/**
 * Script para generar imagen Open Graph (1200x630px)
 * Para compartir en redes sociales
 */

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Configuración
const WIDTH = 1200;
const HEIGHT = 630;
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'og-image.png');

// Colores
const COLORS = {
  primary: '#1a365d',
  secondary: '#2d3748',
  accent: '#e53e3e',
  light: '#f7fafc',
  dark: '#2d3748',
  gray: '#718096',
  white: '#ffffff'
};

// Datos dinámicos (podrían venir de API en el futuro)
const DATA = {
  totalLeyes: 20,
  dolarActual: 1200,
  fechaActual: '4 de Marzo 2026',
  url: 'leyesobsoletas.vercel.app'
};

function createOGImage() {
  console.log('🎨 Generando imagen Open Graph...');
  
  // Crear canvas
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');
  
  // Fondo
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, COLORS.primary);
  gradient.addColorStop(1, COLORS.secondary);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  
  // Contenedor blanco
  const containerPadding = 40;
  const containerWidth = WIDTH - (containerPadding * 2);
  const containerHeight = HEIGHT - (containerPadding * 2);
  
  ctx.fillStyle = COLORS.white;
  ctx.roundRect(containerPadding, containerPadding, containerWidth, containerHeight, 20);
  ctx.fill();
  
  // Logo y título
  ctx.fillStyle = COLORS.primary;
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('⚖️ LEYES OBSOLETAS ARGENTINA', WIDTH / 2, 120);
  
  ctx.fillStyle = COLORS.gray;
  ctx.font = '28px Arial';
  ctx.fillText('Descubre las leyes más ridículas que siguen vigentes', WIDTH / 2, 170);
  
  // Línea decorativa
  ctx.strokeStyle = COLORS.accent;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(containerPadding + 100, 200);
  ctx.lineTo(WIDTH - containerPadding - 100, 200);
  ctx.stroke();
  
  // Estadísticas
  const statsY = 280;
  const statSpacing = 150;
  
  // Leyes documentadas
  drawStat(ctx, '📚', `${DATA.totalLeyes}+`, 'Leyes documentadas', containerPadding + 150, statsY);
  
  // Dólar actual
  drawStat(ctx, '💰', `$${DATA.dolarActual.toLocaleString()}`, 'Dólar oficial actual', containerPadding + 150 + statSpacing, statsY);
  
  // Actualización
  drawStat(ctx, '📅', 'Diario', 'Nueva ley cada día', containerPadding + 150 + (statSpacing * 2), statsY);
  
  // Cálculos
  drawStat(ctx, '🎯', '100%', 'Cálculos reales', containerPadding + 150 + (statSpacing * 3), statsY);
  
  // Cita destacada
  const quoteY = 420;
  const quoteWidth = 800;
  const quoteX = (WIDTH - quoteWidth) / 2;
  
  ctx.fillStyle = COLORS.light;
  ctx.roundRect(quoteX, quoteY, quoteWidth, 120, 15);
  ctx.fill();
  
  // Borde izquierdo de la cita
  ctx.fillStyle = COLORS.accent;
  ctx.fillRect(quoteX, quoteY, 8, 120);
  
  // Texto de la cita
  ctx.fillStyle = COLORS.dark;
  ctx.font = 'italic 22px Arial';
  ctx.textAlign = 'left';
  
  const quoteText = '"Una ley de 1973 que usa pesos de entonces para calcular impuestos en 2026 es como medir distancias con una regla de goma."';
  wrapText(ctx, quoteText, quoteX + 30, quoteY + 40, quoteWidth - 60, 28);
  
  // Autor de la cita
  ctx.fillStyle = COLORS.gray;
  ctx.font = '18px Arial';
  ctx.textAlign = 'right';
  ctx.fillText('— Ley de Ganancias (1973)', quoteX + quoteWidth - 30, quoteY + 100);
  
  // Footer
  const footerY = HEIGHT - 60;
  
  // URL
  ctx.fillStyle = COLORS.gray;
  ctx.font = '22px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.fillText(DATA.url, containerPadding + 20, footerY);
  
  // Fecha
  ctx.fillStyle = COLORS.gray;
  ctx.font = '18px Arial';
  ctx.textAlign = 'right';
  ctx.fillText(`Actualizado: ${DATA.fechaActual}`, WIDTH - containerPadding - 20, footerY);
  
  // Guardar imagen
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(OUTPUT_PATH, buffer);
  
  console.log(`✅ Imagen generada: ${OUTPUT_PATH}`);
  console.log(`📏 Dimensiones: ${WIDTH}x${HEIGHT}px`);
  console.log(`📦 Tamaño: ${(buffer.length / 1024).toFixed(2)} KB`);
}

function drawStat(ctx, emoji, value, label, x, y) {
  // Emoji
  ctx.font = '48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(emoji, x, y);
  
  // Valor
  ctx.fillStyle = COLORS.primary;
  ctx.font = 'bold 32px Arial';
  ctx.fillText(value, x, y + 60);
  
  // Label
  ctx.fillStyle = COLORS.gray;
  ctx.font = '20px Arial';
  ctx.fillText(label, x, y + 90);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let testLine = '';
  let lineCount = 0;
  
  for (let n = 0; n < words.length; n++) {
    testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y + (lineCount * lineHeight));
      line = words[n] + ' ';
      lineCount++;
    } else {
      line = testLine;
    }
  }
  
  ctx.fillText(line, x, y + (lineCount * lineHeight));
}

// Polyfill para roundRect si no existe
if (CanvasRenderingContext2D.prototype.roundRect === undefined) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    
    this.beginPath();
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    this.closePath();
    
    return this;
  };
}

// Ejecutar
try {
  createOGImage();
  console.log('🎉 Imagen Open Graph generada exitosamente!');
} catch (error) {
  console.error('❌ Error generando imagen:', error.message);
  process.exit(1);
}