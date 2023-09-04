import { useState } from "react"
import { Button, Input, Modal } from "semantic-ui-react"

function ModalRequestCoin({ open, close, selectedCoin }) {
    const [amount, setAmount] = useState(0);

    const requestAmountOfCoin = () => {
        console.log(selectedCoin)
        console.log(amount)
    }

    const closeThisModal = () => {
        setAmount(0);
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
                <Button color="blue" onClick={() => requestAmountOfCoin()}>
                    Create
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalRequestCoin;