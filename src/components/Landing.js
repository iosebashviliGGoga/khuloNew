import React from 'react'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SearchContext } from './Contexts/Context'
import { Helmet } from 'react-helmet-async';





import landingphoto1 from '../images/173417813_269803324792866_7484884227845132997_n.png'

import seeMore from '../images/Group 51.png'
import SlickSlider from './SlickSlider/SlickSlider'







function Landing() {
  const [topNews, setTopNews] = useState({})


  const { language } = useContext(SearchContext)
  //console.log(language)
  // setLanguage(localStorage.getItem('language' , JSON.parse(language)) || 1)
  //console.log(language)
  const [moreNews, setMoreNews] = useState({})
  const [moreGancxadebebi, setMoreGancxadebebi] = useState({})
  const [moreAnonsebi, setMoreAnonsebi] = useState({})
  useEffect(() => {
    const link = 'https://khulo.gov.ge/api/news.php?lang=geo';
    fetch(link)
      .then((response) => response.json())
      .then((data) => {

        // console.log(data)
        // setExactNews(data[id])
        setMoreNews(data.სიახლეები)
        setMoreAnonsebi(data.ანონსები)
        setMoreGancxadebebi(data.განცხადებები)

        // console.log(data)
        // console.log('news', news)

        // console.log('object keys menu', Object.keys(menu))
        // console.log('object entries news', Object.entries(data))


      });
    // console.log('news', news)
    // console.log('news 0', news[0])

    document.title = 'Khulo'

  }, [])








  const newsList = Object.entries(moreNews).reverse().map((news, i) => {
    if (i < 6) {

      return <div className="landing-items-container-infos" id={i} key={i}>
        <a href={`/presscenter/NEWS/${news[1].geo.rec_id}`}>
          <div className='new-image-wrapper'>
            <img src={'https://khulo.gov.ge/' + news[1].geo.img} alt="" />
          </div>
          <div>
            <span className='time'>

              {language == 1 ? news[1].geo.date : ""}
              {language == 2 ? news[1].eng.date : ""}
              {language == 3 ? news[1].eng.date : ""}

            </span>
            <span className='header'>

              {language == 1 ? news[1].geo.title : ""}
              {language == 2 ? news[1].eng.title : ""}
              {language == 3 ? news[1].eng.title : ""}

            </span>
            <span className='vrclad'>{language == 1 ? " ვრცლად" : ""}
              {language == 2 ? " See more" : ""}
              {language == 3 ? " увидеть все" : ""}</span>
          </div>
        </a>
      </div>

    }
  }
  )












  // 70 ${ small  ? "colorful" : "transparent"}

  return (
    <motion.div
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>ხულო</title>
      </Helmet>

      <div className="landing">

        <SlickSlider />
        <div className="landing-items margin-280px">
          <div className="landing-items-info"><a href='/presscenter/NEWS'>
            <span>


              {language == 1 ? " სიახლეები" : ""}
              {language == 2 ? " News" : ""}
              {language == 3 ? " Новости" : ""}
            </span>
          </a> </div>
          <div className="landing-items-info"><a href='/presscenter/ganckhadebebi'>
            <span>
              {language == 1 ? " განცხადებები" : ""}
              {language == 2 ? " statements" : ""}
              {language == 3 ? " заявления" : ""}

            </span>
          </a></div>
          <div className="landing-items-info"><a href='/biujeti'>
            <span>
              {language == 1 ? " ბიუჯეტი" : ""}
              {language == 2 ? " Budget" : ""}
              {language == 3 ? " бюджет" : ""}

            </span>
          </a> </div>
          <div className="landing-items-info"><a href='/presscenter/anonsebi'>
            <span>
              {language == 1 ? "  ანონსები" : ""}
              {language == 2 ? " Announcement" : ""}
              {language == 3 ? " Объявление" : ""}


            </span>
          </a></div>
          <div className="landing-items-info"><a href='/meris-angarishi'>
            <span>
              {language == 1 ? "  ანგარიშები" : ""}
              {language == 2 ? " accounts" : ""}
              {language == 3 ? " учетные записи" : ""}


            </span>
          </a></div>
        </div>


        <div className="landing-items-container margin-280px">
          <div className="landing-items-header">
            <span> {language == 1 ? " სიახლეები" : ""}
              {language == 2 ? " News" : ""}
              {language == 3 ? " Новости" : ""}</span>
            <div className="seeAll">
              <img src={seeMore} alt="" />
              <span><Link to='/News'> {language == 1 ? " ყველას ნახვა" : ""}
                {language == 2 ? " See all" : ""}
                {language == 3 ? " увидеть все" : ""}</Link></span>
            </div>
          </div>
          <div className='landing-container'>
            {newsList}
          </div>
          <div className="about">
            <span><a href='/presscenter/NEWS'>{language == 1 ? " სიახლეების გვერდი" : ""}
              {language == 2 ? " News page" : ""}
              {language == 3 ? " страница новостей" : ""}</a></span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}



export default Landing