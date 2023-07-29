import React from "react";

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="flex lg:flex-row md:flex-col sm:flex-col items-center gap-20">
        <div className="w-[45%] md:w-[100%] sm:w-[100%] flex flex-col lg:items-start sm:items-start">
          {timeline.map((element, index) => {
            return (
              <div key={index}>
                <div className="flex flex-row gap-6 my-2">
                  <div className="w-[50px] h-[50px] bg-white shadow-xl flex items-center justify-center rounded-full">
                    <img src={element.Logo} alt="" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-[18px]">
                      {element.heading}
                    </h2>
                    <p className="text-base tracking-wide">{element.Description}</p>
                  </div>
                </div>
                <div className="">
                {index < 3 ? <div className="h-16 w-[25px] border-dotted border-r border-richblack-900"></div> : <div></div>}

                </div>

              </div>
            );
          })}
        </div>
        <div className="relative lg:w-[140%] sm:w-[95%]">
          <div className="shadow-[-5px_-5px_50px_-5px] shadow-blue-200">
            <img
              src={timelineImage}
              alt="timelineImage"
              className=" md:shadow-[20px_20px_rgba(255,255,255)] sm:shadow-[15px_15px_rgba(255,255,255)]  object-cover h-fit"
            />
          </div>

          <div
            className="absolute bg-caribbeangreen-700 flex lg:flex-row sm:flex-col sm:gap-10 text-white uppercase py-9
                            left-[50%] translate-x-[-50%] translate-y-[-50%]"
          >
            <div className="flex flex-row  gap-5 items-center lg:border-r border-caribbeangreen-300 px-10 ">
              <p className="text-3xl font-bold px-4">10</p>
              <p className="text-caribbeangreen-300 text-sm px-2">
                Years of Experience
              </p>
            </div>

            <div className="flex flex-row gap-5 items-center px-10">
              <p className="text-3xl font-bold px-2">250</p>
              <p className="text-caribbeangreen-300 text-sm px-4">Types of Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
