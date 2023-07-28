import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return ( 
    <div className="mx-auto sm:w-full md:w-fit border border-richblack-600 text-richblack-350 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <h1 className="text-center text-4xl font-semibold">Get in Touch</h1>
      <p className="text-center mt-3">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mt-12 mx-auto">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;