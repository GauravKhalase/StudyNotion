import React from 'react'
import CTAButton from "../HomePage/Button"
import {FaArrowRight} from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroudGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} lg:my-16 md:my-10 sm:my-10 justify-between gap-10`}>
      
    {/*Section 1*/}
    <div className='lg:w-[50%] md:w-[100%] sm:w-[100%] flex flex-col gap-6'>
        {heading}
        <div className='text-richblack-300 font-bold text-md lg:pr-20 '>
            {subheading}
        </div>

        <div className='flex gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                <div className='flex gap-2 items-center'>
                    {ctabtn1.btnText}
                    <FaArrowRight/>
                </div>
            </CTAButton>

            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>  
                    {ctabtn2.btnText}
            </CTAButton>
        </div>


    </div>

     {/*Section 2*/}
     <div className=' h-fit bg-richblack-850 flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px] relative border border-richblack-700'> 
        {/*HW -> BG gradient*/}
        {<div className='codeblock1 absolute'></div>}

        <div className='text-center flex flex-col w-[10%] text-richblack-200 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>
        <div className='w-[2px] bg-richblack-700'></div>
        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pl-5 backdrop-blur-xl `}>
           <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
           
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                }
            }
            omitDeletionAnimation={true}
           />
        </div>

     </div>


    </div>
  )
}

export default CodeBlocks
