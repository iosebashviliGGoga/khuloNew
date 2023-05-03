import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

import { FaPhoneAlt } from 'react-icons/fa'
import KomisiaImage from '../images/komisiebi.png'

import { useContext } from 'react'
import { SearchContext } from './Contexts/Context'
function Komisiebi1() {

  const { id } = useParams();
  const { language } = useContext(SearchContext)


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

    if (item[1].level == 1 && item[1].name_geo == ('საკრებულო')) {

      return Object.entries(menu).map((qveItem, index) => {
        if (qveItem[1].parent_id == item[1].cat_id) {
          return <span key={index} className={window.location.href.includes(qveItem[1].slug) ? "active" : ""}>
            <Link to={`/${qveItem[1].slug}`}>
              {qveItem[1].name_geo}
            </Link>
          </span>
        }

      })
    }
  }) : "LOADING"


  const [komisiaMembers, setKomisiaMembers] = useState([])
  const [members, setMembers] = useState([])
  const [tavmjdomare, setTAvmjdomare] = useState({})
  useEffect(() => {
    const link = `https://khulo.gov.ge/api/members.php?`;
    fetch(link)
      .then((response) => response.json())
      .then((data) => {


        data.map((item) => {
          item.geo.comision.map((com) => {
            if (com == id) {
              komisiaMembers.push(item)
              console.log(item)
            }
          })



        })

        data.map((item) => {
          if (item.geo.chairman == id) {

            setTAvmjdomare(item)
          }
        })


        setMembers(data)
        // console.log(data)
        // console.log('news', news)

        // console.log('object keys menu', Object.keys(menu))
        //console.log('object entries news', Object.entries(data))
        // console.log(Object.entries(data).length)

      });
    // console.log('news', news)
    // console.log('news 0', news[0])
    // console.log(JSON.parse(localStorage.getItem('languageLink')))

    //console.log('sheicvala!')

  }, [])

  const tavmjdomareUI = Object.entries(tavmjdomare).length ?
    <>
      <span>{language == 1 ? tavmjdomare.geo.title : tavmjdomare.eng.title}</span>
      <span>{language == 1 ? tavmjdomare.geo.chairman : tavmjdomare.eng.chairman}</span>
      <Helmet>
        <title>
          {language == 1 ? tavmjdomare.geo.chairman : tavmjdomare.eng.chairman}
        </title>
      </Helmet>
      <div className="half">
        <span>{tavmjdomare.geo.email}</span>
        <span><FaPhoneAlt /> {tavmjdomare.geo.mobile}</span>
      </div>
    </> : ""
  const ref = useRef(null)
  const [width, setWidth] = useState(10)
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
          <span className='big' ref={ref} style={{ marginRight: width / 2 }}> {language == 1 ? "საკრებულო" : "KHULO CITY ASSEMBLY"}</span>
          <span>{language == 1 ? "საკრებულოს კომისიები" : "ASSEMBLY COMISSIONS"}</span>
        </header>
        <div>

          <div className='sakrebulo-landing'>
            <div className="landing-container">

              <div className="komisia">
                <div className="">





                  {tavmjdomareUI}
                  <header>{language == 1 ? "კომისიის წევრები" : "COMISSION MEMBERS"}</header>
                  {komisiaMembers.map((item) => {



                    return <> <span>{language == 1 ? item.geo.title : item.eng.title}</span>

                    </>

                  })}










                </div>

                <div className="">
                  <img src={KomisiaImage} alt="komisiaimage" />
                </div>
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

export default Komisiebi1