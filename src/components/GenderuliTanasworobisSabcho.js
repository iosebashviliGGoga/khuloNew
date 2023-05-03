import React from 'react'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'
import {FaEnvelope, FaPhoneAlt , FaFacebookF , FaTwitter, FaAngleLeft} from 'react-icons/fa'

function GenderuliTanasworobisSabcho() {
  return (
    <motion.div
    intial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0}}>
        
        <div className="news-container margin-280px">
        <header>
          <span className='big genderuli'> მოქალაქის პორტალი</span>
          <span>გენდერული თანასწორობის საბჭო</span>
        </header>
        <div>
          
          <div className='sakrebulo-landing'>
            <div className="landing-container">
            
            <div className="samsakhurebi">
                <header>ნარგიზ დეკანაძე</header>
                <span>გენდერული თანასწორობის საბჭო თავჯდომარე</span>
                <div className="">
                    <span> <FaEnvelope/>  nargizdekanadze1965@gmail.com</span>
                    <span><FaPhoneAlt/>+995 598 00 37 69</span>
                </div>
             </div>
             <div className="samsakhurebi">
                <header>ირმა შავაძე</header>
                <span>გენდერული თანასწორობის საბჭო თავჯდომარის მოადგილე</span>
                <div className="">
                    <span> <FaEnvelope/>  shavadze.irma1@gmail.com</span>
                    <span><FaPhoneAlt/>+995 598 09 15 67</span>
                </div>
             </div>
                <div className="oqmebi-container">
                    <span>ოქმები</span>
                    <div className="oqmebi-info">
                        <span>ხულოს მუნიციპალიტეტის რიყეთის თემში მდებარე მიწის ნაკვეთზე (ს.კ №23.14.36.294) საცხოვრებელი სახლის `(დასასვენებელი კოტეჯი) მშენებლობის არქიტექტურული პროექტის შეთანხმების შესახებ
                        </span>
                        <a href='../images/collection-pdf.png' download>
                         <img src={require('../images/collection-pdf.png')} alt="" />
                        </a>
                    </div>
                    <div className="oqmebi-info">
                        <span>ხულოს მუნიციპალიტეტის რიყეთის თემში მდებარე მიწის ნაკვეთზე (ს.კ №23.14.36.294) საცხოვრებელი სახლის `(დასასვენებელი კოტეჯი) მშენებლობის არქიტექტურული პროექტის შეთანხმების შესახებ
                        </span>
                        <a href='../images/collection-pdf.png' download>
                            <img src={require('../images/collection-pdf.png')} alt="" />
                        </a>
                    </div>
                </div>
            
            </div>
          </div>
          <div className="presscenter-info">
              <span >სოციალური პროგრამები</span>
              <span>მონაწილეობითი ბიუჯეტი</span>
              <span>მერის მრჩეველთა საბჭო</span>
              <span className='active'>გენდერული თანასწორობის საბჭო</span>
              <span >საჯარიმო ქვითრები</span>
             
            </div>
        </div>


          
      </div>


    </motion.div>
  )
}

export default GenderuliTanasworobisSabcho