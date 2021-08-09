# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.0-29](https://github.com/zthun/works/compare/v1.0.0-28...v1.0.0-29) (2021-08-09)


### Features

* themes no longer requires highlight.js ([07a9d11](https://github.com/zthun/works/commit/07a9d11e7d7c3bc37fd58a57ed3d7d4865058016))
* updated to snapshot 28 ([0f08ac7](https://github.com/zthun/works/commit/0f08ac7f031ec02c6136a0dfe3041ac212f0b4ff))
* updated to yarn 3+ ([ef6696c](https://github.com/zthun/works/commit/ef6696ce7259f7c9dc78d8ce070dc236f99a1c04))
* works.url now provides url-parse ([82bc14d](https://github.com/zthun/works/commit/82bc14def07d6e7919b73f246940d5d71cdde8c7))



## [1.0.0-28](https://github.com/zthun/works/compare/v1.0.0-27...v1.0.0-28) (2021-08-07)


### ⚠ BREAKING CHANGES

* updated server rxjs
* updated nestjs
* updated to latest material
* you can no longer list users from the users service
* updatd mongo to 4
* the root kind for typedoc has been changed from Global to Project
* updated highlight.js to version 11
* data state can now simply set the data instead of a forced refresh
* removed data state static in favor of a simpler data state

### Features

* added a profile service ([1a4665c](https://github.com/zthun/works/commit/1a4665cee01134fa365b9350552358f26eb66a93))
* data state can now simply set the data instead of a forced refresh ([7a7a7ba](https://github.com/zthun/works/commit/7a7a7ba20b870d5d15530e393f235fa06cfe7eb5))
* mongo is now a transitive dependency of works.dal ([7b9b3ec](https://github.com/zthun/works/commit/7b9b3ec9e1f4b1b4210c37985b87dd5605d776fc))
* removed data state static in favor of a simpler data state ([fd41901](https://github.com/zthun/works/commit/fd4190148aaf7418a13bf1812daddfb4fa2ae8d5))
* the initializer for get profile is now in the main app root ([4445121](https://github.com/zthun/works/commit/4445121328413d981cb669a709fabe427031a548))
* the profile page uses the new profile service ([e903eba](https://github.com/zthun/works/commit/e903eba5a3a2863798433d39f818fd677204e3dd))
* the proxy now has composable shared configuration ([e0f75fd](https://github.com/zthun/works/commit/e0f75fd5192eb8dfe65f0e7e42d60aac6665aade))
* updatd mongo to 4 ([f8917c1](https://github.com/zthun/works/commit/f8917c13fa844b0a621c2204b3eb0adbe9583e9e))
* updated highlight.js to version 11 ([cea3c8b](https://github.com/zthun/works/commit/cea3c8bffe16cd0b0dec778b5a87d70b6e9efef4))
* updated nestjs ([98d2248](https://github.com/zthun/works/commit/98d224887a87c2f89fdb2f84cfda3dedc64a69b8))
* updated server rxjs ([15280ef](https://github.com/zthun/works/commit/15280efba02e805057f60f50508726f7abb5ec9a))
* updated the ingress balancer to v1 ([b452d3e](https://github.com/zthun/works/commit/b452d3e8e6f960b1bd76d26eceb5bbe2bcc0c174))
* updated to latest material ([9aabf3e](https://github.com/zthun/works/commit/9aabf3ee21ff14c89100f46afc6caba811108c08))
* upgraded nginx in the proxy ([8432b94](https://github.com/zthun/works/commit/8432b9411417554604c4809fe90def309420b80a))
* you can no longer list users from the users service ([0daa679](https://github.com/zthun/works/commit/0daa67935bc34f167d813486670fb2b572b100c9))


### Bug Fixes

* an unavailable email server will now throw a proper error ([fe34073](https://github.com/zthun/works/commit/fe34073972b89fccc6362305e563a3a0c9f2c3ef))
* removed old styles ([7d25780](https://github.com/zthun/works/commit/7d25780c59bc762c6dc9554c717e33bc8072eedb))
* the body should no longer have a bottom padding ([3723658](https://github.com/zthun/works/commit/3723658f81130559e1927998dfe4a861e3372336))
* the default alert stack size is now 5 ([f5170d1](https://github.com/zthun/works/commit/f5170d15ea2fff8ff4de61a43a99f990f7203404))
* the login page now logs in on create even if the email server is down ([26597c6](https://github.com/zthun/works/commit/26597c6671038ec627b152e5fc111d8748a0e0c6))
* the typedoc viewer will now display an documentation message if there are no groups ([4314f95](https://github.com/zthun/works/commit/4314f957ebcdcea7d11f35fa70ff63c329d2d740))
* typedoc should now be properly generated ([001290f](https://github.com/zthun/works/commit/001290fbd1ea12fede5832292e86450862367e78))


### Code Refactoring

* the root kind for typedoc has been changed from Global to Project ([01f8bcf](https://github.com/zthun/works/commit/01f8bcf05aa488ae7164ddd4f5547ea4d4117cd0))



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
* removed the privacy and terms page in favor of a generic markdown page ([9138b80](https://github.com/zthun/works/commit/9138b80ae496e0f76124acf3b8415987213777aa))
* renamed markdown view props to markdown props ([c8454e7](https://github.com/zthun/works/commit/c8454e73a6c54276e441d031878ac5e994714597))
* simplified the menu so that it now uses the topbar ([0acdcef](https://github.com/zthun/works/commit/0acdcef0b6e714f3d1f962771f6ae22d6f3e368f))
* the main app now uses the markdown page instead of the terms and privacy page ([48a2e41](https://github.com/zthun/works/commit/48a2e41c8936c47a061f1640244db65d0539cb28))
* the profile page can now end the users session ([a0b4986](https://github.com/zthun/works/commit/a0b4986423f0e1498fcc61aeb61ee2a2de776d45))
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


### Bug Fixes

* markdownlint config updated to support conventional changelog format ([e584b0f](https://github.com/zthun/works/commit/e584b0f496f1eb69407ffe2613cec34469bd984b))


### Features

* added lint janitor to home page ([3b8f492](https://github.com/zthun/works/commit/3b8f4926aef67b14ba47ebf3549020c33bacf603))
* removed the footer in favor of a drawer ([a6f4b3b](https://github.com/zthun/works/commit/a6f4b3bf2748add82b5de942125c1f39779bdd50))
* removed the footer in favor of a drawer ([204c806](https://github.com/zthun/works/commit/204c806e7727daf623674af922e4acc3d83b7452))
* the server is updated to use node 16 ([fb7acf5](https://github.com/zthun/works/commit/fb7acf58dcd5892e8c2e9c441eee0d26d01e2dc0))
* top bar should now be more mobile friendly ([0d53c7b](https://github.com/zthun/works/commit/0d53c7b15b9995fb66e7935dbe5e2cc716146390))
* updated mongo ([fe113ee](https://github.com/zthun/works/commit/fe113ee53708e8707bb8ee1a128d0ab379830299))





# [1.0.0-25](https://github.com/zthun/works/compare/v1.0.0-24...v1.0.0-25) (2021-03-27)


### Bug Fixes

* grammar and spelling errors ([dacb1ad](https://github.com/zthun/works/commit/dacb1ad95d960e880459c46dad3b8881b03f3b3d))
* readme now redirects to the react package ([8f96a1e](https://github.com/zthun/works/commit/8f96a1e08a39042a17ae528bbf86fa749cba0f94))
* readme should now appear properly on mobile ([776dd1a](https://github.com/zthun/works/commit/776dd1a98c87ba51b0e7197ad0e2b1c45fd03f09))
* removed start ([f9a3c6d](https://github.com/zthun/works/commit/f9a3c6d26d67d39c0d35c93b842cf749d3e2196f))
* the path to the styles and css is now correct ([92164bb](https://github.com/zthun/works/commit/92164bbf47a31cc4e86114e2a8b5a8f475dba498))
* the readme now describes the install of the themes package ([72f9232](https://github.com/zthun/works/commit/72f923261caebe196cd5fb63d53beacacca1a2d3))


### Features

* added draw and jest package information ([058ef63](https://github.com/zthun/works/commit/058ef637d83025a6e25e8f0882b58d9de4becf51))
* added the icon for the package ([caa5409](https://github.com/zthun/works/commit/caa540988fc13e47b187ad01ab29e4eb50a56eba))
* added the icon for the package ([fda0bc1](https://github.com/zthun/works/commit/fda0bc1fc23e1c52112cfbba890d8ae98d4ded14))
* the icons for draw and jest are now deployed ([e7c81c5](https://github.com/zthun/works/commit/e7c81c5ebd6955c586f2d770742a3fbe28b9ab5a))
