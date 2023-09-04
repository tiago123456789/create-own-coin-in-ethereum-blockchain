import { ethers } from "ethers"

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    web3 = new ethers.providers.Web3Provider(window.ethereum);
} else {
    web3 = new ethers.providers.JsonRpcProvider(process.env.INFURE_URL);
}

export default web3;