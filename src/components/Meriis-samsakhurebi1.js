import React from 'react'
import {useState , useEffect, useRef , useLayoutEffect  } from 'react'
import {useParams , useNavigate , Link } from 'react-router-dom'
import { motion } from 'framer-motion';

import { Helmet } from 'react-helmet-async';
import { useContext } from 'react'
  import { SearchContext } from './Contexts/Context'

import {FacebookShareButton,TwitterShareButton} from 'react-share'
import {FaEnvelope, FaPhoneAlt , FaFacebookF , FaTwitter,FaYoutube, FaAngleLeft, FaInstagram, FaInstagramSquare} from 'react-icons/fa'
import { IoBasketballOutline } from 'react-icons/io5';

function MeriisSamsakhurebi1() {
  const ref =  useRef(null)
  const [width, setWidth] = useState(10)
  const {language} = useContext(SearchContext)
  const navigate = useNavigate();
    const { id } = useParams();
  //  console.log(id)
    const [member, setMember] = useState({})
   // console.log(member)
  const [loading,setLoading] = useState(true)

    useEffect(() => {
      const link = `https://khulo.gov.ge/api/job.php?`;
     fetch(link)
    .then((response) => response.json())
    .then((data) => {
  
      
      data.map((item) =>{
        console.log(item)
        if (item.geo.rec_id == id){
          
          setMember(item)
        }
      })
      
     console.log(data)
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
        
      if(item[1].level == 1 && item[1].name_geo.includes('მერია')){
    
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
    const memberie = Object.entries(member).length && Object.entries(member).map((item , i) => {
      const words = (member.geo.text).split(' ')
      const gmail  = member.geo.text.includes('ელ. ფოსტა') ? words[4].split('<').shift() : "         "
      
      const otherWords = member.geo.text  ? (member.geo.text).split('ტელეფონი:') : ""
      const mobile = member.geo.text.includes('ტელეფონი') ? otherWords[1] ? (otherWords[1]).split('</strong').shift()  : "" : "     "
      console.log(mobile , gmail)
      if(i == 0 )
      return  <div className="news-container margin-280px ">
      <header>
        <span className='big ' id='meria' ref={ref} style={{marginRight:  width / 2    }}> {language == 1 ? "მერია" : "KHULO CITY HALL"}</span>
        <span className='norm members1 samsakhurebi-norm' style={{marginRight:  width / 2  + 20  }}>{language == 1? "სამსახურები" : "HEADS OF CITY HALL DEPARTMENTS"}</span>
        <span>{ language == 1 ? member.geo.title : member.eng.title}</span>
        <Helmet>
          <title>
          { language == 1 ? member.geo.title : member.eng.title}
          </title>
        </Helmet>
      </header>
      <div>
        
        <div className={`sakrebulo-landing sakrebulo1 ${member.geo.text.includes('ტელეფონი') && 'samsakhurebi1'}`}>
          <div className="landing-container">
          <div className='image-wrapper'>
            <img src={'https://khulo.gov.ge/'+ member.geo.img} alt="" />
            <div className="sakrebulo-landing-near-image">
              <h3>{ language == 1 ? member.geo.title : member.eng.title}</h3>
              <span>{ member.geo.position}</span>
              <div className="">
              <div className="socials">
              <a href='https://www.facebook.com/KhuloCityHall' target='blank'>
                  <FaFacebookF/>
              </a>
               <a href='https://www.instagram.com/khulocityhall/' target='blank'>
                 <FaInstagram/>
               </a>
              <a href='https://www.youtube.com/channel/UCCP3nGfRLDohB8GWsDmM8mA' target='blank'>
                  <FaYoutube/>
              </a>

              </div>
             
               
               <a href={`tel:${mobile}`} className='flexed'><FaPhoneAlt/>{ mobile}</a>
               <a href="http://https://khulo.gov.ge/" target="_blank" rel="noopener noreferrer" className='flexed'><IoBasketballOutline/> KHULO.GOV.GE</a>
               <a href={`mailto:${gmail}`} className='flexed'><FaEnvelope/>{ gmail}</a>
             
                
              </div>
              <div className="languages">
                <h3>ენები: { member.geo.language}  </h3> <span></span>
              </div>
              
            </div>
          </div>
          <div className="sakrebulo-landing-paragraphs">
          <span dangerouslySetInnerHTML={{__html: member.geo.text}}></span>
          
          </div>
          
          </div>
          <div className='share'>
            <span className='back' onClick={() => navigate(-1)}>
            <div>
              <FaAngleLeft/>
            </div > უკან დაბრუნება</span>
            <span>გააზიარე:  
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
    })




    useLayoutEffect(() => { 
      if(Object.entries(member).length){setWidth(ref.current.offsetWidth);  }
     
   
      
     }, [language , loading,Object.entries(member).length])

     
     const menuName = Object.entries(menu).length ?  Object.entries(menu).find((item,index)=>{
      const windoww = window.location.pathname;
      const result = windoww.split('/').pop();
      const slugg = item[1].slug
      if(result === slugg){ 
          return (language == 1 ? item[1].name_geo : item[1].name_eng)
  
      } 
      
   }) : ""



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

export default MeriisSamsakhurebi1