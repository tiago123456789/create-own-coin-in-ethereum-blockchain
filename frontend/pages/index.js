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
    const { authenticateInWallet, isConnected } = useAuth();
    const [coins, setCoins] = useState(coinsCreated);
    const [showModalCreateCoin, setShowModalCreateCoin] = useState(false);
    const [showModalRequestCoin, setShowModalRequestCoin] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null)

    const first10Coins = async () => {
        const newCoins = await getCoins(0, 10)
        setCoins(newCoins)
    }

    const loadCoins = async (offset, limit) => {
        const newCoins = await getCoins(offset, limit)
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
            loadCoins(3, 15)
        })()
    }, [])

    return (
        <>
            <Header />
            <ModalRequestCoin
                selectedCoin={selectedCoin}
                open={showModalRequestCoin}
                close={() => closeModalRequestCoin()}
            />
            <ModalCreateCoin
                open={showModalCreateCoin}
                close={() => setShowModalCreateCoin(false)}
                actionAfterCreate={() => first10Coins()}
            />
            {/* <ModalRequestsPendent /> */}
            <Container>
                {isConnected() &&
                    <Button color="blue" onClick={() => setShowModalCreateCoin(true)}>
                        <Icon name="plus" /> Create your coin
                    </Button>
                }
                <Button color="blue" className="right floated">
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