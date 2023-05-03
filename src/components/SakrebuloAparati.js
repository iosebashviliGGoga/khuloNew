import React from 'react'
import {useState , useEffect , useRef, useLayoutEffect } from 'react'
import {useParams , useNavigate , Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import {TwitterShareButton, FacebookShareButton} from 'react-share'

import { Helmet } from 'react-helmet-async';
import { SearchContext } from './Contexts/Context'
import { useContext } from 'react'

import {FaEnvelope, FaPhoneAlt , FaFacebookF , FaTwitter, FaAngleLeft, FaInstagram} from 'react-icons/fa'
        
function  SakrebulosAparati() {

  const navigate = useNavigate();
  const {language} = useContext(SearchContext)
  //  console.log(id)
    const [member, setMember] = useState({})
   // console.log(member)
  const [loading,setLoading] = useState(true)

    useEffect(() => {
      const link = `https://khulo.gov.ge/api/members.php?`;
     fetch(link)
    .then((response) => response.json())
    .then((data) => {
  
      console.log('data', data)
      Object.entries(data).map((item)=>{
        if(item[1].geo.m_title == ("საკრებულოს აპარატის უფროსი")){
            setMember(item)
            console.log(item)
         //   return console.log(item[1].geo.position)
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
    },[])
    const [menu,setMenu] = useState({})
    useEffect(() => {
        const link = 'https://khulo.gov.ge/api/site_menu1.php';
       fetch(link)
      .then((response) => response.json())
      .then((data) => {
    
       // console.log('data.menu',data.menu)
        setMenu(data.menu)
       
      //  console.log('menu', menu)
        
       
      //  console.log('object entries', Object.entries(menu))
    
        Object.entries(menu).map(item =>{
         
          if(item[1].level == 1)
         { 
          //console.log('entries item', item[1].name_eng , item[1].level)
        }
        })
     
       });
    
    
      
      },[])
      const presscenterList = Object.entries(menu).length ?  Object.entries(menu).map((item,index)=>{
        
      if(item[1].level == 1 && item[1].name_geo.includes('საკრებულოს აპარატი')){
    
        return Object.entries(menu).map((qveItem,index)=>{
          if(qveItem[1].parent_id == item[1].cat_id){
            const windoww = window.location.pathname;
            const result = windoww.split('/').pop();
            const slugg = qveItem[1].slug
            return <span key={index} className={result === slugg? "active" :""}>
                      <Link to={`/${qveItem[1].slug}`}>

                      {language == 1 ? qveItem[1].name_geo : qveItem[1].name_eng}
                      
                      </Link>
                   </span>
          }
        })
       }
      })  : "LOADING"


    //console.log('object entries member' ,Object.entries(member))
      const ref = useRef(null)
      const [width, setWidth] = useState(10)
    useLayoutEffect(() => { 
      Object.entries(member).length && setWidth(ref.current.offsetWidth); 
     
    })
    const memberie = Object.entries(member).length ? Object.entries(member).map((item , i) => {
      if(i == 0 )
      return  <div className="news-container margin-280px">
      <header>
        <span className='big' ref={ref} style={{marginRight:  width / 2    }}> {language == 1 ?  "საკრებულოს აპარატი"   :   " "}{language == 2 ?  "KHULO CITY ASSEMBLY"   :   " "}</span>
       
        <span>{ language == 1 ? member[1].geo.position : member[1].eng.position}</span>
        <Helmet>
          <title>
          {language == 1 ?  member[1].geo.title :  member[1].eng.title}
          </title>
        </Helmet>
      </header>
      <div>
        
        <div className='sakrebulo-landing sakrebulo1'>
          <div className="landing-container">
          <div className='image-wrapper'>
            <img src={'https://khulo.gov.ge/'+ member[1].geo.img} alt="" />
            <div className="sakrebulo-landing-near-image">
              <h3>{ language == 1 ? member[1].geo.title : member[1].eng.title}</h3>
              <span>{language == 1 ?  member[1].geo.position : member[1].eng.position}</span>
              <div className="">
              <div className="socials">
              <a href='' target='blank'>
                  <FaFacebookF/>
              </a>
               <a href='' target='blank'>
                 <FaInstagram/>
               </a>
              <a href='' target='blank'>
                  <FaTwitter/>
              </a>

              </div>
            <div>
                 <a href={`mailto:${member[1].geo.email}`}><FaEnvelope/>{ member[1].geo.email}</a>
                  <a href={`tel:${member[1].geo.mobile}`}><FaPhoneAlt/>{ member[1].geo.mobile}</a>
            </div>
                
              </div>
              <div className="languages">
                <h3>ენები: { member[1].geo.language}  </h3> <span></span>
              </div>
             
            </div>
          </div>
          <div className="sakrebulo-landing-paragraphs">
          <span dangerouslySetInnerHTML={{__html: language == 1 ? member[1].geo.text : member[1].eng.text}}></span>
          
          </div>
          
          </div>
          <div className='share'>
            <span className='back' onClick={() => navigate(-1)}>
            <div>
              <FaAngleLeft/>
            </div >{language == 1 ? "უკან დაბრუნება"   :   "BACK"} </span>
            <span>{  language == 1 ? "   გააზიარე:" : ""}
                          { language == 2 ? "SHARE:" : ""}  
                       <FacebookShareButton url={window.location.href}> 
                         <FaFacebookF/>
                       </FacebookShareButton>
                      <TwitterShareButton url={window.location.href}>
                        <FaTwitter/>
                      </TwitterShareButton>
                         
                      </span>
          </div>
        </div>
        <div className="presscenter-info">
            {presscenterList}
        </div>
      </div>


        
    </div>
    }) : "ვერ მოიძებნა"








    if(loading)return <h1>LOADING</h1>
  return (
    <motion.div
    intial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0}}>

      
      {memberie}
      
     
      
      
      
      
      
      
      
      
      </motion.div>
  )
}

export default SakrebulosAparati