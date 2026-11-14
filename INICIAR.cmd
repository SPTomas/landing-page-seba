@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Necesitas Node.js 22.12 o superior para iniciar la pagina.
  echo Para ver las imagenes sin instalar nada, abri VER-PROPUESTAS.html.
  pause
  exit /b 1
)
if not exist node_modules (
  call npm install
  if errorlevel 1 exit /b 1
)
call npm run mostrar
