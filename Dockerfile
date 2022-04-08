FROM node:alpine
WORKDIR /proj1
COPY . /proj1
CMD npm start