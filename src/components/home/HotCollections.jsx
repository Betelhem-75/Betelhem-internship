import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function feachCollections() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`);
      setCollections(data);
      console.log(data);

    }
    feachCollections();
  }, []);

  const settings = {
    arrows: true,
    slidesToShow: 4,
    infinite: true
    
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}> 
            {collections.map(collection => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 card" key={collection.authorId}>
                <div className="nft_coll">
                  <div className="nft_wrap" >
                    <Link to="/item-details">
                      <img src={collection.nftImage} className="lazy img-fluid card-top-image" alt=""  />
                    </Link>
                 </div>
                 <div className="nft_coll_pp">
                   <Link to="/author">
                     <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                   </Link>
                   <i className="fa fa-check"></i>
                 </div>
                 <div className="nft_coll_info">
                   <Link to="/explore">
                     <h4>{collection.title}</h4>
                   </Link>
                   <span>ERC-{collection.code}</span>
                 </div>
               </div>
             </div>
           ))}
           </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
