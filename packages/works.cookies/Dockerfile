FROM node:16.6.0-alpine
COPY zthun-works.cookies*.tgz /usr/src/packages/zthun-works.cookies.tgz
RUN npm install -g /usr/src/packages/zthun-works.cookies.tgz
EXPOSE 4000
CMD ["zthun-works-cookies"]
