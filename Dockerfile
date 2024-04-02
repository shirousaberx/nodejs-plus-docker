FROM node:21-alpine3.18

COPY . /

RUN npm install 

CMD ["npm", "start"]