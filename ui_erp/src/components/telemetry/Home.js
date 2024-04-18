import React, { useEffect, useState } from "react";
import {
  Typography,
  Col,
  Row,
  Table,
  Tag,
  Card,
  Input,
  Button,
  Checkbox,
  Modal,
  Select,
} from "antd";
import api from "../../api/endpoints_telemetry";
import {
  CheckCircleFilled,
  ExportOutlined,
  CloseCircleFilled,
  ArrowLeftOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Title } = Typography;

const Home = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  const ModalViewSendDgaToday = (well) => {
    Modal.info({
      title: well.code_dga_site,
      width: 600,
      content: (
        <>
          {well.day_send_dga.map((send) => (
            <div
              style={{ border: "0px 1px 0px 0px solid black", padding: "5px" }}
            >
              <CheckCircleFilled style={{ color: "green" }} />{" "}
              {send.date_time_medition.slice(0, 10)}{" "}
              {send.date_time_medition.slice(11, 16)}
              {": "}
              caudal: {send.flow} (lt) - nivel: {send.nivel} (mt) - total:
              {send.total} (m³)
            </div>
          ))}
        </>
      ),
    });
  };

  const today = new Date();
  const todayString = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await api.wells.list(1);
      const totalCount = response.count;

      const get = await api.wells.list(page);

      setData(get.results);
      setTotal(totalCount);

      setLoading(false);
    };

    fetchData();
  }, [page]);

  return (
    <Row>
      <Col span={24}>
        <Row align={"middle"} style={{ marginBottom: "10px" }}>
          <Col>FILTROS: </Col>
          <Col style={{ marginLeft: "10px" }}>
            <Input
              style={{ width: "250px" }}
              placeholder="Nombre punto captacion"
            />
          </Col>
          <Col style={{ marginLeft: "10px" }}>
            <Input style={{ width: "400px" }} placeholder="Nombre cliente" />
          </Col>
          <Col>
            <Button
              icon={<SearchOutlined />}
              type="primary"
              style={{ marginLeft: "10px" }}
            >
              Buscar
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Table
          rowKey="id"
          loading={loading}
          bordered
          size={"small"}
          pagination={{
            pageSize: 10,
            simple: true,
            total: total,
            onChange: (page) => setPage(page),
          }}
          dataSource={data}
          expandable={{
            expandedRowRender: (record) => (
              <Row align={"middle"} justify={"center"}>
                <Col span={8}>
                  <Card style={{ margin: "5px" }} title="Ikolu" hoverable>
                    <b>usuario:</b> {record.user.email} <br />
                    <b>clave:</b> {record.user.txt_password} <br />
                    <br />
                    <Row>
                      <Col span={12}>
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
                      </Col>
                      <Col span={12}>
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
                </Col>
                <Col span={8}>
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
                </Col>
                <Col span={8}>
                  <Card style={{ margin: "5px" }} title="Variables" hoverable>
                    {record.variables.map((variable) => (
                      <Tag color="geekblue-inverse">
                        {variable.type_variable}: {variable.str_variable}
                      </Tag>
                    ))}
                  </Card>
                </Col>
                <Col span={20} style={{ marginTop: "20px" }}>
                  <center>
                    <Title level={4}>Datos de monitoreo ({todayString})</Title>
                  </center>
                  <Table
                    style={{
                      marginTop: "18px",
                      border: "1px solid #d6d6d6",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                    bordered
                    dataSource={record.day_data}
                    columns={[
                      {
                        title: "Fecha",
                        dataIndex: "date_time_medition",
                        render: (date) => date.slice(0, 10),
                      },
                      {
                        title: "Hora",
                        dataIndex: "date_time_medition",
                        render: (date) => date.slice(11, 16),
                      },
                      {
                        title: "Nivel(mt)",
                        dataIndex: "nivel",
                        render: (nivel) =>
                          nivel < 0 ? (
                            <Tag color="volcano-inverse">{nivel}</Tag>
                          ) : (
                            nivel
                          ),
                      },
                      {
                        title: `Nivel Freatico(mt) - P.N(${parseFloat(
                          record.d3
                        ).toFixed(1)} mt)`,
                        dataIndex: "nivel",
                        render: (nivel_v) => {
                          var nivel = parseFloat(nivel_v).toFixed(1);
                          var posNivel = parseFloat(record.d3).toFixed(1);
                          var nivelF = parseFloat(posNivel - nivel).toFixed(1);

                          if (nivel < 0) {
                            return <Tag color="red-inverse">{nivelF}</Tag>;
                          } else {
                            return nivelF;
                          }
                        },
                      },
                      {
                        title: "Caudal(lt)",
                        dataIndex: "flow",
                        render: (caudal) =>
                          caudal < -0.2 ? (
                            <Tag color="volcano-inverse">{caudal}</Tag>
                          ) : caudal > 100 ? (
                            <Tag
                              color="yellow-inverse"
                              style={{ color: "black" }}
                            >
                              {caudal}
                            </Tag>
                          ) : (
                            caudal
                          ),
                      },
                      {
                        title: "Total(m³)",
                        render: (well) => {
                          if (record.day_data.length > 1) {
                            var old_total = record.day_data[1].total;
                            var new_total = well.total;
                            if (old_total < new_total) {
                              return (
                                <Tag color="red-inverse">{well.total}</Tag>
                              );
                            } else {
                              return well.total;
                            }
                          }
                        },
                      },
                    ]}
                  ></Table>
                </Col>
              </Row>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          columns={[
            {
              title: "Nombre",
              width: "15%",
              render: (well) => (
                <div>
                  <u style={{ marginRight: "5px" }}>{well.title}</u>

                  <br />
                  {well.code_dga_site && (
                    <>
                      <Tag
                        icon={
                          well.is_send_dga ? (
                            <CheckCircleFilled />
                          ) : (
                            <CloseCircleFilled />
                          )
                        }
                        color={well.is_send_dga ? "green" : "geekblue"}
                      >
                        {well.code_dga_site}
                      </Tag>

                      <br />
                    </>
                  )}
                  {well.standard && (
                    <Tag color="geekblue-inverse" style={{ marginTop: "5px" }}>
                      {well.standard}
                    </Tag>
                  )}
                  <Tag
                    color={well.is_thethings ? "green-inverse" : "blue-inverse"}
                    style={{ marginBottom: "5px" }}
                  >
                    {well.is_thethings ? "Nettra" : "Novus"}
                  </Tag>
                </div>
              ),
            },

            {
              title: "Cliente",
              dataIndex: "name_client",
              filterSearch: true,
            },
            {
              title: "Fechas monitoreo",
              width: "18%",
              render: (well) => (
                <>
                  <Tag color="black">Primer dato</Tag>
                  <Tag color="black" style={{ marginBottom: "10px" }}>
                    {well.first_data.date_time_medition &&
                      well.first_data.date_time_medition.slice(0, 10)}{" "}
                    {well.first_data.date_time_medition &&
                      well.first_data.date_time_medition.slice(11, 16)}
                  </Tag>
                  <Tag color="blue-inverse">Ultimo dato</Tag>
                  <Tag color="blue-inverse" style={{ marginBottom: "10px" }}>
                    {well.last_data.date_time_medition &&
                      well.last_data.date_time_medition.slice(0, 10)}{" "}
                    {well.last_data.date_time_medition &&
                      well.last_data.date_time_medition.slice(11, 16)}
                  </Tag>
                  {well.code_dga_site && (
                    <>
                      <Tag color="green" style={{ color: "black" }}>
                        Inicio envio DGA
                      </Tag>
                      <Tag color="green" style={{ color: "black" }}>
                        {well.date_reporting_dga ? (
                          <>
                            {well.date_reporting_dga &&
                              well.date_reporting_dga.slice(0, 10)}{" "}
                            {well.date_reporting_dga &&
                              well.date_reporting_dga.slice(11, 16)}
                          </>
                        ) : (
                          "Sin fecha"
                        )}
                      </Tag>
                    </>
                  )}
                </>
              ),
            },
            {
              title: "Caudal(lt)",
              render: (well) => (
                <center>
                  <Tag
                    color={
                      well.last_data.flow >= 0
                        ? well.is_prom_flow
                          ? well.last_data.flow > 100
                            ? "yellow-inverse"
                            : "geekblue"
                          : well.last_data.flow > 100
                          ? "yellow-inverse"
                          : "blue"
                        : "red-inverse"
                    }
                  >
                    {well.last_data.flow}
                  </Tag>
                  <Tag
                    color={well.is_prom_flow ? "#002766" : "#096dd9"}
                    style={{ marginTop: "5px" }}
                  >
                    {well.is_prom_flow ? "Promedio" : "Instantaneo"}
                  </Tag>
                  {well.is_prom_flow && (
                    <Tag style={{ marginTop: "5px" }} color="#002766">
                      ((a1 - a2) / 3600)*1000
                    </Tag>
                  )}
                </center>
              ),
            },
            {
              title: "Nivel(mt)",
              render: (well) => (
                <center>
                  <Tag
                    color={well.last_data.nivel >= 0 ? "blue" : "red-inverse"}
                    style={{ marginBottom: "5px" }}
                  >
                    Nivel: {well.last_data.nivel}
                  </Tag>
                  <Tag
                    color={"geekblue-inverse"}
                    style={{ marginBottom: "5px" }}
                  >
                    Posicionamiento nivel: {parseFloat(well.d3).toFixed(1)}
                  </Tag>
                  <Tag color={"blue-inverse"}>
                    Nivel Freatico:{" "}
                    {parseFloat(well.d3 - well.last_data.nivel).toFixed(1)}{" "}
                    (P-N)
                  </Tag>
                </center>
              ),
            },

            {
              title: "Acumulado(m³)",
              render: (well) => (
                <center>
                  <Tag color="blue" style={{ marginBottom: "5px" }}>
                    {well.last_data.total}
                  </Tag>
                  {well.variables.map((variable) => {
                    if (variable.type_variable === "ACUMULADO") {
                      return (
                        <Tag color="geekblue-inverse" key={variable.id}>
                          CONTADOR: {variable.counter}
                        </Tag>
                      );
                    }
                    return null;
                  })}
                  <Tag color="blue-inverse" style={{ marginTop: "5px" }}>
                    PULSOS: {well.scale}
                  </Tag>
                </center>
              ),
            },
            {
              title: "Estado DGA",
              width: "13%",
              render: (well) => (
                <>
                  {well.is_send_dga & (well.day_send_dga.length > 0) ? (
                    <>
                      <Button
                        size="small"
                        icon={<CheckCircleFilled />}
                        type="primary"
                        style={{ marginBottom: "10px" }}
                        onClick={() => ModalViewSendDgaToday(well)}
                      >
                        {todayString}: enviados({well.day_send_dga.length})
                      </Button>
                      <Tag color="blue">Ultimo dato reportado</Tag>
                      <Tag color="blue">
                        {well.day_send_dga[0].date_time_medition.slice(0, 10)}{" "}
                        {well.day_send_dga[0].date_time_medition.slice(11, 16)}
                      </Tag>
                    </>
                  ) : (
                    <Tag color="volcano-inverse">SIN ENVIO</Tag>
                  )}

                  {well.code_dga_site && (
                    <Button
                      icon={
                        <>
                          <ExportOutlined /> DGA:{" "}
                        </>
                      }
                      size="small"
                      type="primary"
                      style={{ marginTop: "10px" }}
                      onClick={() =>
                        window.open(
                          `https://snia.mop.gob.cl/cExtracciones2/#/consultaQR/${well.code_dga_site}`
                        )
                      }
                    >
                      {well.code_dga_site}
                    </Button>
                  )}
                </>
              ),
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export default Home;
