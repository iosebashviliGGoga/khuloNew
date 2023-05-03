import React, { useState , useEffect } from 'react'
import {useParams , Link} from 'react-router-dom'
import { motion } from 'framer-motion'



import { SearchContext } from './Contexts/Context'
import { useContext } from 'react'


import { FaFacebookF , FaTwitter} from 'react-icons/fa'
import {FacebookShareButton, TwitterShareButton} from 'react-share'
import { Helmet } from 'react-helmet-async'
function PrescentriPresrelizebi1() {
  const {language} = useContext(SearchContext)
    const { id } = useParams();
   // const [news, setNews] = useState(ArrayOfObject[id])
    const [moreNews, setMoreNews] = useState({})

  //  const [news,setNews] = useState({})
    const [exactNews, setExactNews] = useState({})
  useEffect(() => {
    const link = 'https://khulo.gov.ge/api/news.php?lang=geo';
   fetch(link)
  .then((response) => response.json())
  .then((data) => {

   // console.log('სიახლეები', data.პრესრელიზები)
    setExactNews(data.პრესრელიზები[id])
    setMoreNews(data.პრესრელიზები)
   // console.log('data ID',data[id])
   // console.log('data' , data)
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
            return  <Link to={`/presrelizebi/${news[0]}`}><div className="landing-items-container-infos" id={news.id} key={news.id}>
            <div className='new-image-wrapper'>
            <img src={'https://khulo.gov.ge/'+ news[1].geo.img} alt="" />
            </div>
            <div>
            <span className='time'>{ language == 1 ? news[1].geo.date : ""}{ language == 2 ? news[1].eng.date : ""}</span>
            <span className='header'>{language == 1 ? news[1].geo.title : ""}{language == 2 ? news[1].eng.title : ""}</span>
            <span className='vrclad'><Link to={`/anonsebi/${news[0]}`}>{language ==1 ? " ვრცლად"  :   ""}
            {language ==2 ? " See more"  :   ""}</Link></span>
            </div>
          </div></Link>

        }
     }) : "loading"

     

     
    if(Object.entries(exactNews).length){return (
    <motion.div
    intial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0}}>
    


    <div className="news1-container margin-280px">
    <header>
          <span className='big'> {language ==1 ? " პრესცენტრი"  :   ""}
              {language ==2 ? " PRESS CENTER"  :   ""}</span>
          <span>{language ==1 ? " პრესრელიზები"  :   ""}
              {language ==2 ? " PRESS RELEASES"  :   ""}</span>
              <Helmet><title>{language ==1 ? " პრესრელიზები"  :   ""}
              {language ==2 ? " PRESS RELEASES"  :   ""}</title></Helmet>
    </header>
    <div className="main">
        <div>
            <div className="main-picture">
                <img src={'https://khulo.gov.ge/'+exactNews.geo.img} alt="" />
                <span className='time'>{language == 1 ? exactNews.geo.date : ""}{language == 2 ? exactNews.eng.date : ""}</span>
                <span className='header'>{language == 2 ? exactNews.eng.title : ""}{language == 1 ? exactNews.geo.title : ""}</span>
            </div>
            <div className="main-content">
                
            {language == 1?    <span className='main-content-text'dangerouslySetInnerHTML={{__html: exactNews.geo.text ? exactNews.geo.text.replaceAll('<img', '<img tabIndex="-1"').replaceAll('../uploads','https://www.khulo.gov.ge/uploads') : ""}} ></span>  :   ""}
                {language == 2?    <span className='main-content-text'dangerouslySetInnerHTML={{__html: exactNews.eng.text ? exactNews.eng.text.replaceAll('<img', '<img tabIndex="-1"').replaceAll('../uploads','https://www.khulo.gov.ge/uploads') : ""}} ></span>  :   ""}
                
                

                <span>{  language == 1 ? "   გააზიარე:" : ""}
                          { language == 2 ? "SHARE:" : ""}  
                       <FacebookShareButton url={window.location.href}> 
                         <FaFacebookF/>
                       </FacebookShareButton>
                      <TwitterShareButton url={window.location.href}>
                        <FaTwitter/>
                      </TwitterShareButton>
                         
                      </span>
            </div>

        </div>
        <div className="moreNews">
            <span>{language ==1 ? " სხვა პრესრელიზები"  :   ""}
              {language ==2 ? "OTHER PRESS RELEASES"  :   ""}</span>
            {newsList}
        </div>

    </div>


    </div>







    </motion.div>
  )} else {return "Loading"}
}

export default PrescentriPresrelizebi1