FROM node:20-alpine as development

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]

FROM node:20-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json .

RUN npm install --only=production

COPY . .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main.js"]