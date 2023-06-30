import React from 'react'
import HeaderNav from './HeaderNav'
import Content from './Content'
import { Row, Col } from 'antd'
import HeaderMobile from './HeaderMobile'

const Home = () => {

    return(<Row align='top'>
        {window.innerWidth > 800 ? <Col xl={5} lg={5} xs={4}>
            <HeaderNav />
        </Col>:<Col xl={5} lg={5} xs={24}>
            <HeaderMobile />
        </Col>}
        
        <Col xl={19} lg={19} xs={24}>
            <Content />
        </Col>
    </Row>)

}


export default Home