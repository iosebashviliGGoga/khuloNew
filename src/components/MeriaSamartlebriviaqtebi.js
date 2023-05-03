import React, { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { SearchContext } from './Contexts/Context'



import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import pdf from '../images/collection-pdf.png'
import {FaLink} from 'react-icons/fa'
function MeriaSamartlebriviAqtebi() {



  const { language } = useContext(SearchContext)
  const { search } = useContext(SearchContext)

  const [news, setNews] = useState({})
  useEffect(() => {
    const link = `https://khulo.gov.ge/api/legal_acts.php`;
    fetch(link)
      .then((response) => response.json())
      .then((data) => {

        // console.log(data)
        setNews(data)
        // console.log(data)
        // console.log('news', news)

        // console.log('object keys menu', Object.keys(menu))
        // console.log('object entries აქტები', Object.entries(data).map((item,index)=> console.log(item,index)))


      });
    // console.log('news', news)
    // console.log('news 0', news[0])



  }, [])


  return (
    <motion.div
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className="sakrebulo-landing">
        <div className="landing-container">
          <div className="sajaroInfo margin-280px">
            <header>{language == 1 ? "სამართლებრივი აქტები " : "LEGAL ACTS"}</header>
            <Helmet><title>{language == 1 ? "სამართლებრივი აქტები " : "LEGAL ACTS"}</title></Helmet>






            {Object.entries(news).length ? Object.entries(news).map((item, index) => {



              return Object.entries(item[1]).filter(news => news[1].geo.pdf_title.includes(search)).map((gank, index) => {
                if (gank[1].geo.legal_acts_menu.includes('სამართლებრივიაქტები-მერია'))
                  return <div className="">
                    <a href={`/${gank[1].geo.rec_id == 112 ? "https://khulo.gov.ge/uploads_script/skopingi.rar" : `/${gank[1].geo.title}`}`} target='blank'>
                      <span key={index}>{language == 1 ? gank[1].geo.pdf_title : gank[1].eng.pdf_title}</span>
                      {gank[1].geo.title.includes('.pdf') ? <img src={pdf} alt="" /> : <FaLink color='#04243F' style={{fontSize: '25px' , marginLeft: '10px', borderLeft: '1px solid #BCBCBC', padding: '20px 25px', minWidth: '80px' , minHeight: '70px'}}/>}
                      

                    </a>
                  </div>
              })

            }) : ""}

          </div>
        </div>
      </div>




    </motion.div>
  )
}

export default MeriaSamartlebriviAqtebi