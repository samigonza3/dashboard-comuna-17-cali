const { exec } = require('child_process');

// Comando para ejecutar el script de Python
const comandoPython = 'python scraping_acuerdos.py';  // Asegúrate de que sea el comando correcto para ejecutar tu script Python

// Ejecutar el script de Python desde Node.js
exec(comandoPython, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error al ejecutar el script de Python: ${error}`);
    return;
  }
  console.log(`Resultado del script de Python:\n${stdout}`);
});