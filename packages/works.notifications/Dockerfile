FROM node:16.6.0-alpine
COPY zthun-works.notifications*.tgz /usr/src/packages/zthun-works.notifications.tgz
RUN npm install -g /usr/src/packages/zthun-works.notifications.tgz
EXPOSE 4000
CMD ["zthun-works-notifications"]
