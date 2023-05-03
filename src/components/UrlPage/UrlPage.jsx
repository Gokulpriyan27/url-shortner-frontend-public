import { useRef, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
} from "reactstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./UrlPage.scss";
// import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

let initialValue ={
  originalUrl:""
}

function UrlPage() {
  const { userid } = useParams();
  const [data, setData] = useState(false);
  const [loading,setloading]=useState(false);
  const navigate = useNavigate();
  const [url, setUrl] = useState(initialValue);
  const [urlLink, setUrlLink] = useState("");

  const toastErrorfunction = (error) => {
    toast.error(`${error}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleUrlChange = (e) => {
    setUrl({ [e.target.name]: e.target.value });
  };

  const handleUrlSubmit = async () => {
    if (url.originalUrl.trim().length === 0) {
      toastErrorfunction("Url field cannot be empty!");
    } else {
      try {
        setData(false);
        setloading(true)
        const urlResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/url/post/${userid}`,
          url,
          { withCredentials: true }
        );

        if (urlResponse.status === 201) {
          setloading(false)
          setUrlLink(urlResponse.data.url);
          setData(true);
        } else if (urlResponse.status === 200) {
          setloading(false)
          toastErrorfunction("Short url already exists!");
          setUrl(initialValue);
        }
      } catch (error) {
        setloading(false)
        toastErrorfunction(error.response.data.message);
      }
    }
  };

  const handleCopy = (event) => {
    try {
      const clip = navigator.clipboard.writeText(urlLink);
      if (clip) {
        toast.success('Copied', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
    } catch (error) {
      toastErrorfunction(error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="url-wrapper">
        <Container className="url-container">
          <Form className="url-form">
            <FormGroup floating className="form-group">
              <Input
                id="originalUrl"
                name="originalUrl"
                placeholder="Paste the Url to shorten"
                type="text"
                value={url.originalUrl}
                onChange={handleUrlChange}
              />
              <Label for="originalUrl">Paste the Url to shorten</Label>
             {
              loading ? (<Button className="short-button" disabled>
              <FontAwesomeIcon icon={faSpinner} spin size="xl" style={{color: "#121212"}} />
             </Button>):( <Button className="short-button" onClick={handleUrlSubmit}>
              Short
            </Button>)
             }
            </FormGroup>{" "}
            {data && (
              <FormGroup className="form-group">
                <Input
                  id="shorturl"
                  name="shorturl"
                  type="text"
                  readOnly
                  value={urlLink}
                />

                <Button
                  className="copy-button"
                  color="danger"
                  onClick={() => handleCopy()}
                >
                  Copy
                </Button>
              </FormGroup>
            )}
            {
              urlLink &&
              <Button color="warning" outline className="clear-button" onClick={()=>{
                setUrl(initialValue);
                setUrlLink("");
                setData(false);
              }}>Clear</Button>
            }
          </Form>
        </Container>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}

export default UrlPage;
