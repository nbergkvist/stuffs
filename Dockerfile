FROM node:11.6 as build-env
WORKDIR /app
COPY app/package*.json ./
RUN npm install
COPY app /app
RUN npm run build

FROM node:11.6-alpine
WORKDIR /app
ENV STATIC_FOLDER=build
COPY --from=build-env /app/build ./build
COPY package*.json ./
RUN npm install
COPY server.js ./
EXPOSE 5000
CMD ["npm", "start"]

