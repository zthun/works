FROM node:16.6.0-alpine
COPY zthun-works.vault*.tgz /usr/src/packages/zthun-works.vault.tgz
RUN npm install -g /usr/src/packages/zthun-works.vault.tgz
EXPOSE 4000
CMD ["zthun-works-vault"]
