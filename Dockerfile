FROM node:20-alpine

WORKDIR /app

# copy package.json
COPY package*.json ./

RUN npm install

# copy source code ทั้งหมด
COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
