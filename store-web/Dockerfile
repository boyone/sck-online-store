FROM node:21-alpine AS builder

ARG STORE_SERVICE_URL

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN if [ -n "$STORE_SERVICE_URL" ]; then \
      echo "STORE_SERVICE_URL=${STORE_SERVICE_URL}" > .env; \
    fi

RUN npm run build

FROM node:21-alpine AS runner

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD npm run start
