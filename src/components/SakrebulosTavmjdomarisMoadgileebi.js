import React, { useState , useEffect , useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'


import { useContext } from 'react'
  import { SearchContext } from './Contexts/Context'
import {Helmet} from 'react-helmet-async'
function SakrebulosTavmjdomarisMoadgileebi() {
  const ref = useRef(null)
  const [width, setWidth] = useState(10)
   // import { useContext } from 'react'
  //import { SearchContext } from './Contexts/Context'
  // .filter(news => news[1].geo.title.includes(search)).
  const {search} = useContext(SearchContext)
  const {language} = useContext(SearchContext)
  const [members, setMembers] = useState({})
  
  useEffect(() => {
    const link = `https://khulo.gov.ge/api/members.php?`;
   fetch(link)
  .then((response) => response.json())
  .then((data) => {

   // console.log(data)
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
      
    if(item[1].level == 1 && item[1].name_geo==('საკრებულო')){
  
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
    const menuName = Object.entries(menu).length ?  Object.entries(menu).find((item,index)=>{
      const windoww = window.location.pathname;
      const result = windoww.split('/').pop();
      const slugg = item[1].slug
      if(result === slugg){ 
          return (language == 1 ? item[1].name_geo : item[1].name_eng)
  
      } 
      
   }) : ""

   

    const membersList = Object.entries(members).sort((a, b) => b[1].geo.date.localeCompare(a[1].geo.date)).filter(news => news[1].geo.title.includes(search)).map((news) => 
        
             {
              if(news[1].geo.m_title.includes('საკრებულოს თავმჯდომარის მოადგილეები')){
                console.log(news[1])
                return  <div className="landing-items-container-infos" id={news[0]} key={news[0]}>
                <Link to={`/sakrebulos-tavmjdomaris-pirveli-moadgile/${news[0]}`}>
                  <div className="new-image-wrapp">
                  <img src={'https://khulo.gov.ge/'+(news[1].geo.img)} alt="" />
                  </div>
                  <div>
                    <span className='time'>{language == 1 ? news[1].geo.title : news[1].eng.title}</span>
                    <span className='header'>{language == 1 ? news[1].geo.position : news[1].eng.position}</span>
                    
                  </div>
                </Link>
               </div>
              }
              

              })
              useLayoutEffect(() => { 
                setWidth(ref.current.offsetWidth); 
               
              })


  return (
    <motion.div
    intial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0}}>
      
      <div className="news-container margin-280px">
        <header>
          <span className='big' ref={ref} style={{marginRight:  width / 2    }}> {language == 1 ?  "საკრებულო"  :  "KHULO CITY ASSEMBLY"}</span>
          <span>{menuName  ?( (language == 1 ? menuName[1].name_geo   : menuName[1].name_eng)) : ""  }</span>
          <Helmet>
            <title>{menuName  ?( (language == 1 ? menuName[1].name_geo   : menuName[1].name_eng)) : ""  }</title>
          </Helmet>
        </header>
        <div>
          
          <div className='sakrebulo-landing'>
            <div className="landing-container">
              
            {membersList}
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

export default SakrebulosTavmjdomarisMoadgileebi