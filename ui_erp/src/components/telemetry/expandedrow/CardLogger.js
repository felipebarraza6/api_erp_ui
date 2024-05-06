import React from "react";
import { Card, Tag, Modal } from "antd";

const CardLogger = ({ record }) => {
  return (
    <Card
      style={{ margin: "5px" }}
      title={<>Logger ({record.is_thethings ? "NETTRA" : "NOVUS"})</>}
      hoverable
      extra={record.variables.length}
    >
      <div
        style={{
          marginBottom: "10px",
          border: "2px solid grey",
          borderRadius: "5px",
          padding: "5px",
        }}
      >
        {record.token_service}
      </div>
      {record.variables.map((variable) => (
        <div>
          {variable.type_variable === "NIVEL" && (
            <Tag
              color="blue-inverse"
              key={variable.id}
              style={styles.tagVariable}
              onClick={() =>
                Modal.info({
                  title: "Formula nivel freatico",
                  icon: <></>,
                  width: "500px",
                  content: (
                    <>
                      El nivel freático, es el límite superior de la zona de
                      saturación o zona saturada; es decir, el nivel al que
                      llega el agua en el suelo.
                      <br />
                      <br />
                      Nuestro sistema de medicion en terreno nos proporciona el
                      nivel del agua en el pozo, y con la ayuda del
                      posicionamiento del sensor de nivel, podemos calcular el
                      nivel freatico.
                      <br />
                      <br />
                      Posicionamiento de sensor de nivel - Medición del sensor
                      de nivel = <b>Nivel Freaftico</b>
                      <br />
                      <br />
                      <center>
                        <span
                          style={{
                            padding: "5px",
                            border: "2px solid #1677ff",
                            borderRadius: "5px",
                          }}
                        >
                          <b>A</b> - <b>B = C</b>
                        </span>
                      </center>
                    </>
                  ),
                })
              }
            >
              {variable.type_variable}: {variable.str_variable} (ver
              procesamiento)
            </Tag>
          )}
          {variable.type_variable === "ACUMULADO" && (
            <>
              <Tag
                color="blue-inverse"
                key={variable.id}
                style={styles.tagVariable}
                onClick={() =>
                  Modal.info({
                    title: "Procesamiento de acumulado",
                    icon: <></>,
                    width: "500px",
                    content: (
                      <>
                        El acumulado es un valor que nos proporciona el
                        caudalimetro o flujometro, al cual podemos darle una
                        constante inicial si es requerido esto hara que las
                        mediciones recibidas se alteren sumando esta constante;
                        <br />
                        Constante de medición({variable.counter}) + Medición
                        acumulado = <b>Acumulado</b>
                        <br />
                        <br />
                        <center>
                          <span
                            style={{
                              padding: "5px",
                              border: "2px solid #1677ff",
                              borderRadius: "5px",
                            }}
                          >
                            <b>A</b> + <b>B = C</b>
                          </span>
                        </center>
                      </>
                    ),
                  })
                }
              >
                {variable.type_variable}: {variable.str_variable} (ver
                procesamiento)
              </Tag>{" "}
              <Tag style={{ marginBottom: "10px" }}>
                Pulsos(lt*p): {record.scale}{" "}
              </Tag>
              <Tag style={{ marginBottom: "10px" }}>
                Constante(m³): {variable.counter}{" "}
              </Tag>
            </>
          )}
          {variable.type_variable === "CAUDAL" && (
            <>
              {variable.convert_to_lt ? (
                <Tag
                  color="blue-inverse"
                  key={variable.id}
                  style={styles.tagVariable}
                  onClick={() =>
                    Modal.info({
                      title: "Procesamiento de caudal",
                      icon: <></>,
                      width: "500px",
                      content: (
                        <>
                          El caudal instantaneo proviene directamente del logger
                          pero podriamos procesarlo si es requerido. Pudiendo
                          transformar metros cubicos a litros.
                          <br />
                          Medicion en m³ * 3,6 = <b>Caudal</b>
                          <br />
                          <br />
                          <center>
                            <span
                              style={{
                                padding: "5px",
                                border: "2px solid #1677ff",
                                borderRadius: "5px",
                              }}
                            >
                              <b>A</b> * <b>3,6 = C</b>
                            </span>
                          </center>
                        </>
                      ),
                    })
                  }
                >
                  {variable.type_variable}: {variable.str_variable} (ver
                  procesamiento)
                </Tag>
              ) : (
                <Tag
                  color="blue-inverse"
                  key={variable.id}
                  style={styles.tagVariable}
                  onClick={() =>
                    Modal.info({
                      title: "Procesamiento de caudal",
                      icon: <></>,
                      width: "500px",
                      content: (
                        <>
                          El caudal instantaneo proviene directamente del
                          logger.
                          <br />
                        </>
                      ),
                    })
                  }
                >
                  {variable.type_variable}: {variable.str_variable} (ver
                  procesamiento)
                </Tag>
              )}
            </>
          )}
        </div>
      ))}

      {record.is_prom_flow && (
        <Tag
          color={"blue-inverse"}
          onClick={() =>
            Modal.info({
              title: "Formula caudal promedio/medio",
              icon: <></>,
              width: "500px",
              content: (
                <p>
                  <u>
                    Caudal medio del periodo: Sacando la diferencia entre el
                    totalizador del periodo de medición anterior y el actual,
                    transformándolo a l/s.{" "}
                  </u>
                  <center>
                    <a
                      target="__blank"
                      href="https://dga.mop.gob.cl/controlExtracciones/Documents/preguntas_frecuentes_aguas_subterraneas.pdf"
                    >
                      Visitar documentación oficial DGA
                    </a>
                  </center>{" "}
                  <br />
                  Ultimo acumulado = <b>a1(m³)</b>
                  <br />
                  Penultimo acumulado = <b>a2(m³)</b>
                  <br />
                  Cantidad de segundos en una hora: <b>3600(segundos)</b> <br />
                  Multiplo para transformar m³ a litros: <b>1.000</b> <br />
                  <br />
                  <center>
                    <span
                      style={{
                        padding: "5px",
                        border: "2px solid #1677ff",
                        borderRadius: "5px",
                      }}
                    >
                      ((<b>a1</b> - <b>a2</b>) / <b>3.600</b>)*<b>1.000</b>
                    </span>
                  </center>
                </p>
              ),
            })
          }
        >
          Caudal promedio (ver formula)
        </Tag>
      )}
    </Card>
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

export default CardLogger;
