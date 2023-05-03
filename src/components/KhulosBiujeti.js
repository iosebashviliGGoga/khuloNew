import React , {useState, useEffect , useContext} from 'react'
import {motion} from 'framer-motion'
import { SearchContext } from './Contexts/Context'



import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import pdf from '../images/collection-pdf.png'
function KhulosBiujeti() {
  const {language} = useContext(SearchContext)
  const [news,setNews] = useState({})
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
   

 
  },[])
 
  return (
    <motion.div
    intial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0}}>
    <div className="sakrebulo-landing">
      <div className="landing-container">
      <div className="sajaroInfo margin-280px">
        <header>{language == 1 ? "ბიუჯეტი "  :  "BUDGET"}</header>
        <Helmet><title>{language == 1 ? "ბიუჯეტი "  :  "BUDGET"}</title></Helmet>

   



        {Object.entries(news).length ? Object.entries(news).map((item,index)=>{
    
   
      
    return[...Object.entries(item[1])].reverse().map((gank,index) =>{
     if(gank[1].geo.legal_acts_menu.includes('ხულოს მუნიციპალიტეტის ბიუჯეტი'))
      return <div className="">
     <a href={`https://khulo.gov.ge${gank[1].geo.pdf}`} target='blank'>
      <span key={index}>{language == 1 ? gank[1].geo.pdf_title : gank[1].eng.pdf_title}</span>
   
        <img src={pdf} alt="" />
        
    </a>
  </div>
    })
  
}) : "ვერ მოიძებნა"}
       
       
    </div>
      </div>
    </div>
   
    
    
    
    </motion.div>
  )
}

export default KhulosBiujeti