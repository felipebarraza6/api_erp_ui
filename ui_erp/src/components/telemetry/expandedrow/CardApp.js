import React from "react";
import { Card, Button, Row, Col } from "antd";
import {
  LoginOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";

const CardApp = ({ record }) => {
  return (
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
  );
};

export default CardApp;
