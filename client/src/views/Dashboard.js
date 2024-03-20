import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

const API_URL = 'http://localhost:5000';

function Dashboard(props) {
  const { username } = useParams();
  const [userScore, setUserScore] = useState(null);
  const [bigChartData, setbigChartData] = useState('data1');

  const chartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: [{
        gridLines: {
          drawBorder: false,
          color: "rgba(225,78,202,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 50,
          suggestedMax: 120,
          padding: 20,
          fontColor: "#9e9e9e",
        },
      }],
      xAxes: [{
        gridLines: {
          drawBorder: false,
          color: "rgba(225,78,202,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9e9e9e",
        },
      }],
    },
  };

  useEffect(() => {
    fetch(`${API_URL}/get_score/${username}`)
      .then(response => response.json())
      .then(data => {
        setUserScore(data.score);
      })
      .catch(error => console.error('Error fetching user score:', error));
  }, [username]);

  const createChartData = (userScore) => {
    let gradientStroke1, gradientStroke2, gradientStroke3;
    const canvas = document.createElement('canvas');
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        gradientStroke1 = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke1.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke1.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke1.addColorStop(0, "rgba(29,140,248,0)");

        gradientStroke2 = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke2.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke2.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke2.addColorStop(0, "rgba(119,52,169,0)");

        gradientStroke3 = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke3.addColorStop(1, "rgba(66,134,121,0.15)");
        gradientStroke3.addColorStop(0.4, "rgba(66,134,121,0.0)");
        gradientStroke3.addColorStop(0, "rgba(66,134,121,0)");
    }

    return {
        data1: {
            labels: ["Session 1", "Session 2", "Session 3", "Session 4", "Session 5", "Session 6", "Session 7", "Session 8", "Session 9", "Session 10"],
            datasets: [{
                label: "Total Score",
                data: [userScore, userScore - 5, userScore - 10, userScore - 15, userScore - 20, userScore - 20, userScore - 25, userScore - 30, userScore - 35, userScore - 40],
                fill: true,
                backgroundColor: gradientStroke1,
                borderColor: "#1f8ef1",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#1f8ef1",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#1f8ef1",
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4
            }],
            options: chartOptions
        },
        data2: {
            labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
            datasets: [{
                label: "Voice Stuttering Score",
                data: [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
                fill: true,
                backgroundColor: gradientStroke2,
                borderColor: "#d048b6",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#d048b6",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#d048b6",
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4
            }],
            options: chartOptions
        },
        data3: {
            labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
            datasets: [{
                label: "Profiled Movementes Score",
                data: [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
                fill: true,
                backgroundColor: gradientStroke2,
                borderColor: "#d048b6",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#d048b6",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#d048b6",
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4
            }],
            options: chartOptions
        },
        data4: {
            labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
            datasets: [{
                label: "Emotions Score",
                data: [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
                fill: true,
                backgroundColor: gradientStroke2,
                borderColor: "#d048b6",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#d048b6",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#d048b6",
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4
            }],
            options: chartOptions
        },
        // Add more data sets for each of your additional charts
    };
};


  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  const chartData = createChartData(userScore);

  return (
    <>
      <div className="content">
        <div>
          <p style={{ fontSize: '25px', fontWeight: "bold" }}>{username}'s Dashboard {userScore}</p>
        </div>
        <Row>
          <Col xs="12">
            <Card className="card-chart" style={{width: '1260px'}}>
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Social Phobia Patients</h5>
                    <CardTitle tag="h2">Performance</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                      <Button
                        tag="label"
                        className={classNames("btn-simple", { active: bigChartData === "data1" })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">Accounts</span>
                        <span className="d-block d-sm-none"><i className="tim-icons icon-single-02" /></span>
                      </Button>
                      {/* Add more buttons here for different charts */}
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={{ height: '200px' }}> {/* Adjust the height as needed */}
                  <Line data={chartData[bigChartData]} options={chartOptions} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Add more rows and charts as needed */}
        {/* Template for additional chart */}
        <Row>
                   <Col lg="4">
            <Card className="card-chart" style={{width: '400px'}}>
              <CardHeader>
                <h5 className="card-category">Total Shipments</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> 763,215
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={{ height: '250px' }}>
                  <Line data={chartData.data2} options={chartOptions} />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart" style={{width: '400px'}}>
              <CardHeader>
                <h5 className="card-category">Daily Sales</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" /> 3,500€
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={{ height: '250px' }}>
                  <Bar data={chartData.data3} options={chartOptions} />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart" style={{width: '400px'}}>
              <CardHeader>
                <h5 className="card-category">Completed Tasks</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> 12,100K
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={{ height: '250px' }}>
                  <Line data={chartData.data4} options={chartOptions} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* End of additional chart */}
      </div>
    </>
  );
}

export default Dashboard;

