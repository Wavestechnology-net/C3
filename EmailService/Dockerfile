FROM node:18

WORKDIR /usr/src/app

# Only copy package.json if package-lock doesn't exist
COPY package.json ./

RUN npm install

# Copy rest of the application
COPY . .

EXPOSE 5000

CMD ["node", "emailService.js"]
