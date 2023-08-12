# Use a Node.js base image
FROM node:lts-alpine

ENV NODE_ENV=dev

# Working directory of docker image
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ["package.json", "package-lock.json*", "./"]

# Install app dependencies
RUN npm install --dev 

# Copy the entire app source code to the container
COPY . .

# Expose the port that your Node.js app listens on
EXPOSE 3000 

# Command to start your Node.js app
CMD ["npm", "start"]
