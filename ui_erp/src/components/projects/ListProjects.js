import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  notification,
  Form,
  Row,
  Col,
  Select,
  Input,
} from "antd";
import api from "../../api/endpoints";
import {
  EditOutlined,
  ProfileOutlined,
  DeleteOutlined,
  UndoOutlined,
  FilterFilled,
  FilterOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const ListProjects = ({ count, setSelectClient, setCount }) => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [clients, setClients] = useState([]);

  const getData = async () => {
    const rq = api.projects.project.list("", "").then((r) => {
      setList(r.data.results);
    });
    const rq2 = api.enterprises.get_total_enterprises().then((r) => {
      setClients(r.enterprises_actives.data.results);
    });
  };

  useEffect(() => {
    getData();
  }, [count]);

  const processSelectClient = (x) => {
    x = {
      ...x,
      client: x.client.id,
    };
    setSelectClient(x);
  };

  const onDeleteProject = async (id) => {
    const rq = await api.projects.project.delete(id).then((r) => {
      notification.error({ message: "PROYECTO ELIMINADO CORRECTAMENTE" });
      setCount(count + 1);
    });
  };

  const onSearchClient = async (value) => {
    const rq = await api.enterprises.get_total_enterprises(value).then((e) => {
      setClients(e.enterprises_actives.data.results);
    });
  };

  const onSearchProject = async (values) => {
    if (values.client === undefined) {
      values = { ...values, client: "" };
    }
    if (values.code === undefined) {
      values = { ...values, code: "" };
    }
    const rq = api.projects.project
      .list(values.client, values.code)
      .then((r) => {
        setList(r.data.results);
      });
  };

  const filterSets = () => {
    return (
      <Row
        justify={"space-evenly"}
        align={"middle"}
        style={{ marginBottom: "-25px" }}
      >
        <Form layout="inline" onFinish={onSearchProject} form={form}>
          <Col>
            <Form.Item name="client">
              <Select
                placeholder="Selecciona un cliente"
                showSearch
                defaultActiveFirstOption={false}
                allowClear
                filterOption={false}
                onSearch={onSearchClient}
              >
                {clients.map((x) => (
                  <Select.Option key={x.id} value={x.id}>
                    {x.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="code">
              <Input placeholder="Codigo proyecto" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button
                style={{ marginRight: "5px" }}
                htmlType="submit"
                size="small"
                icon={<FilterFilled />}
                type="primary"
              >
                Aplicar filtros
              </Button>
              <Button
                onClick={() => {
                  form.resetFields();
                  onSearchProject({ client: "", code: "" });
                }}
                size="small"
                icon={<UndoOutlined />}
                type="primary"
              >
                Limpiar filtros
              </Button>
            </Form.Item>
            <Form.Item></Form.Item>
          </Col>
        </Form>
      </Row>
    );
  };

  const columns = [
    { title: "Cliente", render: (x) => x.client.name },
    { title: "Servicio", dataIndex: "service", key: "name" },
    {
      title: "FECHA",
      dataIndex: "created",
      render: (x) => (
        <>
          {x.slice(0, 10)} H{x.slice(11, 19)}
        </>
      ),
    },
    { title: "Codigo", dataIndex: "code_internal", key: "code_internal" },
    {
      render: (x) => (
        <>
          <Button
            onClick={() => processSelectClient(x)}
            icon={<EditOutlined />}
            style={styles.btn}
            size="small"
            type="primary"
          >
            Editar
          </Button>
          <Link to={`/projects/${x.id}`}>
            <Button
              icon={<ProfileOutlined />}
              style={{
                ...styles.btn,
                backgroundColor: "#d48806",
                borderColor: "#d48806",
              }}
              size="small"
              type="primary"
            >
              Ver proyecto
            </Button>
          </Link>
          <Popconfirm
            onConfirm={() => onDeleteProject(x.id)}
            title="¿Seguro que quieres eliminar este proyecto y toda información relacionada con el?"
          >
            <Button
              icon={<DeleteOutlined />}
              style={styles.btn}
              size="small"
              type="primary"
              danger
            >
              Eliminar
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Table
      size={"small"}
      dataSource={list}
      columns={columns}
      bordered
      title={filterSets}
    />
  );
};

const styles = {
  btn: {
    margin: "5px",
  },
};

export default ListProjects;
