const express = require('express');
const router = express.Router();

const {
  verifyDeployedContract,
} = require('../utils/deploy');

router.post('/', async (req, res) => {
  const { contractAddress } = req.body;
   
  console.log("call verifyDeployedContract");
 
  try { 
    const response = await verifyDeployedContract(contractAddress);
    res.json( response );
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Add more routes here if needed

module.exports = router;