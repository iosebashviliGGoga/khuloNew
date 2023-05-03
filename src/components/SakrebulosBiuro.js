import React , {useState, useEffect , useRef, useLayoutEffect} from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import {FaEnvelope, FaPhoneAlt } from 'react-icons/fa'
import { Helmet } from 'react-helmet-async'
import { useContext } from 'react'
  import { SearchContext } from './Contexts/Context'
function SakrebulosBiuro() {
   // import { useContext } from 'react'
  //import { SearchContext } from './Contexts/Context'
  // .filter(news => news[1].geo.title.includes(search)).
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
                    {language == 1 ? qveItem[1].name_geo :qveItem[1].name_eng }
                    </Link>
                 </span>
        }
      })
     }
    })  : "LOADING"

    const [warmomadgenlebi, setWarmomadgenlebi] = useState([])
    useEffect(() => {
      const link = `https://khulo.gov.ge/api/representatives.php`;
      fetch(link)
     .then((response) => response.json())
     .then((data) => {
      
      
        
          setWarmomadgenlebi(data['საკრებულოს ბიურო'])
         // console.log(item[1])
        
        
      
      
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
      const warmomadgenlebiList = Object.entries(warmomadgenlebi).length ? Object.entries(warmomadgenlebi).filter(news => news[1].geo.title.includes(search)).map((item,i)=>{

        return  <div className="wevri">
            <div className="">
              <span>{item[1].geo.title? language == 1 ? item[1].geo.title :  item[1].eng.title : 'default header'}</span>
            </div>
            <div className="middle">
              <span>{language == 1 ? item[1].geo.position : item[1].eng.position}</span>
            </div>
             
                <div className="">
                    <span> <FaPhoneAlt/>{item[1].geo.mobile}</span>
                </div>
        </div>
        
        
       
     
    }) : " NOT FOUND"

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
          <span className='big' ref={ref} style={{marginRight:  width / 2    }}>{language == 1 ?  "საკრებულო" :  "KHULO CITY ASSEMBLY"} </span>
          <span>{language == 1 ? "საკრებულოს ბიურო" :  "ASSEMBLY BUREAU"}</span>
          <Helmet>
          <title>
          {language == 1 ? "საკრებულოს ბიურო" :  "ASSEMBLY BUREAU"}
          </title>
        </Helmet>
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

export default SakrebulosBiuro