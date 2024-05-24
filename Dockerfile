FROM node:lts AS builder

RUN mkdir -p /app

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

RUN touch .env

RUN yarn build

FROM node:lts

RUN mkdir -p /app
RUN chown -R node:node /app

WORKDIR /app

USER root

COPY --from=builder /app .
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/tmp ./tmp
# COPY --from=builder /app/docker-compose.yml ./docker-compose.yml
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/yarn.lock ./yarn.lock
# COPY --from=builder /app/.env ./.env

RUN mkdir -p /app/tmp

CMD ["yarn", "start"]
