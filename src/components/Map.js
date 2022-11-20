import React from 'react'
import { IoBan } from 'react-icons/io5'
function Map(props) {
    let team_colors = [
        '#5433e4',
        '#bbf950'
    ];


  return (
      <div className='flex-1'>
        <div className='text-center text-white text-3xl'>
            {props.name}
        </div>
          <div style={
              {
                  height: "calc(100vh - 450px)",
              }
          } className=' bg-black rounded-xl overflow-hidden relative'>
            <img src={"./maps/"+props.name.toLowerCase()+".png"} className="w-full h-full object-cover" alt="" />
            
            <div className={
                  (props.team == 0 ? "text-omnys-green-light" : "text-omnys-blue-light") + " " +
                 ( props.banned ? "bg-opacity-70" :"bg-opacity-0")+
                ' bg-black transition-all duration-1000  absolute top-0 left-0 w-full h-full flex items-center justify-center'}>
                <IoBan className={ (props.banned ? "translate-y-0 opacity-100":"translate-y-96 opacity-0") + ' text-9xl transform transition-all duration-1000 delay-500 '} />
            </div>

            <div className={
                  (props.team == 0 ? "from-omnys-green-light":"from-omnys-blue-light") + " " +
                  (props.picked ? "opacity-70" : "opacity-0") +
                ' absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t to-transparent transition-all duration-1000'}></div>
              <div className={
                  (props.decider ? "opacity-70" : "opacity-0") +
                  ' from-white absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t to-transparent transition-all duration-1000'}></div>
            </div>

        
      </div>
  )
}

export default Map