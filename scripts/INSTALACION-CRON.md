# Instalación del Cron Job Diario

## 📋 Requisitos Previos

### Verificar que todo funciona:
```bash
# 1. Navegar al proyecto
cd /home/node/.openclaw/workspace/leyesridiculas

# 2. Ejecutar test
./scripts/test-cron.sh

# 3. Verificar salida - debe decir "✅ Sistema listo para cron job diario"
```

### Permisos necesarios:
```bash
# Script principal debe ser ejecutable
chmod +x scripts/agregar-ley-diaria.sh

# Script de test debe ser ejecutable
chmod +x scripts/test-cron.sh

# Verificar permisos
ls -la scripts/*.sh
```

## ⚙️ Configuración del Cron Job

### Opción 1: Crontab del usuario actual
```bash
# 1. Editar crontab
crontab -e

# 2. Agregar esta línea (ajustar ruta si es necesario)
0 8 * * * /home/node/.openclaw/workspace/leyesridiculas/scripts/agregar-ley-diaria.sh

# 3. Guardar y salir (en nano: Ctrl+X, Y, Enter)

# 4. Verificar que se agregó
crontab -l
```

### Opción 2: Crontab del sistema (recomendado para producción)
```bash
# 1. Crear archivo de cron en /etc/cron.d/
sudo nano /etc/cron.d/leyes-obsoletas

# 2. Agregar contenido:
# Ejecutar como usuario 'node' a las 8 AM UTC diariamente
0 8 * * * node /home/node/.openclaw/workspace/leyesridiculas/scripts/agregar-ley-diaria.sh

# 3. Guardar y dar permisos
sudo chmod 644 /etc/cron.d/leyes-obsoletas

# 4. Reiniciar cron (dependiendo del sistema)
sudo systemctl restart cron
# o
sudo service cron restart
```

### Opción 3: Systemd Timer (más robusto)
```bash
# 1. Crear servicio
sudo nano /etc/systemd/system/leyes-diarias.service

# Contenido:
[Unit]
Description=Agregar ley diaria a Leyes Obsoletas
After=network.target

[Service]
Type=oneshot
User=node
WorkingDirectory=/home/node/.openclaw/workspace/leyesridiculas
ExecStart=/home/node/.openclaw/workspace/leyesridiculas/scripts/agregar-ley-diaria.sh
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target

# 2. Crear timer
sudo nano /etc/systemd/system/leyes-diarias.timer

# Contenido:
[Unit]
Description=Ejecutar agregar ley diaria a las 8 AM UTC

[Timer]
OnCalendar=*-*-* 08:00:00
Persistent=true

[Install]
WantedBy=timers.target

# 3. Habilitar y activar
sudo systemctl daemon-reload
sudo systemctl enable leyes-diarias.timer
sudo systemctl start leyes-diarias.timer

# 4. Verificar
sudo systemctl list-timers --all
```

## 🕐 Horarios de Ejecución

### UTC vs Hora Local:
- **8:00 AM UTC** = 
  - **5:00 AM Argentina (ART)** en verano (diciembre-marzo)
  - **4:00 AM Argentina (ART)** en invierno (abril-noviembre)
  - **9:00 AM España (CET)** en invierno
  - **10:00 AM España (CEST)** en verano

### Cambiar horario:
```bash
# Para ejecutar a las 9 AM UTC:
0 9 * * * /ruta/scripts/agregar-ley-diaria.sh

# Para ejecutar a medianoche UTC:
0 0 * * * /ruta/scripts/agregar-ley-diaria.sh

# Para ejecutar cada 6 horas (4 veces al día):
0 */6 * * * /ruta/scripts/agregar-ley-diaria.sh
```

## 🔍 Verificación Post-Instalación

### 1. Verificar que cron job está programado:
```bash
# Ver todos los cron jobs del usuario
crontab -l

# Ver logs del sistema cron
sudo grep CRON /var/log/syslog | tail -20

# Para systemd:
sudo systemctl status leyes-diarias.timer
```

### 2. Ejecutar prueba manual (sin commit):
```bash
# Modificar script temporalmente para prueba
cp scripts/agregar-ley-diaria.sh scripts/agregar-ley-diaria-test.sh
nano scripts/agregar-ley-diaria-test.sh

# Cambiar:
# git commit -> echo "TEST: Se haría commit"
# git push -> echo "TEST: Se haría push"
# O agregar flag --dry-run al inicio del script

# Ejecutar prueba
./scripts/agregar-ley-diaria-test.sh
```

### 3. Verificar que puede hacer git operations:
```bash
cd /home/node/.openclaw/workspace/leyesridiculas

# Verificar credenciales git
git config --list | grep user

# Verificar que puede hacer push
git pull origin main
echo "Test" > test.txt
git add test.txt
git commit -m "Test cron job" test.txt
git push origin main
git rm test.txt
git commit -m "Remove test" test.txt
git push origin main
```

