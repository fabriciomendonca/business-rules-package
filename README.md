# business-rules-package

This package is part of the article [Front End Architecture — Making rebuild from scratch not so painful](https://medium.com/car2godevs/front-end-architecture-making-rebuild-from-scratch-not-so-painful-7b2232dc1666).

It implements the use cases to load, create and save posts consuming [jsonplaceholder API](https://jsonplaceholder.typicode.com/).

## Scripts
```bash
# Install dependencies
npm install

# Start development
npm start

# Develop tests
npm run test-dev

# Develop tests and check coverage
npm run test-dev-coverage

# Run tests and check coverage
npm test

# Build package
npm run build
```

## Running showroom

```bash
# Go to showroom folder
cd showroom

# Install dependencies
npm install

# Link the package
npm link ../

# Run start script for development
npm start
```

## Running simple usage example

```bash
# Go to playground folder
cd playground

# Link the package
npm link ../

# Execute node script
node simple-usage.js
```
