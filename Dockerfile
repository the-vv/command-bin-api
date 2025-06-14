# Use official Node.js LTS image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the TypeScript app
RUN pnpm run build

# Expose the port your app runs on (default NestJS is 3000)
EXPOSE 3000

# Start the application
CMD ["pnpm", "start:prod"]
