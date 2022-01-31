import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

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
      totalResults: 0,
    };
    const t = this.props.category;
    document.title = `${t.toUpperCase()} - InSights `;
  }

  async updateNews() {
    this.props.setProgress(10);
    console.log(this.props.apiKey);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(20);
    let parseData = await data.json();
    this.props.setProgress(70);

    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
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
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
    });
  };

  render() {
    let t = this.props.category;
    return (
      <>
        <div className="container my-4">
          <h2
            className="text-center"
            style={{ margin: "40px 0px", fontFamily: "monospace" }}
          >
            {" "}
            <strong>InSights TOP {t.toUpperCase()} Headlines</strong>{" "}
          </h2>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row mx-4 my-3">
                {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <div className="container">
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
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default News;
