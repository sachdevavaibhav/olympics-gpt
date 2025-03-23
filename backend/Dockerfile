FROM node:20-alpine

# Install curl for healthcheck
RUN apk --no-cache add curl

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Set Node.js to run in production mode
ENV NODE_ENV=production

# Switch to non-root user
USER appuser

EXPOSE 5000

# Use node directly instead of npm for better signal handling
CMD ["node", "src/index.js"]
