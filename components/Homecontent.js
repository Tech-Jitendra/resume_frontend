// import Hero from "../components/global/Hero";
import Link from "next/link";
import { Row, Col } from "antd";
import styled from "styled-components";
// import { useStores } from "../models"
import { observer } from "mobx-react-lite"
import { useRouter } from "next/router";
import Home from "../pages/Home";
const HomeWrapper = styled.div`
  .item {
    .product-logo {
      width: 100%;
      height: 263px;
    }

    .ant-btn {
      min-width: 46px;
      height: 22px;
      padding: 0 12px;
      background-color: transparent;
      border: 1px solid #e9eae9;
      display: flex;
      align-items: center;
      font-size: 10px;
      color: #636663;
      box-shadow: none;
      &:first-child {
        margin-right: 10px;
      }
    }
    .ant-typography {
      margin: 10px 0 0 0;
    }
    .hold-price {
      .ant-typography {
        margin: 0;
      }
    }
  }

  .hold-category-pic {
    width: 66px;
    height: 66px;
    background: #ecf1fe;
    margin-bottom: 10px;
  }

  .ant-card-body {
    padding: 0;
  }

  .see-more-link {
    width: 100px;
    height: 30px;
    border: 1px solid #ecf1fe;
    border-radius: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: #3e71f3;
  }
`;

export const Homecontent = observer(() => {
  const myLoader = ({ src }) => {
    return `${src}`
  }
  // const { productStore, userStore } = useStores()
  const router = useRouter()
  return (
    <HomeWrapper>
      <Home />
    </HomeWrapper>
  );
})
export default Homecontent