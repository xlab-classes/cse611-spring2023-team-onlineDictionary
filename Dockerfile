FROM node:16
WORKDIR /app
RUN mkdir backend
WORKDIR /app/backend

COPY backend/package.json ./package.json
COPY backend/index.js ./index.js
COPY backend/routes ./routes 
COPY backend/.env ./.env
COPY backend/serviceaccount.json ./serviceaccount.json
RUN mkdir ./google_Audios
RUN npm install --silent
EXPOSE 3001
# CMD ["npm", "start"]

WORKDIR /app
RUN mkdir frontend
WORKDIR /app/frontend
COPY front-end/package.json ./package.json
COPY front-end/public ./public
COPY front-end/src ./src
RUN npm install --silent
EXPOSE 3000

WORKDIR /app
COPY ./start_scripts.sh ./start_scripts.sh
CMD ./start_scripts.sh

