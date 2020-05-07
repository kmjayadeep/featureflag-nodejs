const fs = require('fs');
const dotenv = require('dotenv');
const debug = require('debug')('featureflag-nodejs');



class FeatureFlags {


  // default options: 
  // {
  //   configFile: './features.js',
  //   envPrefix: 'FEATURE_'
  // }
  //

  constructor(options= {}) {
    dotenv.config(); // use .env file to populate environment variables
    this._features = {};

    const configFile = options.configFile || './features';
    debug('using config file %o', configFile)

    try{
      const config = require(configFile);
      this.loadConfig(config);
    }catch(err) {
      debug('config file missing');
    }


  }

  get features() {
    return this._features;
  }

  loadConfig(config) {
    this._features = {
      ...this._features,
      ...config,
    };
    debug('loaded config file %o, new feature list is : %o', config, this._features);
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
