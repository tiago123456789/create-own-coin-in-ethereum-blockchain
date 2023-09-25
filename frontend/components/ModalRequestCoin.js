import { useState } from "react"
import { Button, Input, Modal } from "semantic-ui-react"
import { requestCoin } from "../services/coins";
import { toast } from 'react-toastify';

function ModalRequestCoin({ accountConnected, open, close, selectedCoin }) {
    const [amount, setAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    const requestAmountOfCoin = async () => {

        if (amount == 0) {
            toast.error("You need specify amount of value!")
            return; 
        }

        setIsLoading(true);
        const request = {
            amount, 
            ownerWalletAddress: selectedCoin.owner,
            requesterWalletAddress: accountConnected,
            coinContractAddress: selectedCoin.address,
            coinName: selectedCoin.name
        }
        await requestCoin(request);
        closeThisModal();
    }

    const closeThisModal = () => {
        setAmount(0);
        setIsLoading(false)
        close();
    }


    return (
        <Modal
            size={"mini"}
            open={open}
            onClose={() => closeThisModal()}
        >
            <Modal.Header>
                { selectedCoin != null && 
                    <>Create request to gain <strong>{selectedCoin.name}</strong></>
                }
                </Modal.Header>
            <Modal.Content>
                <Input 
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                type="number" label="Amount" placeholder="Type amount coin you want" />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => closeThisModal()}>
                    Cancel
                </Button>
                <Button loading={isLoading}  color="blue" onClick={() => requestAmountOfCoin()}>
                    Create
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalRequestCoin;