import "../styles/globals.css"
import All_Page from "../components/All_Page"
import { useState, useEffect } from "react"
import { Bars } from 'react-loader-spinner'
// import App, { Container } from "next/app";
// import { RootStoreProvider, setupRootStore } from "../models"

import Script from 'next/script'
export const Loader = () => {
  return (
    <div>
      <Bars color="#3e71f3" height={80} width={80} />
    </div>
  )
}
export const MyApp = ({ Component, pageProps }) => {
  //const [rootStore, setRootStore] = useState < RootStore | undefined > (undefined)
  const [rootStore, setRootStore] = useState(undefined)

  // useEffect(() => {
  //   ; (async () => {
  //     setupRootStore().then(setRootStore)
  //   })()
  // }, [])
  // if (!rootStore) return <Loader></Loader>
  return (
    <>
      {/* <RootStoreProvider value={rootStore} > */}
      <All_Page>
        <Component {...pageProps} />
      </All_Page>
      {/* </RootStoreProvider> */}
      <Script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=989cfd1d-8f55-41ad-8be0-cd8d2b07d7ad"></Script>
    </>
  )
}
export default MyApp