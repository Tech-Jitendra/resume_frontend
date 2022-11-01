import React from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
    display:flex;
    justify-content:space-around;
    .ant-card-bordered {
        border: 2px solid #36d1dc;
        border-radius: 15px;
    }
    .ant-card-hoverable {
        cursor: pointer;
        transition: box-shadow 0.2s, border-color 0.3s;
        border-color: #43cea2;
    }
    .ant-card-meta {
        justify-content: center;
        font-family: cursive;
        margin: 7px 0;
    }
`

const home = () => {
    return (
        <>
            <h1>jitendra maurya</h1>
        </>
    )
}
export default home;