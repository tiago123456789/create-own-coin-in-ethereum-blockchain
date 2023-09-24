import { useEffect, useState } from "react";
import web3 from "../services/web3"

export default function useAuth() {
    const [accountConnected, setAccountConnected] = useState(null)

    useEffect(() => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            ethereum.on('accountsChanged', function (accounts) {
                setAccountConnected(accounts[0]);
            })
        }
    }, [])
    
      
    const authenticateInWallet = async () => {
        try {
            const accounts = await web3.send("eth_requestAccounts", [])
            if (accounts.length > 0) setAccountConnected(accounts[0]);
        } catch (error) {
            console.log(error)
        }
    }

    const isConnected = async () => {
        return accountConnected != null;
    }

    return {
        authenticateInWallet,
        isConnected,
        accountConnected
    }
}