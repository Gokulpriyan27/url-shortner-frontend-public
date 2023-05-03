import { Button, Container } from "reactstrap";
import React, { useState } from "react";
import "./Dashboard.scss";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
function Dashboard() {
  const { userid } = useParams();

  const [loadingDate, setLoadingDate] = useState(false);
  const [loadingMonth, setloadingMonth] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setselectedMonth] = useState(null);

  const [clearbtn, setClearbtn] = useState(false);

  const [display, setDisplay] = useState("");


  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (month) => {
    setselectedMonth(month);
  };

  const handleDateSubmit = async () => {
    try {
      if (selectedDate) {
        try {
          const localDate = new Date(
            selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
          );
          let getDate = { date: localDate.toISOString().slice(0, 10) };
          const dateResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/urlday/${userid}`,
            getDate,
            { withCredentials: true }
          );
          if (dateResponse.status === 200) {
            setClearbtn(true);
     
            setDisplay(<h5 className="no-url-found">Total Url's created in month {getDate.date} is : <span className="hightlight">{dateResponse.data.data.length}</span></h5>);

          } else if (dateResponse.status === 204) {
            setClearbtn(true);
          
            setDisplay(<h5 className="no-url-found">No url history found for : <span className="hightlight">{getDate.date}</span></h5>);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.warn("Date field should not be empty", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          style: { top: "7vh" },
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleMonthSubmit = async () => {
    try {
      if (selectedMonth) {
        let getmonth = { month: selectedMonth.getMonth() + 1 };
        let options = { month: "long" };
        let month = selectedMonth.toLocaleString("en-US", options);
        try {
          const monthResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/urlmonth/${userid}`,
            getmonth,
            { withCredentials: true }
          );
          if (monthResponse.status === 200) {
            setClearbtn(true);

            // setDisplay(`Url's created on ${month} is ${monthResponse.data.data.length}`);

            setDisplay(<h5 className="no-url-found">Total Url's created in month {month} is : <span className="hightlight">{monthResponse.data.data.length}</span></h5>);
          } else if (monthResponse.status === 204) {
            setClearbtn(true);
            setDisplay(<h5 className="no-url-found">No url history found for <span className="hightlight">{month}</span></h5>);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.warn("Month field should not be empty", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          style: { top: "7vh" },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setSelectedDate(null);
    setselectedMonth(null);
    setDisplay(null);
    setDisplay(null);
    setClearbtn(false);
  };

  return (
    <>
      <Navigation />
      <div className="dash-wrapper">
        <Container className="dash-container">
          <div className="picker-wrapper">
            <div className="date-picker-wrapper">
              <h5>Pick a date</h5>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                className="custom-datepicker"
                placeholderText="Click to choose.."
                dateFormat="dd-MM-yyyy"
                maxDate={new Date()}
                disabled={selectedMonth}
              />

              {loadingDate ? (
                <Button className="fetch-btn" color="success" outline disabled>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    size="2xl"
                    style={{ color: "#fcfcfc" }}
                  />
                </Button>
              ) : (
                <Button
                  className="fetch-btn"
                  color="success"
                  outline
                  disabled={selectedMonth}
                  onClick={handleDateSubmit}
                >
                  Fetch
                </Button>
              )}
            </div>

            <h4>or</h4>
            <div className="month-picker-wrapper">
              <h5>Pick a month</h5>
              <DatePicker
                selected={selectedMonth}
                onChange={handleMonthChange}
                dateFormat="MM-yyyy"
                showMonthYearPicker
                placeholderText="Click to choose.."
                className="custom-datepicker"
                maxDate={new Date()}
                disabled={selectedDate}
              />
              {loadingMonth ? (
                <Button className="fetch-btn" color="success" outline disabled>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    size="2xl"
                    style={{ color: "#fcfcfc" }}
                  />
                </Button>
              ) : (
                <Button
                  className="fetch-btn"
                  color="success"
                  outline
                  disabled={selectedDate}
                  onClick={handleMonthSubmit}
                >
                  Fetch
                </Button>
              )}
            </div>
          </div>
          {clearbtn && (
            <Button
              color="warning"
              outline
              onClick={handleClear}
              className="clear-btn"
            >
              Clear fields
            </Button>
          )}
          <div className="data-wrapper">
          {
            display ? 
            (display)
            :(null)
           }
           {
            display===0 ? 
            (display)
            :(null)
           }
          </div>
        </Container>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Dashboard;
