import React from 'react'
import { Navbar } from './Navbar'
import {Sidebar} from './Sidebar'


export const Layout = ({children}) => {

    return (<>   
       <Sidebar>
       <Navbar> 
       <div id='content'>      
       {children}
       </div>
       </Navbar>
       </Sidebar>
    </>
    )
}
