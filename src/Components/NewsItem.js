import React from 'react'

const NewsItem = (props) => {
    let {title,description,imgURL,newsURL,author,date,source} = props;
    return (
      <div>
      <div className ="card">
      <div style={{display: "flex", justifyContent: "flex-end",position:"absolute",right: "0"}}>
      <span className="badge rounded-pill bg-danger">{source}</span>
      </div>
      <img src= {imgURL ? imgURL: "https://play-lh.googleusercontent.com/XKpIJApesGkiUv5uDoybpeq3-EAh53KYGRvxheJes7F0x0Qn_Bfqm7RI9jKoexo7UE8"} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
        <p class="card-text"><small className="text-body-secondary"> By {author ? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
        <a href= {newsURL} target= "_blank" rel="noreferrer" className="btn btn-primary">Read More</a>
      </div>
    </div>
      </div>
    )
}

export default NewsItem;