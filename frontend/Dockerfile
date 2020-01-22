FROM node:lts-alpine as stage1 

RUN apk add --no-cache git bash
RUN git clone https://github.com/TaEduard/simpleApp.git 

WORKDIR /simpleApp/frontend

RUN rm -rf node_modules package-lock.json

RUN npm install --no-save --unsafe-perm=true --allow-root

RUN npm run build

FROM nginx:stable-alpine

COPY --from=stage1 /simpleApp/frontend/build /usr/share/nginx/html
COPY --from=stage1 /simpleApp/frontend/nginx.conf /etc/nginx/conf.d/default.conf
