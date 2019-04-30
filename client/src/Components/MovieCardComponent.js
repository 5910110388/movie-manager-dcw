import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


class MovieCard extends Component {
    delete = () => {
        axios.delete("https://us-central1-movie-manager-dcw.cloudfunctions.net/api/movies/"+this.props.obj.id)
            .then(res=> console.log(`${res.data}`))
            .catch(err => console.log(err))
            
      }

  render() {
    return (
      <div className="card mt-2 mb-1">
        <div className="row no-gutters">
          <div className="col-md-4">
            <iframe
              title={this.props.obj.title}
              height="100%"
              width="100%"
              src={this.props.obj.teaserURL}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="col-md-8">
            <div className="card-block px-2">
              <h4 className="card-title">{this.props.obj.title}</h4>
              <p className="card-text">{this.props.obj.description}</p>
              <p className="card-text">ผู้กำกับ : {this.props.obj.director}</p>
              <p className="card-text">
                วันที่ออกฉาย : {this.props.obj.premiereDate}
              </p>
              <Link
                to={"/watch/" + this.props.obj.id}
                className="btn btn-success"
              >
                ชมภาพยนตร์
              </Link>
              <Link
                to={"/edit/" + this.props.obj.id}
                className="btn btn-warning"
              >
                แก้ไข
              </Link>
              <button onClick={this.delete} className="btn btn-danger">ลบ</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
