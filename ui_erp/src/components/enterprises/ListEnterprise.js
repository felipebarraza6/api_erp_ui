import React from "react";

import {
  Table,
  Button,
  Tooltip,
  Row,
  Col,
  Tag,
  Input,
  Typography,
  Select,
} from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  LikeTwoTone,
  DislikeTwoTone,
  UserAddOutlined,
} from "@ant-design/icons";

import {
  deleteEnterprise,
  updateStatusEnterprise,
  getRetrieveEnterprise,
  createPerson,
} from "../../actions/enterprises";

import ModalEnterprise from "../../components/clients/ModalEnterprise";

const { Paragraph } = Typography;

const ListClients = (enterprises) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Empresa",
      render: (item) => (
        <Tooltip title={item.name.length > 15 ? `${item.name}` : `Ver Perfil`}>
          <Button
            size="small"
            onClick={() => {
              ModalEnterprise(item);
            }}
            type="primary"
          >
            {item.name.length > 20
              ? `${item.name.slice(0, 20)}...`
              : `${item.name.slice(0, 20)}`}
          </Button>
        </Tooltip>
      ),
    },
    {
      render: (item) => (
        <>
          <Tooltip title="Editar">
            <Button
              onClick={() =>
                getRetrieveEnterprise(enterprises.dispatch, item.id)
              }
              type="link"
            >
              <EditOutlined style={{ fontSize: "15px" }} />
            </Button>
          </Tooltip>

          <Tooltip title="Eliminar">
            <Button
              onClick={() => deleteEnterprise(enterprises.dispatch, item.id)}
              type="link"
            >
              <DeleteOutlined style={{ color: "red", fontSize: "15px" }} />
            </Button>
          </Tooltip>
          {!item.is_active ? (
            <Tooltip title="Establecer como Activo">
              <Button
                onClick={() =>
                  updateStatusEnterprise(enterprises.dispatch, item.id, {
                    is_active: true,
                  })
                }
                type="link"
              >
                <DislikeTwoTone
                  twoToneColor="#eb2f96"
                  style={{ fontSize: "15px" }}
                />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Establecer como Inactivo">
              <Button
                onClick={() =>
                  updateStatusEnterprise(enterprises.dispatch, item.id, {
                    is_active: false,
                  })
                }
                type="link"
              >
                <LikeTwoTone style={{ fontSize: "15px" }} />
              </Button>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  const FiltersTitle = () => {
    return (
      <>
        <Row justify={"space-between"} align={"middle"}>
          <Col span={24}>
            <Paragraph style={styles.p}>Buscadores y filtros</Paragraph>
          </Col>
          <Col span={12} style={{ marginBottom: "5px" }}>
            <Input size="small" prefix="Nombre:" style={{ width: "95%" }} />
          </Col>
          <Col span={12} style={{ marginBottom: "5px" }}>
            <Input size="small" prefix="Rut:" style={{ width: "95%" }} />
          </Col>
          <Col span={12} style={{ marginBottom: "5px" }}>
            <Select
              size="small"
              style={{ width: "95%" }}
              showSearch
              placeholder="Actividad economica"
            ></Select>
          </Col>
          <Col span={12} style={{ marginBottom: "5px" }}>
            <Input
              size="small"
              prefix="Cantidad de pozos:"
              type="number"
              style={{ width: "95%" }}
            />
          </Col>
        </Row>
        <Row justify={"space-around"} align={"middle"}>
          <Col span={8}>
            <Select
              size="small"
              style={{ width: "95%" }}
              placeholder="Region"
            ></Select>
          </Col>
          <Col span={8}>
            <Select
              size="small"
              style={{ width: "95%" }}
              placeholder="Provincia"
            ></Select>
          </Col>
          <Col span={8}>
            <Select
              size="small"
              style={{ width: "95%" }}
              placeholder="Comuna"
            ></Select>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <Table
      size="small"
      bordered
      style={{ marginTop: "20px" }}
      dataSource={enterprises.data}
      title={FiltersTitle}
      pagination={{
        simple: true,
        total: enterprises.quantity,
        onChange: (page) => {
          enterprises.pagination(enterprises.dispatch, page);
        },
      }}
      loading={enterprises.loading}
      columns={columns}
      rowKey="id"
    />
  );
};

const styles = {
  p: {
    fontWeight: "900",
  },
};

export default ListClients;
