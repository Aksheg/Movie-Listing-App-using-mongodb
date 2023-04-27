FROM node:18-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

RUN npx tsc

RUN apk add --no-cache mongodb-tools

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

ENV DATABASE_URL=mongodb+srv://Aksheg:Application123@cluster0.zglxubu.mongodb.net/movie
ENV JWT_SECRET=thisismymovieapp

USER appuser

CMD ["node", "bin/www"]

EXPOSE 3000