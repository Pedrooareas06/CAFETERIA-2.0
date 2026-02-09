@echo off
REM Quick Start Script - Cateria Backend Setup
REM Este script automatiza a instalacao do backend

cls
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║         CATERIA 2.0 - Backend Setup Automation                ║
echo ║              NestJS + MongoDB Integration                      ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check if we're in the right directory
if not exist "backend" (
    echo ❌ Erro: Pasta 'backend' nao encontrada!
    echo    Execute este script a partir da raiz do projeto.
    echo.
    pause
    exit /b 1
)

echo ✅ Pasta backend encontrada
echo.

REM Ask user choice
echo Escolha uma opcao:
echo.
echo [1] Instalar dependencias do backend (yarn install)
echo [2] Instalar dependencias + testar MongoDB
echo [3] Instalar + rodar backend (yarn dev)
echo [4] Rodar frontend + backend juntos (yarn dev:all)
echo [5] Ver status do projeto
echo.

set /p choice="Digite sua opcao (1-5): "

if "%choice%"=="1" (
    goto install_backend
) else if "%choice%"=="2" (
    goto install_and_test
) else if "%choice%"=="3" (
    goto install_and_run
) else if "%choice%"=="4" (
    goto run_all
) else if "%choice%"=="5" (
    goto status
) else (
    echo ❌ Opcao invalida!
    goto end
)

:install_backend
echo.
echo 📦 Instalando dependencias do backend...
echo.
cd backend
call yarn install
if %ERRORLEVEL% EQU 0 (
    echo ✅ Instalacao concluida com sucesso!
) else (
    echo ❌ Erro na instalacao. Verifique se yarn está installed.
)
cd ..
goto end

:install_and_test
echo.
echo 📦 Instalando dependencias...
echo.
cd backend
call yarn install
cd ..
echo.
echo 🔍 Testando conexao com MongoDB...
echo.
node -e "const mongoose = require('mongoose'); require('dotenv').config({path: './backend/.env'}); console.log('📡 Tentando conectar...\n'); mongoose.connect(process.env.MONGODB_URI).then(() => { console.log('✅ MongoDB conectado com sucesso!'); console.log('  URI:', process.env.MONGODB_URI); process.exit(0); }).catch(e => { console.error('❌ Erro de conexao:', e.message); process.exit(1); });"
goto end

:install_and_run
echo.
echo 📦 Instalando dependencias...
echo.
cd backend
call yarn install
echo.
echo 🚀 Iniciando backend em desenvolvimento...
echo.
echo   http://localhost:3001
echo.
echo   Pressione CTRL+C para parar
echo.
call yarn dev
cd ..
goto end

:run_all
echo.
echo 🚀 Iniciando frontend + backend...
echo.
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:3001
echo.
echo   Pressione CTRL+C para parar
echo.
call yarn dev:all
goto end

:status
echo.
echo 📊 Status do Projeto:
echo.
echo Arquivos criados:
if exist "backend" (
    echo  ✅ backend/
    if exist "backend\package.json" echo     ✅ package.json
    if exist "backend\.env" echo     ✅ .env
    if exist "backend\src\main.ts" echo     ✅ src/main.ts
    if exist "backend\src\app.module.ts" echo     ✅ src/app.module.ts
    if exist "backend\src\cart" echo     ✅ src/cart/ (Cart API)
    if exist "backend\src\orders" echo     ✅ src/orders/ (Orders API)
)
if exist "lib\cart-api.ts" echo  ✅ lib/cart-api.ts
if exist ".env.local" echo  ✅ .env.local
if exist "INTEGRATION.md" echo  ✅ INTEGRATION.md
if exist "BACKEND_SETUP.md" echo  ✅ BACKEND_SETUP.md
echo.
echo Scripts disponiveis:
echo  • yarn backend:install  - Instala dependencias
echo  • yarn backend:dev      - Roda backend em dev
echo  • yarn backend:build    - Build production
echo  • yarn dev:all          - Roda frontend + backend juntos
echo.
echo Proxim passo: yarn backend:install
echo.
goto end

:end
echo.
pause
