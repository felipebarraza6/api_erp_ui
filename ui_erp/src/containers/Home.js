//React 
import React from 'react'

//Antd
import { Layout, Menu, Typography  } from 'antd'

// Antd Icons
import { DashboardOutlined,          
          ApartmentOutlined, 
          FolderOutlined,
          BuildOutlined, 
          OrderedListOutlined,
          UserOutlined,
          UnorderedListOutlined,
          ProfileFilled,
          FolderOpenOutlined,
          BarChartOutlined,
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
import Telemetry from '../components/telemetry/Home'


// React Router
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

const { Header, Content, Sider } = Layout


const Home = () =>{
        return(
          <BrowserRouter>
            <Layout style={styles.layouts.principal}>            
            <Sider style={styles.sider} width={'300px'}>
              <div>
                <Typography.Title style={styles.title}>
                  ERP / <span style={styles.title.span}>Smart Hydro</span>
                </Typography.Title>
              </div>
             <hr /> 
              <Menu theme="dark" mode="inline" style={styles.menu} 
                defaultOpenKeys={['2', '3', '4']} >
                <Menu.Item key="200" icon={<BarChartOutlined />} >
                    <Link to="/telemetry">
                     Telemetría
                     </Link>
                </Menu.Item>
                <Menu.Item key="1" icon={<DashboardOutlined />} >
                    <Link to="/">
                     Dashboard
                     </Link>
                </Menu.Item>

                <Menu.SubMenu  key="2" title={<><FolderOpenOutlined /> Clientes</>} >
                      <Menu.Item key="22" icon={<BuildOutlined />}>
                        <Link to="/enterprises">
                           Empresas 
                        </Link>                        
                      </Menu.Item>
                      <Menu.Item key="23" icon={<UserOutlined />}>
                        <Link to="/clients" >
                          Personas
                        </Link>
                      </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="3" title={<><ProfileFilled /> Levantamientos de pozos</>} >
                      <Menu.Item key="13" icon={<UnorderedListOutlined />}>
                      <Link to="/external_lifting">
                          Levantamientos externos
                        </Link>                 
                      </Menu.Item>
                      <Menu.Item key="12" icon={<OrderedListOutlined />}>
                      <Link to="/internal_lifting" >                          
                           Levantamientos internos
                        </Link>                 
                      </Menu.Item>
                      </Menu.SubMenu>
                      <Menu.SubMenu key="4" title={<><FolderOutlined /> Proyectos</>} >
                      <Menu.Item key="8" icon={<FolderOpenOutlined/>}>
                        <Link to="/projects" >
                          Gestionar proyectos
                        </Link>                        
                      </Menu.Item>                      
                      <Menu.Item key="9" icon={<SlidersFilled />}>
                        <Link to="/config_entry">
                          Elementos
                        </Link>                        
                      </Menu.Item>
                      <Menu.Item key="10" icon={<ApartmentOutlined />}>
                        <Link to="/config_deparments">
                          Departamentos
                        </Link>                        
                      </Menu.Item>
                    </Menu.SubMenu>
                  <Menu.Item key="7" icon={<UnorderedListOutlined />}>
                    <Link to="/actions">
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

                    <Route exact path='/telemetry' component={Telemetry} />
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

    const styles = {
      layouts: {
        principal: {
          minHeight: '100vh'
        },
      },
      sider: {
        padding: '10px'
      },
      title: {
        color:'white', 
        textAlign:'left',
        span: {
          fontSize:'25px'
        }
      },
      menu: {
        textAlign:'left',
        marginTop:'20px'
      }
    }


export default Home
