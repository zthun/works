FROM node:17.3.0 as setup
WORKDIR /usr/dev
COPY . .
RUN yarn install


FROM node:17.3.0 as push
WORKDIR /usr/dev
COPY . .
RUN git config --global credential.helper store && \
    git config --global user.name "circle-ci" && \
    git config --global user.email "circle-ci@zthunworks.com"
RUN --mount=type=secret,id=GITHUB_CREDENTIALS,dst=/root/.git-credentials git push

FROM setup as analyze
RUN yarn lint

FROM setup as test
RUN yarn test

FROM setup as build
RUN yarn build

FROM build as release
USER root
RUN --mount=type=secret,id=GITHUB_CREDENTIALS,dst=/root/.git-credentials  git config --global credential.helper store && \
    git config --global user.name "zthun" && \
    git config --global user.email "build@zthunworks.com" && \
    git checkout master && \
    npx lerna version --conventional-commits --no-git-tag-version --yes && \
    yarn install && \
    git add . && \
    git commit --allow-empty -m "chore: version [skip ci]" && \
    git push

FROM node:17.3.0-alpine as works.api
COPY --from=build /usr/dev/packages/works.api/zthun-works.api*.tgz /usr/src/packages/zthun-works.api.tgz
RUN npm install -g /usr/src/packages/zthun-works.api.tgz
EXPOSE 3000
CMD ["zthun-works-api"]

FROM nginx:1.21.5-alpine as works.client
COPY --from=build /usr/dev/packages/works.client/dist/. /usr/share/nginx/html/
