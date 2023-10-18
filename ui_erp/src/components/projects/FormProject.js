import React, { useState, useEffect } from "react";
import api from "../../api/endpoints";
import { Form, Input, Card, Select, Button, notification } from "antd";
const { Option } = Select;

const FormProject = ({ setCount, count, selectProject, setSelectClient }) => {
  const [enterprises, setEnterprises] = useState([]);
  const [updateForm, setUpdateForm] = useState(false);
  console.log(enterprises);
  const [form] = Form.useForm();

  const getClients = async () => {
    const rq1 = await api.enterprises
      .get_total_enterprises()
      .then((e) => setEnterprises(e.enterprises_actives.data.results));
  };

  const onSearch = async (value) => {
    const rq = await api.enterprises.get_total_enterprises(value).then((e) => {
      setEnterprises(e.enterprises_actives.data.results);
    });
  };

  const onFinish = async (values) => {
    if (!selectProject) {
      const rq1 = api.projects.project.create(values).then((res) => {
        console.log(res);
        notification.success({ message: "Proyecto creado correctamente!" });
        setCount(count + 1);
        form.resetFields();
      });
    } else {
      const rq1 = api.projects.project
        .update(selectProject.id, values)
        .then((res) => {
          console.log(res);
          notification.success({
            message: "Proyecto actualizado correctamente!",
          });
          setCount(count + 1);
          setSelectClient(null);
          form.resetFields();
          form.setFieldsValue({
            service: "MEE",
          });
        });
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      service: "MEE",
    });
    getClients();
    if (selectProject) {
      setUpdateForm(true);
      setTimeout(() => {
        setUpdateForm(false);
        form.setFieldsValue({
          service: "MEE",
        });
      }, 1000);
    }
  }, [selectProject]);

  return (
    <>
      <Card hoverable bordered>
        {!updateForm && (
          <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            initialValues={selectProject}
          >
            <Form.Item
              label="Cliente"
              name="client"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <Select
                placeholder="Selecciona un cliente"
                showSearch
                defaultActiveFirstOption={false}
                allowClear
                filterOption={false}
                onSearch={onSearch}
              >
                {enterprises.map((enterprise) => (
                  <Select.Option value={enterprise.id}>
                    {enterprise.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Servicio"
              name="service"
              rules={[{ required: true }]}
            >
              <Select defaultValue={"MEE"}>
                <Option value="MEE">MEE - 1.238</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Codigo interno" name="code_internal">
              <Input />
            </Form.Item>
            <Form.Item label="Descripción" name="description">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                {selectProject ? "Actualizar" : "Crear Proyecto"}
              </Button>
              {selectProject ? (
                <Button
                  danger
                  onClick={() => {
                    setSelectClient(null);
                    setUpdateForm(false);
                    form.resetFields();
                  }}
                >
                  Cancelar
                </Button>
              ) : (
                <Button onClick={() => form.resetFields()}>Limpiar</Button>
              )}
            </Form.Item>
          </Form>
        )}
      </Card>
    </>
  );
};

const styles = {
  btn: {
    marginRight: "10px",
  },
};

export default FormProject;
