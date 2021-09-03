# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.4.0](https://github.com/zthun/works/compare/v1.3.0...v1.4.0) (2021-09-03)


### Features

* added the renderMarkdownPage method ([753d40d](https://github.com/zthun/works/commit/753d40db0e311b56a80ea9161f96cb92bfebc8eb))
* added the web app layout component ([bf181c3](https://github.com/zthun/works/commit/bf181c3028ff55c7fd6c9b679aa72b4c7d95e24a))
* the properties of the IZComponentStyle are now optional ([6e9d1bd](https://github.com/zthun/works/commit/6e9d1bd05bc20048a21b00b62fba23b9ffab15eb))
* the properties on the IZComponentActionable are now optional ([5108d78](https://github.com/zthun/works/commit/5108d787d7e9b5255f334201702a738687dd46db))
* the properties on the IZComponentConfirmable are now optional ([a78cdaf](https://github.com/zthun/works/commit/a78cdaf9c5a0b868d1efb8fa12abb9b0459053fe))
* the status code page now supplies a means to render the page as a routed page ([91cc460](https://github.com/zthun/works/commit/91cc460e10451d6d2a54677c9b20a885615c4de5))



## [1.3.0](https://github.com/zthun/works/compare/v1.2.0...v1.3.0) (2021-09-02)


### Bug Fixes

* index now properly exports the top nav and web apps context ([a284ce5](https://github.com/zthun/works/commit/a284ce59449f41083a0e55233a30a3dd338246b2))



## [1.2.0](https://github.com/zthun/works/compare/v1.1.0...v1.2.0) (2021-09-01)


### Features

* added a logger message handler ([becf55f](https://github.com/zthun/works/commit/becf55fc368eb7a2c38d3dc822e520634a7eab80))
* added an alert error message handler ([8bbcc40](https://github.com/zthun/works/commit/8bbcc40848c8fa19aef4078b4667831b0de2e616))
* added the alert list component and alert service context ([c9c6545](https://github.com/zthun/works/commit/c9c6545e0d77d42de9a8f571b1edcbc903f7e616))
* added the profile context in favor of the login state context ([d70e180](https://github.com/zthun/works/commit/d70e180b2e5cf4881add7737c6f40ad5dcdca9fc))
* added the web app service ([3a8421f](https://github.com/zthun/works/commit/3a8421ff75dc6baa1295158ebf9a43c8d412b1dd))
* added the web apps service context ([94c5a0d](https://github.com/zthun/works/commit/94c5a0db087dbd7be4508087cd1b34f76dee3ea1))
* added the window context ([c575903](https://github.com/zthun/works/commit/c57590367774ba248a714c5adb966b139aac2329))
* adding the error handler context ([a8663fd](https://github.com/zthun/works/commit/a8663fd1655c09f77fe8677ef4a9c7fedf69bcdc))
* alertlist style for message will properly preserve white space ([c08cfd2](https://github.com/zthun/works/commit/c08cfd28780986c15141af1af5f2a299e02da090))
* status code page and http code card now use the http package ([b6b009e](https://github.com/zthun/works/commit/b6b009e965c8848ecfebc65c569bdbf1314dfe73))
* the top bar has been fully merged to the top  nav ([6471ee6](https://github.com/zthun/works/commit/6471ee63c832fdde71ccf63974dcfa827b3e96f3))
* the top nav should now properly display app icons ([1faaffe](https://github.com/zthun/works/commit/1faaffe965b648a996c18f109fcc99acda328868))
* works.react now has peer dependencies on logger, message, and error ([f2c39d6](https://github.com/zthun/works/commit/f2c39d6f16f45da03d71b33abe1566f80dfb7eab))



## [1.1.0](https://github.com/zthun/works/compare/v1.0.0...v1.1.0) (2021-08-15)


### Features

* added a peer dependency on the works.http package ([f651f97](https://github.com/zthun/works/commit/f651f977bb2fc70aed0c810693aa4509435a7c9f))
* added the alert snackbar and content components ([6e38235](https://github.com/zthun/works/commit/6e382355a4f2012046e142b852bce4e5b5be6a46))
* added the profile service ([f54e272](https://github.com/zthun/works/commit/f54e27222ecb90f636401ff822581eb97b8a5afe))
* deprecated profile service functions in favor of the profile service ([7b38062](https://github.com/zthun/works/commit/7b38062649cd7ace9e1f78de7b4487d1e72465f2))
* the markdown viewer now uses the http service ([e15c7e1](https://github.com/zthun/works/commit/e15c7e19a3dee1979af1a408fe8b4a7eff0b2dea))
* the profile service can activate, deactive, and reactivate a profile ([5af7648](https://github.com/zthun/works/commit/5af76485f5f3a889d7999fe40caf7bcbe5e6f311))
* the profile service can create and recover accounts ([97f05a2](https://github.com/zthun/works/commit/97f05a2c5e7599d37ff7ea86517fd2dda11fb775))
* the profile service can handle login and logout ([0e867a1](https://github.com/zthun/works/commit/0e867a1e80898c841c948aa0c755e9682c30dd7b))
* the profile service can update and delete a profile ([58c6161](https://github.com/zthun/works/commit/58c61615d74bf895a3f53e4472c770326cdaa37b))



## [1.0.0-29](https://github.com/zthun/works/compare/v1.0.0-28...v1.0.0-29) (2021-08-09)

**Note:** Version bump only for package @zthun/works.react





## [1.0.0-28](https://github.com/zthun/works/compare/v1.0.0-27...v1.0.0-28) (2021-08-07)


### ⚠ BREAKING CHANGES

* updated nestjs
* updated to latest material
* updated highlight.js to version 11
* data state can now simply set the data instead of a forced refresh
* removed data state static in favor of a simpler data state

### Features

* added a profile service ([1a4665c](https://github.com/zthun/works/commit/1a4665cee01134fa365b9350552358f26eb66a93))
* data state can now simply set the data instead of a forced refresh ([7a7a7ba](https://github.com/zthun/works/commit/7a7a7ba20b870d5d15530e393f235fa06cfe7eb5))
* removed data state static in favor of a simpler data state ([fd41901](https://github.com/zthun/works/commit/fd4190148aaf7418a13bf1812daddfb4fa2ae8d5))
* updated highlight.js to version 11 ([cea3c8b](https://github.com/zthun/works/commit/cea3c8bffe16cd0b0dec778b5a87d70b6e9efef4))
* updated nestjs ([98d2248](https://github.com/zthun/works/commit/98d224887a87c2f89fdb2f84cfda3dedc64a69b8))
* updated to latest material ([9aabf3e](https://github.com/zthun/works/commit/9aabf3ee21ff14c89100f46afc6caba811108c08))


### Bug Fixes

* the default alert stack size is now 5 ([f5170d1](https://github.com/zthun/works/commit/f5170d15ea2fff8ff4de61a43a99f990f7203404))
* the typedoc viewer will now display an documentation message if there are no groups ([4314f95](https://github.com/zthun/works/commit/4314f957ebcdcea7d11f35fa70ff63c329d2d740))



## [1.0.0-27](https://github.com/zthun/works/compare/v1.0.0-26...v1.0.0-27) (2021-06-18)


### ⚠ BREAKING CHANGES

* removed menus in favor of buttons
* renamed markdown view props to markdown props
* works.react now depends on react-router-dom

### Features

* added a generic markdown page that displays a single markdown file ([dc4c0dc](https://github.com/zthun/works/commit/dc4c0dc70730b9d19728cb6f7d412d11262d0bec))
* added a reusable top bar component ([a1defcf](https://github.com/zthun/works/commit/a1defcf641a653ae81487c82aa7b319a8b0f1a30))
* added support for component descriptions ([44859da](https://github.com/zthun/works/commit/44859da85fe3b880cf2ff272195deda4500a8837))
* added the http code type ([ec15603](https://github.com/zthun/works/commit/ec15603f4ab0062b4c6dbefcbdd97e042d5a3fe4))
* removed menus in favor of buttons ([5561555](https://github.com/zthun/works/commit/55615555514bf51745e00f53fc4bd3ff442ba169))
* renamed markdown view props to markdown props ([c8454e7](https://github.com/zthun/works/commit/c8454e73a6c54276e441d031878ac5e994714597))
* simplified the menu so that it now uses the topbar ([0acdcef](https://github.com/zthun/works/commit/0acdcef0b6e714f3d1f962771f6ae22d6f3e368f))
* the status code page has been moved to works.react ([9a9deb2](https://github.com/zthun/works/commit/9a9deb29cf08b18df0f5e9c6764a1a4de1964ff7))
* the status code page now takes the code as an argument ([e4fbb99](https://github.com/zthun/works/commit/e4fbb99512f2793506f8e4bcd15b37e412940a87))
* updated the app to use the top bar ([59322c3](https://github.com/zthun/works/commit/59322c3074aaaae2738115f8f859a76475fc5c53))
* works.react now depends on react-router-dom ([9194290](https://github.com/zthun/works/commit/9194290cd599831159a4a1ad647735a8f46efa6b))
* you can now change the avatar and description of the profile activation form ([0a20dd3](https://github.com/zthun/works/commit/0a20dd31896e05d1feab874cd4a3a6a18aecf8d7))


### Bug Fixes

* pressing the enter key no longer double submits the save ([245f911](https://github.com/zthun/works/commit/245f91166c7b5676d8c8feb3d8257afc093fb3b8))
* pressing the enter key no longer refreshes the page ([33a8ca1](https://github.com/zthun/works/commit/33a8ca1355ac1372959fcee2700a93f15cc25acc))
* pressing the enter key on the form no longer refreshes the page ([e936551](https://github.com/zthun/works/commit/e93655129d8c5577699d6f1d902a2491d6dc1fe3))



# [1.0.0-26](https://github.com/zthun/works/compare/v1.0.0-25...v1.0.0-26) (2021-05-27)


### Features

* added lint janitor to home page ([3b8f492](https://github.com/zthun/works/commit/3b8f4926aef67b14ba47ebf3549020c33bacf603))
* top bar should now be more mobile friendly ([0d53c7b](https://github.com/zthun/works/commit/0d53c7b15b9995fb66e7935dbe5e2cc716146390))





# [1.0.0-25](https://github.com/zthun/works/compare/v1.0.0-24...v1.0.0-25) (2021-03-27)


### Bug Fixes

* the readme now describes the install of the themes package ([72f9232](https://github.com/zthun/works/commit/72f923261caebe196cd5fb63d53beacacca1a2d3))
