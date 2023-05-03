import React , {useState, useEffect , useRef , useLayoutEffect} from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'

import { useContext } from 'react'
  import { SearchContext } from './Contexts/Context'
import {Helmet} from 'react-helmet-async'
function Fraqciebi() {
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

    const fullList = (string) =>{

      const tavmjdomare = 
      <ol>

        { members.length ?  members.filter(news => news.geo.title.includes(search)).map((item)=>{
          if(item.geo.fraction){
            if(item.geo.fraction.includes(string)){
         
         
              if(item.geo.fraction_position && item.geo.fraction_position.includes('თავმჯდომარე') || item.geo.fraction_position.includes('თავჯდომარე')){
              
                return <li>{language == 1 ? item.geo.title : item.eng.title}  -   {language == 1 ? item.geo.fraction_position : item.eng.fraction_position}</li>
              }
            }
          }
      
      })  :  ""}
      { members.length ?  members.filter(news => news.geo.title.includes(search)).map((item)=>{
        if(item.geo.fraction){
          if(item.geo.fraction.includes(string)){
         
            if(item.geo.fraction_position && item.geo.fraction_position.includes('თავმჯდომარის მოადგილე') || item.geo.fraction_position.includes('თავჯდომარის მოადგილე') ){
           
              return <li>{language == 1 ? item.geo.title : item.eng.title}  -   {language == 1 ? item.geo.fraction_position : item.eng.fraction_position}</li>
            }
          }
        }
       
      })  :  ""}

      </ol>
      
     
      const wevrebi = 
      <ul>   { members.length ?  members.filter(news => news.geo.title.includes(search)).map((item)=>{
        
        if(item.geo.fraction){
         // console.log(item)
          if(item.geo.fraction.includes(string) ){
         
            if(item.geo.fraction_position && (!item.geo.fraction_position.includes('თავმჯდომარე')  && !item.geo.fraction_position.includes('თავმჯდომარის მოადგილე') &&  !item.geo.fraction_position.includes('თავჯდომარის მოადგილე') &&  !item.geo.fraction_position.includes('თავჯდომარე') )){
             
              return <li>{language == 1 ? item.geo.title : item.eng.title}  -   {language == 1 ? item.geo.fraction_position : " MEMBER OF FRACTION"}</li>
              
            }
            if(!item.geo.fraction_position){
              return <li>{language == 1 ? item.geo.title : item.eng.title} -  {language == 1 ? "ფრაქციის წევრი" : "MEMBER OF FRACTION"}</li>
            }
          }
        }
       
      })  :  ""}   </ul>
      
      
     
      return [tavmjdomare , wevrebi]

    }

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
          <span className='big' ref={ref} style={{marginRight: width / 2}}>{language == 1 ? "საკრებულო"  :  "KHULO CITY ASSEMBLY"} </span>
          <span>{language == 1 ?  "საკრებულოს ფრაქციები" :  "ASSEMBLY FRACTIONS"}</span>
          <Helmet>
          <title>
          {language == 1 ?  "საკრებულოს ფრაქციები" :  "ASSEMBLY FRACTIONS"}
          </title>
        </Helmet>
        </header>
        <div>
          
          <div className='sakrebulo-landing'>
            <div className="landing-container">
            <div className="fraqciebi">
                <div>
                    <span style={{color: '#0070E1'}}>
                      {language == 1 ? ' ფრაქცია "ქართული ოცნება - დემოკრატიული საქართველოსთვის"' : 'FRACTION "GEORGIAN DREAM - FOR DEMOCRATIC GEORGIA"' }
                    </span>
                    <div className="list">
                    {fullList('ქართული ოცნება')}
                    </div>
                </div>
                <div>
                    <span style={{color: '#F1394C'}}>{language == 1 ? 'ფრაქცია "ერთიანი ნაციონალური მოძრაობა"' : 'FRACTION "UNITED NATIONAL MOVEMENT"'} </span>
                    <div className="list">
                    {fullList('ერთიანი ნაციონალური მოძრაობა')}
                    </div>
                </div>
                
                 <div>
                 
                    <span style={{color: '#AC00DF'}}>{language == 1 ? 'ფრაქცია "ხულო - საქართველოსთვის"' : 'FRACTION "KHULO - FOR GEORGIA"'} </span>
                    <div className="list">
                    {fullList('ხულო საქართველოსთვის')}
                    
                    </div>
                    
                </div>    
            </div>
              
              
              
            
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

export default Fraqciebi