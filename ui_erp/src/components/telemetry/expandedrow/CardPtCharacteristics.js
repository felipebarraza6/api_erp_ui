import React from "react";
import { Card } from "antd";

const CardPtCharacteristics = ({ record }) => {
  return (
    <Card style={{ margin: "5px" }} title="Caracteristicas del pozo" hoverable>
      <b>Profundidad de pozo:</b> {record.d1} <br />
      <b>Posicionamiento de bomba:</b> {record.d2} <br />
      <b>Posicionamiento del sensor de nivel:</b> {record.d3}
      <br />
      <b>Diámetro ducto de salida bomba:</b> {record.d4}
      <br />
      <b>Diámetro flujometro:</b> {record.d5}
    </Card>
  );
};

export default CardPtCharacteristics;
