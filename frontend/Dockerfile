# Stage 1: Build
FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build ./build

ARG REACT_APP_API_URL=http://backend:5001
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]