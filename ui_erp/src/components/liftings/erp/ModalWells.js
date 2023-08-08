import React, { useState } from 'react'
import { Button, Modal, Row, 
        Col, Card, Collapse,
        Descriptions, Tooltip } from 'antd'
import { FileImageFilled } from '@ant-design/icons'
import { BASE_URL_IMG } from '../../../api/api'
import ResolutionForm from './ResolutionForm'
 
const ModalWells = ({wells}) => {

    const [open, setOpen] = useState(false)

    const toggleModal = () => {
        if(open){
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

    return(<>
        <Modal onCancel={toggleModal} width={'100%'} style={styles.modal} open={open} footer={[<Button onClick={toggleModal} type='primary'>Volver</Button>]}>
            <Row justify={'center'} style={styles.container}>
                {wells.map((well) => {
                    return (<Col style={styles.container.col} span={12}>
                        <Card title={well.name}>
                            <Collapse defaultActiveKey={['2']}>
                                <Collapse.Panel key='1' header='Datos generales'>
                                    <Descriptions size='small' bordered>
                                        <Descriptions.Item span={3} label={<>Tipo captación</>}>
                                            {well.pickup_type}
                                        </Descriptions.Item>
                                        <Descriptions.Item span={3} label={<>Dirección</>}>
                                            {well.address_exact}
                                        </Descriptions.Item>
                                        {well.link_location && 
                                            <Descriptions.Item span={3} label={<>Link ubicación</>} >
                                                <a href={well.link_location} target='__blank'>Ver link</a>
                                            </Descriptions.Item>}
                                    </Descriptions>
                                </Collapse.Panel>
                                <Collapse.Panel key='2' header='Datos del pozo'>
                                    <Descriptions size='small' bordered>
                                        <Descriptions.Item span={3} label={<>Caudal otorgado</>}>
                                            {well.flow_granted_dga && parseFloat(well.flow_granted_dga).toFixed(2) } <span style={styles.span}>(Lt/SEG)</span>
                                        </Descriptions.Item>
                                        <Descriptions.Item span={3} label={<>Profundida instalación bomba</>}>                    
                                            {well.pupm_depth && parseFloat(well.pupm_depth).toFixed(2)} <span style={styles.span}>(Mt)</span>
                                        </Descriptions.Item>
                                        <Descriptions.Item span={3} label={<>Diámetro interior pozo</>}>                    
                                            {well.inside_diameter && parseFloat(well.inside_diameter).toFixed(2)} <span style={styles.span}>(MM/PULG)</span>
                                        </Descriptions.Item>
                                        <Descriptions.Item span={3} label={<>Diámetro exterior ducto salida bomba</>}>                    
                                            {well.outside_diameter && parseFloat(well.outside_diameter).toFixed(2)} <span style={styles.span}>(MM/PULG)</span>
                                        </Descriptions.Item>                  
                                        <Descriptions.Item span={3} label={<>Profundida total del pozo</>}>
                                        {well.depth && parseFloat(well.depth).toFixed(2)} <span style={styles.span}>(Mt)</span>                    
                                        </Descriptions.Item>
                                        <Descriptions.Item span={3} label={<>Nivel estático </>}>
                                            {well.static_level && parseFloat(well.static_level).toFixed(2)} <span style={styles.span}>(Mt)</span>                     
                                        </Descriptions.Item>
                                        <Descriptions.Item span={3} label={<>Nivel dinámico</>}>                    
                                            {well.dynamic_level && parseFloat(well.dynamic_level).toFixed(2)} <span style={styles.span}>(Mt)</span> 
                                        </Descriptions.Item>                                                     
                                        <Descriptions.Item span={3} label={<>Cuenta con flujometro? </>}>
                                            {well.is_sensor_flow ? 'SI':'NO'}
                                        </Descriptions.Item>
                                        <Descriptions.Item span={3} label={<>Cuenta con factibilidad electrica? </>}>
                                            {well.is_feasibility_electrical ? 'SI':'NO'}
                                        </Descriptions.Item>
                                        <Descriptions.Item span={3} label={<>Nota</>}>
                                            <Button type='primary' size='small' style={{borderRadius:'5px'}} onClick={()=>Modal.info({content:<>{well.note}</>})}>Leer nota</Button>
                                        </Descriptions.Item>
                                    </Descriptions>
                                    <Row justify='center' style={{marginTop:'15px'}}>
                                    {well.photos.map((file)=>
                                        <Col span={8} style={{paddingRight:'3px', paddingLeft:'3px'}}>
                                    <Tooltip title='Has click para abrir la imagén!'>
                                        <a icon={<FileImageFilled/>} type='ghost' style={{margin:'5px', marginTop:'20px'}} onClick={()=>window.open(`${BASE_URL_IMG}${file.photo}`)}>                        
                                            <img src={`${BASE_URL_IMG}${file.photo}`} style={{width:'100%', borderRadius:'10px', }} />
                                        </a></Tooltip></Col>)}
                                    </Row>                                    
                                </Collapse.Panel>
                                <Collapse.Panel key='3' header='Resolución'>                    
                                        <ResolutionForm well={well.id} />
                                    </Collapse.Panel>
                            </Collapse>
                        </Card>
                    </Col>)
                })}
            </Row>
        </Modal>
        <Button type='primary' onClick={toggleModal}>Pozos: {wells.length}</Button>
    </>)
}

const styles = {
    container: {
        padding:'15px',        
        col: {
            paddingRight:'5px',
            paddingLeft:'5px'
        }
    },
    modal: {
        top:5,        
    }
}


export default ModalWells