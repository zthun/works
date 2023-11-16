FROM node:lts as setup
WORKDIR /usr/dev
COPY . .
RUN yarn install

FROM setup as analyze
RUN yarn lint

FROM setup as test
RUN yarn test

FROM setup as build
RUN yarn build && yarn doc

FROM build as release
USER root
RUN git config --global credential.helper store && \
    git config --global user.name "Circle CI" && \
    git config --global user.email "circle-ci@zthunworks.com" && \
    git remote set-url origin https://github.com/zthun/works && \
    git remote -v && \
    git checkout latest
RUN --mount=type=secret,id=GIT_CREDENTIALS,dst=/root/.git-credentials npx lerna version --conventional-commits --yes --no-push -m "chore: version [skip ci]" && \
    yarn install && \
    git add . && \
    git commit --allow-empty -m "chore: update yarn lockfile [skip ci]" && \
    git push && \
    git push --tags
RUN --mount=type=secret,id=NPM_CREDENTIALS,dst=/root/.npmrc npx lerna publish from-package --yes

FROM node:lts-alpine as works.apps
RUN npm install -g @zthun/works.apps
EXPOSE 4000
CMD ["zthun-works-apps"]

FROM node:lts-alpine as works.api
RUN npm install -g @zthun/works.api
EXPOSE 3000
CMD ["zthun-works-api"]

FROM node:lts-alpine as works-web-install
RUN npm install -g @zthun/works-web

FROM nginx:mainline-alpine as works-web
COPY --from=works-web-install /usr/local/lib/node_modules/@zthun/works-web/dist/. /usr/share/nginx/html/
