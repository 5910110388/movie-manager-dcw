import React, { Component } from "react";
import axios from "axios";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      director: "",
      premiere_date: "",
      teaserURL: ""
    };
  }

  handleChangeTitle = e => {
    this.setState({ title: e.target.value });
  };
  handleChangeDescription = e => {
    this.setState({ description: e.target.value });
  };
  handleChangeDirector = e => {
    this.setState({ director: e.target.value });
  };
  handleChangePremiereDate = e => {
    this.setState({ premiere_date: e.target.value });
  };
  handleChangeTeaserURL = e => {
    this.setState({ teaserURL: e.target.value });
  };

  componentDidMount() {
    axios
      .get(
        "https://us-central1-movie-manager-dcw.cloudfunctions.net/api/movies/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          director: response.data.director,
          premiere_date: response.data.premiereDate,
          teaserURL: response.data.teaserURL
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onSubmit = e => {
    e.preventDefault();
    const movie = {
      title: this.state.title,
      description: this.state.description,
      director: this.state.director,
      premiereDate: this.state.premiere_date,
      teaserURL: this.state.teaserURL
    };
    axios
      .put(
        "https://us-central1-movie-manager-dcw.cloudfunctions.net/api/movies/" +
          this.props.match.params.id,
        movie
      )
      .then(res => {
        console.log(res.data);
        this.props.history.push("/");
      });
  };
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>แก้ไขภาพยนตร์</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title">ชื่อภาพยนตร์: </label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              value={this.state.title}
              onChange={this.handleChangeTitle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">เรื่องย่อภาพยนตร์: </label>
            <textarea
              className="form-control"
              rows="5"
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.handleChangeDescription}
            />
          </div>
          <div className="form-group">
            <label htmlFor="director">ผู้กำกับ: </label>
            <input
              type="text"
              className="form-control"
              name="director"
              id="director"
              value={this.state.director}
              onChange={this.handleChangeDirector}
            />
          </div>
          <div className="form-group">
            <label htmlFor="premiere_date">วันที่ออกฉาย: </label>
            <input
              type="date"
              className="form-control"
              name="premiere_date"
              id="premiere_date"
              value={this.state.premiere_date}
              onChange={this.handleChangePremiereDate}
            />
          </div>

          <div className="form-group">
            <label htmlFor="premiere_date">ตัวอย่างภาพยนตร์: </label>
            <input
              type="url"
              className="form-control"
              name="teaserURL"
              id="teaserURL"
              value={this.state.teaserURL}
              onChange={this.handleChangeTeaserURL}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="แก้ไขภาพยนตร์"
              className="btn btn-primary btn-block"
            />
          </div>
        </form>
      </div>
    );
  }
}
