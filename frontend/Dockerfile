FROM node:16-alpine3.16 as prod

WORKDIR /app
COPY ./frontend /app

RUN npm install

VOLUME /app

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["npm", "start"]