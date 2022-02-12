import React from 'react'
import { Navbar } from './Navbar'
import {Sidebar} from './Sidebar'


export const Layout = ({children}) => {

    return (<>   
       <Sidebar>
       <Navbar> 
       <div id='content' className='bg-gray-3'>      
       {children}
       </div>
       </Navbar>
       </Sidebar>
    </>
    )
}
