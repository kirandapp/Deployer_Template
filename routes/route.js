const express = require('express');
const router = express.Router();

const {
  compileAndDeployBigEyes,
  compileAndDeployDejitaruTsuka,
  compileAndDeployJeju,
  compileAndDeployNeoCypherpunk,
  compileAndDeployPepeToken,
} = require('../utils/deploy');

router.post('/bigeyes', async (req, res) => {
  const { contractName, templateName, name, symbol, decimals, totalSupply, verify, privateKey, chainId } = req.body;
   
  console.log("call bigeyes");
 
  try { 
    const response = await compileAndDeployBigEyes(contractName, templateName, name, symbol, decimals, totalSupply, verify, privateKey, chainId);
    res.json( response );
  } catch (error) {
    res.status(500).json({ error: 'route Contract deployment failed' });
  }
});

router.post('/dejitarutsuka', async (req, res) => {
  const { contractName, templateName, router, name, symbol, decimals, totalSupply, deploymentAddress, marketingAddress, maxTxAmount, mxWalletSize, swapTokenAtAmount, verify, privateKey, chainId } = req.body;
   
  console.log("call dejitarutsuka");
 
  try { 
    const response = await compileAndDeployDejitaruTsuka(contractName, templateName, router, name, symbol, decimals, totalSupply, deploymentAddress, marketingAddress, maxTxAmount, mxWalletSize, swapTokenAtAmount, verify, privateKey, chainId);
    res.json( response );
  } catch (error) {
    res.status(500).json({ error: 'route Contract deployment failed' });
  }
});

router.post('/jeju', async (req, res) => {
  const { contractName, templateName, router, name, symbol, buyOperationsFee, buyLiquidityFee, sellOperationsFee, sellLiquidityFee, operationsAddress, supplyAddress1, supplyAddress2, supplyAddress3, verify, privateKey, chainId } = req.body;
  console.log("call jeju");
  try { 
    const response = await compileAndDeployJeju(contractName, templateName, router, name, symbol, buyOperationsFee, buyLiquidityFee, sellOperationsFee, sellLiquidityFee, operationsAddress, supplyAddress1, supplyAddress2, supplyAddress3, verify, privateKey, chainId);
    res.json( response );
  } catch (error) {
    res.status(500).json({ error: 'route Contract deployment failed' });
  }
});

router.post('/neocypherpunk', async (req, res) => {
  const { contractName, templateName, router, name, symbol, maxFeePercent, marketingAddress, initialSupply, swapTokensAtAmount, maxTxAmount, maxWalletAmount, verify, privateKey, chainId } = req.body;
  console.log("call neocypherpunk");
  try { 
    const response = await compileAndDeployNeoCypherpunk(contractName, templateName, router, name, symbol, maxFeePercent, marketingAddress, initialSupply, swapTokensAtAmount, maxTxAmount, maxWalletAmount, verify, privateKey, chainId);
    res.json( response );
  } catch (error) {
    res.status(500).json({ error: 'route Contract deployment failed' });
  }
});

router.post('/pepetoken', async (req, res) => {
  const { contractName, templateName, name, symbol, totalSupply, verify, privateKey, chainId } = req.body;
  console.log("call pepetoken");
  try { 
    const response = await compileAndDeployPepeToken(contractName, templateName, name, symbol, totalSupply, verify, privateKey, chainId);
    res.json( response );
  } catch (error) {
    res.status(500).json({ error: 'route Contract deployment failed' });
  }
});

// Add more routes here if needed

module.exports = router;
