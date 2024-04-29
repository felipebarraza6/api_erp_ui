import React from "react";
import { Row, Col, Card, Tag, Table, Typography, Modal, Button } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  LoginOutlined,
  FilePdfFilled,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const ExpandedRow = ({ record }) => {
  const today = new Date();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const todayString = `${today.getFullYear()}-${month}-${day}`;

  return (
    <Row align={"top"} justify={"space-around"} style={styles.container}>
      <Col span={7}>
        <Card
          style={{ margin: "5px" }}
          title="Ikolu"
          hoverable
          extra={
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => window.open("https://ikolu.smarthydro.app")}
            >
              Ingresar
            </Button>
          }
        >
          <b>usuario:</b> {record.user.email} <br />
          <b>clave:</b> {record.user.txt_password} <br />
          <Row>
            <Col span={24}>
              <b>Mi Pozo: </b>{" "}
              {record.module_1 ? (
                <>
                  <CheckCircleFilled style={{ color: "green" }} />
                  <br />
                </>
              ) : (
                <>
                  <CloseCircleFilled style={{ color: "red" }} />
                  <br />
                </>
              )}{" "}
              <b>DGA: </b>{" "}
              {record.module_2 ? (
                <>
                  <CheckCircleFilled style={{ color: "green" }} />
                  <br />
                </>
              ) : (
                <>
                  <CloseCircleFilled style={{ color: "red" }} />
                  <br />
                </>
              )}{" "}
              <b>Datos y reportes: </b>{" "}
              {record.module_3 ? (
                <>
                  <CheckCircleFilled style={{ color: "green" }} />
                  <br />
                </>
              ) : (
                <>
                  <CloseCircleFilled style={{ color: "red" }} />
                  <br />
                </>
              )}{" "}
              <b>Graficos: </b>{" "}
              {record.module_4 ? (
                <>
                  <CheckCircleFilled style={{ color: "green" }} />
                  <br />
                </>
              ) : (
                <>
                  <CloseCircleFilled style={{ color: "red" }} />
                  <br />
                </>
              )}{" "}
              <b>Indicadores: </b>{" "}
              {record.module_5 ? (
                <>
                  <CheckCircleFilled style={{ color: "green" }} />
                  <br />
                </>
              ) : (
                <>
                  <CloseCircleFilled style={{ color: "red" }} />
                  <br />
                </>
              )}{" "}
            </Col>
          </Row>
        </Card>
        <Card
          style={{ margin: "5px" }}
          title="Caracteristicas del pozo"
          hoverable
        >
          <b>Profundidad de pozo:</b> {record.d1} <br />
          <b>Posicionamiento de bomba:</b> {record.d2} <br />
          <b>Posicionamiento del sensor de nivel:</b> {record.d3}
          <br />
          <b>Diámetro ducto de salida bomba:</b> {record.d4}
          <br />
          <b>Diámetro flujometro:</b> {record.d5}
        </Card>
        <Card
          style={{ margin: "5px" }}
          title={<>Logger ({record.is_thethings ? "NETTRA" : "NOVUS"})</>}
          hoverable
          extra={record.variables.length}
        >
          <div
            style={{
              marginBottom: "10px",
              border: "2px solid grey",
              borderRadius: "5px",
              padding: "5px",
            }}
          >
            {record.token_service}
          </div>
          {record.variables.map((variable) => (
            <div>
              {variable.type_variable === "NIVEL" && (
                <Tag
                  color="blue-inverse"
                  key={variable.id}
                  style={styles.tagVariable}
                  onClick={() =>
                    Modal.info({
                      title: "Formula nivel freatico",
                      icon: <></>,
                      width: "500px",
                      content: (
                        <>
                          El nivel freático, es el límite superior de la zona de
                          saturación o zona saturada; es decir, el nivel al que
                          llega el agua en el suelo.
                          <br />
                          <br />
                          Nuestro sistema de medicion en terreno nos proporciona
                          el nivel del agua en el pozo, y con la ayuda del
                          posicionamiento del sensor de nivel, podemos calcular
                          el nivel freatico.
                          <br />
                          <br />
                          Posicionamiento de sensor de nivel - Medición del
                          sensor de nivel = <b>Nivel Freaftico</b>
                          <br />
                          <br />
                          <center>
                            <span
                              style={{
                                padding: "5px",
                                border: "2px solid #1677ff",
                                borderRadius: "5px",
                              }}
                            >
                              <b>A</b> - <b>B = C</b>
                            </span>
                          </center>
                        </>
                      ),
                    })
                  }
                >
                  {variable.type_variable}: {variable.str_variable} (ver
                  procesamiento)
                </Tag>
              )}
              {variable.type_variable === "ACUMULADO" && (
                <>
                  <Tag
                    color="blue-inverse"
                    key={variable.id}
                    style={styles.tagVariable}
                    onClick={() =>
                      Modal.info({
                        title: "Procesamiento de acumulado",
                        icon: <></>,
                        width: "500px",
                        content: (
                          <>
                            El acumulado es un valor que nos proporciona el
                            caudalimetro o flujometro, al cual podemos darle una
                            constante inicial si es requerido esto hara que las
                            mediciones recibidas se alteren sumando esta
                            constante;
                            <br />
                            Constante de medición({variable.counter}) + Medición
                            acumulado = <b>Acumulado</b>
                            <br />
                            <br />
                            <center>
                              <span
                                style={{
                                  padding: "5px",
                                  border: "2px solid #1677ff",
                                  borderRadius: "5px",
                                }}
                              >
                                <b>A</b> + <b>B = C</b>
                              </span>
                            </center>
                          </>
                        ),
                      })
                    }
                  >
                    {variable.type_variable}: {variable.str_variable} (ver
                    procesamiento)
                  </Tag>{" "}
                  <Tag style={{ marginBottom: "10px" }}>
                    Pulsos(lt*p): {record.scale}{" "}
                  </Tag>
                  <Tag style={{ marginBottom: "10px" }}>
                    Constante(m³): {variable.counter}{" "}
                  </Tag>
                </>
              )}
              {variable.type_variable === "CAUDAL" && (
                <>
                  {variable.convert_to_lt ? (
                    <Tag
                      color="blue-inverse"
                      key={variable.id}
                      style={styles.tagVariable}
                      onClick={() =>
                        Modal.info({
                          title: "Procesamiento de caudal",
                          icon: <></>,
                          width: "500px",
                          content: (
                            <>
                              El caudal instantaneo proviene directamente del
                              logger pero podriamos procesarlo si es requerido.
                              Pudiendo transformar metros cubicos a litros.
                              <br />
                              Medicion en m³ * 3,6 = <b>Caudal</b>
                              <br />
                              <br />
                              <center>
                                <span
                                  style={{
                                    padding: "5px",
                                    border: "2px solid #1677ff",
                                    borderRadius: "5px",
                                  }}
                                >
                                  <b>A</b> * <b>3,6 = C</b>
                                </span>
                              </center>
                            </>
                          ),
                        })
                      }
                    >
                      {variable.type_variable}: {variable.str_variable} (ver
                      procesamiento)
                    </Tag>
                  ) : (
                    <Tag
                      color="blue-inverse"
                      key={variable.id}
                      style={styles.tagVariable}
                      onClick={() =>
                        Modal.info({
                          title: "Procesamiento de caudal",
                          icon: <></>,
                          width: "500px",
                          content: (
                            <>
                              El caudal instantaneo proviene directamente del
                              logger.
                              <br />
                            </>
                          ),
                        })
                      }
                    >
                      {variable.type_variable}: {variable.str_variable} (ver
                      procesamiento)
                    </Tag>
                  )}
                </>
              )}
            </div>
          ))}

          {record.is_prom_flow && (
            <Tag
              color={"blue-inverse"}
              onClick={() =>
                Modal.info({
                  title: "Formula caudal promedio/medio",
                  icon: <></>,
                  width: "500px",
                  content: (
                    <p>
                      <u>
                        Caudal medio del periodo: Sacando la diferencia entre el
                        totalizador del periodo de medición anterior y el
                        actual, transformándolo a l/s.{" "}
                      </u>
                      <center>
                        <a
                          target="__blank"
                          href="https://dga.mop.gob.cl/controlExtracciones/Documents/preguntas_frecuentes_aguas_subterraneas.pdf"
                        >
                          Visitar documentación oficial DGA
                        </a>
                      </center>{" "}
                      <br />
                      Ultimo acumulado = <b>a1(m³)</b>
                      <br />
                      Penultimo acumulado = <b>a2(m³)</b>
                      <br />
                      Cantidad de segundos en una hora: <b>
                        3600(segundos)
                      </b>{" "}
                      <br />
                      Multiplo para transformar m³ a litros: <b>1.000</b> <br />
                      <br />
                      <center>
                        <span
                          style={{
                            padding: "5px",
                            border: "2px solid #1677ff",
                            borderRadius: "5px",
                          }}
                        >
                          ((<b>a1</b> - <b>a2</b>) / <b>3.600</b>)*<b>1.000</b>
                        </span>
                      </center>
                    </p>
                  ),
                })
              }
            >
              Caudal promedio (ver formula)
            </Tag>
          )}
        </Card>
        {record.code_dga_site && (
          <Card
            style={{ margin: "5px" }}
            title={<>DGA({record.code_dga_site})</>}
            extra={record.standard}
            hoverable
          >
            {record.qr_dga && (
              <Row justify={"center"} align={"middle"}>
                <Col span={24}>
                  <center>
                    <a
                      href={`https://snia.mop.gob.cl/cExtracciones2/#/consultaQR/${record.code_dga_site}`}
                      target="__blank"
                    >
                      <img src={record.qr_dga} style={{ width: "50%" }} />
                    </a>
                  </center>
                </Col>
                {record.file_dga && (
                  <Col style={{ marginTop: "10px" }}>
                    <Button
                      type="primary"
                      danger
                      icon={<FilePdfFilled />}
                      onClick={() => window.open(record.file_dga)}
                    >
                      CERTIFICADO
                    </Button>
                  </Col>
                )}
              </Row>
            )}
          </Card>
        )}
      </Col>
      <Col span={17}>
        <Table
          title={() => (
            <b>
              {" "}
              Datos de monitoreo ({todayString}) - REGISTROS:{" "}
              {record.day_data.length}
            </b>
          )}
          bordered
          pagination={false}
          dataSource={record.day_data}
          columns={[
            {
              title: "Fecha/hora",
              render: (pt) => (
                <Tag
                  color={pt.is_send_dga ? "green-inverse" : ""}
                  icon={
                    pt.is_send_dga && (
                      <>
                        <CheckCircleFilled /> (DGA)
                      </>
                    )
                  }
                >
                  {pt.date_time_medition.slice(0, 10)}{" "}
                  {pt.date_time_medition.slice(11, 16)}
                </Tag>
              ),
            },
            {
              title: "Registro logger",
              render: (pt) => {
                const loggerDate = new Date(pt.date_time_last_logger);
                const diffInDays = Math.floor(
                  (today - loggerDate) / (1000 * 60 * 60 * 24)
                );

                if (pt.date_time_last_logger === null) {
                  return <Tag color="red-inverse">Logger no envia datos</Tag>;
                }
                if (diffInDays > 0) {
                  return (
                    <Tag color="volcano-inverse">
                      {pt.date_time_last_logger.slice(0, 10)}{" "}
                      {pt.date_time_last_logger.slice(11, 16)} ({diffInDays}{" "}
                      días)
                    </Tag>
                  );
                } else {
                  if (pt.date_time_last_logger.slice(0, 10) === todayString) {
                    return (
                      <Tag color="blue">
                        {pt.date_time_last_logger.slice(0, 10)}{" "}
                        {pt.date_time_last_logger.slice(11, 16)} ({diffInDays}{" "}
                        días)
                      </Tag>
                    );
                  } else {
                    return (
                      <Tag color="magenta" style={{ color: "black" }}>
                        {pt.date_time_last_logger.slice(0, 10)}{" "}
                        {pt.date_time_last_logger.slice(11, 16)} ({diffInDays}{" "}
                        días)
                      </Tag>
                    );
                  }
                }
              },
            },
            {
              title: "Nivel(mt)",
              dataIndex: "nivel",
              render: (nivel) =>
                nivel < 0 ? <Tag color="volcano-inverse">{nivel}</Tag> : nivel,
            },
            {
              title: `Nivel Freatico(mt)`,
              render: (pt) => {
                const nivel_v = pt.nivel;
                var nivel = parseFloat(nivel_v).toFixed(1);
                var posNivel = parseFloat(record.d3).toFixed(1);
                var nivelF = parseFloat(posNivel - nivel).toFixed(1);

                if (nivel < 0) {
                  return <Tag color="red-inverse">{nivelF}</Tag>;
                } else {
                  return (
                    <Button
                      type="primary"
                      size="small"
                      icon={<InfoCircleOutlined />}
                      onClick={() =>
                        Modal.info({
                          icon: <></>,
                          width: "500px",

                          title: `Nivel freatico(procesamiento) ${pt.date_time_medition.slice(
                            0,
                            10
                          )} ${pt.date_time_medition.slice(11, 16)}`,
                          content: (
                            <Row justify={"center"}>
                              <Col>
                                <div
                                  style={{
                                    borderRadius: "5px",
                                    backgroundColor: "#1677ff",
                                    marginTop: "10px",
                                    color: "white",
                                    padding: "5px",
                                  }}
                                >
                                  {posNivel} - {nivel} = <b>{nivelF}(mt)</b>
                                </div>
                              </Col>
                            </Row>
                          ),
                        })
                      }
                    >
                      {nivelF}
                    </Button>
                  );
                }
              },
            },
            {
              title: "Caudal(lt)",
              render: (pt, element, index) => {
                var caudal = pt.flow;
                const total = pt.total;
                const last_total =
                  record.day_data.length > 1
                    ? record.day_data[
                        index + 1 < record.day_data.length ? index + 1 : index
                      ].total
                    : 0;
                const diff = total - last_total;
                const divide = diff / 3600;
                const convert_to_lt = parseFloat(divide * 1000).toFixed(1);
                if (caudal < -0.2) {
                  return <Tag color="volcano-inverse">{caudal}</Tag>;
                } else if (
                  caudal > 100 &&
                  index !== record.day_data.length - 1
                ) {
                  return (
                    <Tag
                      color="yellow-inverse"
                      style={{ color: "black", cursor: "pointer" }}
                      icon={<InfoCircleOutlined />}
                      onClick={() =>
                        Modal.info({
                          width: "500px",
                          title: `Caudal(procesamiento) ${pt.date_time_medition.slice(
                            0,
                            10
                          )} ${pt.date_time_medition.slice(11, 16)}`,
                          content: (
                            <>
                              <div
                                style={{
                                  borderRadius: "5px",
                                  marginTop: "10px",
                                  color: "black",
                                  backgroundColor: "#fadb14",
                                  padding: "5px",
                                }}
                              >
                                {total} - {last_total} = <b>{diff} (m³)</b>
                                <br />
                                {diff} / 3600 = <b>{parseFloat(divide)}</b>{" "}
                                <br />
                                {parseFloat(divide)} * 1000 ={" "}
                                <b>{convert_to_lt} (lt)</b>
                              </div>
                            </>
                          ),
                          icon: <></>,
                        })
                      }
                    >
                      {caudal}
                    </Tag>
                  );
                } else {
                  if (
                    record.is_prom_flow &&
                    index !== record.day_data.length - 1
                  ) {
                    return (
                      <Button
                        size="small"
                        type="primary"
                        icon={<InfoCircleOutlined />}
                        onClick={() =>
                          Modal.info({
                            width: "500px",
                            title: `Caudal(procesamiento) ${pt.date_time_medition.slice(
                              0,
                              10
                            )} ${pt.date_time_medition.slice(11, 16)}`,
                            content: (
                              <>
                                <div
                                  style={{
                                    borderRadius: "5px",
                                    marginTop: "10px",
                                    color: "white",
                                    backgroundColor: "#1677ff",
                                    padding: "5px",
                                  }}
                                >
                                  {total} - {last_total} = <b>{diff} (m³)</b>
                                  <br />
                                  {diff} / 3600 = <b>{parseFloat(divide)}</b>{" "}
                                  <br />
                                  {parseFloat(divide)} * 1000 ={" "}
                                  <b>{convert_to_lt} (lt)</b>
                                </div>
                              </>
                            ),
                            icon: <></>,
                          })
                        }
                      >
                        {caudal}
                      </Button>
                    );
                  } else {
                    return caudal;
                  }
                }
              },
            },
            {
              title: "Total(m³)",
              render: (well, element, index) => {
                var variable = record.variables.find(
                  (variable) => variable.type_variable === "ACUMULADO"
                );
                if (variable) {
                  variable = variable.counter;
                }

                if (record.day_data.length > 1) {
                  const old_total =
                    record.day_data.length > 1
                      ? record.day_data[
                          index + 1 < record.day_data.length ? index + 1 : index
                        ].total
                      : 0;
                  var new_total = well.total;
                  if (old_total > new_total) {
                    return (
                      <Tag
                        color="red-inverse"
                        icon={<InfoCircleOutlined />}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          Modal.error({
                            title: `Error totalizado ${well.date_time_medition.slice(
                              0,
                              10
                            )} ${well.date_time_medition.slice(11, 16)}`,
                            content: (
                              <>El totalizador/acumulado se ha reciniciado</>
                            ),
                          })
                        }
                      >
                        {" "}
                        {well.total}a
                      </Tag>
                    );
                  } else {
                    if (variable > 0) {
                      return (
                        <Button
                          type="primary"
                          size="small"
                          icon={<InfoCircleOutlined />}
                          onClick={() => {
                            Modal.info({
                              icon: <></>,
                              title: (
                                <>
                                  Acumulado(procesamiento){" "}
                                  {well.date_time_medition.slice(0, 10)}{" "}
                                  {well.date_time_medition.slice(11, 16)}
                                </>
                              ),
                              content: (
                                <>
                                  Constante: {variable}
                                  <br />
                                  Acumulado enviado por logger:{" "}
                                  {well.total - variable} <br />
                                  Resultado: <b>{well.total}</b>
                                </>
                              ),
                            });
                          }}
                        >
                          {well.total}
                        </Button>
                      );
                    } else {
                      return well.total;
                    }
                  }
                }
              },
            },
          ]}
        />
      </Col>
    </Row>
  );
};

const styles = {
  container: {
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  tagVariable: {
    marginBottom: "5px",
  },
};

export default ExpandedRow;
