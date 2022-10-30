import styled from "styled-components";
// import globalKeyStore from "../models/api/global-key-store"
import { observer } from "mobx-react-lite"
import Header from "./global/Header.js"
import { Bars } from 'react-loader-spinner'
import { useState } from "react";
import Meta from "./Head"
// import SimpleModal from "./global/SimpleModal";
//export 
const Main = styled.div`
  padding: 2rem 4rem;

  @media (max-width: 1117px) {
    padding: 2rem 1rem;
  }
`;
const Loader = styled.div`
{
  display:flex;
  align-items:center;
  justify-content:center;
  position:fixed;
  z-index:10000;
  left:0px;
  right:0px;
  top:0px;
  bottom:0px;
  background:rgba(0,0,0,0.7);
  backdrop-filter:blur(5px);
}
`
export const All_Page = observer(({ children }) => {
  // const locale = Localization.currentLocale()
  const [isLoading, setLoading] = useState(false)
  const Loader = observer(() => {
    // if (globalKeyStore.isLoading) {
    if (false) {
      setLoading(true)
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            zIndex: 10000,
            left: '0px',
            right: '0px',
            top: '0px',
            bottom: '0px',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)'
          }}
        >
          <Bars color="#3e71f3" height={80} width={80} />
        </div>
      )
    }
    else {
      setLoading(false)
      return (<div></div>)
    }
  })
  return (
    <div
    // style={globalKeyStore.isLoading ? { overflow: 'hidden' } : { overflowX: 'hidden' }} 
    >
      {/* <Meta /> */}
      <Header />
      <Main>{children}</Main>
      {/* <Footer /> */}
    </div >
  );
})
export default All_Page