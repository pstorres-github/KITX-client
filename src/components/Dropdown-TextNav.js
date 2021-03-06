import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const DropdownTextNav = props => {
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
            <div className='nav-item-text' onClick={() => setOpen(!open)}>
                EXPLORE
            </div>
            {open && props.children}
        </div>
    )
}

export default DropdownTextNav