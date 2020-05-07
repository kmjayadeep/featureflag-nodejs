# featureflag-nodejs

Feature flags implementation for nodejs, with support for js or json config files, environment variables and .env files.

## What is a feature flag?

A feature toggle (also feature switch, feature flag, feature flipper, conditional feature, etc.) is a technique in software development that attempts to provide an alternative to maintaining multiple branches in source code (known as feature branches), such that a software feature can be tested even before it is completed and ready for release. Feature toggle is used to hide, enable or disable the feature during runtime. For example, during the development process, a developer can enable the feature for testing and disable it for other users.

source: wikipedia

## Installation

`npm i featureflag-nodejs`

## Usage

create a file features.json with the following content

```
{
    "awesomeFeature": true
}
```
or export environment variable as 
`export FEATURE_AWESOME_FEATURE=true`

```javascript
const FeatureFlag = require('featureflag-nodejs');
const featureFlag = new FeatureFlag();

featureFlag.isEnabled('awesomeFeature').then(isEnabled => {
    if(isEnabled){
        //your awesome feature
    }else{
        //old feature
    }
})
```

or using async-await

```javascript
const FeatureFlag = require('featureflag-nodejs');
const featureFlag = new FeatureFlag();

// make sure this snippet is inside an async function
if(await featureFlag.isEnabled('awesomeFeature')){
    if(isEnabled){
        //your awesome feature
    }else{
        //old feature
    }
}
```

## Options

`FeatureFlag` class accepts an options object with the following properties

1. configFile -*The config file to read where feature flags are specified*. Default value is `./features` (accepts both json and js files which can be imported using `require` method)
2. envPrefix - *Environment variables which has the specified prefix will be considered as feature flags and loaded*. Default value is `FEATURE_`
3. envConvertToCamelCase - *Usually environment variables are specified in UPPERCASE with undescore separated words. Setting this to true converts them into camelCase*. Default value is true

example custom configuration:

```javascript
const featureFlags = new FeatureFlags({
    configFile: './features/config.json',
    envPrefix: 'FEAT_',
    envConvertToCamelCase: false
});
```

## Why promises?

The reason why `isEnabled` method returns a promises instead of a simple boolean value is that, this library can be further customized or extended to support better ways to configure feature flags. In case the flags has to be configured externally and retrieved through an API, the library can be extended to support that without making any change to the codebase. 
