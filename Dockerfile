FROM node:18-alpine AS base
LABEL authors="yashc"
COPY . /ccsamples
WORKDIR /ccsamples
RUN ls
RUN npm install
CMD [ "node" , "index" ]