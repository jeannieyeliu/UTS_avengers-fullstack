import React, { Component } from "react";
//import ReactTable from 'react-table'
//import 'react-table/react-table.css'
import './LeaderBoardTable.css'

//Connect to backend
//import http from "services/httpService";
import config from "config";

//References:
//https://www.youtube.com/watch?v=WX05wYyE2VU
//https://www.youtube.com/watch?v=pNjeuU4Jwnc
//https://www.npmjs.com/package/react-table

//TODO: 1. backend static?  2. detailed contents? Trending icon? user profile image? 

class LeaderBoardTable extends Component {
    //state = {};
    constructor(props) {
        super(props);

        this.state = {
            leaderBoardData: []
        }
    }

    //Data load before components rendered
    componentWillMount() {
        const url = ""; //config.leaderBoardApi
        fetch(url, {
            method: "GET"
        }).then (response => response.json()).then(leaderBoardData => {
            this.setState({leaderBoardData: leaderBoardData})
        })
    }

    render () {
        return <table className="table" cellspacing="30">
            <thread>
                <tr>
                    <th>Ranking</th>
                    <th>Users</th>
                </tr>
            </thread>
            <tbody>
                {/* { this.state.movies.map(leaderBoardData => (
                <tr>
                    <td>{leaderBoardData.ranking}</td>
                    <td>{leaderBoardData.username}</td>
                </tr>
                ))} */}
            </tbody>
        </table>
    }
}

export default (LeaderBoardTable);