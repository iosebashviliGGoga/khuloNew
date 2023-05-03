import React , {useRef , useState}from 'react'
import emailjs from '@emailjs/browser'

import {motion} from 'framer-motion'
import miwereMers from '../images/miweremers.png'


import { SearchContext } from './Contexts/Context'
import { useContext } from 'react'


import { Helmet } from 'react-helmet-async'
function MiwereMers() {
  const {language} = useContext(SearchContext)
  const goToTop = () =>{

    window.scrollTo({top: 0, behavior: 'smooth'})
}


 
  


const form = useRef();
  const sendEmail = (e) =>{
    e.preventDefault();
    
    emailjs.sendForm('service_e8f3gjt','template_i232rai' , form.current , '0fSYO3iBkEcEh3E8Y' ).then
    (result=> console.log(result),
    (error => console.log(error))
    )
    goToTop();
    e.target.reset();
}



const hiddenFileInput = useRef(null);
  
// Programatically click the hidden file input element
// when the Button component is clicked
const handleClick = event => {
  hiddenFileInput.current.click();
};  // Call a function (passed as a prop from the parent component)
// to handle the user-selected file 
const handleChange = event => {
  const fileUploaded = event.target.files[0];
  console.log(event)
};



  return (
   <motion.div
   intial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0}}>
      <Helmet><title>{language ==1? "მიწერე მერს" : "Write to the Mayor"}</title></Helmet>
   
      <div className='miwereMers padding-280px'>
       
       <span className='header'>{language == 1 ?  "მიწერე მერს"  : "MESSAGE MAYOR"}</span>
       <div>
        <div className='miwereMers-container'>

        <form ref={form} onSubmit={sendEmail}>
           <span>{language == 1 ?  "შეავსეთ ველები და მოგვწერეთ თქვენი კომენტარი" : "FILL THE FIELDS AND MESSAGE YOUR COMMENTARY"}</span>
          
           <input type="text"  placeholder={language == 1 ? 'სახელი, გვარი' : "NAME, SURNAME"} required  name='name'/>
           <input type="text"  placeholder={language == 1 ? 'პირადი ნომერი' : "PERSONAL NUMBER"} required name='PIN' />
           <input type="text"  placeholder={language == 1 ? 'ელ.ფოსტა' : "EMAIL"} name='Email'/>
           <input type="text"  placeholder={language == 1 ? 'ტელეფონი' : "MOBILE"} required name='mobile'/>
           <input type="text"  placeholder={language == 1 ? 'ფაქტობრივი მისამართი' : "ADRESS"} required name='adress'/>
           <div class="mb-6 pt-4">
        <label className="formbold-form-label formbold-form-label-2">
          {language == 1 ? "ფაილის ატვირთვა" : "UPLOAD A FILE"}
        </label>

        <div className="formbold-mb-5 formbold-file-input">
            <input type="file" name="file" id="file"  ref={hiddenFileInput}
             onChange={handleChange}/>
          
           
             
            <span className="formbold-browse">{language == 1 ? "არჩევა" : "CHOOSE"}  </span>
            
          
        </div>
        </div>
           <textarea id="" cols="20" rows="10" placeholder='შეტყობინება' required name="message"></textarea>
           <button className='miwereMers-submit' type='submit'>{language == 1 ? "გაგზავნა" : "SEND"}</button>
           
        </form>

        </div>
        
        <div className='miwereMers-container'>
         <img src={miwereMers} alt="" />
         <div className="miwereMers-info">
          <span className='header'>{language == 1 ? "ხულოს მუნიციპალიტეტის მერია"   : "KHULO CITY HALL"}</span>
          <span>+995 551 00 52 72</span>
          <span>{language == 1 ? "ტბელ აბუსერისძის ქუჩა,N1 . დაბა ხულო,აჭარა ,საქართველო"  :  "Tbel abuseridze street N1, Township Khulo, Adjara, Georgia"}</span>
         </div>
        </div>
       </div>
       
       
     </div>
   </motion.div>
  )
}

export default MiwereMers