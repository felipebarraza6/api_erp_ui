import React from 'react'
import { Row, Col, Form, Input, Button, Typography, notification } from 'antd'
import { SaveOutlined, ClearOutlined } from '@ant-design/icons'
import api from '../../api/endpoints'
const { Title } = Typography

const FormDeparment = () => {

    const [form] = Form.useForm()

    const onFinish = async(values) => {
        const rq = await api.projects.company_deparments.create(values).then((r)=> {
            notification.success({message: 'DEPARTAMENTO CREADO'})
            form.resetFields()
        })
    }



    return(<Row>
        <Row span={24}>
            <Title level={3}>Crear nuevo departamento</Title>
        </Row>
            <Col span={24}>
                <Form layout='vertical' form={form} onFinish={onFinish}>
                    <Form.Item name={'name'} rules={[{required:true, message:'Ingresa el nombre...'}]}>
                        <Input prefix={'Nombre: '} />
                    </Form.Item>
                    <Form.Item label='Descripcion' name={'description'}>
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' icon={<SaveOutlined />} style={styles.btn} type='primary'>Crear</Button>
                        <Button icon={<ClearOutlined />} style={styles.btn} onClick={()=>form.resetFields()}>Limpiar</Button>
                    </Form.Item>
                </Form>
            </Col>
        
        </Row>)
}


const styles = {
    btn: {
        borderRadius: '10px',
        marginRight: '10px'
    }
}


export default FormDeparment