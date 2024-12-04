# Stage 1: Install dependencies and build the Next.js app
FROM node:20 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package files to the container
COPY package.json package-lock.json ./ 

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Serve the built application using a lightweight image
FROM node:20-slim AS runner

# Set the environment to production
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy the build output and necessary files from the builder stage
COPY --from=builder /app/package.json ./ 
COPY --from=builder /app/package-lock.json ./ 
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN npm install --production

# Expose the default Next.js port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
