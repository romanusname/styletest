"use client";
import Image from 'next/image'
//import {ScrollContext} from "@/app/template";
//import {ModalContext} from "@/app/Modal";
import React,{useEffect,useRef,useContext} from "react";
import styles from "@/app/page.module.css";
export default function Home() {
//const {scrolling,scrollingY} = useContext(ScrollContext)
const ref = useRef();
//const {setShow} = useContext(ModalContext)
/*

    const fromshowR1Sbq5Lh  = useRef([]);

    useEffect(()=>{
        if (fromshowR1Sbq5Lh.current.length == 0) {
            fromshowR1Sbq5Lh.current = document.querySelectorAll(".from-show-R1Sbq5Lh") //что если в другом компоненте? мб добавлять в хеш имя компонента
           // return; // для кажного scroll to создастся по экзепляру с массивом
        }

        for (const element of fromshowR1Sbq5Lh.current) {

            function getElementTop(){
                return element.getBoundingClientRect().top
            }

            function getElementHeight(){
                return element.getBoundingClientRect().height
            }

            if (getElementTop()+200 < window.innerHeight && getElementTop()-200 > -getElementHeight()) { //граница объекта
                element.classList.remove('from-show-R1Sbq5Lh');
            }

            if (getElementTop() > window.innerHeight) {  //пересичение вверх
                element.classList.add('from-show-R1Sbq5Lh');
            }

          //  if (getElementTop() < -getElementHeight()) {  //пересичение вниз
          //      element.classList.add('from-show-R1Sbq5Lh');
          //  }

        }
    },[scrollingY])
*/

/*
    const animation7m4082PA = useRef([]);

    useEffect(()=>{
        if (animation7m4082PA.current.length == 0) {
            animation7m4082PA.current = document.querySelectorAll(".animation-7m4082PA") //что если в другом компоненте? мб добавлять в хеш имя компонента
            return; // для кажного scroll to создастся по экзепляру с массивом
        }

        for (const element of animation7m4082PA.current) {

            function getElementTop(){
                return element.getBoundingClientRect().top
            }

            if (getElementTop() < window.innerHeight && getElementTop() > 0) {
                element.style.animationDelay = "-" + (window.innerHeight - getElementTop()) / window.innerHeight + "s";
            }

        }
    },[scrollingY])*/
    //<div size={100} bg={"blue"} hover={{rotateZ:50,x:50}} hover={{bg:"green",delay:"1s"}} area={"middle"}></div>
//mobile={{w:"100%"}}
    return (
        <div size={"200px"} bg={"red"} tablet={"blue"} active={{bg:"green"}}>
            123
        </div>
    )

}


/*return (
    <main>
        <section>
            <flex area={"middle"} jc={"sa"}>
                <group mw={"450px"} mobile={{textAlign:"center"}}>
                    <h1 before={{bg:"red",size:"50px",right:"0px"}}>Кофейня в плюсе</h1>
                    <p>Зарабатывайте больше на кофейном бизнесе вместе с CafeStore</p>
                </group>
                <group>2</group>
            </flex>
        </section>

        <section>

        </section>
    </main>
)*/

/*
return (
    <main>
        <section bg={"red"}>
            <div size={100} dur={"1s"} bg={"blue"} hover={{bg:"green"}} area={"middle"}></div>
        </section>
        <section ref={ref}>
            <flex area={"middle"}>
                <grid scrollTo={{opacity:0,bg:"red"}} size={100}>

                </grid>
                <grid scrollTo={{bg:"red"}} size={100} onClick={()=>setShow(true)} marginTop={"300px"}>

                </grid>
            </flex>
        </section>
        <section bg={"blue"} transitionDuration={"2s"} begin={{bg:"red",opacity:0,startY:100}}></section>
        <section bg={"green"} transitionDuration={"1s"} begin={{bg:"red",opacity:0}}></section>
        <section bg={"red"}></section>
    </main>
)*/
