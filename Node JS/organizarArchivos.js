// PARA FUNCIONAR SE DEBE ACTIVAR LA LIBRERIA npm init, npm fs, npm path. 

const fs = require('fs');
const path = require('path');

const directoryPath = 'C:/Users/SVEPSLOCAL/Pictures/nuevoArchivos'; // esta es la ruta donde se encuentan los PDFs

// Función para extraer el  de los nombres
function extractPattern(fileName) {
    const parts = fileName.split('_');
    if (parts.length > 2) {
        return `${parts[0]}${parts[1]}`;
    }
    return null;
}

// Crear directorio si no existe
function createDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
}

// Mover archivo a su nueva carpeta
function moveFile(filePath, destDir) {
    const destPath = path.join(destDir, path.basename(filePath));
    fs.rename(filePath, destPath, function (err) {
        if (err) throw err
           console.log('Exitoso el archivo fue movido')
         });
            }
            
            // Leer la carpeta
            fs.readdir(directoryPath, (err, files) => {
                if (err) {
                    return console.log('No se puede escanear el directorio: ' + err);
                }
                
                const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
                // Agrupar archivos por patrón
                pdfFiles.forEach(file => {
                    const pattern = extractPattern(file);
                    if (pattern) {
                        const sourcePath = path.join(directoryPath, file);
                        const destDir = path.join(directoryPath, pattern);
                        createDirectory(destDir);
                        moveFile(sourcePath, destDir);
                    }
                });
        });