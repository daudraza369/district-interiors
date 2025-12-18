FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++ wget netcat-openbsd
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
# Install dependencies - use npm ci if package-lock.json exists, otherwise npm install
RUN if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; else npm install --legacy-peer-deps; fi

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

# Install wget and netcat for healthcheck
RUN apk add --no-cache wget netcat-openbsd

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 strapi

# Create directories first
RUN mkdir -p /app/public/uploads && mkdir -p /app/.tmp && mkdir -p /app/database

# Copy necessary files
COPY --from=builder --chown=strapi:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=strapi:nodejs /app/build ./build
COPY --from=builder --chown=strapi:nodejs /app/config ./config
COPY --from=builder --chown=strapi:nodejs /app/src ./src
COPY --from=builder --chown=strapi:nodejs /app/package.json ./package.json
COPY --from=builder --chown=strapi:nodejs /app/.strapi ./.strapi

# Copy and set up startup script
COPY --chown=strapi:nodejs start.sh ./start.sh
RUN chmod +x ./start.sh

# Set ownership for all directories Strapi needs to write to
RUN chown -R strapi:nodejs /app/public /app/.tmp /app/database

USER strapi

EXPOSE 1337

ENV PORT=1337
ENV HOST=0.0.0.0

CMD ["./start.sh"]

