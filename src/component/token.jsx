import React, { useState, useEffect } from "react";
import classes from "./token.module.css";
//import Web3 from 'web3';
import { ethers, utils, BigNumber } from 'ethers';
import abi from "../contract/debalance.json"
const provider = new ethers.providers.Web3Provider(window.ethereum);


const informaion = [
  {
    id: 1,
    token_name: "Sushi",
    wallet_address: "r203jr02fj",
    balance: "100Matic",
    price: "0.5USDT",
  },
  {
    id: 2,
    token_name: "Link",
    wallet_address: "r203jfvowvnr02fj",
    balance: "10000Shib",
    price: "0.001USDT",
  },
  {
    id: 3,
    token_name: "Uni",
    wallet_address: "r203eioucn2r02fj",
    balance: "20ADA",
    price: "1USDT",
  },
];


function Token() {
  const [data, setData] = useState(informaion);
  const [amount, setAmount] = useState("");
  const [cont, setCont] = useState("");
  const [sush, setSushi] = useState("");
  const [ui, setUni] = useState("");
  const [chai, setChain] = useState("");




  const [address, setAddress] = useState("Connect Wallet");

  const handleChange = (e) => {
    setAmount(e.target.value);
  };
  //deposit function
  const handleDeposit = async (e) => {
    e.preventDefault();
    let deposit = await cont.deposit(ethers.utils.parseUnits(amount, "ether"));
    const receipt = provider.waitForTransaction(deposit.hash, 1, 150000).then(async () => {
      await readBalance(cont)
      alert("rebalnced " + deposit.hash)
    });
  };
  //manual rebalance
  const rebalance = async () => {
    let rebalance = await cont.rebalance();
    const receipt = provider.waitForTransaction(rebalance.hash, 1, 150000).then(async () => {
      await readBalance(cont)
      alert("rebalnced " + rebalance.hash)
    });
  };
//withdraw to the account
  const Withdrawal = async () => {
    let Withdrawal = await cont.withdraw();
    const receipt = provider.waitForTransaction(Withdrawal.hash, 1, 150000).then(async () => {
      await readBalance(cont)
      alert("rebalnced " + Withdrawal.hash)
    });
  };
//reading balance of tokens
  const readBalance = async (contract) => {
    let chain = await contract.balance("0xfa4347aAd7eD2c2e82A25D4fF49b6d17bE10C5A7");
    let a = Number(chain).toString()
    setChain(ethers.utils.formatEther(a))
    let sushi = await contract.balance("0x67d2fB137cd3F51F1989E37A7a55C73037c43529");
    let b = Number(chain).toString()
    setSushi(ethers.utils.formatEther(b))
    let uni = await contract.balance("0x765b022C37B1f95Cd137EfD3380c72d2F6042c27");
    let c = Number(chain).toString()
    setUni(ethers.utils.formatEther(c))
    
  };



  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });


        const newAdd = window.ethereum.selectedAddress;

        setAddress(newAdd);
        await contract()

      }
    };
    initializeProvider();



  }, [])

  const contract = async () => {
    if (ethereum) {
      const signer = provider.getSigner();
      const contract = new ethers.Contract("0xc85eD1bBeFD0349B85d779C59f9cDC5Aac31EC72", abi, signer)
      setCont(contract)
      await readBalance(contract)

    }
  }

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const newAdd = window.ethereum.selectedAddress;
        console.log("Wallet connected:", window.ethereum.selectedAddress);
        setAddress(newAdd);
        await contract()
      } catch (error) {
        if (error.code === 401) {
          console.error("User rejected the request to connect the wallet.");
        } else {
          console.error("Error connecting the wallet:", error);
        }
      }
    } else {
      console.error("MetaMask is not installed.");
    }
  };
  return (
    <div>
      <div className={classes.parentDiv}>
        <div className={classes.firstDiv}>RB</div>
        <div className={classes.secondDiv}>
          <button className={classes.btn} onClick={connectMetaMask}>
            {address}
          </button>
        </div>
      </div>
      <div className={classes.input}>
        <label style={{ marginRight: "12rem", fontSize: "1.5rem" }}>USDC</label>
      </div>
      <div className={classes.input}>
        <input
          type="text"
          placeholder="Enter value"
          value={amount}
          onChange={handleChange}
        />
        <button className={classes.depBtn} onClick={handleDeposit}>
          Deposit
        </button>
      </div>
      <div>
        <div className={classes.tokenClass}>
          <div className={classes.tokenInfo}>Sush</div>
          <div className={classes.tokenInfo1}>{sush}</div>
        </div>
        <div className={classes.tokenClass}>
          <div className={classes.tokenInfo}>Chain</div>
          <div className={classes.tokenInfo1}>{chai}</div>
        </div>

        <div className={classes.tokenClass}>
          <div className={classes.tokenInfo}>Uni</div>
          <div className={classes.tokenInfo1}>{ui}</div>
        </div>
      </div>

      <div className={classes.btnClass}>
        <button onClick={rebalance}>Rebalance</button>
        <button onClick={Withdrawal}>Withdrawal</button>
      </div>
    </div>
  );
}

export default Token;
