import '../styles/Header.css';
import netflix_logo from '../images/netflix-logo-png-clip-art-removebg-preview.png';
import profile from '../images/profile.png';
import { useEffect, useState } from 'react';
import { auth } from '../utils/firebaseconfig';
import { signOut } from 'firebase/auth';
import { removeUser } from '../utils/userInfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { supportedLanguages } from '../utils/langaugeConstants.js';
import { useRef } from 'react';
import { toggleRecommendComponent } from "../utils/recommendMoviesSlice.js";
import { setLanguage } from '../utils/languageSlice.js';
import { LANGUAGES } from "../utils/langaugeConstants";


const Header = () => {

    const languageCode = useSelector((store) => store.languageInfo.languageCode);

    const showRecommendationsPage = useSelector((store) => store?.recommendMovies?.showComponent);

    const languageRef = useRef();

    const [isScrolled, setIsScrolled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchClick = (e) => {
      e.preventDefault();
      dispatch(toggleRecommendComponent())
    }

  useEffect(() => {
    const handleScroll = () => {
      // Check if the page has been scrolled beyond a certain threshold
      const scrollTop = window.scrollY;
      const threshold = 30; // Adjust this value as needed
      setIsScrolled(scrollTop > threshold);
    };

    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    },[]);

    const handleClick = (e) => {
        e.preventDefault();

        signOut(auth).then(() => {
            dispatch(removeUser())
            navigate("/")
        }).catch((error) => {

        });
    }

    const handleLanguageChange = (e) => {
      e.preventDefault();
      dispatch(setLanguage(languageRef.current.value))
    }

    return (
        <div  className={`Header ${isScrolled ? "scrolled" : ""}`} style={{position : `${showRecommendationsPage ? 'static' : 'fixed'}`}}>
            <img src= {netflix_logo} alt='logo'/>
            <div className='signOut'>
                {showRecommendationsPage && 
                /* Mutli language support for the show recommendations page */
                
                  <select className='languageOptions' ref={languageRef} onChange={handleLanguageChange}>
                    {
                      supportedLanguages.map((supportedLanguage) => 
                      <option value={supportedLanguage.identifier} key={supportedLanguage.identifier}>
                        {supportedLanguage.language}
                      </option>)
                    }
                  </select>
                }
                <span className='searchBtn' onClick={handleSearchClick}>{showRecommendationsPage ? `${LANGUAGES[languageCode].homePage}` : "Gpt Search"}</span>
                <img src= {profile} alt='profile'/>
                <button onClick={handleClick}>{LANGUAGES[languageCode].signOut}</button>
            </div>
        </div>
    )
}

export default Header;