import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-2 mb-8'>
      <div className='flex lg:flex-row md:flex-col sm:flex-col gap-20 items-center'>

        <div className='w-[50%] md:w-[50%] sm:w-[80%] lg:shadow-[20px_20px_rgba(255,255,255)] sm:shadow-[-15px_-15px_rgba(255,255,255)]'>
            <img
                src={Instructor}
                alt=""
                className='shadow-white'
            />
        </div>

        <div className='flex flex-col gap-10'>
            <div className='text-4xl font-semobold w-[50%] md:w-[50%] sm:w-[100%] '>
                Become an
                <HighlightText text={"Instructor"} />
            </div>

            <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>

            <div className='w-fit'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Teaching Today
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>


        </div>

      </div>
    </div>
  )
}

export default InstructorSection
