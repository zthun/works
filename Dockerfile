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
USER root
RUN git config --global credential.helper store && \
    git config --global user.name "Circle CI" && \
    git config --global user.email "circle-ci@zthunworks.com" && \
    git checkout latest
RUN --mount=type=secret,id=GIT_CREDENTIALS,dst=/root/.git-credentials npx lerna version --conventional-commits --yes -m "chore: version [skip ci]"
RUN --mount=type=secret,id=NPM_CREDENTIALS,dst=/root/.npmrc npx lerna publish from-package --yes

FROM node:17.3.0-alpine as works.api
COPY --from=build /usr/dev/packages/works.api/zthun-works.api*.tgz /usr/src/packages/zthun-works.api.tgz
RUN npm install -g /usr/src/packages/zthun-works.api.tgz
EXPOSE 3000
CMD ["zthun-works-api"]

FROM nginx:1.21.5-alpine as works.client
COPY --from=build /usr/dev/packages/works.client/dist/. /usr/share/nginx/html/
