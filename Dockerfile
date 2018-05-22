# Node 8.x
FROM node:carbon

# Copy app files
WORKDIR /app
COPY . /app

# Install dependencies
RUN npm install

# Run
ENTRYPOINT ["node", "src/index.js"]

# Expose port 3000
EXPOSE 3000
