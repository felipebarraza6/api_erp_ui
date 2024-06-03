import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Affix,
  Button,
  Tag,
  notification,
  Tooltip,
  Typography,
  Upload,
  Modal,
} from "antd";
import {
  GoogleCircleFilled,
  PlusSquareFilled,
  LoadingOutlined,
  FileImageOutlined,
  EditFilled,
  ArrowLeftOutlined,
  UploadOutlined,
  CloudDownloadOutlined,
  PlusCircleFilled,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { LiftingContext } from "../../containers/Lifting";
import api from "../../api/endpoints";
import Well from "./Well";

const { Paragraph, Title } = Typography;

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

const WellForm = ({ init }) => {
  const [form] = Form.useForm();
  const { state, dispatch } = useContext(LiftingContext);
  const [visible, setVisible] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [fileList, setFileList] = useState(state.photos);
  const [loadSend, setLoadSend] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      dispatch({
        type: "SET_IMAGE",
        payload: {
          list: newFileList,
        },
      });
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      dispatch({
        type: "SET_IMAGE",
        payload: {
          list: [...fileList, file],
        },
      });
      return false;
    },
  };

  const onSetWell = (values) => {
    dispatch({
      type: "ACTIVE_DEACTIVATE_ALERT_IMG",
      payload: {
        status: false,
      },
    });
    values = {
      ...values,
      photos: state.photos,
    };

    form.resetFields();
    if (init) {
      dispatch({
        type: "UPDATE_WELL",
        payload: {
          id: state.selected_well.id,
          well: values,
        },
      });
      dispatch({
        type: "SET_CURRENT",
        payload: {
          current: "22",
        },
      });
      form.resetFields();
      notification.success({ message: "DATOS GUARDADOS CORRECTAMENTE" });
      console.log(state);
    } else {
      dispatch({
        type: "ADD_WELL",
        payload: {
          well: values,
        },
      });
    }

    dispatch({
      type: "SET_IMAGE",
      payload: {
        list: [],
      },
    });
  };

  const onSendApi = async (values) => {
    setLoadSend(true);
    setDisabledBtn(true);
    var data = {};

    if (state.is_external) {
      data = {
        external_client: await api.external_clients
          .create(state.client_external)
          .then((r) => r.data.id),
        is_external: state.is_external,
      };
      const rq = await api.liftings.create(data).then(async (r) => {
        state.wells.map(async (object, index) => {
          const rq_well = await api.liftings.wells
            .create({
              lifting: r.data.uuid,
              is_dga: true,
              ...object,
            })
            .then(async (res) => {
              if (object.photos.length > 0) {
                object.photos.map(async (photo) => {
                  var rq_photo = await api.liftings.wells
                    .photo({ file: photo, id: res.data.id })
                    .then((response) => {
                      if (state.wells.length - 1 == index) {
                        notification.success({
                          message: "Información enviada correctamente!",
                        });
                        setTimeout(function () {
                          window.location.assign("https://smarthydro.cl");
                        }, 4000);
                      }
                    });
                });
              } else {
                if (state.wells.length - 1 == index) {
                  notification.success({
                    message: "Información enviada correctamente!",
                  });
                  setTimeout(function () {
                    window.location.assign("https://smarthydro.cl");
                  }, 4000);
                }
              }
            });
        });
      });
    } else {
      data = {
        client: state.client_api,
        is_external: state.is_external,
      };
      const rq = await api.liftings.create(data).then(async (r) => {
        state.wells.map(async (object) => {
          const rq_well = await api.liftings.wells
            .create({
              lifting: r.data.uuid,
              is_dga: true,
              ...object,
            })
            .then(async (res) => {
              if (object.photos.length > 0) {
                object.photos.map(async (photo) => {
                  var rq_photo = await api.liftings.wells
                    .photo({ file: photo, id: res.data.id })
                    .then((response) => {
                      notification.success({
                        message: "Información enviada correctamente!",
                      });
                      setVisible(false);
                      dispatch({
                        type: "RESET_ALL_APP_INTERNAL",
                      });
                    });
                });
              } else {
                notification.success({
                  message: "Información enviada correctamente!",
                });
                dispatch({
                  type: "RESET_ALL_APP_INTERNAL",
                });
                setVisible(false);
              }
            });
        });
      });
    }
  };

  const setModalView = (values) => {
    Modal.confirm({
      title: "Estás correcta la información ingresada del pozo?",
      footer: [
        <Button
          style={{ marginRight: "10px" }}
          icon={<EditFilled />}
          onClick={() => Modal.destroyAll()}
        >
          No, continuar editando
        </Button>,
        <Button
          style={{ marginRight: "10px" }}
          icon={<PlusCircleFilled />}
          onClick={() => {
            onSetWell(values);

            const modal = Modal.success({
              title:
                "Pozo ingresado correctamente, ahora puedes ingresar la información del nuevo pozo",
            });

            Modal.destroyAll();
          }}
        >
          {init ? "Si, actualizar información" : "Si, agregar otro pozo"}
        </Button>,
        <Button
          style={{ marginRight: "10px" }}
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => {
            onSetWell(values);
            setVisible(true);
          }}
        >
          Si, Finalizar registro
        </Button>,
      ],
      cancelText: "No, continuar editando",
      width: "700px",
    });
  };

  const setWellDraft = (field, x) => {
    var val_obj = x.target.value;

    dispatch({
      type: "ADD_ITEM_WELL_DRAFT",
      payload: {
        field: field,
        value: val_obj,
      },
    });
  };

  const okNext = () => {};

  useEffect(() => {
    if (state.photos.length == 0) {
      setFileList([]);
    } else {
      setFileList(state.photos);
    }
    const getGpsPosition = () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          var str_location = `LAT: ${position.coords.latitude} \n LON: ${position.coords.longitude}`;
          form.setFieldsValue({ address_exact: str_location });
        },
        (error) => {
          Modal.error({ message: "IMPOSBILE USAR MAPA EN ESTE NAVEGADOR" });
          var str_location = `LAT: \n LON:`;
          form.setFieldsValue({ address_exact: str_location });
        }
      );
    };

    if (!state.is_external && !init) {
      getGpsPosition();
    }

    if (state.selected_well) {
      form.setFieldsValue({ ...state.selected_well });
    } else {
      form.resetFields();
    }
  }, [state.conunt_form, state.wellDraft]);

  return (
    <Form
      layout={"vertical"}
      onFinish={setModalView}
      form={form}
      className="my-select-container"
      initialValues={state.selected_well}
    >
      <Modal
        title={
          !loadSend && (
            <Title level={4} style={{ textAlign: "center" }}>
              ¿Estas seguro de finalizar el proceso de levantamiento de
              información?
            </Title>
          )
        }
        visible={visible}
        footer={[]}
        onCancel={() => setVisible(false)}
      >
        <Row
          justify="space-around"
          align="middle"
          className="my-select-container"
        >
          <Col span={24} style={{ textAlign: "center" }}>
            {loadSend && (
              <>
                <Title level={3}>
                  Tus datos ingresados están siendo procesados...
                </Title>
                <Paragraph>
                  En cuanto recibamos tú información nos pondremos en contacto a
                  la brevedad...
                </Paragraph>
                <LoadingOutlined
                  style={{
                    fontSize: "25px",
                    marginTop: "20px",
                    marginBottom: "35px",
                  }}
                />
                <></>
              </>
            )}
          </Col>
          <Col>
            <Button
              disabled={disabledBtn}
              style={styles.btn}
              type="primary"
              icon={<CloudUploadOutlined />}
              onClick={onSendApi}
              size="large"
            >
              FINALIZAR
            </Button>
          </Col>

          {!loadSend && (
            <Col>
              <Button
                icon={<ArrowLeftOutlined />}
                style={styles.btn}
                size="large"
                danger
                onClick={() => setVisible(false)}
              >
                CANCELAR
              </Button>
            </Col>
          )}
        </Row>
      </Modal>
      <Card hoverable={true} style={styles.card1}>
        <Row>
          <Col
            xl={6}
            lg={6}
            xs={24}
            style={{ marginBottom: window.innerWidth < 800 && "5px" }}
          >
            <Item
              name="name"
              label="Nombre pozo"
              rules={[{ required: true, message: "Campo boligatorio" }]}
            >
              <Input placeholder="Nombre pozo" style={styles.input} />
            </Item>
          </Col>
          <Col
            xl={6}
            lg={6}
            xs={24}
            style={{ marginBottom: window.innerWidth < 800 && "5px" }}
          >
            <Item
              name="pickup_type"
              label="Tipo de captación"
              rules={[{ required: true, message: "Campo boligatorio" }]}
            >
              <Select
                placeholder="Tipo de captación"
                dropdownStyle={styles.input.select}
                style={{ width: "200px" }}
              >
                <Option value="pozo">Pozo</Option>
                <Option value="puntera">Puntera</Option>
              </Select>
            </Item>
          </Col>
          <Col
            xl={6}
            lg={6}
            xs={24}
            style={{ marginBottom: window.innerWidth < 800 && "5px" }}
          >
            <Item
              label="Dirección"
              rules={[
                {
                  required: state.is_external ? true : false,
                  message: "Campo boligatorio",
                },
              ]}
              name="address_exact"
            >
              <TextArea
                rows={3}
                placeholder={
                  state.is_external
                    ? "Ingresa dirección; Región, comuna, sector"
                    : "COORDENADAS"
                }
                style={styles.input}
              />
            </Item>
          </Col>
          <Col xl={6} lg={6} xs={24}>
            <Item label="Link ubicación" name="link_location">
              <TextArea
                rows={3}
                placeholder="Pega aquí la URL de la ubicación del pozo (Google Maps.)"
                style={styles.input}
              />
            </Item>
            <Button
              onClick={() => window.open("https://www.google.com/maps")}
              size="small"
              type="primary"
              style={{
                marginTop: "5px",
                borderRadius: "5px",
                marginLeft: window.innerWidth > 800 && "85px",
              }}
              icon={<GoogleCircleFilled />}
            >
              Ir a Google Maps
            </Button>
          </Col>
        </Row>
      </Card>
      <Row>
        <Col lg={10} xl={10} xs={24}>
          <Tag style={styles.titleTag}>Mediciones del pozo</Tag>
          <Item
            label={"Caudal otorgado"}
            style={styles.inputWell}
            name="flow_granted_dga"
            rules={[{ required: true, message: "Campo boligatorio" }]}
          >
            <Input
              type="number"
              onChange={(value) => setWellDraft("flow_granted_dga", value)}
              prefix={
                <>
                  <Tag color="blue" style={styles.tag}>
                    1
                  </Tag>
                </>
              }
              suffix={
                <>
                  <Tag color="blue" style={styles.tag}>
                    l/s
                  </Tag>
                </>
              }
              placeholder={"LITROS/SEGUNDOS"}
              style={styles.input}
            />
          </Item>
          <Item
            label={"Profunfidad instalación bomba"}
            style={styles.inputWell}
            name="pupm_depth"
            rules={[{ required: true, message: "Campo boligatorio" }]}
          >
            <Input
              type="number"
              onChange={(value) => setWellDraft("pupm_depth", value)}
              prefix={
                <Tag color="blue" style={styles.tag}>
                  2
                </Tag>
              }
              suffix={
                <>
                  <Tag color="blue" style={styles.tag}>
                    m
                  </Tag>
                </>
              }
              placeholder="METROS"
              style={styles.input}
            />
          </Item>
          <Item
            label={"Diámetro interior pozo"}
            style={styles.inputWell}
            name="inside_diameter"
            rules={[{ required: true, message: "Campo boligatorio" }]}
          >
            <Input
              type="number"
              onChange={(value) => setWellDraft("inside_diameter", value)}
              prefix={
                <Tag color="blue" style={styles.tag}>
                  3
                </Tag>
              }
              suffix={
                <>
                  <Tag color="blue" style={styles.tag}>
                    MM/PULG
                  </Tag>
                </>
              }
              placeholder="MILIMETROS/PULGADAS"
              style={styles.input}
            />
          </Item>
          <Item
            label={"Diámetro ducto salida bomba"}
            style={styles.inputWell}
            name="outside_diameter"
            rules={[{ required: true, message: "Campo boligatorio" }]}
          >
            <Input
              type="number"
              onChange={(value) => setWellDraft("outside_diameter", value)}
              prefix={
                <Tag color="blue" style={styles.tag}>
                  4
                </Tag>
              }
              suffix={
                <>
                  <Tag color="blue" style={styles.tag}>
                    MM/PULG
                  </Tag>
                </>
              }
              placeholder="MILIMETROS/PULGADAS"
              style={styles.input}
            />
          </Item>
          <Item
            label={"Profunfidad total pozo"}
            style={styles.inputWell}
            name="depth"
          >
            <Input
              type="number"
              onChange={(value) => setWellDraft("depth", value)}
              prefix={
                <Tag color="blue" style={styles.tag}>
                  5
                </Tag>
              }
              suffix={
                <Tag color="blue" style={styles.tag}>
                  m
                </Tag>
              }
              placeholder="METROS"
              style={styles.input}
            />
          </Item>
                    <Tag style={styles.titleTagInfo}>Información adiconal</Tag>
          <Item style={styles.inputWell} name="is_sensor_flow">
            <Select
              placeholder="¿Cuenta con sensor de flujo?"
              style={styles.input}
              dropdownStyle={styles.input.select}
            >
              <Option value={true}>SI</Option>
              <Option value={false}>NO</Option>
            </Select>
          </Item>
          <Item
            style={styles.inputWell}
            label="Factibilidad eléctrica"
            name="is_feasibility_electrical"
            rules={[{ required: true, message: "Selecciona una opción" }]}
          >
            <Select
              placeholder=" ¿Cuenta con factibilidad eléctrica 220v?"
              style={styles.input}
              dropdownStyle={styles.input.select}
            >
              <Option value={true}>SI</Option>
              <Option value={false}>NO</Option>
            </Select>
          </Item>
          <Item style={styles.inputWell} name="note">
            <TextArea
              rows={3}
              style={styles.input}
              placeholder="Describe cualquier observación necesaria"
            />
          </Item>
          {window.innerWidth > 800 ? (
            <Tooltip
              overlayStyle={{ backgroundColor: "#1890ff" }}
              title={
                <>
                  <Paragraph style={{ color: "white" }}>
                    Debes ingresar como minímo las siguientes fotos:
                  </Paragraph>
                  <Paragraph style={{ color: "white" }}>
                    1) Foto general del pozo.
                  </Paragraph>
                  <Paragraph style={{ color: "white" }}>
                    2) Foto del lugar de emplazamiento del pozo.
                  </Paragraph>
                  <Paragraph style={{ color: "white" }}>
                    3) Foto del detalle del ducto de salida del pozo.
                  </Paragraph>
                  <Paragraph style={{ color: "white" }}>
                    Si no cuentas con fotos en este momento, las puedes enviar
                    más tarde vía correo electrónico.
                  </Paragraph>
                </>
              }
            >
              <Card hoverable={true} style={styles.card}>
                <Tag style={styles.tagph}>
                  <FileImageOutlined style={{ fontSize: "17px" }} /> FOTOS{" "}
                  {state.photos.length}
                </Tag>
                {(state.photos.length === 0) &
                (state.active_alert_img === true) ? (
                  <Paragraph
                    style={{
                      borderRadius: "6px",
                      color: "rgb(194, 24, 7, 76)",
                      backgroundColor: "rgb(194, 24, 7, 0.1)",
                      border: "1px solid red",
                      padding: "5px",
                    }}
                  >
                    DEBES INGRESAR AL MENOS UNA IMÁGEN PARA CONTINUAR
                  </Paragraph>
                ) : (
                  ""
                )}
                <Upload {...props} fileList={fileList}>
                  <Button
                    type="primary"
                    icon={<PlusCircleFilled />}
                    style={styles.btn}
                  >
                    Agregar
                  </Button>
                </Upload>
              </Card>
            </Tooltip>
          ) : (
            <Card hoverable={true} style={styles.card}>
              <Paragraph style={{ color: "#262626" }}>
                <b> Debes ingresar como minímo las siguientes fotos: </b>
              </Paragraph>
              <Paragraph style={{ color: "#262626" }}>
                1) Foto general del pozo.
              </Paragraph>
              <Paragraph style={{ color: "#262626" }}>
                2) Foto del lugar de emplazamiento del pozo.
              </Paragraph>
              <Paragraph style={{ color: "#262626" }}>
                3) Foto del detalle del ducto de salida del pozo.
              </Paragraph>
              <Tag style={styles.tag}>
                <FileImageOutlined /> FOTOS {state.photos.length}
              </Tag>
              {(state.photos.length === 0) &
              (state.active_alert_img === true) ? (
                <Paragraph
                  style={{
                    borderRadius: "6px",
                    color: "rgb(194, 24, 7, 76)",
                    backgroundColor: "rgb(194, 24, 7, 0.1)",
                    border: "1px solid red",
                    padding: "5px",
                  }}
                >
                  DEBES INGRESAR AL MENOS UNA IMÁGEN PARA CONTINUAR
                </Paragraph>
              ) : (
                ""
              )}
              <Upload {...props} fileList={fileList} previewFile={false}>
                <Button
                  size="small"
                  type="primary"
                  icon={<PlusCircleFilled />}
                  style={styles.btn}
                >
                  Agregar
                </Button>
              </Upload>
            </Card>
          )}
        </Col>
        <Col xl={14} lg={14} xs={24}>
          <Affix>
            <Card style={styles.card2}>
              <Well />
            </Card>
          </Affix>
        </Col>
        <Col>
          <Item>
            <Button
              icon={<></>}
              htmlType={"submit"}
              style={styles.btn}
              type="primary"
            >
              {init
                ? `Guardar cambios pozo "${state.selected_well.name.toUpperCase()}"`
                : "Aceptar"}
            </Button>
          </Item>
        </Col>
        <Col>
          {!init && (
            <Item>
              <Button onClick={() => form.resetFields()} style={styles.btn}>
                Limpiar
              </Button>
            </Item>
          )}
        </Col>
      </Row>
    </Form>
  );
};

