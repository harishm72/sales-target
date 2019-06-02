import React from "react";
import Firebase from "./Firebase";
import moment from "moment";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      date: moment(new Date()).format("YYYY-MM-DD"),
      target_set: "",
      target_achieved: 0,
      locationID: 1,
      locationName: "Marathalli",
      data: {}
    };
  }
  componentDidMount() {
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState({ data: state || [] });
      console.log(state);
    });
  }
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  handleSelect = ({ target }) => {
    console.log(target.name, target.value);
    this.setState({
      locationID: target.value.split("-")[0],
      locationName: target.value.split("-")[1]
    });
  };
  handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      const {
        locationName,
        locationID,
        target_set,
        target_achieved,
        date
      } = this.state;
      Firebase.database()
        .ref(`${date}/${locationID}`)
        .set(
          {
            "Location Name": locationName,
            "Location ID": Number(locationID),
            "Target Set": Number(target_set),
            "Target Acheived": target_achieved,
            Date: date
          },
          error => {
            if (error) {
              alert("There was an error saving onboarding target!");
              window.location.reload();
            } else {
              alert("Onboarding target saved succesfully.");
              window.location.reload();
            }
          }
        );
    }
    this.setState({ validated: true });
  };

  render() {
    const { validated } = this.state;
    return (
      <div className="main-app-container">
        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridLocation">
              <Form.Label>Micro-Market</Form.Label>
              <Form.Control onChange={this.handleSelect} as="select">
                <option value="1-Marathalli">Marathalli</option>
                <option value="2-Whitefield">Whitefield</option>
                <option value="3-Koramangala">Koramangala</option>
                <option value="4-Bellandur">Bellandur</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                required
                type="date"
                name="date"
                onChange={this.handleChange}
                value={this.state.date}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridTarget">
              <Form.Label>Target</Form.Label>
              <Form.Control
                name="target_set"
                type="number"
                autoComplete="off"
                required
                onChange={this.handleChange}
                value={this.state.target_set}
              />
            </Form.Group>
          </Form.Row>

          <Button
            className="submit-btn"
            onClick={this.handleSubmit}
            variant="primary"
            type="button"
          >
            Save
          </Button>
        </Form>

        <div className="data-grid">
          <div className="data-header">
            <p>Location ID</p>
            <p>Micro-Market</p>
            <p>Date</p>
            <p>Target Set</p>
            <p>Target Achieved</p>
          </div>
          <div className="data-body">
            {Object.values(this.state.data).map(entry => {
              if (Array.isArray(entry)) {
                return entry.map(row => {
                  if (row) {
                    return (
                      <div
                        key={`${row["Date"]}-${row["Location ID"]}`}
                        className="data-row"
                      >
                        <p>{row["Location ID"]}</p>
                        <p>{row["Location Name"]}</p>
                        <p>{row["Date"]}</p>
                        <p>{row["Target Set"]}</p>
                        <p>{row["Target Acheived"]}</p>
                      </div>
                    );
                  } else return;
                });
              } else {
                return Object.values(entry).map(row => {
                  if (row) {
                    return (
                      <div
                        key={row["Date"] - row["Location ID"]}
                        id={row["Date"] - row["Location ID"]}
                        className="data-row"
                      >
                        <p>{row["Location ID"]}</p>
                        <p>{row["Location Name"]}</p>
                        <p>{row["Date"]}</p>
                        <p>{row["Target Set"]}</p>
                        <p>{row["Target Acheived"]}</p>
                      </div>
                    );
                  } else return;
                });
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
