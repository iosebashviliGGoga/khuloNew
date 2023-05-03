import React, {useState, useEffect} from 'react'
import './Slider.css'
import { Link } from 'react-router-dom'


import { data } from 'jquery'



export default function Slider() {

    const [slideIndex, setSlideIndex] = useState(1)

    const [moreNews, setMoreNews] = useState([])
    const [slideNumber, setSlideNumber ] = useState(1)
  useEffect(() => {
   
  // console.log('news', news)
  // console.log('news 0', news[0])


 
  },[ slideIndex, slideNumber])
  
  const topNews = moreNews.length ?  moreNews.map((item,i)=>{
    if(i == slideNumber-1 ){
        return    <div className="container-text margin-280px">
        <span>{item.title_geo}</span>
      <a href={item.url}>
         <button> ვრცლად</button>
         </a>
    </div>
    }


  })  : "LOADING"

    // const nextSlide = () => {
    //     if(slideIndex !== dataSlider.length){
    //         setSlideIndex(slideIndex + 1)
    //     } 
    //     else if (slideIndex === dataSlider.length){
    //         setSlideIndex(1)
    //     }
    // }

    // const prevSlide = () => {
    //     if(slideIndex !== 1){
    //         setSlideIndex(slideIndex - 1)
    //     }
    //     else if (slideIndex === 1){
    //         setSlideIndex(dataSlider.length)
    //     }
    // }
    const [karuseli, setKaruseli] = useState([])
    useEffect(() => {
        const link = 'https://khulo.gov.ge/api/banner_carusel.php';
       fetch(link)
      .then((response) => response.json())
      .then((data) => {
    
        console.log(data)
       // setExactNews(data[id])
        setKaruseli(data)
        setMoreNews(data)
       // console.log(data.სიახლეები)
       // console.log(Object.entries(data.სიახლეები))
    
       
       // console.log(data)
       // console.log('news', news)
        
       // console.log('object keys menu', Object.keys(menu))
       // console.log('object entries news', Object.entries(data))
       
     
       });
      // console.log('news', news)
      // console.log('news 0', news[0])
    
    
      },[])
    //   useEffect(()=>{
       
        
    //     karuseli.length && window.setTimeout(function (){
    //         if(slideIndex < karuseli.length){
              
              
    //             setSlideIndex((prev) => prev +1)
    //             setSlideNumber((prev) => prev + 1)
    //             if(slideIndex >= karuseli.length){
    //                 console.log('slideIndex',slideIndex)
    //             console.log('slideNumber',slideNumber)
    //         setSlideIndex(1)
    //         setSlideNumber(1)
    //             }
    //         } 
            
    //        else {
    //         console.log('slideIndex',slideIndex)
    //             console.log('slideNumber',slideNumber)
    //         setSlideIndex(1)
    //         setSlideNumber(1)
    //     }
            
    //     },5000)
        
    //   },[karuseli.length, slideIndex])
     
    
    const sliderr = karuseli.length ?  karuseli.map((item,index)=>{

        return <div
        key={item.id}
        className={slideIndex === index + 1? "slide active-anim" : "slide"}
        id={index}
        >
            <img src={`https://khulo.gov.ge/${item.img}`} alt="photos" />
            <div className="image-gradient"></div>



          

        </div>

    }) : " LOADING"

    
   

    const moveDot = index => {
        console.log('movedot',slideIndex,slideNumber)
        
        setSlideIndex(index )
        setSlideNumber(index)
        
       
    }

    return (
        
        <div className="container-slider">
          {sliderr}
            
            <div className="container-dots">
                 {karuseli.length &&  karuseli.map((item, index) => (

                     <div id={index}
                    onClick={() => [moveDot(index +1), window.clearTimeout()]}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
           {topNews.length ? topNews : "LOADING"}
            
            
        </div>
    )
}