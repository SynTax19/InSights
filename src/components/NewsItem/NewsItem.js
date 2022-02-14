import React from "react";
import "./NewsItem.css";

const NewsItem = (props) => {
  // let { title, description, imgUrl, newsUrl, author, date, category, source } =
  //   this.props;

  // let { title, description, imgUrl, newsUrl, author, date, category, source } =
  //   props;

  return (
    <>
      <div className="my-5">
        <div className="card1">
          <span
            className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
            style={{ left: "88%", zIndex: "1" }}
          >
            <i>{props.source}</i>
          </span>
          <img src={props.imgUrl} className="card-img-top" alt="." />
          <div className="card-body">
            <div className="title">
              <h5 className="card-title">
                {props.title}
                <span
                  className="badge rounded-pill bg-success float-right"
                  style={{ float: "right" }}
                >
                  <i>{props.category}</i>
                </span>
              </h5>
            </div>

            <p className="card-text">{props.description}...</p>

            <p className="card-text">
              <small className="text-muted">
                By: {props.author ? props.author : "Anonymous"} on{" "}
                {new Date(props.date).toGMTString()}
              </small>
            </p>

            <a
              rel="noreferrer"
              href={props.newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsItem;
