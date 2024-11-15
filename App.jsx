import "./index.css";
import image from "./assets/image.png";
import React from 'react';
import Canvas from './Canvas'; 
import data from "./data"; 
import LocomotiveScroll from 'locomotive-scroll';
import {useEffect, useState,useRef} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function App() {

  const[showCanvas , setShowCanvas] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);
  
  useEffect(()=>{
    const  locomotiveScroll =new LocomotiveScroll();
  },[])

  useEffect(() => {
    const handleClick=(e)=>{
      setShowCanvas((prevShowCanvas)=>{
        if(!prevShowCanvas){
          gsap.set(growingSpan.current,{
            top:e.clientY,
            left:e.clientX,
          });
          gsap.set("body",{
            color:"#000",
            backgroundColor:"#fd2c2a",
            duration:1.2,
            ease:"power2.inOut"
    
          })
          gsap.to(growingSpan.current,{
            duration: 2,
            scale: 1000,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current,{
                scale:0,
                clearProps:"all",
              });
           
            }
          });
        }
        else{
          gsap.to("body",{
            color:"#fff",
            backgroundColor:"#000",
            duration:1.2,
            ease:"power2.inOut"
          })
        }
        return !prevShowCanvas;
      });
    };
      const headingElement = headingref.current;
      headingElement.addEventListener("click",handleClick);
      return()=>headingElement.removeEventListener("click",handleClick);
  
},[showCanvas]);
     

  return (
    <>
    <span ref={growingSpan} className=" block growing fixed top-[-20px] left-[-20px] w-5 h-5 rounded-full"></span>
    <div className="w-full relative min-h-screen   flex flex-wrap gap-4 p-4">
      {showCanvas &&
      data[0].map((canvasdets, index) => <Canvas key={index} details={canvasdets} /> )}
      <div className='w-full h-screen font-sans relative  z-[1]  '>
        <nav className='"fixed top-0 w-full p-5 flex jusify-between bg-transparent gap-9 m-0  z-50'>
          <div className='brand text-2xl font-bold'> thirtysixstudios</div>
          <div className='links flex gap-10 justify-end ml-auto'>
            {["Home ","About","Projects","Contact"].map((link,index)=>(
              <a
              key={index}
              href={`#${link.toLowerCase()}`}
              className='text-regular hover:text-gray-300'
              >
                {link}
              </a>
            ))}
          </div> 
          
        </nav>
        <div className='container w-full px-[20%]'>
        <div className='text  w-[53%]  '>
          <h3 className='text-4xl leading-[1.5]'>At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.</h3>
          <p className='text-sm w-[100%] mt-10 font-normal'>We’re a boutique production studio focused on design, motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.</p>
          <p className='mt-10 text-sm'>scroll</p>
        </div>
        </div>
        <div className='w-full absolute bottom-0 left-0 pl-2 '>
          <h1 ref={headingref} className='text-[16rem] font-normal tracking-tighter leading-none' >Thirtysixstudio</h1>
        </div>
      </div>
    </div>

    <div className='w-full h-screen relative mt-32 px-10'>
    {showCanvas &&
      data[1].map((canvasdets, index) => <Canvas key={index} details={canvasdets} /> )}
      <h1 className='text-6xl'>about the brand </h1>
      <p className='text-lg w-[60%]  leading-[1.8]  font-normal mt-10 '>At Thirtysixstudio,we recognize that our industry can perpetuate harm. We believe we have to try  and reverse some of these imbalances. That’s why we’re launching SS36, our local social sustainability hub. Through SS36,were invest some of our revenue and expertise into the communities that shape the culture and trend sour field so heavily relies on. Our main focus is on bridging gaps for those affected by system icobstacles related to race, sexuality , wealth and gender identity.</p>
      <img className='w-[60%] h-[100%] ml-36 object-cover mb-20 mt-10' src={image}></img>
    </div>
    {/*<div className="w-full relative min-h-screen  text-white flex flex-wrap gap-4 p-4">
      {data[1].map((canvasdets, index) => (
        <Canvas key={index} details={canvasdets} />
      ))}
    </div>
    <div className="w-full relative min-h-screen  text-white flex flex-wrap gap-4 p-4">
      {data[2].map((canvasdets, index) => (
        <Canvas key={index} details={canvasdets} />
      ))}
    </div>*/}

    </>
  );
}

export default App;
