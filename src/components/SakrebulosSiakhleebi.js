import React, {useState , useEffect , useRef , useLayoutEffect}from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactPaginate from 'react-paginate'


import {FaArrowLeft , FaArrowRight} from 'react-icons/fa'

import { SearchContext } from './Contexts/Context'
import { useContext } from 'react'
import {Helmet} from 'react-helmet-async'
function SakrebulosSiakhleebi() {
  
 // const [newss, setNewss] = useState(ArrayOfObject)
  
 // console.log(languageLink)
  //console.log(language)
  const [news,setNews] = useState({})

  const {search} = useContext(SearchContext)
  const {language} = useContext(SearchContext)
  useEffect(() => {
    const link = `https://khulo.gov.ge/api/news.php?lang=geo`;
   fetch(link)
  .then((response) => response.json())
  .then((data) => {

   // console.log(data)
   data['საკრებულოს სიახლეები'] && setNews(data['საკრებულოს სიახლეები'])
   // console.log(data.სიახლეები)
   // console.log(data)
   // console.log('news', news)
    
   // console.log('object keys menu', Object.keys(menu))
  //  console.log('object entries news', Object.entries(data.სიახლეები))
 //  console.log(Object.entries(data).length)
 
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
          return <span key={index} className={result === slugg ? "active" :""}>
                    <Link to={`/${qveItem[1].slug}`}>
                      {language == 1 ? qveItem[1].name_geo : ""}
                      {language == 2 ? qveItem[1].name_eng : ""}
                    </Link>
                 </span>
        }
      })
     }
    })  : "LOADING"


              //pagination 
              const [pageNumber, setPageNumber] = useState(0);
              const usersPerPage = 6;
              const pagesVisited = pageNumber * usersPerPage;
              const pageCount = Math.ceil(Object.entries(news).length / usersPerPage);
              const pageChange = ({selected}) => {
              setPageNumber(selected)
              }

  


  const newsList = Object.entries(news).length ? Object.entries(news).reverse().filter(news => news[1].geo.title.includes(search)).slice(pagesVisited, pagesVisited + usersPerPage).map((News, i) => 
              
  {
              
    return  <div className="landing-items-container-infos" id={News.id} key={News.id}>
      <Link to={`/sakrebulos-siakhleebi/${News[1].geo.rec_id}`}>
      <div className='new-image-wrapper'>
        <img src={'https://khulo.gov.ge/'+(News[1].geo.thumb_img ? News[1].geo.thumb_img : News[1].geo.img)  } alt="" />
        </div>
        <div>
          <span className='time'>{language == 1 ? News[1].geo.date : ""} {language == 2 ? News[1].eng.date : ""}</span>
          <span className='header'>{language == 1 ? News[1].geo.title : ""}{language == 2 ? News[1].eng.title : ""}</span>
          <span className='vrclad'>{language ==1 ? " ვრცლად"  :   ""}
              {language ==2 ? " See more"  :   ""}</span>
        </div>
      </Link>
    </div>

    }) : "ვერ მოიძებნა"

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
          <span className='big' ref={ref} style={{marginRight:  width / 2    }}> {language ==1 ? " საკრებულო"  :   ""}
              {language ==2 ? " KHULO CITY ASSEMBLY"  :   ""}</span>

          <span>{language ==1 ? " საკრებულოს სიახლეები"  :   ""}
              {language ==2 ? " ASSEMBLY NEWS"  :   ""}</span>
          <Helmet>
            <title>{language ==1 ? " საკრებულოს სიახლეები"  :   ""}
              {language ==2 ? " ASSEMBLY NEWS"  :   ""}</title>
          </Helmet>
        </header>
        <div>
          
          <div className="landing-container sakrebulos-siakhleebi">
            
          {newsList}
          
          </div>
          <div className="presscenter-info">
            {presscenterList}
            </div>
        </div>


        <div className="pagination">
        <div className="left-space"></div>
      <ReactPaginate 
       previousLabel = {<FaArrowLeft/>}
       nextLabel = {<FaArrowRight/>}
      pageCount = {pageCount}
      onPageChange = {pageChange}
      containerClassName = {"paginationButtons"}
      previousLinkClassName = {"previusButton"}
      nextLinkClassName = { "nextButton"}
      disabledClassName = {"disabledButton"}
      activeClassName = {"activeButton"}
      onClick = {window.scrollTo({top: 0, behavior: 'smooth'})}
      />
      </div>    
      </div>



      </motion.div>
  )
}

export default SakrebulosSiakhleebi