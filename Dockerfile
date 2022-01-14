FROM node:17.3.0 as setup
WORKDIR /usr/dev
COPY . .
RUN yarn install

FROM setup as analyze
RUN yarn lint

FROM setup as test
RUN yarn test

FROM setup as build
RUN yarn build

FROM build as release
RUN git config --global user.name "works-build-bot" && \
    git config --global user.email "build@zthunworks.com" && \
    git checkout master && \
    npx lerna version --conventional-commits --no-git-tag-version --yes && \
    git add . && \
    git commit -m "chore: publish [skip ci]" && \
    git push

FROM node:17.3.0-alpine as works.api
COPY --from=build /usr/dev/packages/works.api/zthun-works.api*.tgz /usr/src/packages/zthun-works.api.tgz
RUN npm install -g /usr/src/packages/zthun-works.api.tgz
EXPOSE 3000
CMD ["zthun-works-api"]

FROM nginx:1.21.5-alpine as works.client
COPY --from=build /usr/dev/packages/works.client/dist/. /usr/share/nginx/html/
