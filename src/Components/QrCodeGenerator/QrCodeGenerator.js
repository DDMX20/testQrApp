import React, { useEffect, useRef, useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import QRCode from "qrcode.react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useReactToPrint } from "react-to-print";
import { IoPrint } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { IoScan } from "react-icons/io5";

function handleClickforGenerateQrCode(setShowGeneratedQrCode) {
  setShowGeneratedQrCode(true);
}
function handleClickforGenerateAnotherQrCode(
  setShowGeneratedQrCode,
  SetQrCodeValue
) {
  setShowGeneratedQrCode(false);
  SetQrCodeValue("");
}
const QrCodeGenerator = () => {
  const [showGeneratedQrCode, setShowGeneratedQrCode] = useState(false);
  const [QrCodeValue, SetQrCodeValue] = useState("");
  const handleChangeForQrCodeValue = (e) => {
    setShowGeneratedQrCode(false);
    SetQrCodeValue(e.target.value);
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    setShowGeneratedQrCode(false);
  }, []);
  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Qr Creator</title>
      </Helmet>
      <div style={{ display: "none" }}>
        <div ref={componentRef} className="p-5">
          <div className="mx-auto p-5">
            <h1>QR Code</h1>
            <QRCode
              value={QrCodeValue}
              style={{
                borderRadius: "10px",
              }}
              size={500}
              includeMargin={true}
              scale={2}
              renderAs="svg"
            ></QRCode>
          </div>
        </div>
      </div>
      {showGeneratedQrCode && (
        <div>
          <div id="QrCode" name="QrCode" className="col-12   mt-5 mb-5">
            <QRCode
              value={QrCodeValue}
              style={{
                borderRadius: "10px",
              }}
              size={250}
              className="mx-auto"
              includeMargin={true}
              scale={2}
              renderAs="svg"
            ></QRCode>
          </div>
        </div>
      )}

      {!showGeneratedQrCode && (
        <>
          <div className="col-sm-12 col-md-3 mx-auto mt-5 px-5">
            <InputGroup className="mb-3">
              <FormControl
                onChange={handleChangeForQrCodeValue}
                value={QrCodeValue}
                className="text-center rounded"
                as="textarea"
                placeholder="Enter Text to Generate QR"
                aria-label="Enter Text  to Generate QR"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
          </div>
          <div className="col-6 mx-auto mt-5">
            <Button
              variant="outline-primary"
              id="button-addon2"
              onClick={() =>
                handleClickforGenerateQrCode(setShowGeneratedQrCode)
              }
            >
              Generate QR Code
            </Button>
          </div>
        </>
      )}

      {/* <div className="col-6 mx-auto mt-5">
        <Link to="/reader">
          <Button variant="outline-primary" id="button-addon2">
            <IoScan size={25} />
            Read QrCode
          </Button>
        </Link>
      </div> */}
      {showGeneratedQrCode && (
        <>
          <div className="col-6 mx-auto mt-5">
            <Button
              variant="outline-primary"
              id="button-addon2"
              onClick={handlePrint}
            >
              <IoPrint size={25} /> Print
            </Button>
          </div>
          <div className="col-6 mx-auto mt-5">
            <Button
              variant="outline-primary"
              id="button-addon2"
              onClick={() =>
                handleClickforGenerateAnotherQrCode(
                  setShowGeneratedQrCode,
                  SetQrCodeValue
                )
              }
            >
              Generate Another QR
            </Button>
          </div>
        </>
      )}
      <div className="container row mx-auto">
        <div className="col-6 mx-auto mt-5">
          <Link to="/">
            {" "}
            <Button variant="outline-primary" id="button-addon2">
              <FaHome size={25} /> Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QrCodeGenerator;
