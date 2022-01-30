import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "science",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    // console.log("Hello, I am the constructor from News Component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    let t = this.props.category;
    document.title = `${t.toUpperCase()} - InSights `;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8a4aca19445e4cf39ba833b3560181cb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    console.log("Previous");

    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  render() {
    return (
      <>
        <div className="container my-4">
          <h2 className="text-center" style={{ margin: "40px 0px" }}>
            {" "}
            InSights TOP Headlines{" "}
          </h2>
          {this.state.loading && <Spinner />}
          <div className="row mx-4 my-3">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 120)
                          : ""
                      }
                      imgUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://cdn.vox-cdn.com/thumbor/cD7yXbqNWAGjLli9M7r4VnBYyZI=/0x100:5120x2781/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23030199/google_pixel_6a_leak.jpeg"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      category={this.props.category}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              onClick={this.handlePrevClick}
              className="btn btn-dark mx-2"
            >
              <b>&larr;</b> Prev
            </button>

            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              onClick={this.handleNextClick}
              className="btn btn-dark mx-2"
            >
              Next <b>&rarr;</b>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default News;
