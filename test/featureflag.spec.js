const fs = require('fs');
const { expect } = require('chai');
const FeatureFlags = require('../index');

describe('#initialize', () => {

  it('should initialize with default config', () => {
    const featureFlags = new FeatureFlags();
    expect(featureFlags.features).to.not.null;
    expect(featureFlags.features).to.not.undefined;
  });

  it.only('should read config file', async () => {
    fs.writeFileSync('features.json',`
      {
        "feature" : "true"
      }
    `);
    const featureFlags = new FeatureFlags();
    fs.unlinkSync('features.json');

    expect(featureFlags.features).to.not.null;
    expect(featureFlags.features).to.not.undefined;

    expect(await featureFlags.isEnabled('feature')).to.true;
  })

});

