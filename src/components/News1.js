import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import { Helmet } from 'react-helmet-async'

import { InlineReactionButtons } from 'sharethis-reactjs';
import { InlineShareButtons } from 'sharethis-reactjs';
import { StickyShareButtons } from 'sharethis-reactjs';
import { InlineFollowButtons } from 'sharethis-reactjs';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { SearchContext } from './Contexts/Context'
import { useContext } from 'react'

import { FaFacebookF, FaTwitter } from 'react-icons/fa'



function News1() {
  const location = useLocation();



  const { id } = useParams();
  // const [news, setNews] = useState(ArrayOfObject[id])
  const [moreNews, setMoreNews] = useState({})

  //  const [news,setNews] = useState({})
  const [exactNews, setExactNews] = useState({})
  const { language } = useContext(SearchContext)




  useEffect(() => {
    const link = 'https://khulo.gov.ge/api/news.php?lang=geo';
    fetch(link)
      .then((response) => response.json())
      .then((data) => {


        setExactNews(data.სიახლეები[id])
        setMoreNews(data.სიახლეები)
        // console.log('data ID',data.სიახლეები[id].geo)

        // console.log(data.სიახლეები[id].geo.text)

        // console.log(data)
        // console.log('news', news)

        // console.log('object keys menu', Object.keys(menu))
        // console.log('object entries news', Object.entries(data))



      });
    // console.log('news', news)
    // console.log('news 0', news[0])


  }, [])




  const newsList = Object.entries(moreNews).length ? Object.entries(moreNews).reverse().filter(news => id !== news[0]).map((news, i) => {
    if (i <= 1) {

      return <Link to={`/news/${news[0]}`}><div className="landing-items-container-infos" id={news.id} key={news.id}>
        <div className='new-image-wrapper'>
          <img src={'https://khulo.gov.ge/' + (news[1].geo.thumb_img ? news[1].geo.thumb_img : news[1].geo.img)} alt="" />
        </div>
        <div>
          <span className='time'>{language == 1 ? news[1].geo.date : ""}{language == 2 ? news[1].eng.date : ""}</span>
          <span className='header'>{language == 1 ? news[1].geo.title : ""}{language == 2 ? news[1].eng.title : ""}</span>
          <span className='vrclad'><Link to={`/news/${news[0]}`}>{language == 1 ? " ვრცლად" : ""}
            {language == 2 ? " See more" : ""}</Link></span>
        </div>
      </div></Link>

    }
  }) : "loading news"







  if (Object.entries(exactNews).length) {
    return (
      <motion.div
        intial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>


        <Helmet>

          <meta property="og:type" content="WebSite" />

          <meta property="fb:app_id" content="440924728203663" />
          <meta property='og:title' content={language == 1 ? exactNews.geo.title ? exactNews.geo.title : "" : ""} />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:description" content="khulo.gov.ge"></meta>
          <meta property="og:image" content={language == 1 ? `https://khulo.gov.ge/${exactNews.geo.img}` : "alt"} />



          <title>
            {language == 1 ? exactNews.geo.title ? exactNews.geo.title : "" : ""}
            {language == 2 ? exactNews.eng.title ? exactNews.eng.title : "" : ""}
          </title>





        </Helmet>

        <div className="news1-container margin-280px">
          <header>
            <span className='big'> {language == 1 ? " პრესცენტრი" : ""}
              {language == 2 ? " PRESS CENTER" : ""}</span>
            <span>{language == 1 ? " სიახლეები" : ""}
              {language == 2 ? " NEWS" : ""}</span>
          </header>
          <div className="main">
            <div>
              <div className="main-picture">
                <img src={'https://khulo.gov.ge/' + (exactNews.geo.thumb_img ? exactNews.geo.thumb_img : exactNews.geo.img)} alt="" />
                <span className='time'>{language == 1 ? exactNews.geo.date : ""}{language == 2 ? exactNews.eng.date : ""}</span>
                <span className='header'>{language == 2 ? exactNews.eng.title : ""}{language == 1 ? exactNews.geo.title : ""}</span>
              </div>
              <div className="main-content">
                {language == 1 ? <span className='main-content-text' dangerouslySetInnerHTML={{ __html: exactNews.geo.text ? exactNews.geo.text.replaceAll('<img', '<img tabIndex="-1"').replaceAll('../uploads', 'https://www.khulo.gov.ge/uploads') : "" }} ></span> : ""}
                {language == 2 ? <span className='main-content-text' dangerouslySetInnerHTML={{ __html: exactNews.eng.text ? exactNews.eng.text.replaceAll('<img', '<img tabIndex="-1"').replaceAll('../uploads', 'https://www.khulo.gov.ge/uploads') : "" }} ></span> : ""}
                <span>    {language == 1 ? "   გააზიარე:" : ""}
                  {language == 2 ? "SHARE:" : ""}
                  <a href={`https://www.facebook.com/sharer.php?u=${window.location.href}`} rel="noreferrer" target='_blank'>
                    <FaFacebookF />
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=https://khulo.gov.ge/news/${id}&text=${exactNews.geo.title}`} rel="noreferrer" target='_blank'>
                    <FaTwitter />
                  </a>
                  <InlineShareButtons
                    config={{
                      alignment: 'center',  // alignment of buttons (left, center, right)
                      color: 'social',      // set the color of buttons (social, white)
                      enabled: true,        // show/hide buttons (true, false)
                      font_size: 16,        // font size for the buttons
                      labels: 'cta',        // button labels (cta, counts, null)
                      language: 'en',       // which language to use (see LANGUAGES)
                      networks: [           // which networks to include (see SHARING NETWORKS)
                        
                        'facebook',
                        'twitter'
                      ],
                      padding: 12,          // padding within buttons (INTEGER)
                      radius: 4,            // the corner radius on each button (INTEGER)
                      show_total: true,
                      size: 40,             // the size of each button (INTEGER)

                      // OPTIONAL PARAMETERS
                      url: window.location.href, // (defaults to current url)
                      image: `https://khulo.gov.ge/${exactNews.geo.img}`,  // (defaults to og:image or twitter:image)
                      description: 'custom text',       // (defaults to og:description or twitter:description)
                      title: 'custom title',            // (defaults to og:title or twitter:title)
                      message: 'custom email text',     // (only for email sharing)
                      subject: 'custom email subject',  // (only for email sharing)
                      username: 'custom twitter handle' // (only for twitter sharing)
                    }}
                  />
                </span>
              </div>
            </div>
            <div className="moreNews">
              <span> {language == 1 ? "   სხვა სიახლეები:" : ""}
                {language == 2 ? "OTHER NEWS:" : ""}</span>
              {newsList}
            </div>

          </div>


        </div>







      </motion.div>
    )
  } else { return "LOADING" }
}

export default News1