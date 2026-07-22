import React from 'react'
import Footer from '@/components/frontend/footer'
import NavBar from '@/components/frontend/navbar'

export default function Frontend({children}: { children: React.ReactNode }) {
  return (
    <div>
          <NavBar/>
            {children}
            <Footer/>
    </div>

  )
}

