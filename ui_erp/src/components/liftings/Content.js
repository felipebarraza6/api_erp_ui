import React, { useContext, useEffect } from 'react'
import { LiftingContext } from '../../containers/Lifting'
import { Row, Col } from 'antd'
import FormExternalClient from './FormExternalClient'
import WellForm from './WellForm'
import SaveDerviceLiftings from './SaveDeviceLiftings'


const Content = () => {

    const { state, dispatch } = useContext(LiftingContext)
    
    useEffect(()=> {

    }, [state.conunt_form])

    return(<Row align='middle'>
        <Col span={24}>
            {state.steps.current==='C1' &&
                <FormExternalClient />}
            {state.steps.current==='CE' &&
                <FormExternalClient />}
            {state.steps.current==='22' &&
                <WellForm />}
            {state.steps.current.slice(0,1) === 'E' && 
                <WellForm init = {state.selected_well} />}
            {state.steps.current==='LS' &&
                <SaveDerviceLiftings />}
        </Col>
    </Row>)
}


export default Content