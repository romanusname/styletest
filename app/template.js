"use client"
import React, {useEffect, useRef, useState, createContext} from "react";
export const ScrollContext = createContext(false);
export default function Template({children}){

    const interval = 5; // Интервал между итерациями в миллисекундах
    const duration = 300;
    const durationMobile = 50;

    const contentRef = useRef()
    const scrollbarRef = useRef()
    const thumbRef = useRef()
    const pos = useRef(0)
    const target = useRef(0);
    const animationId = useRef(false);
    const startScrollTouch = useRef(false);
    const oldTouch = useRef(0)
    const [scrollingState,setScrollingState] = useState(false)
    const [scrollingY,setScrollingY] = useState(0)

   // const [windowSize,setWindowSize]=useState({width:0,height:0})


    const handleWheel = useRef((event)=>{
       // console.log(target.current)
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
            animationId.current = setInterval(()=>animate(duration), interval);
            setScrollingState(true)
        }
    })

    const handleMousemove = useRef((event)=>{
        if (startScrollTouch.current){
            let scrollTouch = event.clientY * ((getContentHeight()-getWindowHeight())/(getWindowHeight()- thumbRef.current.getBoundingClientRect().height ));
          //  scrollTouch -= thumbRef.current.getBoundingClientRect().height
            scrollTouch -= window.innerHeight / 2
            if (scrollTouch > 0 && scrollTouch < getContentHeight()) {
                target.current = scrollTouch;
            }
            if (scrollTouch <= 0) {
                target.current = 0;
            }
            if (scrollTouch >= getContentHeight() - getWindowHeight()) {
                target.current = getContentHeight() - getWindowHeight();
            }

            if (!animationId.current) {
                animationId.current = setInterval(()=>animate(duration), interval);
                setScrollingState(true)
            }
        }
    })

    const handleMousedown = useRef((event)=>{
        event.preventDefault();
        startScrollTouch.current = true
        if (startScrollTouch.current){
            let scrollTouch = event.clientY * ((getContentHeight()-getWindowHeight())/(getWindowHeight()- thumbRef.current.getBoundingClientRect().height ));
            //  scrollTouch -= thumbRef.current.getBoundingClientRect().height
            scrollTouch -= window.innerHeight / 2
            if (scrollTouch > 0 && scrollTouch < getContentHeight()) {
                target.current = scrollTouch;
            }
            if (scrollTouch <= 0) {
                target.current = 0;
            }
            if (scrollTouch >= getContentHeight() - getWindowHeight()) {
                target.current = getContentHeight() - getWindowHeight();
            }

            if (!animationId.current) {
                animationId.current = setInterval(()=>animate(durationMobile), interval);
                setScrollingState(true)
            }
        }
    })

    const handleMouseup = useRef((event)=>{
        startScrollTouch.current = false
    })

    const handleTouchmove = useRef((event)=>{
        let touch = event.touches[0] || event.changedTouches[0];
        let thisTouch = touch.clientY
        let shift = thisTouch - oldTouch.current

        if (target.current + -shift > 0 && target.current + -shift < getContentHeight()-getWindowHeight()) {
            target.current += -shift;
        }
        if (target.current + -shift <= 0) {
            target.current = 0;
        }
        if (target.current + -shift >= getContentHeight() - getWindowHeight()) {
            target.current = getContentHeight() - getWindowHeight();
        }

        if (!animationId.current) {
            animationId.current = setInterval(()=>animate(durationMobile), interval);
            setScrollingState(true)
        }

        oldTouch.current = thisTouch
    })

    const handleTouchstart = useRef((event)=>{
        let touch = event.touches[0] || event.changedTouches[0];
        let thisTouch = touch.clientY
        oldTouch.current = thisTouch
    })

    const handleTouchend = useRef(()=>{
        oldTouch.current=0
    })

    const handleResize = useRef(()=>{
        thumbRef.current.style.height = getWindowHeight() / (getContentHeight() / getWindowHeight()) + "px"
    })


    function getContentHeight(){
        return contentRef.current.getBoundingClientRect().height
    }

    function getWindowHeight(){
        return window.innerHeight
    }


    useEffect(()=>{
        thumbRef.current.style.height = getWindowHeight() / (getContentHeight() / getWindowHeight()) + "px"

        window.addEventListener("resize", handleResize.current);

        window.addEventListener('wheel', handleWheel.current);

        scrollbarRef.current.addEventListener('mousedown', handleMousedown.current);
        document.addEventListener('mousemove', handleMousemove.current);
        document.addEventListener('mouseup', handleMouseup.current);


        window.addEventListener('touchmove', handleTouchmove.current);
        window.addEventListener("touchstart", handleTouchstart.current);
        window.addEventListener("touchend", handleTouchend.current);


        return () => {
            window.removeEventListener('wheel', handleWheel.current);
            clearInterval(animationId.current);
            animationId.current = false;

          //  scrollbarRef.current.removeEventListener('mousedown', handleMousedown.current);
            window.removeEventListener('mousemove', handleMousemove.current);
            window.removeEventListener('mouseup', handleMouseup.current);

            window.removeEventListener('touchmove', handleTouchmove.current);
            window.removeEventListener("touchstart", handleTouchstart.current);
            window.removeEventListener("touchend", handleTouchend.current);

            window.removeEventListener("resize", handleResize.current);

        };

    },[])


    function animate(duration){

        if (!contentRef.current) return;

        if(pos.current == target.current || pos.current > target.current-0.1 && pos.current < target.current+0.1) {
           // console.log("STOP")
            pos.current = target.current;
            clearInterval(animationId.current)
            animationId.current = false
            setScrollingState(false)
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
        setScrollingY(pos.current)
    }


    return(
        <>
            <div ref={scrollbarRef} pos={"absolute"} right={"0px"} w={"10px"} h={"100vh"} bg={"gray"} zIndex={"999999"} cursor={"ns-resize"}>
                <div ref={thumbRef} pos={"absolute"} w={"10px"} h={"50px"} bg={"black"} br={"50px"} cursor={"grab"}></div>
            </div>

            <div ref={contentRef} overflow={"hidden"}  position={"fixed"}>
                <ScrollContext.Provider value={{scrollingState,scrollingY}}>
                {children}
                </ScrollContext.Provider>
            </div>
        </>
    )
}