import React, { useEffect, useRef, useState } from "react";
import QrReader from "react-qr-reader";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaQrcode } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { IoPrint } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";
import { Button, Modal } from "react-bootstrap";
function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}
const QrCodeReader = () => {
  const componentRef = useRef();
  const [result, setResult] = useState({ result: "" });
  const [showModal, setShowModal] = useState(false);
  const [UploadOrScan, setUploadOrScan] = useState(false);
  const [error, setError] = useState("");
  const handleScan = (data) => {
    if (data) {
      setResult({
        result: data,
      });
      setShowModal(validURL(data));
    }
  };
  const QROutput = useRef();
  const handlePrint = useReactToPrint({
    content: () => QROutput.current,
  });
  const handleError = (err) => {
    setError(err);
  };
  const HandleOpenURl = (url) => {
    if (!url.match(/^https?:\/\//i)) {
      url = "http://" + url;
    }
    return window.open(url);
  };

  function openImageDialog(e) {
    setResult({ result: "" });
    componentRef.current.openImageDialog();
  }
  useEffect(() => {
    setUploadOrScan(false);
  }, []);
  console.log(error);
  return (
    <>
      <div className="row mx-auto">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Qr Reader</title>
        </Helmet>
        <div className="col-sm-12 col-md-3 mx-auto mt-5">
          <QrReader
            ref={componentRef}
            showViewFinder={true}
            legacyMode={UploadOrScan}
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%", border: "none" }}
          />
        </div>
        {result.result !== "" && (
          <>
            <div
              ref={QROutput}
              class="alert alert-primary alert-dismissible fade show col-sm-12 col-md-3 mx-auto mt-5"
            >
              <p>{result.result}</p>
            </div>
            <span>
              <Button
                variant="outline-primary"
                id="button-addon2"
                onClick={handlePrint}
              >
                <IoPrint size={25} /> Print
              </Button>
            </span>
          </>
        )}

        {!UploadOrScan ? (
          <div className="col-sm-12  mx-auto mt-5">
            <Button
              variant="outline-primary"
              id="button-addon2"
              onClick={() => {
                setUploadOrScan(true);
                setResult({ result: "" });
              }}
            >
              <input
                type="button"
                style={{ display: "none" }}
                value="Submit QR Code"
              />
              {/* <IoPrint size={25} />  */}
              Upload QR to scan
            </Button>
          </div>
        ) : (
          <div className="row p-0">
            <div className="col-sm-12 col-md-6  mt-5">
              <Button
                variant="outline-primary"
                id="button-addon2"
                onClick={openImageDialog}
              >
                <input
                  type="button"
                  style={{ display: "none" }}
                  value="Submit QR Code"
                />
                {/* <IoPrint size={25} />  */}
                Upload image
              </Button>
            </div>
            <div className="col-sm-12 col-md-6  mt-5">
              <Button
                variant="outline-primary"
                id="button-addon2"
                onClick={() => {
                  setUploadOrScan(false);
                  setResult({ result: "" });
                }}
              >
                <input
                  type="button"
                  style={{ display: "none" }}
                  value="Submit QR Code"
                />
                {/* <IoPrint size={25} />  */}
                scan Image
              </Button>
            </div>
          </div>
        )}

        {/* <div className="row"> */}
        {/* <div className="col-sm-3  mx-auto mt-5">
            {" "}
            <Link to="/maker">
              <Button variant="outline-primary" id="button-addon2">
                <FaQrcode size={25} />
                Create QrCode
              </Button>
            </Link>
          </div> */}
        <div className="col-sm-3  mx-auto mt-5">
          {" "}
          <Link to="/">
            {" "}
            <Button variant="outline-primary" id="button-addon2">
              <FaHome size={25} /> Home
            </Button>
          </Link>
          {/* </div> */}
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Go To This URL
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{result.result}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => HandleOpenURl(result.result)}>OpenUrl</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default QrCodeReader;
