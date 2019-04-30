import React, { Component } from "react";
import axios from "axios";

class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teaserURL: "",
      title: "",
      description: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://us-central1-movie-manager-dcw.cloudfunctions.net/api/movies/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          teaserURL: response.data.teaserURL,
          title: response.data.title,
          description: response.data.description
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
        <div className="container">
            <h3 className="text-center">{this.state.title}</h3>
            <div style={{height: '400px'}}>
            <iframe
              title={this.state.title}
              height="100%"
              width="100%"
              src={this.state.teaserURL}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            </div>
            <p>{this.state.description}</p>
        </div>
    );
  }
}

export default Watch;
