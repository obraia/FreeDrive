FROM node:alpine as development

WORKDIR /usr/app

COPY package.json .

RUN npm config set registry http://registry.npmjs.org/
RUN npm install

COPY tsconfig.json .
COPY . .

RUN npm install --prefix client

RUN npm run build
RUN npm run build --prefix client

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package.json .

RUN npm install --only=production
COPY --from=development /usr/app/dist ./dist

EXPOSE 80

CMD [ "node", "dist/index.js" ]