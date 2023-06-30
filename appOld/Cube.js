"use client";
import {useEffect,useRef} from "react";
export default function Cube(props) {
    const ref = useRef()
/*    useEffect(()=>{
        ref.current.style.background = "green"
    },[])*/
  //  console.log(props)
    let temp1 = {bg:"green"}
    return (
        <>
            <div boxShadow={" 0 0 5px #03e9f4,0 0 25px #03e9f4,0 0 50px #03e9f4,0 0 100px #03e9f4"} bg={"red"} size={200}>
                <div bg={"blue"} ></div>
                <div bg={"blue"} size={100}></div>
            </div>
        </>
    )
}