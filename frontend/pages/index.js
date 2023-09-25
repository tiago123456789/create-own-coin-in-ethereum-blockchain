import { Button, Container, Grid, GridColumn, Icon } from "semantic-ui-react"
import Header from "../components/Header";
import Coin from "../components/Coin";
import ModalRequestCoin from "../components/ModalRequestCoin";
import ModalCreateCoin from "../components/ModalCreateCoin";
import ModalRequestsPendent from "../components/ModalRequestsPendent";
import { useEffect, useState } from "react";
import { getCoins } from "../services/coins";
import useAuth from "../hooks/useAuth";

function Index({ coinsCreated }) {
    const { accountConnected, authenticateInWallet, isConnected } = useAuth();
    const [coins, setCoins] = useState(coinsCreated);
    const [showModalCreateCoin, setShowModalCreateCoin] = useState(false);
    const [showModalRequestCoin, setShowModalRequestCoin] = useState(false);
    const [showModalRequestPendents, setShowModalRequestsPendents] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null)
    const [pagination, setPagination] = useState({
        page: 1,
        itemsPerPage: 10
    })

    const first10Coins = async () => {
        setPagination({
            ...pagination,
            page: 1
        })
        const newCoins = await getCoins(1, pagination.itemsPerPage)
        setCoins(newCoins)
    }

    const loadMoreCoins = () => {
        const nextPage = (pagination.page + 1)
        setPagination({
            ...pagination,
            page: nextPage
        })
        loadCoins(nextPage, pagination.itemsPerPage)
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
            setPagination({
                ...pagination,
                page: 2
            })
            loadCoins(2, pagination.itemsPerPage)
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
                <br/>
                <Grid>
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
                </Grid>
                <br />
                <br />
                <Grid columns={4}>
                    {isConnected() && coins.map((coin, index) => {
                        return (
                            <GridColumn key={index} mobile={12} computer={4} tablet={6}>
                                <Coin
                                    name={coin.name}
                                    symbol={coin.symbol}
                                    openModalToRequestCoin={() => selectCoin(coin)}
                                />
                            </GridColumn>
                        )
                    })}

                </Grid>
                <br />
                <Button primary fluid onClick={() => loadMoreCoins()}>
                    Show more coins
                </Button>
                <br />
                <br />

            </Container>
        </>
    )
}


export const getServerSideProps = async () => {
    const coins = await getCoins(1, 10)
    return { props: { coinsCreated: coins } }
}

export default Index;