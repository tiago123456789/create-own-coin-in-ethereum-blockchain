import { useState } from "react";
import { Button, Form, Grid, Modal } from "semantic-ui-react"
import { createCoin } from "../services/coins";
import { toast } from 'react-toastify';



function ModalCreateCoin({ ownerOfCoin, open, close, actionAfterCreate }) {
    const [newCoin, setNewCoin] = useState({
        name: "",
        symbol: "",
        totalAmount: "",
        owner: ownerOfCoin
    })

    const [isLoading, setIsLoading] = useState(false)

    const submitToCreateCoin = async () => {

        if (newCoin.name.length === 0) {
            toast.error("Name is required")
            return;
        }

        if (newCoin.symbol.length === 0) {
            toast.error("Symbol is required")
            return;
        }

        if (!newCoin.totalAmount || parseInt(newCoin.totalAmount) <= 0) {
            toast.error("Total amount is required")
            return;
        }

        setIsLoading(true)
        await createCoin(
            newCoin.name, newCoin.symbol, ownerOfCoin, newCoin.totalAmount
        );
        setNewCoin({
            name: "",
            symbol: "",
            totalAmount: "",
            owner: ""
        })
        setIsLoading(false)
        close();
        await actionAfterCreate();
    }


    const onChangeInputValue = (key, value) => {
        setNewCoin({
            ...newCoin,
            [key]: value
        })
    }

    return (
        <Modal
            size={"small"}
            open={open}
            onClose={() => close()}
        >
            <Modal.Header>Create your coin</Modal.Header>
            <Modal.Content>
                <Form>
                    <Grid columns={3}>
                        <Grid.Column>
                            <Form.Field>
                                <label>Name:</label>
                                <input
                                value={newCoin.name}
                                onChange={(event) => onChangeInputValue("name", event.target.value)}
                                placeholder='Coin test' />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <label>Symbol:</label>
                                <input
                                value={newCoin.symbol}
                                onChange={(event) => onChangeInputValue("symbol", event.target.value)}
                                placeholder='CT' />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <label>Total amount:</label>
                                <input 
                                value={newCoin.totalAmount}
                                onChange={(event) => onChangeInputValue("totalAmount", event.target.value)}
                                placeholder='10000' />
                            </Form.Field>
                        </Grid.Column>
                    </Grid>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => close()}>
                    Cancel
                </Button>
                <Button loading={isLoading} color="blue" onClick={() => submitToCreateCoin()}>
                    Create
                </Button>
            </Modal.Actions>
        </Modal >
    )
}

export default ModalCreateCoin;