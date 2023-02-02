FROM node:18

# Create a working directory
RUN mkdir -p /usr/src/app

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

RUN ls src/artifacts/contracts/frozr.sol

# Build the application
RUN yarn build

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["yarn", "dev"]
