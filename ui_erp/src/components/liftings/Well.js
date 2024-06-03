import React, { useState, useContext, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Alert,
  Tag,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import well_img from "../../build/images/re_well.png";
import { LiftingContext } from "../../containers/Lifting";
import { FileImageOutlined, PlusCircleFilled } from "@ant-design/icons";

const { Paragraph } = Typography;

const Well = () => {
  const { state, dispatch } = useContext(LiftingContext);

  const [dataWell, setDataWell] = useState({});

  return (
    <Row justify="start" style={styles.row}>
      <Col lg={6} xl={6} xs={24}></Col>
      {window.innerWidth > 800 && (
        <Col span={16}>
          <Row style={styles.colWell}>
            <Col span={24}>
              <Tag color="blue" style={{ ...styles.tagsWell.tag1 }}>
                {" "}
                1) {state.wellTemp && state.wellTemp.flow_granted_dga}{" "}
                <b>Lt/SEG</b>
              </Tag>
              <Tag color="blue" style={{ ...styles.tagsWell.tag2 }}>
                {" "}
                2) {state.wellTemp && state.wellTemp.pupm_depth} <b>Mt</b>
              </Tag>
              <Tag color="blue" style={{ ...styles.tagsWell.tag3 }}>
                {" "}
                3) {state.wellTemp && state.wellTemp.inside_diameter}{" "}
                <b>MM/PULG</b>
              </Tag>
              <Tag color="blue" style={{ ...styles.tagsWell.tag4 }}>
                {" "}
                4) {state.wellTemp && state.wellTemp.outside_diameter}{" "}
                <b>MM/PULG</b>
              </Tag>
              <Tag color="blue" style={{ ...styles.tagsWell.tag5 }}>
                {" "}
                5) {state.wellTemp && state.wellTemp.depth} <b>Mt</b>
              </Tag>
                          </Col>
          </Row>
        </Col>
      )}
    </Row>
  );
};

const styles = {
  tagsWell: {
    tag1: {
      marginTop: "100px",
      marginLeft: "20px",
      position: "absolute",
      borderRadius: "10px",
    },
    tag2: {
      marginTop: "400px",
      marginLeft: "280px",
      position: "absolute",
      borderRadius: "10px",
    },
    tag3: {
      marginTop: "160px",
      marginLeft: "270px",
      position: "absolute",
      borderRadius: "10px",
    },
    tag4: {
      marginTop: "90px",
      marginLeft: "260px",
      position: "absolute",
      borderRadius: "10px",
    },
    tag5: {
      marginTop: "290px",
      marginLeft: "130px",
      position: "absolute",
      borderRadius: "10px",
    },
    tag6: {
      marginTop: "290px",
      marginLeft: "250px",
      position: "absolute",
      borderRadius: "10px",
    },
    tag7: {
      marginTop: "340px",
      marginLeft: "250px",
      position: "absolute",
      borderRadius: "10px",
    },
  },
  colWell: {
    backgroundImage: `url(${well_img})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginTop: "50px",
    width: "100%",
    height: "500px",
  },

  card: {
    borderRadius: "10px",
    width: window.innerWidth < 800 && "100%",
    marginLeft: window.innerWidth > 800 && "-15px",
    marginTop: window.innerWidth > 800 && "-15px",
    backgroundColor: "white",
    border: "1px solid #white",
  },
  row: {
    height: window.innerWidth > 800 ? "82vh" : "70vh",
  },
  btn: {
    borderRadius: "5px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  tag: {
    backgroundColor: "#1890ff",
    color: "white",
    paddingTop: "5px",
    paddingBottom: "5px",
    borderRadius: "5px",
    fontSize: "14px",
    marginBottom: "10px",
  },
  tagImage: {
    fontSize: "13px",
    borderRadius: "5px",
    marginBottom: "6px",
  },
};

export default Well;
