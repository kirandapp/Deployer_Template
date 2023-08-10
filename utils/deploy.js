const { ethers, run } = require('hardhat');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const cp = require('child_process');

const contractDetailsFile = 'contractDetails.json';
const readContractDetails = () => {
  try {
    const contractDetailsData = fs.readFileSync(contractDetailsFile, 'utf8');
    return JSON.parse(contractDetailsData);
  } catch (error) {
    return {};
  }
};
const writeContractDetails = (contractDetails) => {
  fs.writeFileSync(contractDetailsFile, JSON.stringify(contractDetails, null, 2), 'utf8');
};

const getProviderUrl = (chainId) => {
  console.log("CHAIN ID -",chainId);
  // Add logic to retrieve provider URL based on the chain ID
  // Example: switch statement to set different URLs for different chain IDs
  switch (chainId) {
    case 1:
      return 'https://mainnet.infura.io/v3/';
    case 56:
      return 'https://bsc-dataseed.binance.org';
    case 97:
      return 'https://data-seed-prebsc-1-s1.binance.org:8545/';
    case 137:
      return 'https://polygon.llamarpc.com';
    case 250:
      return 'https://rpcapi.fantom.network';
    case 4002:
      return 'https://rpc.testnet.fantom.network'
    case 42161:
      return 'https://arb1.arbitrum.io/rpc';
    // case 11155111:
    //   return '';
    // Add more cases for additional chain IDs as needed
    default:
      throw new Error('Chain ID not supported');
  }
};
const getNetwork = (chainId) => {
  switch (chainId) {
    case 1:
      return 'mainnet';
    case 56:
      return 'bsc';
    case 97:
      return 'bscTestnet';
    case 137:
      return 'polygon';
    case 250:
      return 'opera';
    case 4002:
      return 'ftmTestnet';
    case 42161:
      return 'arbitrumOne';
    case 11155111:
      return 'sepolia';
    // Add more cases for additional chain IDs as needed
    default:
      throw new Error('Chain ID not supported');
  }
};

const compileAndDeployBigEyes = async (contractName, templateName, name, symbol, decimals, totalSupply, verify, privateKey, chainId) => {
  try {
    console.log("inside compileAndDeployBigEyes");
    const templateContract = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'Templates', `${templateName}.sol`), 'utf8');
    
    const updatedContractCode = templateContract.replace('CONTRACTNAME',contractName);
    
    if (updatedContractCode === templateContract) {
      throw new Error("Placeholder 'CONTRACTNAME' not found in the contract template.");
    }
    //write the updated contract to a new file
    fs.writeFileSync(`./contracts/Generated/${contractName}.sol`, updatedContractCode, 'utf8');
    
    // compile
    await run('compile');
    const provider = new ethers.providers.JsonRpcProvider(getProviderUrl(chainId));
    const wallet = new ethers.Wallet(privateKey, provider);

    //deploy the new contract
    const newContract = await ethers.getContractFactory(contractName);
    const newcontract = await newContract.connect(wallet).deploy(name, symbol, decimals, totalSupply);
    await newcontract.deployed();
    console.log("Contract Deployed at :- ", newcontract.address);

    const response = {
      message: 'New Contract deployed successfully',
      contractName: contractName,
      contractAddress: newcontract.address,
    };
    //generated contract path   
    const contractPath = `contracts/Generated/${contractName}.sol:${contractName}`;
    console.log("contract path", contractPath);

    if (verify != true) {
      const contractDetails = readContractDetails();
      contractDetails[newcontract.address] = {
        contractName,
        name,
        symbol,
        decimals,
        totalSupply,
        chainId,
      };
      writeContractDetails(contractDetails);
    } else {
      // verify contract
      await verifyContract(contractPath, newcontract.address, getNetwork(chainId), [name, symbol, decimals, totalSupply]);
    }
    
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(' in Contract deployment failed');
  }
};

