import React, { useState, useEffect } from 'react'
import { Row, Col, Typography, Card, Descriptions, Modal } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import api from '../../../api/endpoints'
import ModalWells from '../../liftings/erp/ModalWells'

const PreviewLifting = ({ uuid }) => {
    const [lifting, setLifting] = useState(null)

    const getData = async(uuid)=> {
        const rq = await api.liftings.retrieve(uuid).then((response)=> {
            setLifting(response.data)
        })
    }

    useEffect(()=> {
        getData(uuid)
    }, [uuid])

    function ViewClient(lifting) {

        var external_client = lifting.external_client
        var client = lifting.client


        return(<Descriptions size='small' bordered layout='vertical' style={{marginTop:'10px', marginBottom:'10px'}}>
          {external_client ? <><Descriptions.Item label='Nombre contacto' span={3}>
                      <b>{client.name_contact}</b>
                    </Descriptions.Item>            
                    <Descriptions.Item label='Teléfono' span={3}>
                      <b>{client.phone_contact}</b>
                    </Descriptions.Item>
                    <Descriptions.Item label='Email' span={3}>
                      <b>{client.mail_contact}</b>
                    </Descriptions.Item>
                    <Descriptions.Item label='Cargo contacto' span={3}>
                      <b>{client.workload}</b>
                    </Descriptions.Item>
                    <Descriptions.Item label='Nombre empresa' span={3}>
                      <b>{client.name_enterprise}</b>
                    </Descriptions.Item>
                    <Descriptions.Item label='Dirección empresa' span={3}>
                      <b>{client.address_enterprise}</b>
                    </Descriptions.Item></>:''}
            </Descriptions>)
        
      }

    return(<Row style={{marginTop:'-90px'}}>
        <Col style={styles.col} span={24}>{lifting && <Card hoverable>                        
            {ViewClient(lifting)}
            <ModalWells wells={lifting.wells} /><br/><br/>
            FECHA CREACIÓN: <b>{lifting.created.slice(0,10)}</b><br/>
            ÚLTIMA ACTUALIZACIÓN: <b>{lifting.modified.slice(0,10)}</b>            
            </Card>}            
        </Col>
    </Row>)

}

const styles = {
    col: {
        paddingLeft:'10px', marginTop:'-50px'
    }
}


export default PreviewLifting