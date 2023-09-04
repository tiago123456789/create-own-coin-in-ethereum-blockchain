import { Card, Grid, Modal, Button } from "semantic-ui-react";

function ModalRequestsPendent() {

    return (
        <Modal
                size={"large"}
                open={false}
                onClose={() => console.log({ type: 'close' })}
            >
                <Modal.Header>All requests for your coins</Modal.Header>
                <Modal.Content>
                    <Grid columns={2}>
                        <Grid.Column>
                            <Card fluid className="center aligned">
                                <Card.Content>
                                    <Card.Header>Name: Coin Test</Card.Header>
                                    <Card.Meta>Symbol: CT</Card.Meta>
                                    <Card.Meta>Wallet address: 0x49756F7C24b4699c98368E4c8CF48CD4839F1153</Card.Meta>
                                    <Card.Meta>Amount: 10</Card.Meta>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button fluid basic color='blue'>
                                        Approve
                                    </Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card fluid className="center aligned">
                                <Card.Content>
                                    <Card.Header>Name: Coin Test</Card.Header>
                                    <Card.Meta>Symbol: CT</Card.Meta>
                                    <Card.Meta>Wallet address: 0x49756F7C24b4699c98368E4c8CF48CD4839F1153</Card.Meta>
                                    <Card.Meta>Amount: 100</Card.Meta>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button fluid basic color='blue'>
                                        Approve
                                    </Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => console.log({ type: 'close' })}>
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
    )
}

export default ModalRequestsPendent;