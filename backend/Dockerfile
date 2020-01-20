FROM node:lts-alpine as stage1 

RUN apk add --no-cache git bash
RUN git clone https://github.com/TaEduard/simpleApp.git 

WORKDIR /simpleApp/backend

RUN rm -rf node_modules package-lock.json

RUN npm install --no-save --unsafe-perm=true --allow-root


FROM node:lts-alpine

COPY --from=stage1 /simpleApp/backend /app

WORKDIR /app

CMD ["node", "index.js"]