const compileAndDeployDejitaruTsuka = async (contractName, templateName, router, name, symbol, decimals, totalSupply, deploymentAddress, marketingAddress, maxTxAmount, mxWalletSize, swapTokenAtAmount, verify, privateKey, chainId) => {
  try {
    console.log("inside compileAndDeployDejitaruTsuka");
    const templateContract = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'Templates', `${templateName}.sol`), 'utf8');
    
    const updatedContractCode = templateContract.replace('CONTRACTNAME',contractName);
    
    if (updatedContractCode === templateContract) {
      throw new Error("Placeholder 'CONTRACTNAME' not found in the contract template.");
    }
    //write the updated contract to a new file
    fs.writeFileSync(`./contracts/Generated/${contractName}.sol`, updatedContractCode, 'utf8');
    
    // compile
    await run('compile');
    const provider = new ethers.providers.JsonRpcProvider(getProviderUrl(chainId));
    const wallet = new ethers.Wallet(privateKey, provider);

    //deploy the new contract
    const newContract = await ethers.getContractFactory(contractName);
    const newcontract = await newContract.connect(wallet).deploy(router, name, symbol, decimals, totalSupply, deploymentAddress, marketingAddress, maxTxAmount, mxWalletSize, swapTokenAtAmount);
    await newcontract.deployed();
    console.log("Contract Deployed at :- ", newcontract.address);

    const response = {
      message: 'New Contract deployed successfully',
      contractName: contractName,
      contractAddress: newcontract.address,
    };
    //generated contract path   
    const contractPath = `contracts/Generated/${contractName}.sol:${contractName}`;
    console.log("contract path", contractPath);

    if (verify != true) {
      const contractDetails = readContractDetails();
      contractDetails[newcontract.address] = {
        contractName,
        router,
        name,
        symbol,
        decimals,
        totalSupply,
        deploymentAddress,
        marketingAddress,
        maxTxAmount,
        mxWalletSize,
        swapTokenAtAmount,
        chainId,
      };
      writeContractDetails(contractDetails);
    } else {
      // verify contract
      await verifyContract(contractPath, newcontract.address, getNetwork(chainId), [router, name, symbol, decimals, totalSupply, deploymentAddress, marketingAddress, maxTxAmount, mxWalletSize, swapTokenAtAmount]);
    }
    
    
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(' in Contract deployment failed');
  }
};

const compileAndDeployJeju = async (contractName, templateName, router, name, symbol, buyOperationsFee, buyLiquidityFee, sellOperationsFee, sellLiquidityFee, operationsAddress, supplyAddress1, supplyAddress2, supplyAddress3, verify, privateKey, chainId) => {
  try {
    console.log("inside compileAndDeployJeju");
    const templateContract = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'Templates', `${templateName}.sol`), 'utf8');
    
    const updatedContractCode = templateContract.replace('CONTRACTNAME',contractName);
    
    if (updatedContractCode === templateContract) {
      throw new Error("Placeholder 'CONTRACTNAME' not found in the contract template.");
    }
    //write the updated contract to a new file
    fs.writeFileSync(`./contracts/Generated/${contractName}.sol`, updatedContractCode, 'utf8');
    
    // compile
    await run('compile');
    const provider = new ethers.providers.JsonRpcProvider(getProviderUrl(chainId));
    const wallet = new ethers.Wallet(privateKey, provider);

    //deploy the new contract
    const newContract = await ethers.getContractFactory(contractName);
    const newcontract = await newContract.connect(wallet).deploy(router, name, symbol, buyOperationsFee, buyLiquidityFee, sellOperationsFee, sellLiquidityFee, operationsAddress, supplyAddress1, supplyAddress2, supplyAddress3);
    await newcontract.deployed();
    console.log("Contract Deployed at :- ", newcontract.address);

    const response = {
      message: 'New Contract deployed successfully',
      contractName: contractName,
      contractAddress: newcontract.address,
    };
    //generated contract path   
    const contractPath = `contracts/Generated/${contractName}.sol:${contractName}`;
    console.log("contract path", contractPath);

    if (verify != true) {
      const contractDetails = readContractDetails();
      contractDetails[newcontract.address] = {
        contractName,
        router,
        name,
        symbol,
        buyOperationsFee,
        buyLiquidityFee,
        sellOperationsFee,
        sellLiquidityFee,
        operationsAddress,
        supplyAddress1,
        supplyAddress2,
        supplyAddress3,
        chainId,
      };
      writeContractDetails(contractDetails);
    } else {
      // verify contract
      await verifyContract(contractPath, newcontract.address, getNetwork(chainId), [router, name, symbol, buyOperationsFee, buyLiquidityFee, sellOperationsFee, sellLiquidityFee, operationsAddress, supplyAddress1, supplyAddress2, supplyAddress3]);
    }    
    
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(' in Contract deployment failed');
  }
};

