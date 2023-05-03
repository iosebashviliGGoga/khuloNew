import React from 'react'
import {useState, useEffect } from 'react'

import { Link  , useLocation , useMatch} from 'react-router-dom'
import axios from 'axios'



import { FaSearch } from 'react-icons/fa'
import {FaFacebookF} from 'react-icons/fa'
import {FaYoutube} from 'react-icons/fa'
import  {FaInstagram} from 'react-icons/fa'
import { FaAngleDown } from 'react-icons/fa'


import logo from '../images/logo.png'
function Header() {


 










  
     //header
     
     const homeMatch = useMatch("/");

  const [small, setSmall] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      setSmall(window.scrollY < 600);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", scrollHandler, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", scrollHandler, { passive: true });
    };
  }, []);
 
 
     //header end
 
  return (
    <>
    <nav className={[
        "padding-280px",
        homeMatch && small ? "transparent" : "colorful"
      ].join(" ")} 
   >
      <div className="topNav">
          <div className="topNav-items">
              <div className="topNav-socials">
                <a href='https://www.facebook.com/' target='blank'>
                    <FaFacebookF/>
                </a>
                 <a href='https://www.instagram.com/' target='blank'>
                   <FaInstagram/>
                 </a>
                  <a href='https://www.youtube.com/' target='blank'>
                    <FaYoutube/>
                  </a>
              </div>
          </div>
          <div className="topNav-items">
            <Link to='/'>
               <img src={logo} alt="logo" />
            </Link>
            </div>
          <div className="topNav-items">
              <div className='topNav-last'>
               <div className='hover'>
                 <input type="text" placeholder='ძიება' />
                 <FaSearch/>
               </div>

              </div>

          </div>
      </div>
      <div className="bottomNav">
        <div className="hotline">
         <span>ცხელი ხაზი   551 00 52 72</span>
        </div>
        <div className='dropdown'>
          <div className="hoverButtons">
              <button className="dropbtn">ხულო  <FaAngleDown/></button>
              <div className="dropdown-content">
             <Link to='/istoria'>ხულოს ისტორია</Link>
             <Link to='/'>ხულოს სიმბოლიკა</Link>
             <Link to='/'>გეოგრაფია და ბუნება</Link>
             <Link to='/'>კურორტები და ღირშესანიშნავი ადგილები</Link>
             <Link to='/'>ხულოს საპატიო მოქალაქეები</Link>
             <Link to='/'>ხელოვნება და კულტურა</Link>
              </div>
        </div>
        </div>
        <div className='dropdown'>
          <div className="hoverButtons">
              <button className="dropbtn">მერია <FaAngleDown/></button>
              <div className="dropdown-content">
              <Link to='/'>ბრძანებები</Link>
              <Link to='/'>სხდომის ოქმები</Link>
              <Link to='/'>კონკურსები</Link>
              <Link to='/'>მერიის ანგარიში</Link>
              <Link to='/'>მერი</Link>
              <Link to='/'>მერის პირველი მოადგილე</Link>
              <Link to='/samsakhurebi'>სამსახურები</Link>
              <Link to='/warmomadgenlebi'>მერის წარმომადგენლები</Link>
              </div>
        </div>
        </div>
        <div className='dropdown'>
          <div className="hoverButtons">
              <button className="dropbtn">საკრებულო <FaAngleDown/></button>
              <div className="dropdown-content">
              <Link to='/'>ხულოს მუნიციპალიტეტის ბიუჯეტი</Link>
              <Link to='/'>დადგენილებები</Link>
              <Link to='/'>განკარგულებები</Link>
              <Link to='/'>ბრძანებები</Link>
              <Link to='/'>საკრებულოს სხდომის ოქმები</Link>
              <Link to='/'>ბიუროს სხდომის ოქმები</Link>
              <Link to='/'>კონკურსები</Link>
              <Link to='/'>საკრებულოს თავმჯდომარე</Link>
              <Link to='/'>საკრებულოს თავმჯდომარის პირველი მოადგილე</Link>
              <Link to='/'>საკრებულოს თავმჯდომარის მოადგილე</Link>
              <Link to='/'>საკრებულოს აპარატი</Link>
              <Link to='/biuro'>საკრებულოს ბიურო</Link>
              <Link to='/sakrebuloMembers'>საკრებულოს წევრები</Link>
              <Link to='/komisiebi'>საკრებულოს კომისიები</Link>
              <Link to='/samartlebriviaqtebi' className='aqtebi'>სამართლებრივი აქტები
                 <div className='aqtebi-a'>
                  <Link to='/'>განკარგულებები</Link>
                  <Link to='/'>ბრძანებები</Link>
                  <Link to='/'>სხდომის ოქმები</Link>
                  <Link to='/'>ბიუროს სხდომის ოქმები</Link>
                  <Link to='/'>დადგენილებები</Link>
                 </div>
              </Link>
              <Link to='/fraqciebi'>საკრებულოს ფრაქციები</Link>
              </div>
        </div>
        </div>
        <div className='dropdown'>
          <div className="hoverButtons">
              <button className="dropbtn">მოქალაქის პორტალი <FaAngleDown/></button>
              <div className="dropdown-content">
              <Link to='/'>სოციალური პროგრამები</Link>
              <Link to='/monawileobitibiujeti'>მონაწილეობითი ბიუჯეტი</Link>
              <Link to='/'>მერის მრჩეველთა საბჭო</Link>
              <Link to='/genderulisabcho'>გენდერული თანასწორობის საბჭო</Link>
              <Link to='/'>საჯარიმო ქვითარი</Link>
              
              </div>
        </div>
        </div>
        <div className='dropdown'>
          <div className="hoverButtons">
              <button className="dropbtn">პრესცენტრი <FaAngleDown/></button>
              <div className="dropdown-content">
              <Link to='/news'>სიახლეები</Link>
              <Link to='/'>განცხადებები</Link>
              <Link to='/'>ანონსები</Link>
              <Link to='/'>პრესრელიზები</Link>
              <Link to='/videogalerea'>ვიდეოგალერეა</Link>
              
              </div>
        </div>
        </div>

        <div className="bottomNav-contact">
          <span><Link to='/contact'>კონტაქტი</Link></span>
        </div>
      </div>
    </nav>
    <div className="header-wrapper" style={{display: `${(window.location.pathname === '/')? 'none': 'block'}`}}></div>
    </>
  )
}

export default Header