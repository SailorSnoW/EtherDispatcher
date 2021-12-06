const Dispatcher = artifacts.require("Dispatcher");

module.exports = function (deployer) {
  // should change these addresses before deploying
  const address1 = '';
  const address2 = '';
  const address3 = '';

  deployer.deploy(Dispatcher, address1, address2, address3);
};