const compileAndDeployNeoCypherpunk = async (contractName, templateName, router, name, symbol, maxFeePercent, marketingAddress, initialSupply, swapTokensAtAmount, maxTxAmount, maxWalletAmount, verify, privateKey, chainId) => {
  try {
    console.log("inside compileAndDeployNeoCypherpunk");
    const templateContract = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'Templates', `${templateName}.sol`), 'utf8');
    
    const updatedContractCode = templateContract.replace('CONTRACTNAME',contractName);
    
    if (updatedContractCode === templateContract) {
      throw new Error("Placeholder 'CONTRACTNAME' not found in the contract template.");
    }
    //write the updated contract to a new file
    fs.writeFileSync(`./contracts/Generated/${contractName}.sol`, updatedContractCode, 'utf8');
    
    // compile
    await run('compile');
    const provider = new ethers.providers.JsonRpcProvider(getProviderUrl(chainId));
    const wallet = new ethers.Wallet(privateKey, provider);

    //deploy the new contract
    const newContract = await ethers.getContractFactory(contractName);
    const newcontract = await newContract.connect(wallet).deploy(router, name, symbol, maxFeePercent, marketingAddress, initialSupply, swapTokensAtAmount, maxTxAmount, maxWalletAmount);
    await newcontract.deployed();
    console.log("Contract Deployed at :- ", newcontract.address);

    const response = {
      message: 'New Contract deployed successfully',
      contractName: contractName,
      contractAddress: newcontract.address,
    };
    //generated contract path   
    const contractPath = `contracts/Generated/${contractName}.sol:${contractName}`;
    console.log("contract path", contractPath);

    if (verify != true) {
      const contractDetails = readContractDetails();
      contractDetails[newcontract.address] = {
        contractName,
        router,
        name,
        symbol,
        maxFeePercent,
        marketingAddress,
        initialSupply,
        swapTokensAtAmount,
        maxTxAmount,
        maxWalletAmount,
        chainId,
      };
      writeContractDetails(contractDetails);
    } else {
      // verify contract
      await verifyContract(contractPath, newcontract.address, getNetwork(chainId), [router, name, symbol, maxFeePercent, marketingAddress, initialSupply, swapTokensAtAmount, maxTxAmount, maxWalletAmount]);
    }    
    
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(' in Contract deployment failed');
  }
};

const compileAndDeployPepeToken = async (contractName, templateName, name, symbol, totalSupply, verify, privateKey, chainId) => {
  try {
    console.log("inside compileAndDeployPepeToken");
    const templateContract = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'Templates', `${templateName}.sol`), 'utf8');
    
    const updatedContractCode = templateContract.replace('CONTRACTNAME',contractName);
    
    if (updatedContractCode === templateContract) {
      throw new Error("Placeholder 'CONTRACTNAME' not found in the contract template.");
    }
    //write the updated contract to a new file
    fs.writeFileSync(`./contracts/Generated/${contractName}.sol`, updatedContractCode, 'utf8');
    
    // compile
    await run('compile');
    const provider = new ethers.providers.JsonRpcProvider(getProviderUrl(chainId));
    const wallet = new ethers.Wallet(privateKey, provider);

    //deploy the new contract
    const newContract = await ethers.getContractFactory(contractName);
    const newcontract = await newContract.connect(wallet).deploy(name, symbol, totalSupply);
    await newcontract.deployed();
    console.log("Contract Deployed at :- ", newcontract.address);

    const response = {
      message: 'New Contract deployed successfully',
      contractName: contractName,
      contractAddress: newcontract.address,
    };
    //generated contract path   
    const contractPath = `contracts/Generated/${contractName}.sol:${contractName}`;
    console.log("contract path", contractPath);

    if (verify != true) {
      const contractDetails = readContractDetails();
      contractDetails[newcontract.address] = {
        contractName,
        name,
        symbol,
        totalSupply,
        chainId,
      };
      writeContractDetails(contractDetails);
    } else {
      // verify contract
      await verifyContract(contractPath, newcontract.address, getNetwork(chainId), [name, symbol, totalSupply]);
    }    
    
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(' in Contract deployment failed');
  }
};


