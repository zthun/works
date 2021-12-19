FROM node:16.6.0-alpine
COPY zthun-works.users*.tgz /usr/src/packages/zthun-works.users.tgz
RUN npm install -g /usr/src/packages/zthun-works.users.tgz
EXPOSE 4000
CMD ["zthun-works-users"]
