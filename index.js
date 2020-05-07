const fs = require('fs');
const dotenv = require('dotenv');
const debug = require('debug')('featureflag-nodejs');
const convertToCamelCase = require('lodash.camelcase')


class FeatureFlags {


  // default options: 
  // {
  //   configFile: './features.js',
  //   envPrefix: 'FEATURE_',
  //   envConvertToCamelCase: true
  // }
  //

  constructor(options= {}) {
    dotenv.config(); // use .env file to populate environment variables
    this._features = {};

    const configFile = options.configFile || './features';
    debug('using config file %o', configFile)

    try{
      const config = require(configFile);
      this.loadJson(config);
    }catch(err) {
      debug('config file missing');
    }
    
    const envPrefix = options.envPrefix || 'FEATURE_';
    const envConvertToCamelCase = options.envConvertToCamelCase || true;
    this.loadEnv(envPrefix, envConvertToCamelCase);
  }

  get features() {
    return this._features;
  }

  loadJson(json) {
    this._features = {
      ...this._features,
      ...json,
    };
    debug('loaded config file %o, new feature list is : %o', json, this._features);
  }

  loadEnv(envPrefix, envConvertToCamelCase) {
    debug('loading feature flags from env using prefix %o and convertToCamelCase %o'
      , envPrefix, envConvertToCamelCase);
    const validEnvKeys = Object.keys(process.env)
      .filter(env => env.startsWith(envPrefix));

    debug(validEnvKeys)
    const features = {};

    for(const envKey of validEnvKeys) {
      const trimmed = envKey.replace(envPrefix, '');
      const key = envConvertToCamelCase ?
        convertToCamelCase(trimmed) : trimmed;
      const val = process.env[envKey];
      features[key] = val;
      debug('got feature from env %o %o', key, val)
    }

    this.loadJson(features);

  }

  // made async for future purpose, to support external feature toggling
  async isEnabled(featureName) {
    debug('looking for feature %o', featureName);
    const feature = this._features[featureName];
    if(typeof feature === 'undefined') {
      debug('feature is undefined, hence returning false');
      return false;
    };
    if(typeof feature === 'string') {
      debug('got string value for feature %o', feature);
      return feature.toLowerCase() === 'true';
    }
    return !!feature;
  }

};

module.exports = FeatureFlags
