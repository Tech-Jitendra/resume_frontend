import styled from "styled-components";
import Homecontent from "../components/Homecontent";
import Meta from "../components/Head";
import { observer } from "mobx-react-lite"
import { useEffect } from "react";
// import { useStores } from "../models"
const Container = styled.div`
  width: 100%;
  
`;

export const Home = observer(() => {
  // const { userStore, productStore } = useStores()
  const fetchInitialData = () => {
    // userStore.getLoggedInUser()
    // productStore.fetchProductList()
    // productStore.fetchCategories()
  }
  // useEffect(() => {
  //   fetchInitialData()
  //   return () => { };
  // }, []);
  return (

    <Container>
      <Meta />
      <Homecontent />
    </Container>

  );
})
export default Home