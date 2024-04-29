import React from "react";

import { Modal } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

export const ModalViewSendDgaToday = (well) => {
  Modal.info({
    title: well.code_dga_site,
    width: 600,
    content: (
      <>
        {well.day_send_dga.map((send) => (
          <div
            style={{ border: "0px 1px 0px 0px solid black", padding: "5px" }}
          >
            <CheckCircleFilled style={{ color: "green" }} />{" "}
            {send.date_time_medition.slice(0, 10)}{" "}
            {send.date_time_medition.slice(11, 16)}
            {": "}
            caudal: {send.flow} (lt) - nivel: {send.nivel} (mt) - total:
            {send.total} (m³)
          </div>
        ))}
      </>
    ),
  });
};
