FROM node:alpine as builder
WORKDIR /avengers-frontend
ENV PATH /avengers-frontend/node_modules/.bin:$PATH
COPY ./package*.json ./

RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY . . 
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /avengers-frontend/build /usr/share/nginx/html
