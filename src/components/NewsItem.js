import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {
      title,
      description,
      imgUrl,
      newsUrl,
      author,
      date,
      category,
      source,
    } = this.props;

    return (
      <>
        <div className="my-3">
          <div className="card">
            <span
              className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
              style={{ left: "88%", zIndex: "1" }}
            >
              <i>{source}</i>
            </span>
            <img src={imgUrl} className="card-img-top" alt="." />
            <div className="card-body">
              <div className="title">
                <h5 className="card-title">
                  {title}
                  <span
                    className="badge rounded-pill bg-success float-right"
                    style={{ float: "right" }}
                  >
                    <i>{category}</i>
                  </span>
                </h5>
              </div>

              <p className="card-text">{description}...</p>

              <p className="card-text">
                <small className="text-muted">
                  By: {author ? author : "Anonymous"} on{" "}
                  {new Date(date).toGMTString()}
                </small>
              </p>

              <a
                rel="noreferrer"
                href={newsUrl}
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
  }
}

export default NewsItem;
