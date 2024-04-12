import React, { useEffect, useState } from "react";
import { Typography, Col, Row, Table, Tag, Card, Badge } from "antd";
import api from "../../api/endpoints_telemetry";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
const { Title } = Typography;

const Home = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const getData = async (page) => {
    const rq1 = await api.wells.list(page).then((r) => {
      setData((prevData) => [
        ...prevData,
        ...r.results.sort((a, b) => a.name_client.localeCompare(b.name_client)),
      ]);
      setTotal(r.count);
    });

    if (page * 10 < total) {
      getData(page + 1);
    }
  };
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.wells.list(1);
      const totalCount = response.count;
      const totalPages = Math.ceil(totalCount / 10);
      const allData = [];

      const get = await api.wells.list(page);

      setData(get.results);
      setTotal(totalCount);
    };

    fetchData();
  }, []);

  return (
    <Row>
      <Col span={24}>
        <Title level={3}>Puntos de captacion activos ({total})</Title>
      </Col>
      <Col span={24}>
        <Table
          rowKey="id"
          bordered
          size={"small"}
          dataSource={data}
          expandable={{
            expandedRowRender: (record) => (
              <Row align={"middle"}>
                <Col span={8}>
                  <Card
                    style={{ margin: "5px" }}
                    title="Credenciales Ikolu"
                    hoverable
                  >
                    <b>usuario:</b> {record.user.email} <br />
                    <b>clave:</b> {record.user.txt_password} <br />
                    <br />
                    <b>último inicio de sesión:</b>{" "}
                    {record.user.last_login &&
                      record.user.last_login.slice(0, 10)}{" "}
                    {record.user.last_login &&
                      record.user.last_login.slice(11, 16)}
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
                    {record.is_prom_flow ? (
                      <Tag
                        style={{ marginBottom: "10px" }}
                        color="blue-inverse"
                      >
                        Cudal Promedio
                      </Tag>
                    ) : (
                      <Tag style={{ marginBottom: "10px" }} color="blue">
                        Caudal Instantaneo
                      </Tag>
                    )}
                    <br />
                    {record.variables.map((variable) => (
                      <Tag color="geekblue-inverse">
                        {variable.type_variable}: {variable.str_variable}
                      </Tag>
                    ))}
                  </Card>
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
                  <Tag color="geekblue-inverse" style={{ marginTop: "5px" }}>
                    {well.standard}
                  </Tag>
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
              title: "Fecha ultimo dato",
              dataIndex: "last_data",
              render: (last_data) => (
                <Tag color="black">
                  {last_data.date_time_medition &&
                    last_data.date_time_medition.slice(0, 10)}{" "}
                  {last_data.date_time_medition &&
                    last_data.date_time_medition.slice(11, 16) + " hrs"}
                </Tag>
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
                          ? "geekblue"
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
                  <Tag color="blue-inverse">PULSOS: {well.scale}</Tag>
                </center>
              ),
            },

            {
              title: "Envio DGA",
              width: "13%",
              render: (well) => (
                <>
                  {(well.standard === "MAYOR") & well.is_send_dga ? (
                    <>
                      {well.last_data.is_send_dga ? (
                        <>
                          <CheckCircleFilled style={{ color: "green" }} />{" "}
                          {well.day_data[9].date_time_medition.slice(0, 10)}{" "}
                          {well.day_data[9].date_time_medition.slice(11, 16)}
                          <br />
                          Caudal: {well.day_data[9].flow}
                          <br />
                          Nivel:{" "}
                          {parseFloat(well.d3 - well.day_data[9].nivel).toFixed(
                            1
                          )}
                          <br />
                          Acumulado: {well.day_data[9].total}
                        </>
                      ) : (
                        <>
                          <CloseCircleFilled style={{ color: "red" }} />{" "}
                          {well.last_data.soap_return}
                          {well.day_data[9].date_time_medition.slice(
                            0,
                            10
                          )}{" "}
                          {well.day_data[9].date_time_medition.slice(11, 16)}
                          <br />
                          Caudal: {well.day_data[9].flow}
                          <br />
                          Nivel:{" "}
                          {parseFloat(well.d3 - well.day_data[9].nivel).toFixed(
                            1
                          )}
                          <br />
                          Acumulado: {well.day_data[9].total}
                        </>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {(well.standard === "MEDIO") & well.is_send_dga ? (
                    <>
                      {well.last_data.is_send_dga ? (
                        <>
                          <CheckCircleFilled style={{ color: "green" }} />{" "}
                          {well.day_data[9].date_time_medition.slice(0, 10)}{" "}
                          {well.day_data[9].date_time_medition.slice(11, 16)}
                          <br />
                          Caudal: {well.day_data[9].flow}
                          <br />
                          Nivel:{" "}
                          {parseFloat(well.d3 - well.day_data[9].nivel).toFixed(
                            1
                          )}
                          <br />
                          Acumulado: {well.day_data[9].total}
                        </>
                      ) : (
                        <>
                          <CloseCircleFilled style={{ color: "red" }} />{" "}
                          {well.day_data[9].date_time_medition.slice(0, 10)}{" "}
                          {well.day_data[9].date_time_medition.slice(11, 16)}
                          <br />
                          Caudal: {well.day_data[9].flow}
                          <br />
                          Nivel:{" "}
                          {parseFloat(well.d3 - well.day_data[9].nivel).toFixed(
                            1
                          )}
                          <br />
                          Acumulado: {well.day_data[9].total}
                        </>
                      )}
                    </>
                  ) : (
                    ""
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
