import React, { Component } from "react";
import axios from "axios";
import MovieCard from "./MovieCardComponent";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { movie: [] };
  }
  componentDidMount() {
    axios
      .get("https://us-central1-movie-manager-dcw.cloudfunctions.net/api/movies")
      .then(response => {
        this.setState({ movie: response.data });
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  movieCard() {
    return this.state.movie.map(function(object, i) {
      return <MovieCard obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3 align="center">รายการภาพยนตร์</h3>
        {this.movieCard()}
      </div>
    );
  }
}