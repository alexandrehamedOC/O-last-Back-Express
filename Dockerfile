# Dockerfile de l'application Node.js

# Utilisation d'une image Node.js adaptée à votre architecture ARM
FROM node:lts-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installe les dépendances du projet
RUN npm install

# Copie le reste de l'application dans le répertoire de travail
COPY . .

# Expose le port que l'application va utiliser
EXPOSE 3000

# Définit la commande pour démarrer l'application
CMD ["npm", "start"]
