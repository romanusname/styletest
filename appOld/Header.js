import Link from 'next/link'
export default function Header(){
    return(
        <flex pos={"absolute"} w={"100vw"} h={70} bg={"green"} zIndex={"999999"}>
            <Link href="/">Home</Link>
            <Link href="/test">test</Link>
        </flex>
    )
}