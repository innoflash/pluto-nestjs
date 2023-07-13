FROM node:16-alpine as development

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#sed -i s/localhost/postgres/g .env
CMD ["sed", "-i", "'s/localhost/postgres/g'", "./app/env"]
CMD ["npm", "run", "migration:run"]
CMD ["npm", "run", "migrate:seed"]
CMD ["npm", "run", "start:dev"]

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json .

RUN npm install --only=production

COPY . .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]