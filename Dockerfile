# Dockerfile de l'application Node.js

# Utilisation d'une image Node.js adaptée à votre architecture ARM
FROM node:lts-alpine

# Installation de dockerize pour attendre que la base de données soit prête
ADD https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz /usr/local/bin/
RUN tar -C /usr/local/bin -xzvf /usr/local/bin/dockerize-linux-amd64-v0.6.1.tar.gz

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installe les dépendances du projet
RUN npm install

# Copie le reste de l'application dans le répertoire de travail
COPY . .

# COPY wait-for-it.sh /wait-for-it.sh
# RUN chmod +x /wait-for-it.sh
# RUN ls -l /wait-for-it.sh  # Vérifier les permissions du script

# Expose le port que l'application va utiliser
EXPOSE 3000

# Définit la commande pour démarrer l'application
CMD ["npm", "run", "dev"]
