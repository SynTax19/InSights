import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  let t = props.category;

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    // console.log(url);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${t.toUpperCase()} - InSights`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <div
        className="container my-4"
        style={{
          backgroundColor: "#f7f3f2",
          // "linear-gradient(to bottom , rgba(116, 235, 213, 0.6),rgba(159, 172, 230, 0.6))",
        }}
      >
        <h1
          className="text-center"
          style={{
            margin: "40px 0px",
            fontFamily: "monospace",
            marginTop: "60px",
            backgroundColor: "#f7f3f2",
          }}
        >
          <strong> InSights - Top {t.toUpperCase()} Headlines </strong>
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row mx-4 my-3">
              {articles.map((element) => {
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
                        category={props.category}
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
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
