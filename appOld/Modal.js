"use client"
import React, {useEffect, useState,useRef,createContext} from "react"
export const ModalContext = createContext(false)
export default function Modal({children}){
    const [show,setShow] = useState(true)
    const [render,setRender] = useState(true)
    const ref = useRef()

    useEffect(()=>{
        if(!show){
            ref.current.style.background = "red" // сбрасывать from стиль
            setTimeout(()=>setRender(false),2000)
        }
        if(show){
            setRender(true)
        }
    },[show])

    useEffect(()=>{
        if(render){
            ref.current.style.background = "green"
        }
    },[render])


        // clickCloseModal={"name1"}
    //modal={{name:"name1",bg,opacity}}
    //пробрасывать context
    return(
        <>
  {render && <div pos={"absolute"} w={"100vw"} h={"100vh"} zIndex={"99999999999999"}>
                <backdrop ref={ref} bg={"gray"} opacity={"0.5"} onClick={() => setShow(false)} transitionDuration={"2s"}></backdrop>
                <grid size={300} bg={"blue"} pos={"center"}>

                </grid>
            </div>}
            <ModalContext.Provider value={{show,setShow}}>
                {children}
            </ModalContext.Provider>
        </>
    )

}