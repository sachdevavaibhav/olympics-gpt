FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Production image
FROM node:20-alpine

# Install curl for healthcheck
RUN apk --no-cache add curl

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy built node modules and other files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Set Node.js to run in production mode
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

# Switch to non-root user
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000

# Use node directly instead of npm for better signal handling
CMD ["node", "src/index.js"]
