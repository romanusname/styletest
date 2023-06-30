"use client"
import React,{useEffect,useRef} from "react"
export default function ScrollContainer({children}){

    const ref = useRef()
    const parentRef = useRef()


    useEffect(()=>{
        const containerHeight = ref.current.clientHeight
        parentRef.current.style.height = containerHeight+"px"
        console.log('Высота контейнера:', containerHeight)
    },[children])


    useEffect(()=>{
        let variable = 0; // Начальное значение переменной
        let endValue = 0; // Целевое значение переменной
        const duration = 100; // Продолжительность анимации в миллисекундах
        const interval = 1; // Интервал между итерациями в миллисекундах
        let intervalStarted = false

        function increaseVariable() {
            if (variable > endValue) {
                const increment = (variable - endValue) / (duration / interval); // Шаг увеличения
                variable -= increment; // Увеличение переменной на шаг
              //  console.log(increment); // Вывод текущего значения переменной
            }
            if (variable < endValue) {
                const increment = (endValue - variable) / (duration / interval); // Шаг увеличения
                variable += increment; // Увеличение переменной на шаг
              //  console.log(increment); // Вывод текущего значения переменной
            }

            if (variable == endValue || variable > endValue-1 && variable < endValue+1) {
                clearInterval(timerId) // Остановка интервала
                intervalStarted = false
            }

          //  console.log(variable); // Вывод текущего значения переменной
          //  console.log(endValue); // Вывод текущего значения переменной
            ref.current.style.transform = 'translateY(' + -variable + 'px)';
        }

        let timerId = setInterval(increaseVariable, interval)

        document.onscroll = function test() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            endValue = scrollTop
            if (!intervalStarted){
                timerId = setInterval(increaseVariable, interval)
                intervalStarted = true
            }
        }

    },[])

    
    return(
        <div ref={parentRef}>
            <div ref={ref}  position={"fixed"}>
            {children}
            </div>
        </div>
    )
}