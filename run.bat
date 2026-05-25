@echo off
echo Iniciando backend...
:: Usamos 'call' para que el script no se detenga al ejecutar mvnw
start "Backend" cmd /k "cd backend && mvnw.cmd spring-boot:run"

echo Esperando a que el backend inicie...
timeout /t 20

echo Iniciando frontend...
start "Frontend" cmd /k "cd frontend && npm start"

echo ¡Todo en marcha!