import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import pdf from '../images/collection-pdf.png'
import { useContext, useRef, useLayoutEffect } from 'react'
import { SearchContext } from './Contexts/Context'
import { Helmet } from 'react-helmet-async'

// import { useContext } from 'react'
//import { SearchContext } from './Contexts/Context'
// .filter(news => news[1].geo.title.includes(search)).
function AdministraciuliDayofa() {

  const ref = useRef(null)
  const [width, setWidth] = useState(10)
  const { search } = useContext(SearchContext)
  const { language } = useContext(SearchContext)
  const [name, setName] = useState({})
  const [samsakhurebi, setSamsakhurebi] = useState([])
  const [brdzanebebi, setBrdzanebebi] = useState({})
  useEffect(() => {
    const link = `https://khulo.gov.ge/api/legal_acts.php`;
    fetch(link)
      .then((response) => response.json())
      .then((data) => {

        // console.log(data)
        setBrdzanebebi(data)
        console.log(data)
        // console.log('news', news)

        // console.log('object keys menu', Object.keys(menu))
        // console.log('object entries აქტები', Object.entries(data).map((item,index)=> console.log(item,index)))


      });
    // console.log('news', news)
    // console.log('news 0', news[0])



  }, [])
  useEffect(() => {
    const link = `https://khulo.gov.ge/api/job.php`;
    fetch(link)
      .then((response) => response.json())
      .then((data) => {


        setSamsakhurebi(data)
        // console.log(data)
        // console.log('news', news)

        // console.log('object keys menu', Object.keys(menu))



      });
    // console.log('news', news)
    // console.log('news 0', news[0])
    // console.log(JSON.parse(localStorage.getItem('languageLink')))

    //console.log('sheicvala!')
  }, [])
  const [menu, setMenu] = useState({})
  useEffect(() => {
    const link = 'https://khulo.gov.ge/api/site_menu1.php';
    fetch(link)
      .then((response) => response.json())
      .then((data) => {

        // console.log('data.menu',data.menu)
        setMenu(data.menu)

        //  console.log('menu', menu)


        //  console.log('object entries', Object.entries(menu))

        Object.entries(menu).map(item => {

          if (item[1].level == 1) {
            //console.log('entries item', item[1].name_eng , item[1].level)
          }
        })

      });



  }, [])

  const presscenterList = Object.entries(menu).length ? Object.entries(menu).map((item, index) => {

    if (item[1].level == 1 && item[1].name_geo.includes('ხულო')) {

      return Object.entries(menu).map((qveItem, index) => {
        if (qveItem[1].parent_id == item[1].cat_id) {

          const windoww = window.location.pathname;
          const result = windoww.split('/').pop();
          const slugg = qveItem[1].slug
          return <span key={index} className={result === slugg ? "active" : ""}>
            <Link to={`/${qveItem[1].slug}`}>
              {language == 1 ? qveItem[1].name_geo : ""}
              {language == 2 ? qveItem[1].name_eng : ""}
            </Link>
          </span>
        }
      })
    }
  }) : "LOADING"
  const menuName = Object.entries(menu).length ? Object.entries(menu).find((item, index) => {
    const windoww = window.location.pathname;
    const result = windoww.split('/').pop();
    const slugg = item[1].slug
    if (result === slugg) {
      return (language == 1 ? item[1].name_geo : item[1].name_eng)

    }

  }) : ""


  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);

  })
  return (
    <motion.div
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>

      <div className="news-container margin-280px">
        <header>
          <span className='big ' id='meria' ref={ref} style={{ marginRight: width / 2 }}> {language == 1 ? "ხულო" : ""}
            {language == 2 ? "KHULO" : ""}</span>
          <span>{menuName[1] ? (language == 1 ? menuName[1].name_geo : menuName[1].name_eng) : ""}
          </span>
          <Helmet><title>{menuName[1] ? (language == 1 ? menuName[1].name_geo : menuName[1].name_eng) : ""}</title></Helmet>
        </header>
        <div>

          <div className='sakrebulo-landing'>
            <div className="landing-container">
              <div className="sajaroInfo">

                {Object.entries(brdzanebebi).length ? Object.entries(brdzanebebi).map((item, index) => {



                  return [...Object.entries(item[1])].reverse().filter(news => news[1].geo.pdf_title.includes(search)).map((gank, index) => {
                    if (gank[1].geo.legal_acts_menu == 'ადმინისტრაციულ ტერიტორიული დაყოფა')

                      return <div className="">
                        <a href={`https://khulo.gov.ge${gank[1].geo.pdf}`} target='blank'>
                          <span key={index}>
                            {language == 1 ? gank[1].geo.pdf_title : ""}
                            {language == 2 ? gank[1].eng.pdf_title : ""}
                          </span>


                          <img src={pdf} alt="" />

                        </a>
                      </div>
                  })

                }) : "LOADING"}
              </div>


            </div>
          </div>
          <div className="presscenter-info">
            {presscenterList}

          </div>
        </div>



      </div>

    </motion.div>
  )
}


export default AdministraciuliDayofa