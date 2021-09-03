FROM node:16.6.0-alpine
COPY zthun-works.api*.tgz /usr/src/packages/zthun-works.api.tgz
RUN npm install -g /usr/src/packages/zthun-works.api.tgz
EXPOSE 3000
CMD ["zthun-works-api"]
