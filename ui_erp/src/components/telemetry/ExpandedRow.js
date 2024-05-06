import React from "react";
import { Row, Col, Card, Tag, Table, Typography, Modal, Button } from "antd";

import CardApp from "./expandedrow/CardApp";
import CardPtCharacteristics from "./expandedrow/CardPtCharacteristics";
import CardLogger from "./expandedrow/CardLogger";
import CardDga from "./expandedrow/CardDga";
import TableData from "./expandedrow/TableData";

const { Title } = Typography;

const ExpandedRow = ({ record }) => {
  return (
    <Row align={"top"} justify={"space-around"} style={styles.container}>
      <Col span={7}>
        <CardApp record={record} />
        <CardPtCharacteristics record={record} />
        <CardLogger record={record} />
        {record.code_dga_site && <CardDga record={record} />}
      </Col>
      <Col span={17}>
        <TableData record={record} />
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
