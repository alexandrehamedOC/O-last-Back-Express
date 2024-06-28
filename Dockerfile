# Utilise une image Node.js officielle comme image de base
FROM node:lts-alpine3.16

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
CMD ["node", "index.js"]