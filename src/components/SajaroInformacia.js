import React, { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { SearchContext } from './Contexts/Context'



import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import pdf from '../images/collection-pdf.png'
function SajaroInformacia() {



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
            <header>{language == 1 ? "საჯარო ინფორმაცია " : "PUBLIC INFO"}</header>
            <Helmet><title>{language == 1 ? "საჯარო ინფორმაცია " : "PUBLIC INFO"}</title></Helmet>

            <p>საჯარო ინფორმაციის ელექტრონულად გამოსათხოვად ჩამოტვირთეთ <a href="https://khulo.gov.ge//assets/fonts/gantskhadebis-forma.docx" target='_blank' download rel="noreferrer">განაცხადის ფორმა</a> ,
              შეავსეთ და შევსებული ფორმა გამოგვიგზავნეთ ელექტრონულ ფოსტაზე <a href="mailto:info@khulo.gov.ge">info@khulo.gov.ge</a> </p>
            <p>საჯარო ინფორმაციის გაცემაზე პასუხისმგებელი პირი: თორნიკე კაკაციძე</p>
            <p>ტელეფონი - +995 591 44 71 15</p>




            {Object.entries(news).length ? Object.entries(news).map((item, index) => {



              return [...Object.entries(item[1])].reverse().filter(news => news[1].geo.pdf_title.includes(search)).map((gank, index) => {
                if (gank[1].geo.legal_acts_menu.includes('საჯარო ინფორმაცია'))

                  return <div className="">
                    <a href={`https://khulo.gov.ge${gank[1].geo.rec_id == 112 ? "/uploads_script/skopingi.rar" : gank[1].geo.pdf}`} target='blank'>
                      <span key={index}>{language == 1 ? gank[1].geo.pdf_title : gank[1].eng.pdf_title}</span>

                      <img src={pdf} alt="" />

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

export default SajaroInformacia