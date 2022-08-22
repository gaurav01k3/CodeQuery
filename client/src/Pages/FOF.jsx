import React from 'react'
import { useNavigate } from 'react-router'
import '../styles/FOF/FOF.css'

const FOF = () => {

  const navigate = useNavigate();

  return (
    <div className="fof-wrapper">
      <div className="fof-gif"></div>
      <div className="fof-content-wrapper">
        <div className="fof-heading">
          Look like you're lost
        </div>
        <div className='fof-sub-head'>
          the page you are looking for not avaible!
        </div>
        <div
          onClick={() => navigate('/')}
          className="fof-go-to-home"> Go HOME</div>
      </div>
    </div>
  )
}

export default FOF