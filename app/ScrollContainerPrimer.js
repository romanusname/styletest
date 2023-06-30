"use client"
import React,{useEffect,useRef} from "react"
export default function ScrollContainer({children}){

    const contentRef = useRef()

    const scrollbarRef = useRef()
    const thumbRef = useRef()




    useEffect(()=>{
        let variable = 0; // Начальное значение переменной
        let endValue = 0; // Целевое значение переменной
        const duration = 80; // Продолжительность анимации в миллисекундах
        const interval = 1; // Интервал между итерациями в миллисекундах
        let intervalStarted = false
        let contentHeight = contentRef.current.getBoundingClientRect().height;
        let thumbHeight = thumbRef.current.getBoundingClientRect().height;
        let windowHeight = window.innerHeight;

        function plusEndValue(plusValue){
            if(endValue+plusValue >= 0 && endValue+plusValue <= contentHeight-windowHeight) {
                endValue += plusValue
            }
            if(endValue+plusValue <= 0){
                endValue = 0
            }

            if(endValue+plusValue >= contentHeight-windowHeight){
                endValue = contentHeight-windowHeight
            }

            if (!intervalStarted){
                timerId = setInterval(smoothVariable, interval)
              //  window.requestAnimationFrame(smoothVariable);
                intervalStarted = true
            }
        }

        function setEndValue(setValue){
            if(setValue >= 0 && setValue <= contentHeight-windowHeight) {
                endValue = setValue
            }
            if(setValue <= 0){
                endValue = 0
            }

            if(setValue >= contentHeight-windowHeight){
                endValue = contentHeight-windowHeight
            }

            if (!intervalStarted){
                timerId = setInterval(smoothVariable, interval)
                intervalStarted = true
            }
        }


        function smoothVariable() {
            if (variable > endValue) {
                const increment = (variable - endValue) / (duration / interval); // Шаг увеличения
                variable -= increment;
            }
            if (variable < endValue) {
                const increment = (endValue - variable) / (duration / interval); // Шаг увеличения
                variable += increment;
            }

            if (variable == endValue || variable > endValue-0.1 && variable < endValue+0.1) {
                variable = endValue
                clearInterval(timerId)
                intervalStarted = false
            }

            contentRef.current.style.transform = 'translateY(' + -variable + 'px)';
            let sdvig = variable / ((contentHeight-windowHeight)/(windowHeight-thumbHeight))
            thumbRef.current.style.transform = 'translateY(' + sdvig + 'px)';
        }

        let timerId = setInterval(smoothVariable, interval)

        window.addEventListener('wheel', function(event) {
            plusEndValue(event.deltaY)
        });

/*        window.addEventListener('touchmove', function(event) {
            // Обработка прокрутки
            var touch = event.touches[0] || event.changedTouches[0];
            console.log('Прокручено', touch.clientY, 'пикселей');
            endValue += touch.clientY/10
            if (!intervalStarted){
                timerId = setInterval(smoothVariable, interval)
                intervalStarted = true
            }
        });*/

///////////////////////////////
        let startScrollTouch = false;

        scrollbarRef.current.addEventListener('mousedown', function(event) {
            startScrollTouch = true
        });

        document.addEventListener('mousemove', function(event) {
            if (startScrollTouch){
                let scrollTouch = event.clientY * ((contentHeight-windowHeight)/(windowHeight-thumbHeight));
                setEndValue(scrollTouch)
            }
        });

        document.addEventListener('mouseup', function() {
            startScrollTouch = false
        });

    },[])


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