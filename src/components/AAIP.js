import React, { useState , useRef , useEffect , useLayoutEffect} from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import {motion} from 'framer-motion'

import {FaEnvelope, FaPhoneAlt , FaTimes} from 'react-icons/fa'
import { useContext } from 'react'
  import { SearchContext } from './Contexts/Context'
import { Helmet } from 'react-helmet-async'
  

function AAIP() {
  const ref = useRef(null)
  const [width, setWidth] = useState(10)
  // import { useContext } from 'react'
  //import { SearchContext } from './Contexts/Context'
  // .filter(news => news[1].geo.title.includes(search)).
  const {search} = useContext(SearchContext)
  const {language} = useContext(SearchContext)
        
        const [show, setShow] = useState(false)
      

        const [warmomadgenlebi, setWarmomadgenlebi] = useState([])
      useEffect(() => {
        const link = `https://khulo.gov.ge/api/representatives.php`;
        fetch(link)
       .then((response) => response.json())
       .then((data) => {
        console.log(data)
       
      
           
        data['ააიპ'] && setWarmomadgenlebi(data['ააიპ'])

            
            
         
          
        
        
       })



       //MODAL is gaketeba, daumtavrebeli 
        // const closeModal = document.querySelectorAll('.closeimg');
        // closeModal.forEach(e =>{
          
        //   e.addEventListener('click' , () => {
        //     console.log(e)
        //     console.log(e.offsetParent)
        //     e.offsetParent.close();
        //   })
        // //  e.attributes.offsetParent.close();
        // })
        // const openModal =  document.querySelectorAll('.openmodal');
        // const modal = document.querySelectorAll('.modal');
        // openModal.forEach(e => {
        //   e.addEventListener('click', () =>{
        //    // console.log(e.lastChild)
        //     e.lastChild.show();
            
        //   })
        // })
       
       
      }, []);
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
                        {language == 1 ? qveItem[1].name_geo : ""}
                      {language == 2 ? qveItem[1].name_eng : ""}
                        </Link>
                     </span>
            }
          })
         }
        })  : "LOADING"

        const dropIn ={
          
            hidden: {
            y: "-100vh",
            opacity: 0,
            },
            visible: {
            y: "0 ",
            opacity: 1,
            transition: {
              duration: 0.1,
              type: "spring",
              damping: 25,
              stiffness: 500,
              },
            },
            exit: {
            y: "100vh",
            opacity: 0,
        }
      }
        // <motion.div
        //   onClick={(e) => e.stopPropagation()}
        //   className='warmomadgenlebiModal'
        //   variants={dropIn}
        //   animate={{ opacity: [0 ,1], y: [30, 0] }}
        //   >
        //     <span>{item[1].geo.text}</span>

            
        //   </motion.div>
        
       
      const warmomadgenlebiList = Object.entries(warmomadgenlebi).length ? Object.entries(warmomadgenlebi).filter(news => news[1].geo.title.includes(search)).map((item,i)=>{
        
     
       
          
          return <div className="samsakhurebi" key={i} onClick={(e) => e.currentTarget.lastElementChild.classList.toggle('show')} id={i}>
          <header id={i}>{language == 1 ? item[1].geo.title : ""}{language == 2 ? item[1].eng.title : ""}</header>

          <span id={i}>
            {language == 1 ? item[1].geo.position : ""}
            {language == 2 ? item[1].eng.position : ""}
          </span>
          <div className="" key={i} id={i}>
                <a href={`mailto:${item[1].geo.email}`}><FaEnvelope/>{ item[1].geo.email}</a>
                <a href={`tel:${item[1].geo.mobile}`}><FaPhoneAlt/>{ item[1].geo.mobile}</a>

          </div>
          <div className="warmomadgenlebiModal " id={i} >
            <span>
              {language == 1 ? item[1].geo.unit : " "}  <FaTimes />
              {language == 2 ? item[1].eng.unit : " "}
            
            </span>
            {language == 1  ?    <span dangerouslySetInnerHTML={{__html: item[1].geo.text.replaceAll("../","https://khulo.gov.ge/")}}></span>   :    " "}
            {language == 2  ?    <span dangerouslySetInnerHTML={{__html: item[1].eng.text ?  item[1].eng.text.replaceAll("../","https://khulo.gov.ge/"):""}}></span>   :    " "}
          </div>
          
         </div>
        
       
      }) : " NOT FOUND"
      const menuName = Object.entries(menu).length ?  Object.entries(menu).find((item,index)=>{
        const windoww = window.location.pathname;
        const result = windoww.split('/').pop();
        const slugg = item[1].slug
        if(result === slugg){ 
            return (language == 1 ? item[1].name_geo : item[1].name_eng)
    
        } 
        
     }) : ""
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
          <span className='big ' id='meria' ref={ref} style={{marginRight:  width / 2    }}>{language == 1 ? "მერია" : ""}
                      {language == 2 ? "KHULO CITY HALL" : ""}</span>
          <span>{menuName  ?( (language == 1 ? menuName[1].name_geo   : menuName[1].name_eng)) : ""  }</span>
          <Helmet><title>{menuName  ?( (language == 1 ? menuName[1].name_geo   : menuName[1].name_eng)) : ""  }</title></Helmet>
        </header>
        <div>
          
          <div className='sakrebulo-landing'>
            <div className="landing-container">
            
              {warmomadgenlebiList}
            
            
             
            
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

export default AAIP