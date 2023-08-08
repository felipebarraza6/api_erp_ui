import React, { useState } from 'react'
import { Row, Col } from 'antd'
import FormDeparment from './FormDepartament'
import ListDepartaments from './ListDepartaments'

const Departaments = () => {

    const [count, setCount] = useState(0)

    return(<Row align='middle' style={styles.row}>
        <Col span={12} style={styles.col}>
            <ListDepartaments count={count} setCount={setCount} />
        </Col>
        <Col span={12} style={styles.col}>
            <FormDeparment count={count} setCount={setCount} />
        </Col>
    </Row>)

}


const styles = {
    col: {
        padding: '10px'
    }, 
    row: {
        minHeight: '70vh'
    }
}


export default Departaments