# Usa una imagen base oficial de Node.js LTS
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo package.json y package-lock.json primero para aprovechar el cache de Docker
COPY package*.json ./

# Instala las dependencias
RUN npm ci

# Instala TypeScript globalmente para la compilación
RUN npm install -g typescript

# Copia el resto del código de la aplicación
COPY . .

# Compila el código TypeScript
RUN npm run build

# Expón el puerto en el que la aplicación se ejecutará
EXPOSE 8000

# Crea un usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

# Cambia la propiedad de los archivos al usuario no-root
RUN chown -R nodeuser:nodejs /app
USER nodeuser

# Variable de entorno para producción
ENV NODE_ENV=production

# Comando para ejecutar la aplicación cuando el contenedor inicie
CMD ["node", "dist/server.js"]