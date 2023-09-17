import { useEffect, useState } from "react";
import { Card, Grid, Modal, Button } from "semantic-ui-react";
import { approveRequestForCoin, getRequestedCoinsByOwner } from "../services/coins";

function ModalRequestsPendent({
    ownerOfCoin,
    open,
    close
}) {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const loadRequestsPendents = async (owner) => {
        const data = await getRequestedCoinsByOwner(owner);
        setRequests(data)
    }

    const canApprove = (item) => {
        return ownerOfCoin === item.owner_wallet_address
    }

    const approve = async (item) => {
        setIsLoading(true)
        await approveRequestForCoin(
            item.coin_contract_address, 
            item.requester_wallet_address, 
            item.amount,
            item.id
        )
        loadRequestsPendents(ownerOfCoin)
        setIsLoading(false)
    }

    useEffect(() => {
        if (open && ownerOfCoin) {
            loadRequestsPendents(ownerOfCoin)
        }
    }, [open, ownerOfCoin])

    return (
        <Modal
            size={"large"}
            open={open}
            onClose={close}
        >
            <Modal.Header>All requests for your coins</Modal.Header>
            <Modal.Content>

                <Grid columns={2}>
                    { requests.length == 0 &&
                        <p>You don't have registers to approve</p>
                    }
                    {requests.map(item => {
                        return (
                            <Grid.Column key={item.id}>
                                <Card fluid className="center aligned">
                                    <Card.Content>
                                        <Card.Header>Name: {item.coin_name}</Card.Header>
                                        <Card.Meta><strong>Requester wallet address:</strong> {item.requester_wallet_address}</Card.Meta>
                                        <Card.Meta><strong>Amount:</strong> {item.amount}</Card.Meta>
                                    </Card.Content>
                                    <Card.Content extra>
                                        {canApprove(item) &&
                                            <Button 
                                            onClick={() => approve(item)}
                                            fluid basic color='blue'>
                                                { isLoading ? "Processing..." : "Approve" }
                                            </Button>
                                        }
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        )
                    })}
                </Grid>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={close}>
                    Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalRequestsPendent;