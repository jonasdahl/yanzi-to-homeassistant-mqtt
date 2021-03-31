FROM node:14.15.5-alpine
RUN apk add dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN yarn
RUN yarn run build
USER node
CMD ["dumb-init", "yarn", "node", "dist/index.js"]