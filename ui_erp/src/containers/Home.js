//React 
import React from 'react'

//Antd
import { Layout, Menu, Typography  } from 'antd'

// Antd Icons
import { DashboardOutlined,          
          ApartmentOutlined, 
          FolderOutlined,
          BuildOutlined, 
          ToolOutlined,
          OrderedListOutlined,
          UserOutlined,
          UnorderedListOutlined,
          ProfileFilled,
          FolderOpenOutlined, 
          PercentageOutlined,
          BuildFilled,
         SlidersFilled } from '@ant-design/icons'

//Build


//Components
import MenuHeader from '../components/home/MenuHeader'
import Dashboard from '../components/dashboard/Dashboard'
import Enterprises from '../components/enterprises/Enterprises'
import Clients from '../components/clients/Clients'
import Tasks from '../components/tasks/Tasks'
import NotFound from '../components/errors/NotFound'
import Projects from '../components/projects/Projects'
import ConfigElements from '../components/config_elements/ConfigElements'
import ViewProject from '../components/projects/ViewProject'
import ExternalLiftings from '../components/liftings/erp/ExternalLiftings'
import InternalLifftings from '../components/liftings/erp/InternalLiftings'
import Departaments from '../components/departaments/Departaments'


// React Router
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

const { Header, Content, Sider } = Layout


const Home = () =>{
        return(
          <BrowserRouter>
            <Layout style={{ minHeight: '100vh' }}>            
            <Sider style={{padding:'10px'}} width={'300px'}>
              <div>
                <Typography.Title style={{color:'white', textAlign:'left'}}>
                  ERP / <span style={{fontSize:'25px'}}>Smart Hydro</span>
                </Typography.Title>
              </div>
             <hr /> 
              <Menu theme="dark" mode="inline" style={{textAlign:'left',marginTop:'20px'}} 
              
              defaultOpenKeys={['2', '3', '4']}
              >
                <Menu.Item key="1" >
                    <Link to="/">
                    <DashboardOutlined style={{marginRight:'10px'}}/>
                     Dashboard
                     </Link>
                </Menu.Item>
                <Menu.SubMenu  key="2" title={<><FolderOpenOutlined /> Clientes</>} >
                      <Menu.Item key="22">
                        <Link to="/enterprises">
                          <BuildOutlined />
                           Empresas 
                        </Link>                        
                      </Menu.Item>
                      <Menu.Item key="23">
                        <Link to="/clients">
                          <UserOutlined />
                          Personas
                        </Link>
                        
                      </Menu.Item>
                      
                      
                                      </Menu.SubMenu>
                <Menu.SubMenu key="3" title={<><ProfileFilled /> Levantamientos de pozos</>} >
                      
                      <Menu.Item key="13">
                      <Link to="/external_lifting">
                          <UnorderedListOutlined />
                          Levantamientos externos
                        </Link>                 
                      </Menu.Item>
                      <Menu.Item key="12">
                      <Link to="/internal_lifting">                          
                          <OrderedListOutlined />
                           Levantamientos internos
                        </Link>                 
                      </Menu.Item>
                      
                                      </Menu.SubMenu>
<Menu.SubMenu key="4" title={<><FolderOutlined />Proyectos</>} >
                      <Menu.Item key="8">
                        <Link to="/projects">
                          <FolderOpenOutlined/>
                          Gestionar proyectos
                        </Link>                        
                      </Menu.Item>                      
                      <Menu.Item key="9" >
                        <Link to="/config_entry">
                          <SlidersFilled />
                          Elementos
                        </Link>                        
                      </Menu.Item>
                      <Menu.Item key="10">
                        <Link to="/config_deparments">
                          <ApartmentOutlined />
                          Departamentos
                        </Link>                        
                      </Menu.Item>
                    </Menu.SubMenu>
                  <Menu.Item key="7">
                    <Link to="/actions">
                        <UnorderedListOutlined />
                        Gestión de Tareas
                      </Link>
                  </Menu.Item>                
              </Menu>
              
            </Sider>

            <Layout>              
            <Header >
                <MenuHeader />                                        
            </Header>
              <Content>
                
                <div style={{ padding: 24, minHeight: 360, textAlign:'left' }}>
                  <Switch>                
                    <Route exact path='/' component={Dashboard} />
                    <Route exact path='/enterprises' component={Enterprises} />
                    <Route exact path='/clients' component={Clients} />
                    <Route exact path='/actions' component={Tasks} />
                    <Route exact path='/external_lifting' component={ExternalLiftings} />
                    <Route exact path='/internal_lifting' component={InternalLifftings} />
                    <Route exact path='/projects' component={Projects} />
                    <Route exact path='/config_entry' component={ConfigElements} />
                    <Route exact path='/projects/:id' component={ViewProject} />
                    <Route exact path='/config_deparments' component={Departaments} />
                    <Route path="*" component={NotFound} />
                 </Switch>
                </div>
                
              </Content>              
            </Layout>

          </Layout>
          </BrowserRouter>

                            
        )
    }


export default Home
