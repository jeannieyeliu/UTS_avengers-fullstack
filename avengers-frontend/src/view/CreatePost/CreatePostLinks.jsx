import React, { Component } from "react";
import CardBody from "components/Card/CardBody.jsx";
import Card from "components/Card/Card.jsx";
import { Table } from "react-bootstrap";
import Copyright from "@material-ui/icons/Copyright";
import CardFooter from "components/Card/CardFooter.jsx";

export default class extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardBody>
          <Table bordered className="link-table">
            <thead>
              <tr>
                <th>Avengers</th>
                <th>Using Avengers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href="http://www.google.com">About</a>
                </td>
                <td>
                  <a href="http://www.google.com">Help</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="http://www.google.com">Careers</a>
                </td>
                <td>
                  <a href="http://www.google.com">Avengers App</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="http://www.google.com">Press</a>
                </td>
                <td>
                  <a href="http://www.google.com">Avengers Premium</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="http://www.google.com">Advertise</a>
                </td>
                <td>
                  <a href="http://www.google.com">Avengers Gift</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="http://www.google.com">Blogs</a>
                </td>
                <td>
                  <a href="http://www.google.com">Directory</a>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
        <CardFooter stats>
          <div className={classes.stats}>
            Avengers Inc <Copyright />
            2019 All rights reserved.
          </div>
        </CardFooter>
      </Card>
    );
  }
}
