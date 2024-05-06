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
import { ModalViewSendDgaToday } from "./Modals";
import ExpandedRow from "./ExpandedRow";

const { Title } = Typography;

const Home = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
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
        <Table
          rowKey="id"
          loading={loading}
          bordered
          size={"small"}
          pagination={{
            pageSize: 10,
            total: total,
            onChange: (page) => setPage(page),
          }}
          dataSource={data}
          expandable={{
            expandedRowRender: (record) => <ExpandedRow record={record} />,
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          columns={[
            {
              title: "Punto de captación",
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

                  <Tag color="purple-inverse" style={{ marginBottom: "5px" }}>
                    {well.is_prom_flow
                      ? "Caudal Promedio/Medio"
                      : "Caudal Instantaneo"}
                  </Tag>
                </div>
              ),
            },

            {
              title: "Cliente",
              dataIndex: "name_client",
              width: "10%",
              filterSearch: true,
            },
            {
              title: "Fechas y estado",
              width: "18%",
              render: (well) => {
                const today = new Date();
                const loggerDate = new Date(
                  well.last_data.date_time_last_logger
                );
                const diffInDays = Math.floor(
                  (today - loggerDate) / (1000 * 60 * 60 * 24)
                );

                return (
                  <>
                    <Tag color="black" style={{ marginBottom: "10px" }}>
                      Primer registro:{" "}
                      {well.first_data.date_time_medition &&
                        well.first_data.date_time_medition.slice(0, 10)}{" "}
                      {well.first_data.date_time_medition &&
                        well.first_data.date_time_medition.slice(11, 16)}
                    </Tag>
                    <Tag color="blue-inverse" style={{ marginBottom: "10px" }}>
                      Ultimo registro:{" "}
                      {well.last_data.date_time_medition &&
                        well.last_data.date_time_medition.slice(0, 10)}{" "}
                      {well.last_data.date_time_medition &&
                        well.last_data.date_time_medition.slice(11, 16)}
                    </Tag>

                    <Tag
                      color={
                        diffInDays > 0 ? "volcano-inverse" : "geekblue-inverse"
                      }
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      Registro logger:{" "}
                      {well.last_data.date_time_last_logger ? (
                        <>
                          {well.last_data.date_time_last_logger.slice(0, 10)}{" "}
                          {well.last_data.date_time_last_logger.slice(11, 16)}
                          {diffInDays > 0 && <>({diffInDays} Dias)</>}
                        </>
                      ) : (
                        "Logger no envia datos"
                      )}
                    </Tag>

                    {well.code_dga_site && (
                      <>
                        <Tag color="green" style={{ color: "black" }}>
                          Inicio envio DGA:{" "}
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
                );
              },
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
                    {parseFloat(well.last_data.nivel).toFixed(1)}
                  </Tag>
                </center>
              ),
            },
            {
              title: "Nivel freatico(mt)",
              render: (well) => (
                <center>
                  <Tag
                    color={well.last_data.nivel >= 0 ? "blue" : "red-inverse"}
                    style={{ marginBottom: "5px" }}
                  >
                    {parseFloat(well.d3 - well.last_data.nivel).toFixed(1) !==
                      "NaN" &&
                      parseFloat(well.d3 - well.last_data.nivel).toFixed(1)}
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
                </center>
              ),
            },
            {
              title: "Estado DGA",
              width: "13%",
              render: (well) => (
                <>
                  {well.is_send_dga ? (
                    <>
                      {well.day_send_dga.length > 0 ? (
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
                            {well.day_send_dga[0].date_time_medition.slice(
                              0,
                              10
                            )}{" "}
                            {well.day_send_dga[0].date_time_medition.slice(
                              11,
                              16
                            )}
                          </Tag>
                        </>
                      ) : (
                        <Tag color="volcano-inverse">NO ENVIA A DGA</Tag>
                      )}
                    </>
                  ) : (
                    <Tag color="blue-inverse">NO DEBE ENVIAR</Tag>
                  )}

                  {well.is_send_dga && (
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
