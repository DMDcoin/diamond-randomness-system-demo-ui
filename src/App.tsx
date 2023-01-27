import React from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { DemoNFT } from './abi/contracts';
import DemoNFT_ABI from './abi/json/DemoNFT.json';

// const providerOptions = new Web3.providers.HttpProviderOptions
const web3 = new Web3(new Web3.providers.HttpProvider('http://38.242.206.145:8540'));

// const wallet = web3.eth.accounts.wallet.create(1, "antique arena olive pause basket brush worth local loud host enact unable unveil rigid into");
const account = web3.eth.accounts.wallet.add("0x6f6c396861af52731770db6226d714d2d5d0cf97f43ed66c32bf01c33487b5d5");




const abi : any = DemoNFT_ABI;
const demoNFT_untyped: any = new web3.eth.Contract(abi.abi, "0xbd309a2027A24D02db251ACce5160DDD2E2D5f62");
const demoNFT = demoNFT_untyped as DemoNFT;


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
           {account.address}
          <button onClick={async () => { 
              let tx = await demoNFT.methods.registerMinting(account.address).send({from: account.address, gas: 100000, gasPrice: 1000000000, value: 1000000000000000000})
                .once(
                'transactionHash', function(hash: string) {
                  console.log('hash', hash);
                })
                .once('error', function(error: Error) {
                  console.log('error', error);
                  // web3.eth.
                  // error.message
                  console.log('message', error.message);
                  console.log('cause', error.cause);
                }
              )
              //console.log('tx hash:', tx.transactionHash);
           }}>Register minting.</button>
              <button onClick={async () => { 
                let tx = await demoNFT.methods.mintTo(account.address).send({from: account.address, gas: 200000, gasPrice: 1000000000})
                .once(
                'transactionHash', function(hash: string) {
                  console.log('hash', hash);
                })
                .once('error', function(error: Error) {
                  console.log('error', error);
                  // web3.eth.
                  // error.message
                  console.log('message', error.message);
                  console.log('cause', error.cause);
                }
              )
              //console.log('tx hash:', tx.transactionHash);
           }}>minting.</button>
      </header>
    </div>
  );
}

export default App;
