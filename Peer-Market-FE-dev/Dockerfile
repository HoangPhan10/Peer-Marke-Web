FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock package-lock.json ./
RUN yarn install

COPY next-env.d.ts ./next-env.d.ts
COPY next.config.js ./next.config.js
COPY tsconfig.json ./tsconfig.json
COPY src ./src
COPY public ./public

CMD ["yarn", "dev"]