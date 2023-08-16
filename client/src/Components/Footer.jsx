import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return <>
  <footer className='footer p-5'>
    <div className="container-xxl">
      <div className="row justify-content-center justify-content-md-between ">
        <div className="col-md-4 col-lg-4 mb-4 mb-md-0 ">
          <h2 className='footer-title mb-3'><b>Contact</b></h2>
          <p>You can follow us on here!</p>
          <p>Make sure to be on top of new features and recipes.</p>
          <div className="socials d-flex gap-3">
          <Link to='#' id='footer-link' target='_blank' className='gap-3'>
          <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link to='#' id='footer-link' target='_blank' className='gap-3'>
          <FontAwesomeIcon icon={faInstagram} /> 
          </Link>
          <Link className='gap-3' id='footer-link'>
          <FontAwesomeIcon icon={faFacebook} />
          </Link>
          {/* <Link to='https://app.slack.com/client/T0195LMKD1R/D04QEBN1J80/rimeto_profile/U04PQHERFM1?cdn_fallback=2' id='footer-link' target='_blank' className='gap-3'>
          <BsSlack />
          </Link> */}
          </div>
        </div>
        <div className="col-md-2 col-lg-2 mb-3 mb-md-0">
          <h2 className='footer-title mb-3'><b>About</b></h2>
        <p>Let Your recipe and creativity speak with signing and sharing your experience and delicious goodies on this website. Shall we begin?</p>
        </div>
        <div className="col-md-4 col-lg-4">
          <h2 className='footer-title mb-3'><b>Leave comment</b></h2>
          <p className='mb-3'>some comment</p>
        
      
        </div>
      </div>
    </div>
  </footer>
  </>;
}

export default Footer