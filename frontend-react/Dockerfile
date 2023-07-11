# # State 1: Build react app
# FROM node:16-alpine as build-stage

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN ["npm", "run", "build"]

# # Stage 2: Serve built react app with nginx
# FROM nginx:1.21.1-alpine as production-stage

# WORKDIR /usr/share/nginx/html

# RUN rm -rf ./*

# COPY --from=build-stage /app/dist .

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

FROM node:16-alpine 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .    

EXPOSE 5173

CMD ["npm", "run", "dev"]