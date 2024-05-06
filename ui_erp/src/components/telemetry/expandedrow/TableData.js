import React from "react";
import { Table, Tag, Button, Modal, Row, Col } from "antd";
import { CheckCircleFilled, InfoCircleOutlined } from "@ant-design/icons";

const TableData = ({ record }) => {
  const today = new Date();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const todayString = `${today.getFullYear()}-${month}-${day}`;

  return (
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
                  {pt.date_time_last_logger.slice(11, 16)} ({diffInDays} días)
                </Tag>
              );
            } else {
              if (pt.date_time_last_logger.slice(0, 10) === todayString) {
                return (
                  <Tag color="blue">
                    {pt.date_time_last_logger.slice(0, 10)}{" "}
                    {pt.date_time_last_logger.slice(11, 16)} ({diffInDays} días)
                  </Tag>
                );
              } else {
                return (
                  <Tag color="magenta" style={{ color: "black" }}>
                    {pt.date_time_last_logger.slice(0, 10)}{" "}
                    {pt.date_time_last_logger.slice(11, 16)} ({diffInDays} días)
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
            nivel < 0 ? (
              <Tag
                color="volcano-inverse"
                style={{ cursor: "pointer" }}
                icon={<InfoCircleOutlined />}
                onClick={() => {
                  Modal.error({ content: "Nivel fuera de rango" });
                }}
              >
                {nivel}
              </Tag>
            ) : (
              nivel
            ),
        },
        {
          title: `Nivel Freatico(mt)`,
          render: (pt) => {
            const nivel_v = pt.nivel;
            var nivel = parseFloat(nivel_v).toFixed(1);
            var posNivel = parseFloat(record.d3).toFixed(1);
            var nivelF = parseFloat(posNivel - nivel).toFixed(1);

            if (nivel < 0) {
              return (
                <Tag
                  color="volcano-inverse"
                  style={{ cursor: "pointer" }}
                  icon={<InfoCircleOutlined />}
                  onClick={() => {
                    Modal.error({ content: "Nivel fuera de rango" });
                  }}
                >
                  {nivelF}
                </Tag>
              );
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
              return (
                <Tag
                  color="volcano-inverse"
                  style={{ cursor: "pointer" }}
                  icon={<InfoCircleOutlined />}
                  onClick={() => {
                    Modal.error({ content: "Caudal fuera de rango" });
                  }}
                >
                  {caudal}
                </Tag>
              );
            } else if (caudal > 100 && index !== record.day_data.length - 1) {
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
                            {diff} / 3600 = <b>{parseFloat(divide)}</b> <br />
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
              if (record.is_prom_flow && index !== record.day_data.length - 1) {
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
                              {diff} / 3600 = <b>{parseFloat(divide)}</b> <br />
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
                    {well.total}
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
  );
};

export default TableData;
