import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import './Dropdown.css'

const DropdownIconNav = props => {
    const [open, setOpen] = useState(false)
    const ref = useRef()

    const handleClick = e => {
        if (!ref.current || ref.current.contains(e.target)) {
          return;
        }
        setOpen(open)
      }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        
        return () => {
          document.removeEventListener("mousedown", handleClick);
        }
      }, [])

    return (
        <div className='nav-item' ref={ref}>
          {props.linkTo && 
            <Link to={`${props.linkTo}`} className='icon-button' onClick={() => setOpen(!open)}>
                {props.icon}
            </Link>                
          }
          {!props.linkTo &&
            <div className='icon-button' onClick={() => setOpen(!open)}>
              {props.icon}
            </div>             
          }
          {open && props.children}
        </div>
    )
}

export default DropdownIconNav