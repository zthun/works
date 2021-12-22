FROM node:16.6.0-alpine
COPY zthun-works.apps*.tgz /usr/src/packages/zthun-works.apps.tgz
RUN npm install -g /usr/src/packages/zthun-works.apps.tgz
EXPOSE 4000
CMD ["zthun-works-apps"]
