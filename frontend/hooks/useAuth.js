import { useState } from "react";
import web3 from "../services/web3"

export default function useAuth() {
    const [accountConnected, setAccountConnected] = useState(null)

    const authenticateInWallet = async () => {
        try {
            const accounts = await web3.send("eth_requestAccounts", [])
            if (accounts.length > 0) setAccountConnected(accounts[0]);
        } catch (error) {
            console.log(e)
        }
    }

    const isConnected = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        return accounts.length > 0;
    }

    return {
        authenticateInWallet,
        isConnected
    }
}