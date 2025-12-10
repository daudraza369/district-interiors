FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++ wget
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps || npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Strapi
ENV NODE_ENV=production
RUN npm run build

# Production image, copy all the files and run strapi
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 strapi

# Copy necessary files
COPY --from=builder --chown=strapi:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=strapi:nodejs /app/build ./build
COPY --from=builder --chown=strapi:nodejs /app/config ./config
COPY --from=builder --chown=strapi:nodejs /app/database ./database
COPY --from=builder --chown=strapi:nodejs /app/public ./public
COPY --from=builder --chown=strapi:nodejs /app/src ./src
COPY --from=builder --chown=strapi:nodejs /app/package.json ./package.json
COPY --from=builder --chown=strapi:nodejs /app/.strapi ./.strapi

# Create uploads directory
RUN mkdir -p /app/public/uploads && chown -R strapi:nodejs /app/public/uploads
RUN mkdir -p /app/.tmp && chown -R strapi:nodejs /app/.tmp

USER strapi

EXPOSE 1337

ENV PORT=1337
ENV HOST=0.0.0.0

CMD ["npm", "start"]

