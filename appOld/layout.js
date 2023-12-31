import './globals.css'
import { Inter } from 'next/font/google'
import ScrollContainer from "@/app/ScrollContainer";
import Modal from "@/app/Modal"
import Header from "@/app/Header";
//import "globalsim.css";

import ScrollBar from "@/app/ScrollBar";
//import plugincss from '@/plugincss.module.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {/*<Modal>*/}
      {/*<Header></Header>*/}
            {children}
      {/*</Modal>*/}
      </body>
    </html>
  )
}
