# Dockerfile
FROM node:12-slim as dependencies
RUN mkdir -p /user/app
WORKDIR /user/app

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV API_KEY=AIzaSyDwCPk0aS5x50QtOj_pR-EM10yHB0XgvP8
ENV AUTH_DOMAIN=horse-speed-a9667.firebaseapp.com
ENV DATABASE_URL=https://horse-speed-a9667-default-rtdb.asia-southeast1.firebasedatabase.app
ENV PROJECT_ID=horse-speed-a9667
ENV STORAGE_BUCKET=horse-speed-a9667.appspot.com
ENV MESSAGING_SENDER=1031616040152
ENV APP_ID=1:1031616040152:web:5f3ac7e3a4b7fa060c1bad
ENV MEASUREMENT_ID=G-GKF63NTEWX
ENV SH_CLIENT_NOTIFY_UI_ERROR=false

COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run generate

FROM nginx:1.17.2-alpine
WORKDIR /user/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d
COPY --from=dependencies /user/app/dist ./

EXPOSE 8080

# create destination directory
# RUN mkdir -p /usr/src/nuxt-app
# WORKDIR /usr/src/nuxt-app


# # update and install dependency
# RUN apk update && apk upgrade
# RUN apk add git

# COPY . /usr/src/nuxt-app/
# RUN npm install
# RUN npm run build

# EXPOSE 3000

# ENV NUXT_HOST=0.0.0.0
# ENV NUXT_PORT=3000
# ENV API_KEY=AIzaSyDwCPk0aS5x50QtOj_pR-EM10yHB0XgvP8
# ENV AUTH_DOMAIN=horse-speed-a9667.firebaseapp.com
# ENV DATABASE_URL=https://horse-speed-a9667-default-rtdb.asia-southeast1.firebasedatabase.app
# ENV PROJECT_ID=horse-speed-a9667
# ENV STORAGE_BUCKET=horse-speed-a9667.appspot.com
# ENV MESSAGING_SENDER=1031616040152
# ENV APP_ID=1:1031616040152:web:5f3ac7e3a4b7fa060c1bad
# ENV MEASUREMENT_ID=G-GKF63NTEWX

# ENV SH_CLIENT_NOTIFY_UI_ERROR=false

# CMD [ "npm", "start" ]