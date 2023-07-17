FROM node:16-alpine as development

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN sed -i 's/localhost/0.0.0.0/g'" ./app/.env
RUN npm run build
RUN npm run migration:run
RUN npm run migrate:seed

#sed -i s/localhost/postgres/g .env
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