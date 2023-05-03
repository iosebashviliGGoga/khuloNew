import React from 'react'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import { Helmet } from 'react-helmet-async';




import { FaEnvelope, FaPhoneAlt, FaFacebookF, FaTwitter, FaAngleLeft, FaInstagram, FaYoutube } from 'react-icons/fa'
import { useContext } from 'react'
import { SearchContext } from './Contexts/Context'
function MeriaMeri() {
  const { language } = useContext(SearchContext)
  const navigate = useNavigate();

  //  console.log(id)
  const [member, setMember] = useState({})
  // console.log(member)
  const [loading, setLoading] = useState(true)
  const [width, setWidth] = useState(10)
  const ref = useRef(null)

  useEffect(() => {
    const link = `https://khulo.gov.ge/api/members.php?`;
    fetch(link)
      .then((response) => response.json())
      .then((data) => {

        // console.log('data[id]', data)
        Object.entries(data).map((item) => {

          if (item[1].geo.m_title == ("მერი")) {
            setMember(item)
            //  console.log(item)
            return console.log(item[1].geo)
          }

        })

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
    setLoading(false)
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

    if (item[1].level == 1 && item[1].name_geo.includes('მერია')) {

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


  //console.log('object entries member' ,Object.entries(member))


  const memberie = Object.entries(member).length ? Object.entries(member).map((item, i) => {
    if (i == 0)
      return <div className="news-container margin-280px">
        <header>
          <span className='big' id='meria' ref={ref} style={{ marginRight: width / 2 }}>
            {language == 1 ? "მერია" : ""}
            {language == 2 ? "KHULO CITY HALL" : ""}
          </span>

          <span>{language == 1 ? member[1].geo.m_title : ""}
            {language == 2 ? member[1].eng.m_title : ""}</span>
        </header>
        <div>

          <div className='sakrebulo-landing sakrebulo1'>
            <div className="landing-container">
              <div className='image-wrapper'>
                <img src={'https://khulo.gov.ge/' + member[1].geo.img} alt="" />
                <div className="sakrebulo-landing-near-image">
                  <h3>
                    {language == 1 ? member[1].geo.title : ""}
                    {language == 2 ? member[1].eng.title : ""}
                  </h3>
                  <span>
                    {language == 1 ? member[1].geo.m_title : ""}
                    {language == 2 ? member[1].eng.m_title : ""}
                  </span>
                  <div className="">
                    <div className="socials">
                      <a href='https://www.facebook.com/BERIDZEVAKHTANG' target='blank'>
                        <FaFacebookF style={{ color: '#3D87AF;' }} />
                      </a>
                      <a href='https://www.instagram.com/khulocityhall/' target='blank'>
                        <FaInstagram />
                      </a>
                      <a href='https://www.youtube.com/channel/UCCP3nGfRLDohB8GWsDmM8mA' target='blank'>
                        <FaYoutube />
                      </a>

                    </div>
                    <div>
                      <a href={`mailto:${member[1].geo.email}`}><FaEnvelope />{member[1].geo.email}</a>
                      <a href={`tel:${member[1].geo.mobile}`}><FaPhoneAlt />{member[1].geo.mobile}</a>
                    </div>
                  </div>
                  <div className="languages">
                    <h3>ენები: {member[1].geo.language}  </h3> <span></span>
                  </div>

                </div>
              </div>
              <div className="sakrebulo-landing-paragraphs">
                <span dangerouslySetInnerHTML={{ __html: language == 1 ? member[1].geo.text : "" }}></span>
                <span dangerouslySetInnerHTML={{ __html: language == 2 ? member[1].eng.text : "" }}></span>
                <div className='share'>
                  <span className='back' onClick={() => navigate(-1)}>
                    <div>
                      <FaAngleLeft />
                    </div > {language == 1 ? " უკან დაბრუნება" : ""}
                    {language == 2 ? "return Back" : ""}
                  </span>
                  <span> {language == 1 ? "   გააზიარე:" : ""}
                    {language == 2 ? "SHARE:" : ""}
                    {language == 3 ? "Поделиться:" : ""}
                    <FacebookShareButton url={window.location.href}>
                      <FaFacebookF />
                    </FacebookShareButton>
                    <TwitterShareButton url={window.location.href}>
                      <FaTwitter />
                    </TwitterShareButton>

                  </span>
                </div>
              </div>

            </div>

          </div>

          <div className="presscenter-info">
            {presscenterList}

          </div>
        </div>



      </div>
  }) : "not found"







  useLayoutEffect(() => {
    Object.entries(member).length && setWidth(ref.current.offsetWidth);

  })
  if (loading) return <h1>LOADING</h1>
  return (
    <motion.div
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>

      <Helmet>
        <title>მერი</title>
      </Helmet>
      {memberie}










    </motion.div>
  )
}

export default MeriaMeri