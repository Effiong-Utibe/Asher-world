import Footer from '@/components/frontend/footer'
import NavBar from '@/components/frontend/navbar'
import React from 'react'

export default function Frontend({children}: { children: React.ReactNode }) {
  return (
    <div>
          <NavBar/>
            {children}
            <Footer/>
    </div>

  )
}

