import React from "react";
import Head from "next/head";
import ContactForm from "../components/contact/ContactForm";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact us</title>
        <meta name="description" content="Send me your feedback" />
      </Head>
      <ContactForm />
    </>
  );
}
