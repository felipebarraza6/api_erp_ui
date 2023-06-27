import React, { createContext, useReducer } from 'react'
import Home from '../components/liftings/Home'
import { Row, Col, Card } from 'antd'
import { reducer } from '../reducers/liftings'

export const LiftingContext = createContext()


const Lifting = ({ is_external }) => {
    
    const iniitalState = {
        is_external: is_external,
        client_api: null,
        client_external: {
            id_client:null,
            name_contact: null,
            name_enterprise: null,
            mail_contact: null,
            phone_contact: null,
            address_enterprise: null,
            workload: null,
            is_draft: false
        },
        wellTemp: {},
        wells: [],
        selected_well: null,
        photos: [],
        steps: {
            current: is_external ? 'C1':'22',            
        },
        active_alert_img: false,
        conunt_form: 0
    }

    const url_image = 'https://smarthydro.cl/static/media/icono_logo.4b5c24e4.png'
    const [state, dispatch] = useReducer(reducer, iniitalState)    

    console.log(state)

    return(<LiftingContext.Provider value={{ state,dispatch }}>
            <Row justify='center' align='middle' style={{height:'100vh'}}>
                <Col span={24}>
                    <Card style={styles.card} >
                        <Home />                                
                    </Card>
                </Col>
            </Row>
    </LiftingContext.Provider>)

}

const styles = {
    logo: {
        marginRight:'20px'
    },
    card: {
        borderRadius:'20px',
        
    }
}

export default Lifting