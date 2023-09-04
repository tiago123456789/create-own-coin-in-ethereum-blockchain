import { Button, Menu } from "semantic-ui-react"
import useAuth from "../hooks/useAuth";

function Header() {
    const { authenticateInWallet, isConnected } = useAuth();

    return (
        <Menu>
                <Menu.Item
                >
                    MakeMyCoin
                </Menu.Item>

                <Menu.Item
                    position="right"
                >
                    { isConnected() &&
                        <Button color="blue">
                            Wallet connected
                        </Button>
                    }
                    { !isConnected() &&
                        <Button color="blue" onClick={() => authenticateInWallet() }>
                            Connect wallet
                        </Button>
                    }
                </Menu.Item>
            </Menu>
    )
}

export default Header;