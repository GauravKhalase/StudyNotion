import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress  from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../HomePage/Button"

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-20'>
      <div className='flex flex-col gap-5 items-center'>

            <div className='text-4xl font-semibold text-center'>
                Your Swiss Knife for
                <HighlightText text={" learning any language"} />
            </div>

            <div className='text-center text-richblack-900 mx-auto text-base font-medium tracking-wide w-[75%]'>

            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex lg:flex-row md:flex-col sm:flex-col items-center justify-center'>
                <img 
                    src = {know_your_progress}
                    alt = "KNowYourProgressImage"
                    className='object-contain lg:-mr-32 '
                />
                <img 
                    src = {compare_with_others}
                    alt = "KNowYourProgressImage"
                    className='object-contain md:-mt-10 sm:-mt-10 '
                />
                <img 
                    src = {plan_your_lesson}
                    alt = "KNowYourProgressImage"
                    className='object-contain lg:-ml-36 md:-mt-16 sm:-mt-16'
                />
            </div>

            <div className='w-fit'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div>
                        Learn more
                    </div>
                </CTAButton>
            </div>

      </div>
    </div>
  )
}

export default LearningLanguageSection
