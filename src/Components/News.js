import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    // console.log("inside update news");
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=09bdfa87735248ee9de1f5fd43880e69&page= ${page}&pageSize= ${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    // props.setProgress(30);
    let parsedData = await data.json();
    // props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsQuest` ;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    
    //  setState({page: page + 1});
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=09bdfa87735248ee9de1f5fd43880e69&page= ${page+1}&pageSize= ${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
    <h1 className="text-center" style={{ margin: '35px 0px', marginTop: "90px" }}>NewsQuest - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
    {loading && <Spinner />}
    <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length <= totalResults}
        loader={<Spinner/>}
    >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-3" key={element.newsURL} >
                  <NewsItem
                    
                    title={element.title ? element.title.slice(0, 45) : " "}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : " "
                    }
                    imgURL={element.urlToImage}
                    newsURL={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;
