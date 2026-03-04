# Aprendizajes - Deployment Agent

## Problemas encontrados y soluciones

### 1. Dependencias problemáticas con npm
- **Problema**: npm no instala vite correctamente en este entorno
- **Síntoma**: `node_modules/vite` no existe después de `npm install`
- **Causa**: Bug desconocido de npm (posiblemente relacionado con hoisting)
- **Solución temporal**: Usar pnpm para builds locales
- **Lección**: Siempre verificar que las dependencias críticas se instalen

### 2. Iconos incompatibles en @chakra-ui/icons
- **Problema**: `FilterIcon` no existe en @chakra-ui/icons v2.2.4
- **Síntoma**: Error de importación en build
- **Solución**: Reemplazar con `SettingsIcon` (icono similar disponible)
- **Lección**: Verificar iconos disponibles en la versión específica de la librería

### 3. Configuración de Vercel
- **Problema**: Vercel no despliega (DEPLOYMENT_NOT_FOUND)
- **Posibles causas**:
  - Proyecto no conectado al repositorio
  - Build fallando silenciosamente
  - Configuración incorrecta
- **Soluciones intentadas**:
  - build.sh con fallbacks
  - Configuración de pnpm (no funcionó por permisos)
  - legacy-peer-deps para resolver conflictos
- **Lección**: Verificar logs de build en plataforma de hosting

### 4. GitHub Pages
- **Problema**: No configurado
- **Solución**: Base path en vite.config.ts
- **Lección**: Configurar base path antes de deploy en subdirectorio

## Mejores prácticas identificadas

### Para deployments de React + Vite:
1. **Verificar dependencias críticas**: vite, @vitejs/plugin-react
2. **Configurar base path** si se deploya en subdirectorio
3. **Probar build local** antes de push
4. **Usar scripts de build robustos** con fallbacks

### Para problemas de npm:
1. **Limpiar cache**: `npm cache clean --force`
2. **Eliminar lockfiles**: `rm -rf node_modules package-lock.json`
3. **Probar otros package managers**: pnpm, yarn
4. **Usar legacy-peer-deps** para conflictos de dependencias

## Recomendaciones para futuros deployments

### Configuración mínima para Vercel:
```json
{
  "buildCommand": "bash build.sh",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Script de build robusto:
```bash
#!/bin/bash
npm install --legacy-peer-deps
if [ ! -d "node_modules/vite" ]; then
  npm install vite@latest --save-dev --legacy-peer-deps
fi
npx vite build || node node_modules/vite/bin/vite.js build
```

### Verificación de iconos Chakra UI:
- Consultar `node_modules/@chakra-ui/icons/dist/esm/index.mjs`
- Usar iconos disponibles en la versión instalada
- Considerar alternativas cuando un icono no existe