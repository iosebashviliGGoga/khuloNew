
import React, { useState, useEffect, useRef, useLayoutEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaAngleLeft } from 'react-icons/fa'
import { Helmet } from 'react-helmet-async';
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import { SearchContext } from './Contexts/Context'
function Default() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [api, setApi] = useState({})

  const [parent, setParent] = useState()
  const [istoriebi, setIstoriebi] = useState({})
  const [prescentri, setPrescentri] = useState({})
  const [exactParent, setExactParent] = useState([])
  const [itself, setItself] = useState([])
  const [width, setWidth] = useState(10)
  const { language } = useContext(SearchContext)
  const ref = useRef(null)


  // console.log(istoriebi)
  useLayoutEffect(() => {
    const link = 'https://khulo.gov.ge/api/site_menu1.php';
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setPrescentri(data.menu)
        Object.entries(data.menu).map((item, index) => {
          if (item[1].slug == id) {
            setApi(item[1].content_id)
            setParent(item[1].parent_id)

            // console.log('item',item)
            const apiLink = `https://khulo.gov.ge/api/get_content.php?content_id=${item[1].content_id}`
            fetch(apiLink)
              .then((res) => res.json())
              .then((dat) => {
                setIstoriebi(dat)
                Object.entries(data.menu).map((qveitem, index) => {
                  if (qveitem[1].cat_id == item[1].parent_id) {
                    //  console.log(item)
                    setExactParent(qveitem)
                    setItself(item)
                  }
                })
              })
          }

        })
        //   setApi(data.menu[338].content_id)




        // console.log('data.menu[1] api' , data.menu[338].content_id)
        //  console.log('menu', menu)


        //  console.log('object entries', Object.entries(menu))
        // console.log(istoriebi)


      });
  }, [])
  







  
  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
  })




  const presscenterList = exactParent.length && Object.entries(prescentri).length ? Object.entries(prescentri).map((item, index) => {


    if (item[1].level == 1 && item[1].name_geo == (exactParent[1].name_geo)) {

      return Object.entries(prescentri).map((qveItem, index) => {
        if (qveItem[1].parent_id == item[1].cat_id) {
          const windoww = window.location.pathname;
          const result = windoww.split('/').pop();
          const slugg = qveItem[1].slug
          return <span key={index} className={result === slugg ? "active" : ""}>
            <Link to={`/${qveItem[1].slug}`}>
              {language == 1 ? qveItem[1].name_geo : ""}
              {language == 2 ? qveItem[1].name_eng : ""}
              {language == 3 ? qveItem[1].name_ru : ""}
            </Link>
          </span>
        }
      })
    }
  }) : ""
  return (
    <motion.div
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>



      <div className="news-container margin-280px">
        <header>
          <span className='big ' id='meria' ref={ref} style={{ marginRight: width / 2 }}>

            {exactParent.length ? language == 1 && exactParent[1].name_geo : ""}
            {exactParent.length ? language == 2 && exactParent[1].name_eng : ""}
            {exactParent.length ? language == 3 && exactParent[1].name_ru : ""}

          </span>
          <span>

            {itself.length ? language == 1 && itself[1].name_geo : ""}
            {itself.length ? language == 2 && itself[1].name_eng : ""}
            {itself.length ? language == 3 && itself[1].name_ru : ""}
          </span>

        </header>
        <div>

          <div className='sakrebulo-landing'>
            <div className="landing-container flex">

              {istoriebi.length ? istoriebi.map((item) => {


                return <div className='istoria'>

                  <Helmet>

                    <title> {itself.length ? itself[1].name_geo : ""}</title>
                    <meta property="og:url" content={window.location.href} />
                    <meta property="og:type" content="WebSite" />
                    <meta property="og:title" content="ტესტ თაითლი" />
                    <meta property="og:description" content="ხულოს მუნიციპალიტეტი" />
                    <meta property="og:image"
                      content="https://khulo.gov.ge/uploads_script/news/2022/11/thumb_dspwns6o6c711je.jpg" />




                  </Helmet>

                  <div className={`sakrebulo-landing-paragraphs `} >


                    <span dangerouslySetInnerHTML={{ __html: language == 1 && item.geo.content ? item.geo.content.replaceAll("../", "https://khulo.gov.ge/").replaceAll('<img', '<img tabIndex="-1"') : "" }} style={{ display: id == 'sakrebulos-shesaxeb' ? 'block' : 'flex' }}></span>
                    <span dangerouslySetInnerHTML={{ __html: language == 2 && item.eng.content ? item.geo.content.replaceAll("../", "https://khulo.gov.ge/").replaceAll('<img', '<img tabIndex="-1"') : "" }} style={{ display: id == 'sakrebulos-shesaxeb' ? 'block' : 'flex' }}></span>

                  </div>
                  <div className='share'>
                    <span className='back' onClick={() => navigate(-1)}>
                      <div>
                        <FaAngleLeft />
                      </div >
                      {language == 1 ? " უკან დაბრუნება" : ""}
                      {language == 2 ? "return Back" : ""}
                      {language == 3 ? "вернуться обратно" : ""}

                    </span>
                    <span>
                      {language == 1 ? "   გააზიარე:" : ""}
                      {language == 2 ? "SHARE:" : ""}
                      {language == 3 ? "Поделиться:" : ""}

                      <FacebookShareButton url={window.location.href} quote='satesto quote' title='satesto title'>
                        <FaFacebookF />
                      </FacebookShareButton>
                      <TwitterShareButton url={window.location.href}>
                        <FaTwitter />
                      </TwitterShareButton>

                    </span>
                  </div>

                </div>
              }) : "  "}



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

export default Default