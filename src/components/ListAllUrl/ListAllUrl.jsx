import "./ListAllUrl.scss";
import { Button, Container, Table } from "reactstrap";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ListAllUrl() {
  const { userid } = useParams();
  const [urldata, setUrldata] = useState([]);
  const fetchUrls = async () => {
    try {
      const getUrlData = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/geturls/${userid}`,
        { withCredentials: true }
      );
      if (getUrlData.status === 200) {
        setUrldata(getUrlData.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

const handleClick=(value)=>{
  window.open(value,"_blank","noreferrer")
}

  return (
    <>
      <Navigation />
      <div className="list-wrapper">
        <Container className="list-container" fluid>
         {
          urldata.length>0 ? ( <Table bordered dark hover responsive striped className="list-table">
          <thead>
            <tr>
              <th>Item No.</th>
              <th>Original Url</th>
              <th>Short Url</th>
              <th>Created on</th>
            </tr>
          </thead>
          <tbody>
            {urldata.length > 0
              ? urldata.map((data, index) => (
                  <tr key={index + 1}>
                    <th scope="row" className="itemno">
                      {index + 1}
                    </th>
                    <td className="originalurl">{data.originalUrl}</td>
                    <td className="shorturl">
                      <a href={`${import.meta.env.VITE_BACKEND_URL}/api/${data.short_id}`} className="links" target="_blank" rel="noreferrer">{`${import.meta.env.VITE_BACKEND_URL}/api/${
                        data.short_id
                      }`}</a>
                    </td>
                    <td className="date-cell">
                      {data.createdAt.substr(0, 10)}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>):(
          <div className="no-content-wrapper">
            <h3>No URL history</h3>
          </div>
        )
         }
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default ListAllUrl;
