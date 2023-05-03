import React ,{useState, useEffect , useContext , useRef, useLayoutEffect}from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {motion }from 'framer-motion'
import { SearchContext } from './Contexts/Context'
import {Helmet} from 'react-helmet-async'
import {FaEnvelope, FaPhoneAlt , FaFacebookF , FaTwitter,FaYoutube, FaAngleLeft, FaInstagram} from 'react-icons/fa'
import {IoBasketballOutline} from 'react-icons/io5'
function MeriaSamsakhurebi() {
  const navigate = useNavigate();
  const ref = useRef(null)
  const [width, setWidth] = useState(10)

  const [samsakhurebi, setSamsakhurebi] = useState([])
  const [position, setPosition] = useState([])
  
  
  // import { useContext } from 'react'
  //import { SearchContext } from './Contexts/Context'
  // .filter(news => news[1].geo.title.includes(search)).
  const {search} = useContext(SearchContext)
  const {language} = useContext(SearchContext)



  useEffect(() => {
    const link = `https://khulo.gov.ge/api/job.php`;
   fetch(link)
  .then((response) => response.json())
  .then((data) => {

    
    setSamsakhurebi(data)
   // console.log(data)
   // console.log('news', news)
    
   // console.log('object keys menu', Object.keys(menu))
   
  
 
   });


   fetch('https://khulo.gov.ge/api/job.php?cat=all')
   .then((response) => response.json())
   .then((data) => {
 
     
     setPosition(data)
    // console.log(data)
   
  
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
  const samsakhurebiList = samsakhurebi.length && samsakhurebi.filter(news => news.geo.title.includes(search)).map((item)=>{
    const words = (item.geo.text).split(' ')
    const gmail  = item.geo.text.includes('ელ. ფოსტა') ? words[4].split('<').shift() : "  "

    const otherWords = item.geo.text  ? (item.geo.text).split('ტელეფონი:') : ""
    const mobile = item.geo.text.includes('ტელეფონი') ? otherWords[1] ?  (otherWords[1]).split('</strong').shift() : "" : ""

    const samsakhuri = position.map((pos)=>{
      
      if(pos.cat_id == item.geo.cid){
       // console.log(pos)
        return language ? pos.name.geo : pos.name.eng
      }
    })



   
    return  <Link to={`/meriis-samsakhurebi/${item.geo.rec_id}`} className='margin-bm-30' >
      
      <div className="meria" >
      <div>
      <img src={('https://khulo.gov.ge/'+item.geo.img)} alt="" />
    </div>
      <div>
                                    <span>
                                      {language == 1 ? item.geo.title : ""}
                                      {language == 2 ? item.eng.title : ""}
                                    </span>
                                    <span>{samsakhuri}</span>
               <div className="" style={{marginTop: "30px"}} id='nomargin'>
                  
                    
                      
                      <a href={`tel: ${mobile}`}><FaPhoneAlt/>{mobile}</a>
                      <a href="http://https://khulo.gov.ge/" target="_blank" rel="noopener noreferrer"><IoBasketballOutline/> KHULO.GOV.GE</a>
                      <a href={`mailto: ${gmail}`}><FaEnvelope/>{gmail}</a>
                   
                    <div className="socials">
                    <a href='https://www.facebook.com/KhuloCityHall' target='blank'>
                        <FaFacebookF/>
                    </a>
                    <a href='https://www.instagram.com/khulocityhall/' target='blank' className='bordered'>
                      <FaInstagram/>
                    </a>
                    <a href='https://www.youtube.com/channel/UCCP3nGfRLDohB8GWsDmM8mA' target='blank'>
                        <FaYoutube/>
                    </a>

                    </div>
              </div>  
              <span className='meria-More'>{language == 1  ? "მეტის ნახვა" : "SEE MORE"}</span>
                                  </div>
                             
    </div> </Link>
  })
  useLayoutEffect(() => { 
    setWidth(ref.current.offsetWidth); 
    
   })

   const menuName = Object.entries(menu).length ?  Object.entries(menu).find((item,index)=>{
    const windoww = window.location.pathname;
    const result = windoww.split('/').pop();
    const slugg = item[1].slug
    if(result === slugg){ 
        return (language == 1 ? item[1].name_geo : item[1].name_eng)

    } 
    
 }) : ""
// console.log(menuName ? "YES" :  "NO")
 
 
  return (
    <motion.div
    intial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0}}>

<div className="news-container margin-280px">
        <header>
          <span className='big ' id='meria' ref={ref} style={{marginRight:  width / 2    }}> {language == 1 ? "მერია" : ""}
                      {language == 2 ? "KHULO CITY HALL" : ""}</span>

          <span>{menuName  ?( (language == 1 ? menuName[1].name_geo   : menuName[1].name_eng)) : ""  }</span>
          <Helmet><title>{menuName  ? ((language == 1 ? menuName[1].name_geo   : menuName[1].name_eng)) : ""  }</title></Helmet>
        </header>
        <div>
          
          <div className='sakrebulo-landing'>
            <div className="landing-container">
             {samsakhurebiList ? samsakhurebiList : "ვერ მოიძებნა"}
             
            
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

export default MeriaSamsakhurebi