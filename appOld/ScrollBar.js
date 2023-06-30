import React from "react";

export default function ScrollBar(){
    return(
        <div pos={"absolute"} right={"0px"} w={10} h={"100vh"} bg={"gray"} zIndex={"999999"}>
            <div pos={"absolute"} w={10} h={50} bg={"black"} cursor={"default"}></div>
        </div>
    )
}