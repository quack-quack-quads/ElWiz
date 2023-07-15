# State 1: Build react app
FROM node:16-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Set environment variables
ARG VITE_API_GATEWAY_BASE_URL
RUN touch .env
RUN echo "VITE_API_GATEWAY_BASE_URL=$VITE_API_GATEWAY_BASE_URL" >> .env

RUN ["npm", "run", "build"]

# Stage 2: Serve built react app with nginx
FROM nginx:1.21.1-alpine as production-stage

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build-stage /app/dist .

# Add the Nginx configuration to handle client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]