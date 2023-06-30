"use client"
import React,{useEffect,useRef,useState} from "react"
export default function ScrollContainer({children}){
    const duration = 80; // Продолжительность анимации в миллисекундах
    const interval = 1; // Интервал между итерациями в миллисекундах

    const contentRef = useRef()
    const scrollbarRef = useRef()
    const thumbRef = useRef()
    const pos = useRef(0)
    const target = useRef(0);
    const animationId = useRef(false);
    const startScrollTouch = useRef(false);


    const handleWheel = useRef((event)=>{
        console.log(target.current)
        if (target.current + event.deltaY > 0 && target.current + event.deltaY < getContentHeight()-getWindowHeight()) {
            target.current += event.deltaY;
        }
        if (target.current + event.deltaY <= 0) {
            target.current = 0;
        }
        if (target.current + event.deltaY >= getContentHeight() - getWindowHeight()) {
            target.current = getContentHeight() - getWindowHeight();
        }

        if (!animationId.current) {
            animationId.current = setInterval(animate, interval);
        }
    })

    const handleMousemove = useRef((event)=>{
        if (startScrollTouch.current){

            let scrollTouch = event.clientY * ((getContentHeight()-getWindowHeight())/(getWindowHeight()-thumbRef.current.getBoundingClientRect().height));

            if (target.current + scrollTouch > 0 && target.current + scrollTouch < getContentHeight()) {
                target.current = scrollTouch;
            }
            if (target.current + event.deltaY <= 0) {
                target.current = 0;
            }
            if (target.current + event.deltaY >= getContentHeight() - getWindowHeight()) {
                target.current = getContentHeight() - getWindowHeight();
            }

            if (!animationId.current) {
                animationId.current = setInterval(animate, interval);
            }

        }
    })

    const handleMousedown = useRef((event)=>{
        startScrollTouch.current = true
    })

    const handleMouseup = useRef((event)=>{
        startScrollTouch.current = false
    })


    function getContentHeight(){
        return contentRef.current.getBoundingClientRect().height
    }

    function getWindowHeight(){
        return window.innerHeight
    }


    useEffect(()=>{
        thumbRef.current.style.height = getWindowHeight() / (getContentHeight() / getWindowHeight()) + "px"
      //  console.log(getContentHeight()-getWindowHeight())

        window.addEventListener('wheel', handleWheel.current);

        scrollbarRef.current.addEventListener('mousedown', handleMousedown.current);
        document.addEventListener('mousemove', handleMousemove.current);
        document.addEventListener('mouseup', handleMouseup.current);

        return () => {
            window.removeEventListener('wheel', handleWheel.current);
            clearInterval(animationId.current);
            animationId.current = false;

            scrollbarRef.current.removeEventListener('mousedown', handleMousedown.current);
            window.removeEventListener('mousemove', handleMousemove.current);
            window.removeEventListener('mouseup', handleMouseup.current);
        };

    },[])


    function animate(){

        if(pos.current == target.current || pos.current > target.current-0.1 && pos.current < target.current+0.1) {
            console.log("STOP")
            pos.current = target.current;
            clearInterval(animationId.current)
            animationId.current = false
        }

        if(pos.current > target.current) {
            const increment = (pos.current - target.current) / (duration / interval);
            pos.current -= increment;
            contentRef.current.style.transform = 'translateY(' + -pos.current + 'px)';
            let sdvig = pos.current / ((getContentHeight()-getWindowHeight())/(getWindowHeight()-thumbRef.current.getBoundingClientRect().height))
            thumbRef.current.style.transform = 'translateY(' + sdvig + 'px)';
        }
        if(pos.current < target.current) {
            const increment = (target.current - pos.current) / (duration / interval);
            pos.current += increment;
            contentRef.current.style.transform = 'translateY(' + -pos.current + 'px)';
            let sdvig = pos.current / ((getContentHeight()-getWindowHeight())/(getWindowHeight()-thumbRef.current.getBoundingClientRect().height))
            thumbRef.current.style.transform = 'translateY(' + sdvig + 'px)';
        }

    }



    return(
        <>
            <div ref={scrollbarRef} pos={"absolute"} right={"0px"} w={10} h={"100vh"} bg={"gray"} zIndex={"999999"}>
                <div ref={thumbRef} pos={"absolute"} w={10} h={50} bg={"black"} br={"50px"} cursor={"default"}></div>
            </div>

            <div ref={contentRef}  position={"fixed"}>
            {children}
            </div>
        </>
    )
}