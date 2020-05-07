const fs = require('fs');
const { expect } = require('chai');
const FeatureFlags = require('../index');

describe('#initialize', () => {

  it('should initialize with default config', () => {
    const featureFlags = new FeatureFlags();
    expect(featureFlags.features).to.not.null;
    expect(featureFlags.features).to.not.undefined;
  });

  it('should read config file', async () => {
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
  });

  it('should read env variables', async() => {
    process.env['FEATURE_TEST_FEATURE'] = "true";

    const featureFlags = new FeatureFlags();
    expect(featureFlags.features).to.not.null;
    expect(featureFlags.features).to.not.undefined;

    expect(await featureFlags.isEnabled('testFeature')).to.true;
  });

  it('should read env file', async() => {
    fs.writeFileSync('.env',`
      FEATURE_TEST_FEATURE2=true
    `);
    const featureFlags = new FeatureFlags();
    fs.unlinkSync('.env');
    expect(featureFlags.features).to.not.null;
    expect(featureFlags.features).to.not.undefined;

    expect(await featureFlags.isEnabled('testFeature2')).to.true;
  });

});