const styles = {
  card: {
    borderRadius: "10px",
    width: window.innerWidth < 800 ? "100%" : "90%",
    marginTop: "10px",
    marginBottom: "10px",
    backgroundColor: "white",
    border: "1px solid #white",
  },
  input2: {
    borderRadius: "10px",
    color: "#001529",
    height: "73px",
  },
  titleTag: {
    backgroundColor: "#1890ff",
    color: "white",
    borderRadius: "5px",
    fontSize: "15px",
    marginBottom: "10px",
  },
  titleTagInfo: {
    backgroundColor: "#1890ff",
    color: "white",
    borderRadius: "5px",
    fontSize: "15px",
    marginBottom: "10px",
  },
  title: {},
  tag: {
    borderRadius: "10px",
  },
  tagph: {
    borderRadius: "10px",
    paddong: "5px",
    fontSize: "17px",
  },
  input: {
    borderRadius: "10px",
    color: "#001529",
    width: "90%",
    select: {
      borderRadius: "10px",
      color: "#001529",
      width: window.innerWidth < 900 ? "90%" : "200px",
    },
  },
  btn: {
    borderRadius: "10px",
    marginRight: "10px",
  },
  inputWell: {
    marginBottom: "10px",
  },
  card1: {
    marginBottom: "20px",
    borderRadius: "10px",
    width: "100%",
    icon: {
      color: "white",
      marginRight: "5px",
    },
  },
  card2: {
    marginBottom: "20px",
    borderRadius: "10px",
    width: "100%",
    icon: {
      color: "#001529",
      marginRight: "5px",
    },
    backgroundColor: "#001529",
  },
};

export default WellForm;