## 📊 Monitoreo

### Logs del script:
```bash
# Ver logs en tiempo real
tail -f /home/node/.openclaw/workspace/leyesridiculas/scripts/cron.log

# Ver últimos 10 ejecuciones
tail -100 /home/node/.openclaw/workspace/leyesridiculas/scripts/cron.log | grep "==="

# Buscar errores
grep -i "error\|failed\|❌" /home/node/.openclaw/workspace/leyesridiculas/scripts/cron.log
```

### Verificar en GitHub:
```bash
# Últimos commits
cd /home/node/.openclaw/workspace/leyesridiculas
git log --oneline -10

# Ver commits del cron job
git log --oneline --grep="feat: Agregar ley diaria"

# Ver en web: https://github.com/dan1d2/leyesridiculas/commits/main
```

### Verificar en Vercel:
```bash
# Verificar que la app carga
curl -s https://leyesobsoletas.vercel.app/ | grep -o "<title>[^<]*</title>"

# Verificar ley más reciente
curl -s -I https://leyesobsoletas.vercel.app/ley/21 | head -3

# Dashboard Vercel: https://vercel.com/dan1d2/leyesridiculas
```

## 🛠️ Troubleshooting

### Problema: Script no se ejecuta
```bash
# 1. Verificar permisos
ls -la scripts/agregar-ley-diaria.sh

# 2. Verificar que existe
which bash
./scripts/agregar-ley-diaria.sh

# 3. Verificar logs del sistema
sudo grep CRON /var/log/syslog | grep -A5 -B5 "agregar-ley"

# 4. Ejecutar manualmente para ver errores
cd /home/node/.openclaw/workspace/leyesridiculas
bash -x scripts/agregar-ley-diaria.sh
```

### Problema: Error git
```bash
# 1. Verificar credenciales
git config --global user.email
git config --global user.name

# 2. Verificar token GitHub
cat ~/.config/gh/hosts.yml

# 3. Probar git operations manualmente
git status
git pull origin main
```

### Problema: Error en inserción de datos
```bash
# 1. Verificar formato de leyes.ts
tail -20 src/data/leyes.ts

# 2. Verificar que termina con ]
grep -n "^];$" src/data/leyes.ts

# 3. Restaurar desde backup
cp src/data/leyes.ts.backup.* src/data/leyes.ts
```

### Problema: Vercel no hace deploy
```bash
# 1. Esperar 5 minutos (Vercel puede tener delay)
# 2. Verificar webhook en GitHub
# 3. Verificar Vercel dashboard: https://vercel.com/dan1d2/leyesridiculas
# 4. Trigger manual en Vercel si es necesario
```

## 🔄 Mantenimiento Regular

### Semanal:
```bash
# 1. Revisar logs
tail -200 scripts/cron.log

# 2. Verificar que hay leyes pendientes
grep "LEY_PENDIENTES" scripts/agregar-ley-diaria.sh

# 3. Agregar nuevas leyes a la lista
# Editar scripts/agregar-ley-diaria.sh
# Agregar al array LEY_PENDIENTES
```

### Mensual:
```bash
# 1. Actualizar datos económicos
# Editar template en scripts/agregar-ley-diaria.sh
# Actualizar: dolarOficialAhora, inflacionAcumulada, etc.

# 2. Rotar logs
mv scripts/cron.log scripts/cron.log.old
echo "=== Log rotado $(date) ===" > scripts/cron.log

# 3. Limpiar backups viejos
find . -name "leyes.ts.backup.*" -mtime +30 -delete
```

### Trimestral:
```bash
# 1. Revisar y mejorar templates
# 2. Agregar nuevas categorías
# 3. Mejorar investigación automática
# 4. Actualizar script con mejores prácticas
```

## 📞 Soporte

### Si algo falla:
1. **Revisar logs:** `tail -f scripts/cron.log`
2. **Ejecutar test:** `./scripts/test-cron.sh`
3. **Verificar manual:** Ejecutar pasos del script manualmente
4. **Restaurar backup:** `cp src/data/leyes.ts.backup.* src/data/leyes.ts`

### Contacto:
- **Repo:** https://github.com/dan1d2/leyesridiculas
- **Issues:** https://github.com/dan1d2/leyesridiculas/issues
- **Deploy:** https://leyesobsoletas.vercel.app

## 🎯 Estado Actual

✅ **Script creado:** `scripts/agregar-ley-diaria.sh`  
✅ **Test funcionando:** `scripts/test-cron.sh`  
✅ **Documentación completa:** `scripts/cron-config.md` y este archivo  
✅ **Próxima ley:** ID 21  
✅ **Total leyes actual:** 20  
✅ **Lista pendientes:** 10 leyes (10 días de contenido)  

**Siguiente paso:** Configurar cron job en el sistema con `crontab -e`