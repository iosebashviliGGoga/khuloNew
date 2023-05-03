import React from 'react'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion';

import { Helmet } from 'react-helmet-async';
import { useContext } from 'react'
import { SearchContext } from './Contexts/Context'

import { FacebookShareButton, TwitterShareButton } from 'react-share'
import { FaEnvelope, FaPhoneAlt, FaFacebookF, FaTwitter, FaAngleLeft, FaInstagram, FaYoutube } from 'react-icons/fa'

function SakrebulosTavmjdomarisMoadgileebi1() {
  const ref = useRef(null)
  const [width, setWidth] = useState(10)
  const { language } = useContext(SearchContext)
  const navigate = useNavigate();
  const { id } = useParams();
  //  console.log(id)
  const [member, setMember] = useState({})
  // console.log(member)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const link = `https://khulo.gov.ge/api/members.php?`;
    fetch(link)
      .then((response) => response.json())
      .then((data) => {

        // console.log('data[id]', data[id])
        setMember(data[id])
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

    if (item[1].level == 1 && item[1].name_geo == ('საკრებულო')) {

      return Object.entries(menu).map((qveItem, index) => {
        if (qveItem[1].parent_id == item[1].cat_id) {
          const windoww = window.location.pathname;
          const result = windoww.split('/').pop();
          const slugg = qveItem[1].slug
          return <span key={index} className={result === slugg ? "active" : ""}>
            <Link to={`/${qveItem[1].slug}`}>
              {language == 1 ? qveItem[1].name_geo : qveItem[1].name_eng}
            </Link>
          </span>
        }
      })
    }
  }) : "LOADING"
  const menuName = Object.entries(menu).length ? Object.entries(menu).find((item, index) => {
    // console.log(item)
    const windoww = window.location.pathname;

    const result = windoww.split('/')[1];

    const slugg = item[1].slug

    console.log(result === slugg)
    if (result === slugg) {
      return (language == 1 ? item[1].name_geo : item[1].name_eng)

    }

  }) : ""

  useLayoutEffect(() => {
    Object.entries(member).length && setWidth(ref.current.offsetWidth);

  })
  //console.log('object entries member' ,Object.entries(member))
  const memberie = Object.entries(member).length && Object.entries(member).map((item, i) => {
    if (i == 0)
      return <div className="news-container margin-280px">
        <header>
          <span className='big' ref={ref} style={{ marginRight: width / 2 }}> {language == 1 ? "საკრებულო" : "KHULO CITY ASSEMBLY"}</span>
          <span className=''>{menuName ? ((language == 1 ? menuName[1].name_geo : menuName[1].name_eng)) : ""}</span>

          <Helmet>
            <title>
              {language == 1 ? member.geo.title : member.eng.title}
            </title>
          </Helmet>
        </header>
        <div>

          <div className='sakrebulo-landing sakrebulo1'>
            <div className="landing-container">
              <div className='image-wrapper'>
                <img src={'https://khulo.gov.ge/' + member.geo.img} alt="" />
                <div className="sakrebulo-landing-near-image">
                  <h3>{language == 1 ? member.geo.title : member.eng.title}</h3>
                  <span>{language == 1 ? member.geo.position : member.eng.position}</span>
                  <div className="">
                    <div className="socials">
                      <a href='' target='blank'>
                        <FaFacebookF />
                      </a>
                      <a href='' target='blank'>
                        <FaInstagram />
                      </a>
                      <a href='' target='blank'>
                        <FaYoutube />
                      </a>

                    </div>
                    <div>
                      <a href={`mailto:${member.geo.email}`}><FaEnvelope />{member.geo.email}</a>
                      <a href={`tel:${member.geo.mobile}`}><FaPhoneAlt />{member.geo.mobile}</a>
                    </div>
                  </div>
                  <div className="languages">
                    <h3>ენები: {member.geo.language}  </h3> <span></span>
                  </div>

                </div>
              </div>
              <div className="sakrebulo-landing-paragraphs">
                <span dangerouslySetInnerHTML={{ __html: language == 1 ? member.geo.text : member.eng.text }}></span>

              </div>

            </div>
            <div className='share'>
              <span className='back' onClick={() => navigate(-1)}>
                <div>
                  <FaAngleLeft />

                </div > {language == 1 ? " უკან დაბრუნება " : "BACK"}</span>
              <span>{language == 1 ? "გააზიარე:" : "SHARE:"}
                <FacebookShareButton url={window.location.href}>
                  <FaFacebookF />
                </FacebookShareButton>
                <TwitterShareButton url={window.location.href}>
                  <FaTwitter />
                </TwitterShareButton>

              </span>
            </div>
          </div>
          <div className="presscenter-info">
            {presscenterList}
          </div>
        </div>



      </div>
  })








  if (loading) return <h1>LOADING</h1>
  return (
    <motion.div
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>


      {memberie}










    </motion.div>
  )
}

export default SakrebulosTavmjdomarisMoadgileebi1