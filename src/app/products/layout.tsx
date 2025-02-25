import React from 'react'
import Header from "@/components/Header"
export default function layout({children}) {
  return (
      <div>
          <Header />
          <div className="mt-5">
            {children}
          </div>
    </div>
  )
}
