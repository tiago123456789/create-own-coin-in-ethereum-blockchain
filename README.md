## ABOUT

The project has focus to allow you create your own token(crypto) on Ethereum blockchain easier and quicker.


## THECNOLOGIES

- Backend
  - Lambda function(Vercel)
  - CrockroackDB(Database)
- Backend Contract
  - Solidity(Smart contract)
  - Jest(Unit tests)
  - Hardhat(tool to deploy smart contract on Ethereum blockchain)
- Frontend
  - Next.js
  - Ether.js
  - Semantic ui

## INSTRUCTIONS TO RUN PROJECT

- Clone repository
- Access directory **backend**
  - Execute command **npm i**
  - Create **.env** file based **.env.example** file
  - Execute command **npm run dev**
- Access directory **backend-contract**
  - Execute command **npm i**
  - Create **.env** file based **.env.example** file
  - Execute command **npm run compile** to compile Smart contract to deploy on Ethereum blockchain.
  - Execute command **npm run deploy** to deploy smart contract on Ethereum blockchain.
  - Execute command **npm run test** to run unit tests over Smart contract.
- Access directory **frontend**
  - Execute command **npm i**
  - Create **.env** file based **.env.example** file
  - Execute command **npm run dev**
