import React from "react";
import { Card, Button, Row, Col } from "antd";
import { FilePdfFilled } from "@ant-design/icons";

const CardDga = ({ record }) => {
  return (
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
  );
};

export default CardDga;
