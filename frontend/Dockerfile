# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# First copy only package files for better layer caching
COPY package.json package-lock.json ./

# Install dependencies (clean cache afterwards)
RUN npm ci --omit=dev && npm cache clean --force

COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./

# Use non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S -u 1001 -G nodejs nextjs
USER nextjs

EXPOSE 3000

ENV NODE_ENV production
CMD ["node", "server.js"]