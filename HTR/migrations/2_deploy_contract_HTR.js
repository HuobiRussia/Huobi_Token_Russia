const HTR = artifacts.require("HTR");

module.exports = function(deployer) {
  deployer.deploy(HTR).then( ()=>{
    const address =  HTR.deployed().address;  
    console.log("HTR", address);
  });
};