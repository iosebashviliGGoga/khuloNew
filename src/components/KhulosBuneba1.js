import React, { useState , useEffect  , useRef } from 'react'
import {useParams , Link , useLocation} from 'react-router-dom'
import { motion } from 'framer-motion'
import {FacebookShareButton, TwitterShareButton} from 'react-share'
import { Helmet } from 'react-helmet-async'

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'



import { FaFacebookF , FaTwitter} from 'react-icons/fa'

import { SearchContext } from './Contexts/Context'
import { useContext } from 'react'

function KhulosBuneba1() {
  const location = useLocation();
  
  
  
    const { id } = useParams();
   // const [news, setNews] = useState(ArrayOfObject[id])
    const [moreNews, setMoreNews] = useState({})

  //  const [news,setNews] = useState({})
    const [exactNews, setExactNews] = useState({})
    const {language} = useContext(SearchContext)
    
 
    
    
  useEffect(() => {
    const link = 'https://khulo.gov.ge/api/news.php?lang=geo';
   fetch(link)
  .then((response) => response.json())
  .then((data) => {

    
    setExactNews(data['კურორტები და ღირსშესანიშნაობები'][id])
    setMoreNews(data['კურორტები და ღირსშესანიშნაობები'])
   // console.log('data ID',data.სიახლეები[id].geo)
    
   // console.log(data['გეოგრაფია და ბუნება'][id].geo.title)
   
   // console.log(data)
   // console.log('news', news)
    
   // console.log('object keys menu', Object.keys(menu))
   // console.log('object entries news', Object.entries(data))
   
   
   
   });
  // console.log('news', news)
  // console.log('news 0', news[0])
  
 
  },[])
 

  
   
    const newsList = Object.entries(moreNews).length ? Object.entries(moreNews).reverse().filter(news => id !== news[0]).map((news,i) => 
    
    {   
        if(i <= 1 ){
        
            return  <Link to={`/geografia-da-buneba/${news[0]}`}><div className="landing-items-container-infos" id={news.id} key={news.id}>
            <div className='new-image-wrapper'>
            <img src={'https://khulo.gov.ge/'+ (news[1].geo.thumb_img ? news[1].geo.thumb_img   : news[1].geo.img)  } alt="" />
            </div>
            <div>
              <span className='time'>{language ==1 ? news[1].geo.date  :   ""}
              {language ==2 ? news[1].eng.date  :   ""}
              {language ==3 ? news[1].eng.date  :   ""}</span>
              <span className='header'>{language ==1 ? news[1].geo.title  :   ""}
              {language ==2 ? news[1].eng.title  :   ""}
              {language ==3 ? news[1].eng.title  :   ""}</span>
              <span className='vrclad'><Link to={`/news/${news[0]}`}>{language ==1 ? " ვრცლად"  :   ""}
              {language ==2 ? " See more"  :   ""}
              {language ==3 ? " увидеть все"  :   ""}</Link></span>
            </div>
          </div></Link>

        }
     }) : "loading news"
     


   
     

     
    if(Object.entries(exactNews).length){ return (
    <motion.div
    intial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0}}>
   
   
      <Helmet>
      <meta property="og:type"          content="WebSite" />
   
    <meta property="fb:app_id" content="440924728203663"/>
    <meta  property='og:title'  content={exactNews.title}/>
    <meta property="og:url" content={window.location.href}/>
    <meta property="og:description" content=""></meta>
    <meta property="og:image" content={exactNews.title ? `https://khulo.gov.ge/${exactNews.img}` :   "alt"}/>
       
       
      
       <title>{Object.entries(exactNews).length ? exactNews.geo.title :  ""}</title>


       


      </Helmet>
        
    <div className="news1-container margin-280px">
    <header>
          <span className='big' id='meria'>   { language == 1 ? 'ხულო' : ""}
              {language == 2 ? 'KHULO' : ""}
              {language == 3 ? "Хуло" : ""}</span>
          <span> { language == 1 ? 'კურორტები და ღირსშესანიშნაობები' : ""}
              {language == 2 ? 'RESORTS AND SIGHTS' : ""}
              {language == 3 ? "ГЕОГРАФИЯ И ПРИРОДА" : ""}</span>
    </header>
    <div className="main">
        <div>
            <div className="main-picture">
                <img src={'https://khulo.gov.ge/'+ (exactNews.geo.thumb_img ? exactNews.geo.thumb_img   : exactNews.geo.img)  } alt="" />
                <span className='time'>
                 
                  {language ==1 ? exactNews.geo.date  :   ""}
                  {language ==2 ? exactNews.eng.date  :   ""}
                  
                </span>
                <span className='header'>
                 
                  {language ==1 ? exactNews.geo.title  :   ""}
                  {language ==2 ? exactNews.eng.title  :   ""}
                </span>
            </div>
            <div className="main-content">
                
              
                <span className="main-content-text" dangerouslySetInnerHTML={{__html: language == 1 ?exactNews.geo.text.replaceAll('<img', '<img tabIndex="-1"').replaceAll('../uploads','https://www.khulo.gov.ge/uploads') : exactNews.eng.text.replaceAll('<img', '<img tabIndex="-1"').replaceAll('../uploads','https://www.khulo.gov.ge/uploads') }}>

                </span>
                
             
                

                <span>    {  language == 1 ? "   გააზიარე:" : ""}
                          { language == 2 ? "SHARE:" : ""}
                          { language == 3 ? "Поделиться:" : ""} 
                       
                         <a href={`https://www.facebook.com/sharer.php?u=${window.location.href}`} rel="noreferrer" target='_blank'>
                          <FaFacebookF/>
                         </a>
                      

                       
                      
                      
                          <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} rel="noreferrer" target='_blank'>
                            <FaTwitter/>
                          </a>
                      
                     

                   
                      
                     
                      
                  </span>
            </div>

        </div>
        <div className="moreNews">
            <span> {  language == 1 ? "   სხვა ღირსშესანიშნაოებები:" : ""}
                          { language == 2 ? "OTHER RESORTS AND SIGHTS:" : ""}
                          { language == 3 ? "другие направления:" : ""}</span>
            {newsList}
        </div>

    </div>


    </div>







    </motion.div>
  )} else return "LOADING"
}

export default KhulosBuneba1