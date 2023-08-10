# Contract Deployment API

This repository contains code for an API that allows you to deploy a contract by sending a POST request with the template name. The API is built using Express.js and interacts with the Hardhat framework for compiling, deploying and verifying contracts.

## Prerequisites

Make sure you have the following installed on your system:

- Node.js (v18.15.0 at the time of writing)
- NPM (Node Package Manager)
- postman agent

## Getting Started

1. Clone the repository:


2. Navigate to the project directory:


3. Install dependencies:


4. Update the contract template:

5. Create .env file

5. Start the API server:

6. Entry point to run the server: node scripts/app.js

The API server will start running at `http://localhost:3000`.

## Deploying a Contract

To deploy a contract, send a POST request to the `/deploy/#templateName` endpoint with the required fields in JSON format in the request body.


Example using Postman:

- set the request URL to `http://localhost:4000`
- set the request method to `GET`
you will get "Hi" 

- Set the request URL to `http://localhost:3000/deploy/bigeyes`.
- Set the request method to `POST`.
- Set the request body as JSON and provide the necessary fields:

{<br />
"contractName": "Eyes_V1",<br />
"templateName": "BigEyes",<br />
"name": "Big EyesA",<br />
"symbol": "$EYEV1",<br />
"decimals": 18,<br />
"totalSupply": "200000000000000000000000000000",<br />
"privateKey": "...",<br />
"chainId": 4002<br />
}<br /><br />

### Demo JSON for deploying Template contracts
{<br />
    "contractName": "",<br />
    "templateName": "DejitaruTsuka",<br />
    "router": "",<br />
    "name": "",<br />
    "symbol": "",<br />
    "decimals": "",<br />
    "totalSupply": "",<br />
    "deploymentAddress": "",<br />
    "marketingAddress": "",<br />
    "maxTxAmount": "",<br />
    "mxWalletSize": "",<br />
    "swapTokenAtAmount": "",<br />
    "privateKey": "",<br />
    "chainId": 4002<br />
}<br /><br />
{<br />
    "contractName": "",<br />
    "templateName": "JEJU",<br />
    "router": "",<br />
    "name": "",<br />
    "symbol": "",<br />
    "buyOperationsFee": ,<br />
    "buyLiquidityFee": ,<br />
    "sellOperationsFee": ,<br />
    "sellLiquidityFee": ,<br />
    "operationsAddress": "",<br />
    "supplyAddress1": "",<br />
    "supplyAddress2": "",<br />
    "supplyAddress3": "",<br />
    "privateKey": "",<br />
    "chainId": 4002<br />
}<br /><br />
{<br />
    "contractName": "",<br />
    "templateName": "NeoCypherpunk",<br />
    "router": "",<br />
    "name": "",<br />
    "symbol": "",<br />
    "maxFeePercent": ,<br />
    "marketingAddress": "",<br />
    "initialSupply": "",<br />
    "swapTokensAtAmount": "",<br />
    "maxTxAmount": "",<br />
    "maxWalletAmount": "",<br />
    "privateKey": "",<br />
    "chainId": 4002<br />
}<br /><br />
{<br />
    "contractName": "",<br />
    "templateName": "PepeToken",<br />
    "name": "",<br />
    "symbol": "",<br />
    "totalSupply": "",<br />
    "privateKey": "",<br />
    "chainId": 4002<br />
}<br /><br />

You will receive a JSON response containing the deployment details of the contract:

{<br />
"message": "New Contract deployed successfully",<br />
"contractName": "...",<br />
"contractAddress": "0x..."<br />
}


Make sure to replace `MyToken` with the desired contract name.

That's it! You have successfully deployed a contract using the API.

## Troubleshooting

- If you encounter any issues during installation or running the API, make sure you have met all the prerequisites and followed the steps correctly.
- Check the console output for any error messages and refer to the provided error descriptions in case of failures.
- If you need further assistance, feel free to reach out for support.





```
