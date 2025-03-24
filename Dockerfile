FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install && npm run build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g http-server

COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["http-server", "dist", "-p", "8080"]
