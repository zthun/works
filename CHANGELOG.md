# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

### [3.1.2](https://github.com/zthun/works/compare/v3.1.1...v3.1.2) (2022-03-23)

**Note:** Version bump only for package @zthun/works





### [3.1.1](https://github.com/zthun/works/compare/v3.1.0...v3.1.1) (2022-01-31)


### Bug Fixes

* get and put should now be synchronized ([9223362](https://github.com/zthun/works/commit/9223362d5ba908b07c1735b706d321ff062456d7))



## [3.1.0](https://github.com/zthun/works/compare/v3.0.10...v3.1.0) (2022-01-30)


### Features

* updating highlight js to 11.4.0 ([bfe7c53](https://github.com/zthun/works/commit/bfe7c53b61260a97d50eb03e14e6779484d318f7))
* updating to latest helmet ([5f41414](https://github.com/zthun/works/commit/5f41414c096fecc7baf287cf1e26bab22996b320))



### [3.0.10](https://github.com/zthun/works/compare/v3.0.9...v3.0.10) (2022-01-30)

**Note:** Version bump only for package @zthun/works





### [3.0.9](https://github.com/zthun/works/compare/v3.0.8...v3.0.9) (2022-01-29)

**Note:** Version bump only for package @zthun/works





### [3.0.8](https://github.com/zthun/works/compare/v3.0.7...v3.0.8) (2022-01-29)

**Note:** Version bump only for package @zthun/works





### [3.0.7](https://github.com/zthun/works/compare/v3.0.6...v3.0.7) (2022-01-16)

**Note:** Version bump only for package @zthun/works





### [3.0.6](https://github.com/zthun/works/compare/v3.0.2...v3.0.6) (2022-01-16)


### Bug Fixes

* circular progress now properly uses size mapping ([5fd01bf](https://github.com/zthun/works/commit/5fd01bf4acf276863067684c0ce7860598901822))
* the top nav spinner now displays properly in the header ([878d4c9](https://github.com/zthun/works/commit/878d4c9d4162e938f786b2da5a15d8072682209c))


### Reverts

* eslint back to 8.5.0 ([ad65da3](https://github.com/zthun/works/commit/ad65da3104eab8673ca5d5cb78f83e6f2eb24842))



### [3.0.5](https://github.com/zthun/works/compare/v3.0.2...v3.0.5) (2022-01-15)


### Bug Fixes

* circular progress now properly uses size mapping ([5fd01bf](https://github.com/zthun/works/commit/5fd01bf4acf276863067684c0ce7860598901822))
* the top nav spinner now displays properly in the header ([878d4c9](https://github.com/zthun/works/commit/878d4c9d4162e938f786b2da5a15d8072682209c))


### Reverts

* eslint back to 8.5.0 ([ad65da3](https://github.com/zthun/works/commit/ad65da3104eab8673ca5d5cb78f83e6f2eb24842))



### [3.0.4](https://github.com/zthun/works/compare/v3.0.2...v3.0.4) (2022-01-15)


### Bug Fixes

* circular progress now properly uses size mapping ([5fd01bf](https://github.com/zthun/works/commit/5fd01bf4acf276863067684c0ce7860598901822))
* the top nav spinner now displays properly in the header ([878d4c9](https://github.com/zthun/works/commit/878d4c9d4162e938f786b2da5a15d8072682209c))


### Reverts

* eslint back to 8.5.0 ([ad65da3](https://github.com/zthun/works/commit/ad65da3104eab8673ca5d5cb78f83e6f2eb24842))



### [3.0.3](https://github.com/zthun/works/compare/v3.0.2...v3.0.3) (2022-01-15)


### Bug Fixes

* circular progress now properly uses size mapping ([5fd01bf](https://github.com/zthun/works/commit/5fd01bf4acf276863067684c0ce7860598901822))
* the top nav spinner now displays properly in the header ([878d4c9](https://github.com/zthun/works/commit/878d4c9d4162e938f786b2da5a15d8072682209c))


### Reverts

* eslint back to 8.5.0 ([ad65da3](https://github.com/zthun/works/commit/ad65da3104eab8673ca5d5cb78f83e6f2eb24842))



### [3.0.2](https://github.com/zthun/works/compare/v3.0.1...v3.0.2) (2022-01-14)


### Bug Fixes

* identity should return no content, not created for no user ([aec1d77](https://github.com/zthun/works/commit/aec1d7775b0704033a0b3c0979a08766350e4484))
* the routes for privacy and terms are no longer needed ([a2c22a6](https://github.com/zthun/works/commit/a2c22a6c6c05ec1eae7d7d334f46666338e9db60))
* the works.api now properly adds in the standard controllers ([9827e5e](https://github.com/zthun/works/commit/9827e5e0b6d6858bc38ae31dbfcca482b1182d17))
* useWebApp should now properly be exported ([28344c9](https://github.com/zthun/works/commit/28344c90b4f61f1766f468341be2211711352b56))



### [3.0.1](https://github.com/zthun/works/compare/v3.0.0...v3.0.1) (2021-12-23)


### Bug Fixes

* container binary should now be correct ([5c80fa0](https://github.com/zthun/works/commit/5c80fa0ef53fbcbc45319c7ffc1998c8c7532065))
* docker installation ([b05225c](https://github.com/zthun/works/commit/b05225cbe16137a038b02831bfdfbbeee97c6d92))
* useIdentityService and selectAvatar should now be exported properly ([a0828cb](https://github.com/zthun/works/commit/a0828cbee643e9f62b49bb00c4fd86373836172b))



## [3.0.0](https://github.com/zthun/works/compare/v2.4.1...v3.0.0) (2021-12-22)


### ⚠ BREAKING CHANGES

* the top nav avatar has become the image source component
* the top nav is now app based and less configurable
* renamed apps module to applications module
* removed the profile and login from react
* you now can deploy individual versions of services
* removed images no longer relevant to works.nest
* removed the auth module from works.nest.  This has transitioned over to roadblock

### Features

* a route option can now have a description ([2123a74](https://github.com/zthun/works/commit/2123a74034d27f5b1268309662f42a32cbfa6896))
* a web app can now copy another web app ([0e1468c](https://github.com/zthun/works/commit/0e1468ce1d0208a01300cd0b7d8e091193fc1808))
* added a health indicator button ([294572b](https://github.com/zthun/works/commit/294572b46b10a4b748181d83a7b398b622b7c154))
* added a hook to get the web app by id ([448ecb3](https://github.com/zthun/works/commit/448ecb3c9db8bbdc04b989450e7ce9da597530fd))
* added a memory vault client for easier unit testing ([dd533a2](https://github.com/zthun/works/commit/dd533a2581c4244c399613cfc16fb009dbd515bb))
* added local route site map navigation ([aeece73](https://github.com/zthun/works/commit/aeece73df827bf36025a2674093bbc0bd5060846))
* added real icons for each app ([9309a6e](https://github.com/zthun/works/commit/9309a6e304bdd34c4e200c3232c0060e6259b27b))
* added the apps client ([205c681](https://github.com/zthun/works/commit/205c681dfc534c00052f739d1bac3ee17f5e8d70))
* added the apps microservice ([65ac076](https://github.com/zthun/works/commit/65ac076498a3883241c8519f04171f0171da5a11))
* added the use safe state hook ([5ae550e](https://github.com/zthun/works/commit/5ae550e4d72e9f6596e636335195381ffbf78e92))
* apps now have source information ([b895f55](https://github.com/zthun/works/commit/b895f5539c716b77c51702c1fc89eed67461c2e4))
* removed images no longer relevant to works.nest ([6ee2df8](https://github.com/zthun/works/commit/6ee2df80469f48a2fbbab8e7930249f4a169b16b))
* removed the auth module from works.nest.  This has transitioned over to roadblock ([06ce096](https://github.com/zthun/works/commit/06ce096e4bd014a3793c97fa5f7457b075ca0535))
* removed the profile and login from react ([37b3d66](https://github.com/zthun/works/commit/37b3d66fee9e42722616f708a7f784af0692b5f9))
* the apps and routes now have descriptions ([7bedb9f](https://github.com/zthun/works/commit/7bedb9fcbd13a40abb2184821e698d51653194fd))
* the top nav avatar has become the image source component ([fa96f84](https://github.com/zthun/works/commit/fa96f840ff88fe95cc5c75083ec0b66c6ca723f5))
* the top nav can now display routes ([15c8e45](https://github.com/zthun/works/commit/15c8e45bc3e13f31ed5510ec506160e6c6d6c6f5))
* the top nav is now app based and less configurable ([f2c71c6](https://github.com/zthun/works/commit/f2c71c62182fdc0d227aa4d9a9d11022cb513a38))
* the top nav now displays the server health ([65e2374](https://github.com/zthun/works/commit/65e23745dabc2510c1c6e9f97a72d585e931a649))
* the top nav now shows descriptions ([c8b0bbe](https://github.com/zthun/works/commit/c8b0bbef011d309b0c38d1f1cfee3ba0ebbec2dc))
* works.apps now includes assets ([ff095c5](https://github.com/zthun/works/commit/ff095c5e2c742cdc00c2e3d0f1de7c2ef944dd87))
* you can now set a generic avatar on the route option ([4f97b4a](https://github.com/zthun/works/commit/4f97b4a09da1d3acf3a82ed34e082ed677d96fc5))
* you can now set the name of a route option ([57ef7d8](https://github.com/zthun/works/commit/57ef7d8f6c1389e2c02ad5176976772646b84176))
* you now can deploy individual versions of services ([c82c700](https://github.com/zthun/works/commit/c82c700d5807d19c7640291edb90e9cc02e7a950))


### Code Refactoring

* renamed apps module to applications module ([3ed9a04](https://github.com/zthun/works/commit/3ed9a04de4ea2aa2723b0bee6931667fb7d37fb5))



### [2.4.1](https://github.com/zthun/works/compare/v2.4.0...v2.4.1) (2021-12-21)


### Bug Fixes

* don't import from a bucket ([8e8665c](https://github.com/zthun/works/commit/8e8665c7bb7ee2cb4a1631e781fc2172234cfc38))



## [2.4.0](https://github.com/zthun/works/compare/v2.3.0...v2.4.0) (2021-12-21)


### Features

* added a root application module that standardizes routes and cross cutting features ([b1979cf](https://github.com/zthun/works/commit/b1979cf30400eee2a06c6a8621c2a4b902619ec0))
* added the security controller ([ff83859](https://github.com/zthun/works/commit/ff83859f9e1daab4efebfd2ca3a81f695c1e9b4c))


### Bug Fixes

* removing the options module ([2618edb](https://github.com/zthun/works/commit/2618edbf13c014c8de4e15f906337ffd70090839))



## [2.3.0](https://github.com/zthun/works/compare/v2.2.1...v2.3.0) (2021-12-20)


### Features

* added the security module for cross cutting cookie reads ([4b51273](https://github.com/zthun/works/commit/4b512731c1d0117b0493d5071e3404f05e71d8e9))
* combined the configs into one system configuration ([16b9280](https://github.com/zthun/works/commit/16b928042a664448ca935e77cb3971b2ce77f1b4))
* moved cookie rules to the security module ([5433621](https://github.com/zthun/works/commit/54336214318a8fde31089b1f3c8ccab56e1e945a))


### Reverts

* hostname ([81febbd](https://github.com/zthun/works/commit/81febbd37fd8508673811cf70a1056646860330f))



### [2.2.1](https://github.com/zthun/works/compare/v2.2.0...v2.2.1) (2021-12-20)


### Bug Fixes

* export the additional cookie rules ([2829474](https://github.com/zthun/works/commit/28294746ff7b7118f4d1cffb49b06ef1349bc80c))



## [2.2.0](https://github.com/zthun/works/compare/v2.1.0...v2.2.0) (2021-12-20)


### Features

* added a cookie contract ([fc86937](https://github.com/zthun/works/commit/fc869370626fe89ed24db7935ee2e0f78fe94a09))
* added teh cookies microservice ([405b01c](https://github.com/zthun/works/commit/405b01c86efc96f2b0604f1fd65087a8aa02f8f2))
* added the cookies client ([7666f91](https://github.com/zthun/works/commit/7666f91fd755f613a1248b635ab6f5b36d6e5ba3))
* adding cookies microservice to deployment ([d44b977](https://github.com/zthun/works/commit/d44b977ef04764b39d2c8aa5a16ac9bdc71bae0f))
* the nest package no longer depends on jsonwebtoken ([2ab34ab](https://github.com/zthun/works/commit/2ab34ab34db881dc3c9cd91b4f45417f35805ce2))



## [2.1.0](https://github.com/zthun/works/compare/v2.0.0...v2.1.0) (2021-12-19)


### Features

* added a dev smtp server ([1e0a1f5](https://github.com/zthun/works/commit/1e0a1f5516bd287b971d34a96e52ec6d6afa82e2))
* added support for an assertion that a sendable proxy sends a pattern and payload ([a843848](https://github.com/zthun/works/commit/a84384842eda4c0395ea7d8b1b1247ac58f20c60))
* added the new users microservice ([cb7d0f6](https://github.com/zthun/works/commit/cb7d0f69e2a44b42aea1c53dd7313c6de1051dd5))
* added the notifications client ([76e53fd](https://github.com/zthun/works/commit/76e53fd961808f0d45b5b13abbe35e61d1f30cb8))
* added the notifications micro service ([54f506f](https://github.com/zthun/works/commit/54f506ffa1816bb013212790a04a243e0f838b73))
* added the notifications microservice ([5e74ae5](https://github.com/zthun/works/commit/5e74ae5331000713b7322c4b62b8b2496e691e87))
* added the users microservice ([3a9ae75](https://github.com/zthun/works/commit/3a9ae753cae212dc98e0daad969e576cc2259bbe))
* added the users package ([c5a40a6](https://github.com/zthun/works/commit/c5a40a6fb6e2061f98aa96692977614ae30b78cd))
* added the vault client ([fcddca9](https://github.com/zthun/works/commit/fcddca956b85d99969cc71b31c7dec2f5e202971))
* added the vault microservice ([fcb9989](https://github.com/zthun/works/commit/fcb99890803e1e8018b41e43bbcf285821be891e))
* added works.microservices ([9864b77](https://github.com/zthun/works/commit/9864b77d6526d91f4b8f77cf1a4bb58e6b1c70c9))
* adding deployments for new microservices ([64551d2](https://github.com/zthun/works/commit/64551d28bd72222a6d2d334e9c017daa601a2fc4))
* moved the configurations to a new config module ([8656036](https://github.com/zthun/works/commit/8656036f42db5fd666a19504779876cb5d8a4bc9))
* no longer depends on nodemailer ([7ac6e17](https://github.com/zthun/works/commit/7ac6e172d4ae0d46188973990de7f94475f96135))
* update to use the new notifications microservice ([7625e52](https://github.com/zthun/works/commit/7625e5233e8720996703e98175e3b15aef58b76a))
* works.nest no longer depends on works.dal ([3b53905](https://github.com/zthun/works/commit/3b53905bd5c93c5627f0706d4f4b5ae89cdd8c09))


### Bug Fixes

* reactivating your account now properly ends the spinner ([1eecba2](https://github.com/zthun/works/commit/1eecba2c004bc996c70914256ba1e412792803b0))
* removing npm engine requirement from works.server and works.api ([cb4461b](https://github.com/zthun/works/commit/cb4461b9ba1d881268c0623e5ba76e5f51d5dd1f))
* stopping an in memory database now cleans the instance ([2c8cc0c](https://github.com/zthun/works/commit/2c8cc0c40197e63255d71887804651dd179c7de1))
* updated packages with bug fixes ([dc49918](https://github.com/zthun/works/commit/dc499187c0a25d1a35f5c53ca1290c1bae40e135))



## [2.0.0](https://github.com/zthun/works/compare/v1.4.0...v2.0.0) (2021-11-15)


### ⚠ BREAKING CHANGES

* updating to latest packages
* deprecated the themes package
* removed the doc styles
* updated to latest typedoc spec
* removed entity viewer styles
* removed the typedoc icon styles
* removed the typedoc type styles
* remove the flags styles
* removing the typedoc comment styles
* removed the typedoc signature list viewer styles
* removing markdown styles
* removed login styles
* the login state context has been removed
* removing all profile styles
* removed the profile avatar form styles
* removed the profile button styles
* removed the profile form styles
* fully removed top styles
* removed topnav styles
* removing deprecated top bar
* removing page themes
* removed all card styles
* removed loading styles
* removed content in favor of css in js
* the http code card styles have been removed
* removed paper card styles in exchange for jss
* switching to tss-react
* alert snackbar has been removed
* alerts now use tss-react for styling
* updated to latest material design
* removed deprecated services
* removed deprecated packages
* removed deprecated packages

### Features

* added support for code context display ([37fb522](https://github.com/zthun/works/commit/37fb522ceaf252de196d45b53a64cadd91d85fcb))
* added the ability to get the category and severity of a code ([3c0d4f2](https://github.com/zthun/works/commit/3c0d4f2722e3e81e6a1348d09aea98424d750431))
* added the http module ([62e6f95](https://github.com/zthun/works/commit/62e6f957034e4743060324d1737300e1fef8084a))
* added the new card avatar component ([7ca36cc](https://github.com/zthun/works/commit/7ca36cc85794a074b73b590edc6b9cb8e7504038))
* added the route option contract ([b4a6d13](https://github.com/zthun/works/commit/b4a6d138d0079c4fe372b388d61c9c3804fd7c40))
* added the shade function for lighten and darken colors ([7b8ab1e](https://github.com/zthun/works/commit/7b8ab1e0fc6bf95517f7f0166fe9ce3f36a57fe3))
* added the top nav avatar component ([be9974a](https://github.com/zthun/works/commit/be9974a28b388c873f655a1c1b3c88e4e5b6ac1b))
* added theme sizes for max and fonts ([5f7307b](https://github.com/zthun/works/commit/5f7307bd53940b22abc50af40e7df532beacdb67))
* added zoom and zoom out buttons ([36471e9](https://github.com/zthun/works/commit/36471e907a87555fb222048dd0614df767a6d261))
* adding pnpm support ([4ecdfa0](https://github.com/zthun/works/commit/4ecdfa0d2744b24bbda54f7663eeffcde709da46))
* alert snackbar has been removed ([858b450](https://github.com/zthun/works/commit/858b4504b19b1aef43fe72971d45aee9856b8048))
* alerts now use tss-react for styling ([104e9e4](https://github.com/zthun/works/commit/104e9e41d81d0c3920fa28ab50bf724827fae706))
* converted circular backdrop to use css in js ([7a0da36](https://github.com/zthun/works/commit/7a0da36e96a93455023b8a7f45bf699f97f84043))
* converted paper card to use css in js ([6d225b1](https://github.com/zthun/works/commit/6d225b146f8e728dad688fd11dbdbf39c995f46a))
* deprecated the themes package ([043d883](https://github.com/zthun/works/commit/043d88338da2f8de75aa825131cfabddde0ff8eb))
* fully removed top styles ([d643e01](https://github.com/zthun/works/commit/d643e01b9b790fca3d54e3e39348508e208810a6))
* page themes are now stored directly in the html ([5976774](https://github.com/zthun/works/commit/59767746de001a6f27c5b4bab274bc850d889c63))
* remove the flags styles ([fb86ba3](https://github.com/zthun/works/commit/fb86ba34fa7da2fdf4064a9c7dd18167f8fc8e40))
* removed all card styles ([f46dcff](https://github.com/zthun/works/commit/f46dcff964911b7372ab533a18c64264e6b52069))
* removed content in favor of css in js ([c2de6d4](https://github.com/zthun/works/commit/c2de6d4cb0b8db1cf2d5d0bdf0c811ea3aa86bdd))
* removed entity viewer styles ([5cb4839](https://github.com/zthun/works/commit/5cb4839cdf4920b627176b8700e676e8746230ef))
* removed loading styles ([d480f56](https://github.com/zthun/works/commit/d480f560737be3dce437db48972aedfacfcc2725))
* removed login styles ([24581f8](https://github.com/zthun/works/commit/24581f832bb9c5e9bffa108ea47cab6f3d15ccca))
* removed paper card styles in exchange for jss ([7ab082a](https://github.com/zthun/works/commit/7ab082a7068fa2f0677e5f86e81d25df2ad388b5))
* removed the doc styles ([ad2da62](https://github.com/zthun/works/commit/ad2da624f420a3df6a223fd0c1eb1860950f4912))
* removed the profile avatar form styles ([6ae3ee0](https://github.com/zthun/works/commit/6ae3ee05ad043e8fd18fa6186ea7d5fecd674af4))
* removed the profile button styles ([c4bbdd9](https://github.com/zthun/works/commit/c4bbdd9c560bd1676095c7c978c61a6a5ca9370b))
* removed the profile form styles ([76c8baa](https://github.com/zthun/works/commit/76c8baace7433b4d884f0f763d731ebeba52873a))
* removed the typedoc icon styles ([59146e9](https://github.com/zthun/works/commit/59146e913a525bb5567a4c1638055d0bd9b7aa82))
* removed the typedoc signature list viewer styles ([9856f88](https://github.com/zthun/works/commit/9856f88bbdc1a37feb96f2ab9906637c4b250526))
* removed the typedoc type styles ([947d2e1](https://github.com/zthun/works/commit/947d2e185a960684f9ea9ee9c13095b6a8ad64b4))
* removed topnav styles ([364008f](https://github.com/zthun/works/commit/364008fcc80e1b159b70209d59d6eac99578bcbe))
* removing all profile styles ([9ed296e](https://github.com/zthun/works/commit/9ed296e1cde6dab2ccbbf5076c6f333d81bf2874))
* removing deprecated top bar ([e127e86](https://github.com/zthun/works/commit/e127e86f839e2678ee72f6a3ed9a5e4bdf40752c))
* removing markdown styles ([f161069](https://github.com/zthun/works/commit/f161069f759f4014c59e0346213af7aff5dee7e0))
* removing page themes ([67ef1a6](https://github.com/zthun/works/commit/67ef1a6672a33459a17af240c309cf55eb69e652))
* removing the typedoc comment styles ([0728d52](https://github.com/zthun/works/commit/0728d5261be031819515fc252fc65a7ade877cee))
* switching to tss-react ([12bb360](https://github.com/zthun/works/commit/12bb360cd24e412c508be1526b2380c687e11307))
* the http code card styles have been removed ([356a904](https://github.com/zthun/works/commit/356a9048f6d55ea5090d3cee672111f7c176748c))
* the login state context has been removed ([c381c34](https://github.com/zthun/works/commit/c381c34e394c2d39b2632f5d928485d21a001ec1))
* the paper card can now render data urls that buffer svg images ([90f8320](https://github.com/zthun/works/commit/90f83201d28060ff09694cf47d13e68b7029d617))
* the top nave has been converted to use jss ([fecbcd0](https://github.com/zthun/works/commit/fecbcd04408e6d127b115aefe5fca242a017a7a8))
* the web app layout now provides the zthunworks theme ([acfbaf5](https://github.com/zthun/works/commit/acfbaf5aca76f1d0df1b4c656cf5eb569ecc04aa))
* updated to latest material design ([7dc6c94](https://github.com/zthun/works/commit/7dc6c94e3b267f8bf84949c85c742d8b6dc7cdb7))
* updated to latest typedoc spec ([290cacb](https://github.com/zthun/works/commit/290cacb2db4619e8e03f1a14fe871de15f51a069))
* updating to material 5 ([b87ada5](https://github.com/zthun/works/commit/b87ada528231b3165125064b2ecf1a2bab1c64b3))
* web apps can now contain a title and description ([b90c8a4](https://github.com/zthun/works/commit/b90c8a4d3679f9088868a16084986e2ca10afe20))


### Bug Fixes

* the profile should now be set to null if the read fails ([b26fdd7](https://github.com/zthun/works/commit/b26fdd778b1795bb95ce2b6dac6974b65e907508))


### Miscellaneous Chores

* removed deprecated packages ([94cc618](https://github.com/zthun/works/commit/94cc6180d12ce87e4f5f3604b98f3915cf339b96))
* removed deprecated packages ([2747afc](https://github.com/zthun/works/commit/2747afcff460dc59e05dad9479a97b5db44db379))
* removed deprecated services ([9145902](https://github.com/zthun/works/commit/9145902706fa1209d638b30d888eeaefa680f19a))
* updating to latest packages ([d1fe1ba](https://github.com/zthun/works/commit/d1fe1baf3bd92aa56f46b7d05f1a2d4e330e5e03))



## [1.4.0](https://github.com/zthun/works/compare/v1.3.0...v1.4.0) (2021-09-03)


### Features

* added the renderMarkdownPage method ([753d40d](https://github.com/zthun/works/commit/753d40db0e311b56a80ea9161f96cb92bfebc8eb))
* added the web app layout component ([bf181c3](https://github.com/zthun/works/commit/bf181c3028ff55c7fd6c9b679aa72b4c7d95e24a))
* adding the api to the compose file ([d16a0af](https://github.com/zthun/works/commit/d16a0af3092699299e31825ce785759353eec1bb))
* adding works.api ([1901992](https://github.com/zthun/works/commit/190199283f7ca0d64af5908c1d36ca92abe1226c))
* the default conf no longer turns off the proxy pass ([712ae8e](https://github.com/zthun/works/commit/712ae8ef9631a56932e666ba6168957973530df1))
* the properties of the IZComponentStyle are now optional ([6e9d1bd](https://github.com/zthun/works/commit/6e9d1bd05bc20048a21b00b62fba23b9ffab15eb))
* the properties on the IZComponentActionable are now optional ([5108d78](https://github.com/zthun/works/commit/5108d787d7e9b5255f334201702a738687dd46db))
* the properties on the IZComponentConfirmable are now optional ([a78cdaf](https://github.com/zthun/works/commit/a78cdaf9c5a0b868d1efb8fa12abb9b0459053fe))
* the proxy now enables the api ([a7141c5](https://github.com/zthun/works/commit/a7141c59f4be1934d830627e8e1c0e2e41c5c826))
* the status code page now supplies a means to render the page as a routed page ([91cc460](https://github.com/zthun/works/commit/91cc460e10451d6d2a54677c9b20a885615c4de5))
* you can now specify the avatar element on the top nav for styles ([20b94a9](https://github.com/zthun/works/commit/20b94a9bc228f08c035a8fea9d27c0f8a4b96ac2))



## [1.3.0](https://github.com/zthun/works/compare/v1.2.0...v1.3.0) (2021-09-02)


### Features

* updated the app version ([ac2a383](https://github.com/zthun/works/commit/ac2a383b7ea083cb62da35e9a04c1ea96b50c775))


### Bug Fixes

* index now properly exports the top nav and web apps context ([a284ce5](https://github.com/zthun/works/commit/a284ce59449f41083a0e55233a30a3dd338246b2))
* the top nav and web apps now import from the correct spot ([bb57fec](https://github.com/zthun/works/commit/bb57fec9170bd87741b6cdbd2f5da08a04757ac5))



## [1.2.0](https://github.com/zthun/works/compare/v1.1.0...v1.2.0) (2021-09-01)


### Features

* a web app can set an icon and source code ([8588076](https://github.com/zthun/works/commit/85880766f16e1fae2c7d45ecb87c54ff121a961c))
* added a logger message handler ([becf55f](https://github.com/zthun/works/commit/becf55fc368eb7a2c38d3dc822e520634a7eab80))
* added an alert error message handler ([8bbcc40](https://github.com/zthun/works/commit/8bbcc40848c8fa19aef4078b4667831b0de2e616))
* added common mime types ([20f4059](https://github.com/zthun/works/commit/20f4059c25e03db95dd706e43298c925092d3888))
* added composite logger ([dc2c267](https://github.com/zthun/works/commit/dc2c2672fd6302ec9121248788a760ce8a148a3c))
* added the alert list component and alert service context ([c9c6545](https://github.com/zthun/works/commit/c9c6545e0d77d42de9a8f571b1edcbc903f7e616))
* added the apps module and controller ([b3a3a2b](https://github.com/zthun/works/commit/b3a3a2b9142802530b28dc4ce5a32ed29a0e4298))
* added the contract for a web app ([1ecc030](https://github.com/zthun/works/commit/1ecc030208d0daf007cea89454df8112ef26bd1c))
* added the logger package ([77a9cc7](https://github.com/zthun/works/commit/77a9cc72822ab3ec93eaeab777b241de78e56cb7))
* added the message handler interface ([378cf66](https://github.com/zthun/works/commit/378cf664cc40dbb1f890fff65adb9157910fa136))
* added the profile context in favor of the login state context ([d70e180](https://github.com/zthun/works/commit/d70e180b2e5cf4881add7737c6f40ad5dcdca9fc))
* added the standard error handler that unwraps messages ([d086b66](https://github.com/zthun/works/commit/d086b661bc6c0a5d27971de82dd33912790a2db3))
* added the web app service ([3a8421f](https://github.com/zthun/works/commit/3a8421ff75dc6baa1295158ebf9a43c8d412b1dd))
* added the web apps service context ([94c5a0d](https://github.com/zthun/works/commit/94c5a0db087dbd7be4508087cd1b34f76dee3ea1))
* added the window context ([c575903](https://github.com/zthun/works/commit/c57590367774ba248a714c5adb966b139aac2329))
* added the works.message package ([05498e4](https://github.com/zthun/works/commit/05498e4934315642ef7363a75af6e7b425bd079f))
* added works.error ([13b79a5](https://github.com/zthun/works/commit/13b79a595f5c632a231258bb2761e52337c0cf71))
* adding the error handler context ([a8663fd](https://github.com/zthun/works/commit/a8663fd1655c09f77fe8677ef4a9c7fedf69bcdc))
* alertlist style for message will properly preserve white space ([c08cfd2](https://github.com/zthun/works/commit/c08cfd28780986c15141af1af5f2a299e02da090))
* converted to use the alert service ([00eed9b](https://github.com/zthun/works/commit/00eed9b04a2a2af2866d1bff6c294e12d576feaa))
* nest now has a peer dependency on works.url ([3697ee5](https://github.com/zthun/works/commit/3697ee5034924e3f2fdb7ab70c3c49b8b3bdb3c1))
* removed the works menu ([ca91c25](https://github.com/zthun/works/commit/ca91c250ece4e133c71a23d4d1ef39f6d82d3817))
* status code page and http code card now use the http package ([b6b009e](https://github.com/zthun/works/commit/b6b009e965c8848ecfebc65c569bdbf1314dfe73))
* the app controller is now provided ([731c30a](https://github.com/zthun/works/commit/731c30a041b06de76e4cc5693a8d564d8290bc5f))
* the app service now returns the icons for the necessary apps ([6f04a90](https://github.com/zthun/works/commit/6f04a907a9d2da4d68896888b970a514894353c6))
* the client now uses the ZTopNav component ([8c5454b](https://github.com/zthun/works/commit/8c5454bd717628b96dba0101410cd3faf943aec2))
* the error objects have been deprecated from core ([02e6c2c](https://github.com/zthun/works/commit/02e6c2c16d060bde2f9b2238fda4f01f3047a231))
* the login page errors have been cleaned up ([f29442f](https://github.com/zthun/works/commit/f29442fe7ee0c357b833215569d99e014d8de9df))
* the top bar has been fully merged to the top  nav ([6471ee6](https://github.com/zthun/works/commit/6471ee63c832fdde71ccf63974dcfa827b3e96f3))
* the top nav should now properly display app icons ([1faaffe](https://github.com/zthun/works/commit/1faaffe965b648a996c18f109fcc99acda328868))
* updated default config for sock to path ws ([130a1ed](https://github.com/zthun/works/commit/130a1ed17258de4708f58472de0270a35233ab99))
* updated styles for the top nav ([32a9b53](https://github.com/zthun/works/commit/32a9b5306460ef09602648ec11ad9eec1145bd82))
* works.react now has peer dependencies on logger, message, and error ([f2c39d6](https://github.com/zthun/works/commit/f2c39d6f16f45da03d71b33abe1566f80dfb7eab))
* you can now parse and get info about data urls ([a3b2b6b](https://github.com/zthun/works/commit/a3b2b6bf0c3abfbd2bc1c34efb8ee59a27c256f5))
* you can now retrieve names and descriptions of codes ([3ceceb3](https://github.com/zthun/works/commit/3ceceb3e0367a3f2d122ec539b9eaa802b47f4ae))
* you can now retrieve the information about the url being built ([d78d194](https://github.com/zthun/works/commit/d78d194bc264a7a110ae4a87cf82d55c3086c233))


### Bug Fixes

* creating an account should now immediately log you in ([1525db0](https://github.com/zthun/works/commit/1525db023d969f8479070fadd452ee1fcd1788de))
* the profile page now properly handles errors ([69e47f0](https://github.com/zthun/works/commit/69e47f0a546e5eddc54d7c81c780cdf96c03551b))



## [1.1.0](https://github.com/zthun/works/compare/v1.0.0...v1.1.0) (2021-08-15)


### Features

* added a peer dependency on the works.http package ([f651f97](https://github.com/zthun/works/commit/f651f977bb2fc70aed0c810693aa4509435a7c9f))
* added the alert snackbar and content components ([6e38235](https://github.com/zthun/works/commit/6e382355a4f2012046e142b852bce4e5b5be6a46))
* added the http package ([3ea26e4](https://github.com/zthun/works/commit/3ea26e4d32a24841e80cd3ac9deb313b00cfccf4))
* added the options module and controller ([06e78d1](https://github.com/zthun/works/commit/06e78d16c44590f7a3b453721bfe288b807d2405))
* added the profile service ([f54e272](https://github.com/zthun/works/commit/f54e27222ecb90f636401ff822581eb97b8a5afe))
* deprecated profile service functions in favor of the profile service ([7b38062](https://github.com/zthun/works/commit/7b38062649cd7ace9e1f78de7b4487d1e72465f2))
* exported the IZHttpService interface ([8522248](https://github.com/zthun/works/commit/8522248a1e775dab6946395f1b11163888bb1037))
* the http codes have been deprecated in favor of the ones in works.http ([872faa3](https://github.com/zthun/works/commit/872faa3e42f2414526ccad720edb83854173488f))
* the http codes now all have names and descriptions ([71272f3](https://github.com/zthun/works/commit/71272f3a2471865d88134a7a574f35c68857c1c1))
* the markdown viewer now uses the http service ([e15c7e1](https://github.com/zthun/works/commit/e15c7e19a3dee1979af1a408fe8b4a7eff0b2dea))
* the profile page should now refresh immediately upon completing an action ([01a314a](https://github.com/zthun/works/commit/01a314abb217b6bb98441c2c7f06871ae8b4f8b1))
* the profile service can activate, deactive, and reactivate a profile ([5af7648](https://github.com/zthun/works/commit/5af76485f5f3a889d7999fe40caf7bcbe5e6f311))
* the profile service can create and recover accounts ([97f05a2](https://github.com/zthun/works/commit/97f05a2c5e7599d37ff7ea86517fd2dda11fb775))
* the profile service can handle login and logout ([0e867a1](https://github.com/zthun/works/commit/0e867a1e80898c841c948aa0c755e9682c30dd7b))
* the profile service can update and delete a profile ([58c6161](https://github.com/zthun/works/commit/58c61615d74bf895a3f53e4472c770326cdaa37b))
* the server now responds to the options call ([b516445](https://github.com/zthun/works/commit/b516445e43eec93c423b649565eda54279023c0b))
* you can now pop a subdomain ([f4f41e3](https://github.com/zthun/works/commit/f4f41e3aa1a4813db2ba7c5e0fd11e04bfceb0af))
* zthunworks themed apps now have standard body styles ([4294ecc](https://github.com/zthun/works/commit/4294ecc74034c4fc02b773a947b0f1ee135509c7))


### Bug Fixes

* the package images should now be exported ([d5b9de1](https://github.com/zthun/works/commit/d5b9de1e5ef385c7e73731fcce26f6e59c03dc76))



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
