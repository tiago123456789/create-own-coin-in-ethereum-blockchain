import { Button, Card } from "semantic-ui-react"

function Coin({ name, symbol, openModalToRequestCoin }) {

    return (
        <Card className="center aligned">
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>{symbol}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Button fluid basic color='blue' onClick={() => openModalToRequestCoin() }>
                    Give me
                </Button>
            </Card.Content>
        </Card>
    )
}

export default Coin;