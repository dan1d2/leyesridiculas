# Configuración del Cron Job Diario

## 📅 Frecuencia
- **Ejecución:** Diaria a las 8:00 AM UTC
- **Equivalente:** 5:00 AM Argentina (ART) en verano, 4:00 AM en invierno

## 🚀 Script Principal
`/home/node/.openclaw/workspace/leyesridiculas/scripts/agregar-ley-diaria.sh`

## 📋 Proceso Automatizado

### 1. Selección de Ley
- Lista predefinida de 10 leyes pendientes
- Categorías: Educación, Salud, Ambiental, Tecnología
- Selección secuencial (no aleatoria para consistencia)

### 2. Investigación Básica
- Extrae nombre, número, año de la ley
- Asigna categoría automáticamente
- **NOTA:** En producción real, aquí iría investigación profunda

### 3. Generación de Contenido
- Template con datos económicos actualizados (2026)
- Contexto histórico relevante
- Impacto cuantificado en USD
- Fuentes oficiales (links a InfoLeg, ministerios)

### 4. Inserción en Datos
- ID incremental automático
- Inserta en posición correcta del array
- Backup automático del archivo original

### 5. Commit y Deploy
- Commit con mensaje estructurado
- Push a `main` branch
- **Vercel deploy automático** (2-3 minutos después)

### 6. Logging
- Log detallado en `scripts/cron.log`
- Timestamp de cada ejecución
- Estado de éxito/error

## 📊 Leyes Pendientes para Cron Job

### Educación (3):
1. **Ley 26.206** de Educación Nacional (2006) - financiamiento no actualizado
2. **Ley 25.924** de Creación del Programa Nacional de Educación Sexual Integral (2003)
3. **Ley 26.075** de Financiamiento Educativo (2005) - montos en pesos

### Salud (2):
4. **Ley 26.529** de Derechos del Paciente (2009) - valores indemnizatorios en pesos
5. **Ley 26.682** de Regulación de la Publicidad de Productos Médicos (2011)

### Ambiental (3):
6. **Ley 25.675** General del Ambiente (2002) - multas no actualizadas
7. **Ley 26.331** de Presupuestos Mínimos de Protección Ambiental de los Bosques Nativos (2007)
8. **Ley 26.093** de Régimen de Regulación y Promoción para la Producción y Uso Sustentables de Biocombustibles (2006)

### Tecnología (2):
9. **Ley 25.506** de Firma Digital (2001) - regulación pre-cloud
10. **Ley 26.522** de Servicios de Comunicación Audiovisual (2009) - regulación TV por cable

## ⚙️ Configuración del Cron

### Para configurar manualmente:
```bash
# 1. Editar crontab
crontab -e

# 2. Agregar línea (ajustar ruta)
0 8 * * * /home/node/.openclaw/workspace/leyesridiculas/scripts/agregar-ley-diaria.sh

# 3. Verificar configuración
crontab -l
```

### Para sistema con systemd (recomendado):
```bash
# Crear servicio systemd
sudo nano /etc/systemd/system/leyes-diarias.service

# Crear timer
sudo nano /etc/systemd/system/leyes-diarias.timer
```

## 🔍 Monitoreo

### Logs:
```bash
# Ver últimos logs
tail -f /home/node/.openclaw/workspace/leyesridiculas/scripts/cron.log

# Ver historial completo
cat /home/node/.openclaw/workspace/leyesridiculas/scripts/cron.log
```

### Verificación de ejecución:
```bash
# Último commit
cd /home/node/.openclaw/workspace/leyesridiculas && git log --oneline -1

# Estado Vercel
curl -s https://leyesobsoletas.vercel.app/ | grep -o "<title>[^<]*</title>"

# Ley más reciente
curl -s -I https://leyesobsoletas.vercel.app/ley/21 | head -3
```

## 🛠️ Mantenimiento

### Agregar nuevas leyes a la lista:
1. Editar array `LEY_PENDIENTES` en el script
2. Mantener formato: "Ley X.XXX de [Nombre] (Año) - descripción breve"
3. Categorizar correctamente

### Actualizar datos económicos:
1. Editar valores en template (línea 70-80 del script)
2. Actualizar: `dolarOficialAhora`, `dolarBlueAhora`, `inflacionAcumulada`
3. Recalcular `ejemploConcreto` con nuevos valores

### Troubleshooting:
- **Error git:** Verificar credenciales y permisos
- **Error inserción:** Verificar formato de `leyes.ts`
- **Error deploy:** Esperar 5 minutos, verificar Vercel dashboard
- **Cache issues:** Los usuarios pueden ver cache viejo por ~15 minutos

## 🎯 Métricas Esperadas

### Por ejecución:
- 1 ley nueva agregada
- 1 commit a GitHub
- 1 deploy automático Vercel
- ~30 segundos de ejecución

### Acumulado mensual:
- 30 leyes nuevas (con ejecución diaria)
- 30 commits
- 30 deploys automáticos
- ~15 minutos total de ejecución

### Crecimiento proyectado:
- **1 mes:** 50 leyes total (20 + 30 nuevas)
- **3 meses:** 110 leyes total
- **6 meses:** 200 leyes total
- **1 año:** 380 leyes total

## 📝 Notas Importantes

### Calidad vs Automatización:
- **Script actual:** Genera contenido básico (template)
- **Mejora futura:** Integrar con AI/API para investigación real
- **Verificación manual:** Revisar 1 de cada 10 leyes generadas

### Backup y Recovery:
- Backup automático: `leyes.ts.backup.YYYYMMDD`
- Recovery: Restaurar desde backup si hay error
- Git history: Siempre disponible para rollback

### Escalabilidad:
- Lista actual: 10 leyes (10 días de contenido)
- Expansión: Agregar 10 leyes cada mes a la lista
- Investigación: Mejorar templates con más categorías

## 🔗 Enlaces

- **Repo:** https://github.com/dan1d2/leyesridiculas
- **Deploy:** https://leyesobsoletas.vercel.app
- **Logs:** `scripts/cron.log`
- **Backups:** `leyes.ts.backup.*`