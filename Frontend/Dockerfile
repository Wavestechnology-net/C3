# Build stage
FROM node:20 AS build
WORKDIR /app
COPY ./Frontend .
RUN npm install
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/src/nginx/html