async function verifyContract(contractPath, contractAddress, network, args) {
  const scriptPath = path.resolve(__dirname, '../', 'verify.sh');
  console.log("scriptPath", scriptPath);
  const child = cp.spawn("bash", [scriptPath, contractPath, network, contractAddress, args.length, ...args ]);
  
  child.stdout.on("data", function (data) {
    console.log("stdout: " + data);
  });
  child.stderr.on("data", function (data) {
    console.log("stderr: " + data);
  });
  child.on("close", function (code) {
    console.log("child process exited with code " + code);
  });
};


const verifyDeployedContract = async (contractAddress) => {
  try {
    console.log("inside verifyBigEyes");
    
    const contractDetails = readContractDetails();
    const contractDetail = contractDetails[contractAddress];
    const response = {
      message: 'Contract Verified successfully',
    };
    if (!contractDetail) {
      throw new Error(`Contract details not found for address: ${contractAddress}`);
    }
    const valueArray = Object.values(contractDetail);
    for (let i = 0; i < valueArray.length; i++) {
      const key = `field${i + 1}`;
      response[key] = valueArray[i];
    }
    //generated contract path   
    const contractPath = `contracts/Generated/${response.field1}.sol:${response.field1}`;
    console.log("contract path", contractPath);

    //verify contract
    await verifyContract(contractPath, contractAddress, getNetwork(valueArray[valueArray.length - 1]), valueArray.slice(1, -1));
    console.log("\n",response);
    console.log("\n",contractPath, contractAddress, getNetwork(valueArray[valueArray.length - 1]), valueArray.slice(1, -1));
    
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(' in Contract verification failed');
  }
};

// const verifyBigEyes = async (contractAddress) => {
//   try {
//     console.log("inside verifyBigEyes");
    
//     const contractDetails = readContractDetails();
//     const contractDetail = contractDetails[contractAddress];
//     if (!contractDetail) {
//       throw new Error(`Contract details not found for address: ${contractAddress}`);
//     }
//     const { contractName, name, symbol, decimals, totalSupply, chainId } = contractDetail;
//     const response = {
//       message: 'Contract Verified successfully',
//       contractName: contractName,
//       contractAddress: contractAddress,
//     };
//     //generated contract path   
//     const contractPath = `contracts/Generated/${contractName}.sol:${contractName}`;
//     console.log("contract path", contractPath);

//     //verify contract
//     await verifyContract(contractPath, contractAddress, getNetwork(chainId), [name, symbol, decimals, totalSupply]);
    
//     return response;
//   } catch (error) {
//     console.error(error);
//     throw new Error(' in Contract verification failed');
//   }
// };

module.exports = {
  compileAndDeployBigEyes,
  compileAndDeployDejitaruTsuka,
  compileAndDeployJeju,
  compileAndDeployNeoCypherpunk,
  compileAndDeployPepeToken,
  verifyDeployedContract,
};


//  BigEyes Constructor Arguments
//  name, symbol, decimals, totalSupply

//  DejitaruTsuka constructor arguments
//  router, name, symbol, decimals, totalSupply, deploymentAddress, marketingAddress, maxTxAmount, mxWalletSize, swapTokenAtAmount