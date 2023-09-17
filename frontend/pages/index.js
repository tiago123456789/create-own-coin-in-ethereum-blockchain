import { Button, Container, Grid, GridColumn, Icon } from "semantic-ui-react"
import Header from "../components/Header";
import Coin from "../components/Coin";
import ModalRequestCoin from "../components/ModalRequestCoin";
import ModalCreateCoin from "../components/ModalCreateCoin";
import ModalRequestsPendent from "../components/ModalRequestsPendent";
import { useEffect, useState } from "react";
import { createCoin, getCoins } from "../services/coins";
import useAuth from "../hooks/useAuth";

function Index({ coinsCreated }) {
    const { accountConnected, authenticateInWallet, isConnected } = useAuth();
    const [coins, setCoins] = useState(coinsCreated);
    const [showModalCreateCoin, setShowModalCreateCoin] = useState(false);
    const [showModalRequestCoin, setShowModalRequestCoin] = useState(false);
    const [showModalRequestPendents, setShowModalRequestsPendents] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null)

    const first10Coins = async () => {
        const newCoins = await getCoins(0, 10)
        setCoins(newCoins)
    }

    const loadCoins = async (page, itemsPerPage) => {
        const newCoins = await getCoins(page, itemsPerPage)
        setCoins([...coins, ...newCoins])
    }

    const selectCoin = (coin) => {
        setShowModalRequestCoin(true)
        setSelectedCoin(coin)
    }

    const closeModalRequestCoin = () => {
        setShowModalRequestCoin(false)
        setSelectedCoin(null)
    }

    useEffect(() => {
        (async () => {
            await authenticateInWallet()
            loadCoins(2, 10)
        })()
    }, [])

    return (
        <>
            <Header />
            <ModalRequestCoin
                accountConnected={accountConnected}
                selectedCoin={selectedCoin}
                open={showModalRequestCoin}
                close={() => closeModalRequestCoin()}
            />
            <ModalCreateCoin
                ownerOfCoin={accountConnected}
                open={showModalCreateCoin}
                close={() => setShowModalCreateCoin(false)}
                actionAfterCreate={() => first10Coins()}
            />
            <ModalRequestsPendent 
                ownerOfCoin={accountConnected}
                open={showModalRequestPendents}
                close={() => setShowModalRequestsPendents(false)}
            />
            <Container>
                {isConnected() &&
                    <Button color="blue" onClick={() => setShowModalCreateCoin(true)}>
                        <Icon name="plus" /> Create your coin
                    </Button>
                }
                <Button 
                    color="blue" 
                    onClick={() => setShowModalRequestsPendents(true)}
                    className="right floated">
                    <Icon name="list" /> Requests pendent
                </Button>
                <br />
                <br />
                <Grid columns={4}>
                    {isConnected() && coins.map((coin, index) => {
                        return (
                            <GridColumn key={index}>
                                <Coin
                                    name={coin.name}
                                    symbol={coin.symbol}
                                    openModalToRequestCoin={() => selectCoin(coin)}
                                />
                            </GridColumn>
                        )
                    })}
                </Grid>
            </Container>
        </>
    )
}


export const getServerSideProps = async () => {
    const coins =  await getCoins(1, 10)
    return { props: { coinsCreated: coins } }
}

export default Index;