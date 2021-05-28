# Contributing

Thanks for taking the time to contribute! This project is mostly for fun and the main purpose of it is to provide a set of standard components to any other libraries that may want some of this. This document should get you set up in the case that you want to run a local zthunworks website in your own development environment.

## Deployment

This repository builds out multiple NPM packages that will deploy to the public [NPM](https://npmjs.org) repository. Not all packages are feasible for installing or importing, but by deploying everything to NPM, we can keep track of different versions and it will specify to us what the latest version is.

This repository also deploys out docker containers to [Docker Hub](https://hub.docker.com). These containers are then combined with the works.k8s package to deploy a helm chart to a kubernetes cluster.

## Environment

In order to build the main works repo, you are going to need [Node](https://nodejs.org/en/), [Yarn](https://classic.yarnpkg.com/lang/en/), and an IDE of your choice. We generally recommend [VisualStudio Code](https://code.visualstudio.com/) as that one has the most plugins and support to do everything you will need. There are a couple of extensions that are highly recommended to install.

- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [MarkdownLint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

You'll also probably want a way to run jest based unit tests in your IDE, so it is recommended to choose one of the following extensions.

- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner)

## Build and Debug

The actual build is ran through docker. You will need to install docker-desktop in order to run a full local build.

```sh
# OSX
brew cask install docker
```

```powershell
# Windows
choco install docker-desktop
```

```sh
git clone https://github.com/zthun/works.git
cd works
# You must do this once to generate all the necessary typedoc files.
yarn build
docker compose up
```

Once the application is running, you will want to open your OS hosts file and add the following line.

```sh
# Note the host file is /etc/hosts on osx and linux
# On windows it's under C:\windows\system32\drivers\etc\hosts
192.168.0.1 local.zthunworks.com
```

Once you have all the setup done, open up any browser of your choice and enter <https://local.zthunworks.com>.

> If you are using Google Chrome, it will not let you ignore the invalid self signed cert. You must run the application with incognito mode.

You can debug the UI with the browser itself. The source tab should have all of the mapped TypeScript source code for you to set breakpoints.

If you want to debug the server, then you attach a node instance to it with the .vscode launch.json. Once the docker containers are running, you will want to open the VSCode debugger and run the Debug server task. This attach to the server running in the docker container. You should be good to go setting breakpoints in the server code at this point.

## Test

Unit testing is done using jest and code coverage thresholds are set to 100%. This is done on purpose to reduce the noise of missing tests. If you MUST write something that cannot have unit tests, then please add the istanbul ignore pragma to the file and add a comment on why it cannot be tested.

To run the unit tests, use the following series of commands.

```sh
yarn test
```

## Versioning

This repository uses conventional commits to determine the next version to publish. Make sure before you make any commits that you [follow this standard](https://www.conventionalcommits.org/en/v1.0.0/).

## Pull Request

Fork this repository, make any changes you need and then create a pull request from your fork. From the above samples, you'll want to change the git clone command to point to your local repository fork. See the [pull request template](.github/pull_request_template.md) for more information and checks to make.
