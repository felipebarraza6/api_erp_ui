import React from 'react'

import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'

const NotFound = ({ is_external }) =>{
    return(
    <Result
        status="404"
        title="404"
        subTitle="Sorry! peeero está página no existe!"
        extra={<>{!is_external && <Button type="primary"><Link to='/' type='primary'>Volver al Inicio</Link></Button>}</>}
    >

    </Result>
    )
}

export default NotFound