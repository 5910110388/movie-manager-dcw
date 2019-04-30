import React, { Component } from "react";
import axios from "axios";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      description: "",
      director: "",
      premiere_date: "",
      teaserURL: ""
    };
  }

  handleChangeId = e => {
    this.setState({ id: e.target.value });
  };
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

  onSubmit = e => {
    e.preventDefault();
    const movie = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      director: this.state.director,
      premiereDate: this.state.premiere_date,
      teaserURL: this.state.teaserURL
    };

    axios
      .post(
        "https://us-central1-movie-manager-dcw.cloudfunctions.net/api/movies",
        movie
      )
      .then(res => console.log(res.data));

    this.setState({
      id: "",
      title: "",
      description: "",
      director: "",
      premiere_date: "",
      teaserURL: ""
    });
  };
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>เพิ่มภาพยนตร์เรื่องใหม่</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="id">รหัสภาพยนตร์: </label>
            <input
              type="text"
              className="form-control"
              name="id"
              id="id"
              value={this.state.id}
              onChange={this.handleChangeId}
            />
          </div>
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
              value="เพิ่มภาพยนตร์"
              className="btn btn-primary btn-block"
            />
          </div>
        </form>
      </div>
    );
  }
}
