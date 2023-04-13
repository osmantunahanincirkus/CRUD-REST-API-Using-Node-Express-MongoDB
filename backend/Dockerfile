FROM node:16-alpine3.16 AS base

#RUN npm i -g @parvineyvazov/json-translator

#############################################################################################
FROM base AS deps

ARG TZ='Europe/Istanbul'
ENV TZ ${TZ}
RUN apk upgrade --update \
    && apk add -U tzdata \
    && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo "${TZ}" > /etc/timezone \
    && apk del tzdata \
    && rm -rf \
    /var/cache/apk/*

#############################################################################################
FROM deps AS express

WORKDIR /app

COPY ./backend/package*.json .

RUN npm install

#############################################################################################
FROM express AS prod

WORKDIR /app

COPY ./backend /app

VOLUME /app

EXPOSE 5000

ENV HOST=0.0.0.0
ENV PORT=5000

RUN export TZ=${TZ}

CMD ["npm", "start"]

#############################################################################################
FROM prod