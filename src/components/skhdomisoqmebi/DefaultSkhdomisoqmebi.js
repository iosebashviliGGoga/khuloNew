import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaAngleRight } from 'react-icons/fa'
import pdf from '../../images/collection-pdf.png'
import { useContext } from 'react'
import { SearchContext } from '.././Contexts/Context'
import { Helmet } from 'react-helmet-async'
import News from '../News'
function DefaultSkhdomisOqmebi() {
  const ref = useRef(null)
  const [width, setWidth] = useState(10)
  // import { useContext } from 'react'
  //import { SearchContext } from './Contexts/Context'
  // .filter(news => news[1].geo.pdf_title.includes(search))
  const { search } = useContext(SearchContext)
  const { language } = useContext(SearchContext)




  const [news, setNews] = useState({})
  useEffect(() => {
    const link = `https://khulo.gov.ge/api/legal_acts.php`;
    fetch(link)
      .then((response) => response.json())
      .then((data) => {

        //console.log(data)
        setNews(data)
        //  console.log(data)
        // console.log('news', news)

        // console.log('object keys menu', Object.keys(menu))
        // console.log('object entries აქტები', Object.entries(data).map((item,index)=> console.log(item,index)))


      });
    // console.log('news', news)
    // console.log('news 0', news[0])



  }, [])
  const [menu, setMenu] = useState({})
  useEffect(() => {
    const link = 'https://khulo.gov.ge/api/site_menu1.php';
    fetch(link)
      .then((response) => response.json())
      .then((data) => {

        // console.log('data.menu',data.menu)
        setMenu(data.menu)




        //  console.log('object entries', Object.entries(menu))

        Object.entries(menu).map(item => {

          if (item[1].level == 1) {
            //console.log('entries item', item[1].name_eng , item[1].level)
          }
        })

      });



  }, [])
  const presscenterList = Object.entries(menu).length ? Object.entries(menu).map((item, index) => {

    if (item[1].level == 1 && item[1].name_geo.includes('საკრებულოს სხდომის ოქმები')) {

      return Object.entries(menu).map((qveItem, index) => {
        if (qveItem[1].parent_id == item[1].cat_id) {
          const windoww = window.location.pathname;
          const result = windoww.split('/').pop();
          const slugg = qveItem[1].slug
          return <span key={index} className={result === slugg ? "active" : ""}>
            <Link to={`/komisiebis-skhdomis-oqmebi/${qveItem[1].slug}`}>
              {language == 1 ? qveItem[1].name_geo : qveItem[1].name_eng}
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
      // console.log(item[1].name_geo)
      return (language == 1 ? item[1].name_geo : item[1].name_eng)

    }

  }) : ""

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);


  })

  const [exactMenu, setExactMenu] = useState({})
  const [uniqueYears, setUniqueYears] = useState(new Set());
  const [activeYear, setActiveYear] = useState(null);

  useEffect(() => {
    if (menuName) {
      // console.log(menuName)
      // console.log(news[menuName[1].name_geo])
      setExactMenu(news[menuName[1].name_geo])
      if (exactMenu) {
        const years = Object.entries(exactMenu).map((oqmi) => oqmi[1].geo.year);
        const uniqueYearsSet = new Set(years.filter(year => year)); // Filtering out null values

        setUniqueYears(uniqueYearsSet);
        setActiveYear(years.reverse()[0]);

        
      }

    }
  }, [news,exactMenu])

  const handleYearClick = (year) => {
    setActiveYear(year);
  };


  return (
    <motion.div
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >

      <div className="news-container margin-280px defaultSkhdoma">
        <header>
          <span className='big' ref={ref} style={{ marginRight: width / 2 }}>{language == 1 ? "სამართლებრივი აქტები" : "LEGAL ACTS"}</span>
          <span>
            {menuName[1] ? (language == 1 ? menuName[1].name_geo : menuName[1].name_eng) : ""}
          </span>
        </header>
        <div>

          <div className='sakrebulo-landing'>
            <div className="landing-container">
              <div className="sajaroInfo ">
                <ul className='years--filter__container'>
                  {[...uniqueYears].reverse().map((year, index) => (
                    <li key={index} className={activeYear == year ? "active" : ""} data-year={year} onClick={() => handleYearClick(year)}>{year}</li>
                  ))}
                </ul>

                <Helmet><title>{menuName[1] ? (language == 1 ? menuName[1].name_geo : menuName[1].name_eng) : ""}</title></Helmet>




                {[...uniqueYears].reverse().map((year, index) => (
                  <figure key={index} className={year === activeYear ? 'years--itemContainer active' : 'years--itemContainer'}>
                    {Object.entries(news).length ? Object.entries(news).map((item, index) => {


                      //  console.log(menuName[1].name_geo)


                      return [...Object.entries(item[1])].reverse().filter(news => news[1].geo.pdf_title.includes(search)).map((gank, index) => {
                        if (gank[1].geo.legal_acts_menu.includes(menuName[1].name_geo))
                        
                          if (gank[1].geo.year == year) {
                            return <div className="">
                              <a href={`https://khulo.gov.ge${gank[1].geo.pdf}`} target='blank'>
                                <span key={index}>{language == 1 ? gank[1].geo.pdf_title : gank[1].eng.pdf_title}</span>

                                <img src={pdf} alt="" />

                              </a>
                            </div>
                          }

                      })

                    }) : ""}
                  </figure>
                ))}



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

export default DefaultSkhdomisOqmebi