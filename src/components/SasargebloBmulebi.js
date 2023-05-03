import React, { useState , useEffect , useContext} from 'react'
import {motion} from 'framer-motion'
import greenLogo from '../images/Component 88 – 1.png'

import { SearchContext } from './Contexts/Context'



import { Helmet } from 'react-helmet-async'

function SasargebloBmulebi() {
    
    const {language} = useContext(SearchContext)
    const [sajaro, setSajaro] = useState({})
    useEffect(() => {
      const link = 'https://khulo.gov.ge/api/useful_links.php?';
     fetch(link)
    .then((response) => response.json())
    .then((data) => {
  
    //  console.log(data)
     // setExactNews(data[id])
      setSajaro(data)
  
      
     // console.log(data)
     // console.log('news', news)
      
     // console.log('object keys menu', Object.keys(menu))
     // console.log('object entries news', Object.entries(data))
     
   
     });
    // console.log('news', news)
    // console.log('news 0', news[0])
  
  
    
    },[])

    const bmulebii = Object.entries(sajaro).length ?  Object.entries(sajaro).map((item, i )=>{

     // console.log(item)
      return <div className='bmulebi' key={i}>
      <span>{language == 1 ? item[1].geo.title : item[1].eng.title}</span> 
    <a href={`https://khulo.gov.ge/${item[1].geo.url}`} target='blank'>
       <img src={greenLogo} alt="" />
    </a>
   
   </div>   

    }) : " LOADING"
    

    
    
  return (
    <motion.div
    intial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0}}>

      <Helmet><title>{language == 1 ?  " სასარგებლო ბმულები "   : "USEFUL LINKS"}</title></Helmet>
     
      <div className="sasargebloBmulebi margin-280px">
          <span>{language == 1 ?  " სასარგებლო ბმულები "   : "USEFUL LINKS"}</span>
          {bmulebii}
      
      </div>
    </motion.div>
  )
}

export default SasargebloBmulebi