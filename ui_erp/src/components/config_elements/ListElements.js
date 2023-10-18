import React, { useState, useEffect } from "react";
import { Table, Button, notification, Popconfirm, Row, Col } from "antd";
import api from "../../api/endpoints";
import {
  DeleteFilled,
  EditFilled,
  FilterOutlined,
  FilterFilled,
} from "@ant-design/icons";

const ListElements = ({ count, setCount, setSelectElement }) => {
  const [elements, setElements] = useState([]);
  const [deparments, setDeparments] = useState([]);
  const [selectdId, setSelectId] = useState("");

  const columns = [
    { title: "Nombre", dataIndex: "name" },
    { title: "Descripción", dataIndex: "description" },
    { title: "Posicion", dataIndex: "position" },
    { title: "Departamento", render: (x) => x.deparment && x.deparment.name },
    {
      render: (x) => {
        return (
          <>
            <Button
              style={{ marginRight: "10px" }}
              size="small"
              type="primary"
              onClick={() =>
                setSelectElement({
                  ...x,
                  deparment: x.deparment && x.deparment.id,
                })
              }
            >
              <EditFilled />
            </Button>
            <Popconfirm
              title="Estas seguro de eliminar esta entrada?"
              onConfirm={async () => {
                const rq = await api.projects.types_elements
                  .delete(x.id)
                  .then((r) => {
                    setCount(count + 1);
                    notification.success({ message: "Entrada eliminada!" });
                  });
              }}
            >
              <Button type="primary" danger size="small">
                <DeleteFilled />
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const getData = async () => {
    const rq1 = await api.projects.types_elements.list(selectdId).then((r) => {
      setElements(r.data.results);
    });
    const rq2 = await api.projects.company_deparments.list().then((r) => {
      console.log(r.data, "a");
      setDeparments(r.data.results);
    });
  };

  const handleOptionSelected = (id) => {
    setSelectId(id);
    setCount(count + 1);
  };

  const titleRender = () => {
    return (
      <Row justify={"space-evenly"} align={"middle"}>
        <Col style={styles.colFilters}>
          <Button
            size="small"
            type={selectdId === "" ? "primary" : "default"}
            icon={selectdId === "" ? <FilterFilled /> : <FilterOutlined />}
            onClick={() => handleOptionSelected("")}
          >
            Todos
          </Button>
        </Col>
        {deparments.map((d) => (
          <Col style={styles.colFilters}>
            <Button
              type={selectdId === d.id ? "primary" : "default"}
              size="small"
              onClick={() => handleOptionSelected(d.id)}
              icon={selectdId === d.id ? <FilterFilled /> : <FilterOutlined />}
            >
              {d.name}
            </Button>
          </Col>
        ))}
      </Row>
    );
  };

  useEffect(() => {
    getData();
  }, [count]);

  return (
    <Table
      title={titleRender}
      size="small"
      dataSource={elements}
      style={{ padding: "0px" }}
      bordered
      columns={columns}
    />
  );
};

const styles = {
  colFilters: {
    padding: "5px",
  },
};

export default ListElements;
