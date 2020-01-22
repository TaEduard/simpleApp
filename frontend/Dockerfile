FROM node:lts-alpine as stage0 

RUN apk add --no-cache git bash
RUN git clone https://github.com/TaEduard/simpleApp.git 

WORKDIR /simpleApp/frontend

RUN rm -rf node_modules package-lock.json

RUN npm install --no-save --unsafe-perm=true --allow-root

RUN npm run build

FROM nginx:1.15

COPY --from=stage0 /simpleApp/frontend/build /usr/share/nginx/html

COPY --from=stage0 /simpleApp/frontend/nginx.conf /etc/nginx/conf.d/default.conf
