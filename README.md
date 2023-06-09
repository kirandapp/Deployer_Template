# Contract Deployment API

This repository contains code for an API that allows you to deploy a contract by sending a POST request with the contract name. The API is built using Express.js and interacts with the Hardhat framework for compiling and deploying contracts.

## Prerequisites

Make sure you have the following installed on your system:

- Node.js (v14 or higher)
- NPM (Node Package Manager)

## Getting Started

1. Clone the repository:


2. Navigate to the project directory:


3. Install dependencies:


4. Update the contract template:

- Open the `contracts/Token.sol` file and make sure it contains the contract template you want to deploy.
- Replace any occurrences of `CONTRACTNAME` with the placeholder for the contract name.

5. Start the API server:


The API server will start running at `http://localhost:3000`.

## Deploying a Contract

To deploy a contract, send a POST request to the `/deploy-contract` endpoint with the contract name in the request body.


Example using Postman:

- set the request URL to `http://localhost:4000`
- set the request method to `GET`
you will get "Hi" 

- Set the request URL to `http://localhost:3000/deploy-contract`.
- Set the request method to `POST`.
- Set the request body as JSON and provide the contract name:

{
"tokenName": "MyToken"
}


You will receive a JSON response containing the deployment details of the contract:

{
"message": "Token contract deployed successfully",
"tokenName": "MyToken",
"contractAddress": "0x..."
}


Make sure to replace `MyToken` with the desired contract name.

That's it! You have successfully deployed a contract using the API.

## Troubleshooting

- If you encounter any issues during installation or running the API, make sure you have met all the prerequisites and followed the steps correctly.
- Check the console output for any error messages and refer to the provided error descriptions in case of failures.
- If you need further assistance, feel free to reach out for support.





```
