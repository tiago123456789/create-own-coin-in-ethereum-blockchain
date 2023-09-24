import 'semantic-ui-css/semantic.min.css'
import { NextSeo } from 'next-seo';

function App({ Component, pageProps }) {
  return (
    <>
      <NextSeo
        title="Create your crypto easier on Ethereum blockchain"
        description="The website allow you create your
        own token or crypto easier and quickly on Ethereum blockain."
        noindex={false}
        nofollow={false}
        additionalMetaTags={[
          {
            property: "language",
            name: "language",
            content: "English"
          },
          {
            property: "keywords",
            name: "keywords",
            content: "create my own coin, web3, token, crypto, blockchain, ethereum, currency, easier, quickly"
          }
        ]}
      />
      <Component {...pageProps} />
    </>
  )
}


export default App;