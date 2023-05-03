import React, { useState , useEffect , useLayoutEffect , useRef} from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import Komisia from '../images/komisiebi.png'

import { useContext } from 'react'
  import { SearchContext } from './Contexts/Context'
import { Helmet } from 'react-helmet-async'
import { FaPhoneAlt } from 'react-icons/fa'

function Komisiebi() {
  // import { useContext } from 'react'
  //import { SearchContext } from './Contexts/Context'
  // .filter(news => news[1].geo.pdf_title.includes(search))
  const {search} = useContext(SearchContext)
  const {language} = useContext(SearchContext)
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
    const [members, setMembers] = useState([])
    useEffect(() => {
      const link = `https://khulo.gov.ge/api/members.php?`;
     fetch(link)
    .then((response) => response.json())
    .then((data) => {
  
     
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

    // const [komisia, setKomisia] = useState(KomisiebiArray)

    
    // const komisiaList = komisia.map((item) => {
    //     return <div className="landing-container-komisia" id={item.id}>
    //     <Link to={`/sakrebulos-komisiebi/${item.id}`}>
    //     <img src={Komisia} alt="" />
    //     <span className='name'>{item.name}</span>
    //     <span>{item.position}</span>
        
    //     <div className="half">
    //         <span>nargizdekanadze1965@gmail.com</span>
    //         <span><FaPhoneAlt/> +995 598 00 37 69</span>
    //     </div>
    //     </Link>
    //   </div>
     


   // })

    

   const ref = useRef(null)
   const [width, setWidth] = useState(10)
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
          <span className='big' ref={ref} style={{marginRight:  width / 2    }}> {language == 1 ? "საკრებულო" :  "KHULO CITY ASSEMBLY"}</span>
          <span>{language == 1 ?  "საკრებულოს კომისიები"  :   "ASSEMBLY COMISSIONS"}</span>
          <Helmet>
          <title>
          {language == 1 ?  "საკრებულოს კომისიები"  :   "ASSEMBLY COMISSIONS"}
          </title>
        </Helmet>
        </header>
        <div>
          
          <div className='sakrebulo-landing'>
            <div className="landing-container">

             
              {members.length ?  members.filter(news => news.geo.title.includes(search)).map((item,index)=>{
                if(item.geo.chairman != 0){
                  if(item.geo.comision){
                    return <div className="landing-container-komisia">
                    <Link to={`${item.geo.chairman}`}>
                      <img src={Komisia} alt="photoo" />
                      <span className='name'>{language == 1 ? item.geo.title : item.eng.title} - {language == 1 ? "კომისიის თავმჯდომარე" : "COMISSION CHAIRMAN" }</span>
                      <span>{language == 1 ? item.geo.chairman : item.eng.chairman}</span>
            
                      <div className="half1">
                          <span>{item.geo.email}</span>
                          <span><FaPhoneAlt/> {item.geo.mobile}</span>
                      </div>
                    </Link>
                  </div>
                  }
                 
                }
              })  :   "loading"}
              
             
            
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

export default Komisiebi