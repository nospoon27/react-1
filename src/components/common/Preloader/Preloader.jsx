import React from 'react'
import preloader from '../../../assets/images/spinner.svg'

const Preloader = () => {
   return (
      <div>
         <img src={preloader} alt='preloader' />
      </div>
   )
}

export default Preloader;