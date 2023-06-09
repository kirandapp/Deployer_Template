// const express = require('express');
// const { ethers } = require('hardhat');
// const { BigNumber } = require('ethers');
// const fs = require('fs');

// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hi');
// });

// app.use(express.json());

// app.post('/deploy-contract', async (req, res) => {
//   try {
//     const { tokenName } = req.body;

//     // Read the template contract
//     const contractTemplate = fs.readFileSync('./contracts/Token.sol', 'utf8');

//     // Replace the placeholder with the user-provided name in the contract template
//     const updatedContractSource = contractTemplate.replace('CONTRACTNAME', tokenName);

//     // Write the updated contract to a temporary file
//     fs.writeFileSync(`./contracts/${tokenName}.sol`, updatedContractSource, 'utf8');

//     // Compile the updated contract
//     const TempToken = await ethers.getContractFactory(tokenName);
//     const token = await TempToken.deploy();
//     await token.deployed();

//     const response = {
//       message: 'Token contract deployed successfully',
//       tokenName,
//       contractAddress: token.address,
//     };

//     res.json(response);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred during contract deployment' });
//   }
// });

// const port = 4000;
// app.listen(port, () => {
//   console.log(`API server is running on http://localhost:${port}`);
// });

const express = require('express');
const { ethers, artifacts, run } = require('hardhat');
const { BigNumber } = require('ethers');
const fs = require('fs');

const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('Hi');
  });

app.use(express.json());

app.post('/deploy-contract', async (req, res) => {
  try {
    const { tokenName } = req.body;

    // Read the template contract
    const contractTemplate = fs.readFileSync('./contracts/Token.sol', 'utf8');

    // Replace the placeholder with the user-provided name in the contract template
    const updatedContractSource = contractTemplate.replace('CONTRACTNAME', tokenName);

    // Write the updated contract to a temporary file
    fs.writeFileSync(`./contracts/${tokenName}.sol`, updatedContractSource, 'utf8');

    // Compile the updated contract
    await run('compile');

    // Deploy the contract
    const Token = await ethers.getContractFactory(tokenName);
    const token = await Token.deploy();
    await token.deployed();

    const response = {
      message: 'Token contract deployed successfully',
      tokenName,
      contractAddress: token.address,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during contract deployment' });
  }
});

app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});
