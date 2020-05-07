
const dotenv = require('dotenv');



class FeatureFlags {


  // default options: 
  // {
  //   configFile: 'features.js',
  //   envPrefix: 'FEATURE_'
  // }
  //

  #features = {};

  constructor(options= {}) {
    dotenv.config(); // use .env file to populate environment variables
    const { configFile } = options.configFile || 'features';
    const config = require(configFile);
    console.log(config)
  }

  get features() {
    return this.#features;
  }

};

module.exports = FeatureFlags
