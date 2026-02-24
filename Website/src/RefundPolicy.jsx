import React from "react";
import Lottie from "lottie-react";
import logo from "./assets/logo.json";

const RefundPolicy = () => {
  const revisionDate = "Last revised: January 14, 2025"; // Replace with the actual revision date
  const location = "Janakpuri, New Delhi";

  return (
    <div className="bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
      <div className="max-w-3xl md:max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-lg shadow-lg">
        {/* Header with Logo and Revision Date */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <a href="/" className="flex items-center space-x-4 mb-4 sm:mb-0">
            <Lottie
              animationData={logo}
              loop={true}
              autoplay={true}
              className="h-20 w-20"
            />
            <span className="text-lg font-bold text-red-500">
              The Gyaan Sutra
            </span>
          </a>

          <div className="text-center sm:text-right">
            <p className="text-gray-500 text-sm">{revisionDate}</p>
            <p className="text-gray-500 text-sm">{location}</p>
          </div>
        </div>
        <hr className="mb-6" />

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Refund Policy
        </h1>

        {/* Eligibility for Refunds */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            1. Eligibility for Refunds
          </h2>
          <p className="text-gray-700 mb-4">
            We are committed to ensuring a positive experience for our learners.
            Below are the conditions under which refunds may be requested.
          </p>

          {/* Course Purchases */}
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            1.1 Course Purchases
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              <strong>Timeframe:</strong> Refund requests must be made within{" "}
              <strong>30 days of purchase</strong>.
            </li>
            <li>
              <strong>Course Access:</strong> Refunds are available if the
              learner has accessed less than{" "}
              <strong>20% of the course content</strong>.
            </li>
            <li>
              <strong>Technical Issues:</strong> Refunds may be requested if
              there is a genuine technical issue preventing access to the course
              materials, and we are unable to resolve it.
            </li>
          </ul>

          {/* Subscription Plans */}
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            1.2 Subscription Plans
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              For monthly subscriptions, refund requests must be made within the{" "}
              <strong>first 7 days</strong>.
            </li>
            <li>
              For annual subscriptions, refund requests must be made within the{" "}
              <strong>first 30 days</strong>.
            </li>
          </ul>

          {/* Workshops and Live Sessions */}
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            1.3 Workshops and Live Sessions
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              Refunds for workshops or live sessions are available if the event
              is canceled or rescheduled to a time inconvenient for the
              attendee.
            </li>
            <li>
              No refunds will be issued for "no-shows" or missed sessions.
            </li>
          </ul>
        </section>

        {/* Non-Refundable Items */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            2. Non-Refundable Items
          </h2>
          <p className="text-gray-700 mb-4">
            The following items are non-refundable:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              Courses or subscriptions that have been fully accessed or
              completed.
            </li>
            <li>
              Personalized mentoring or one-on-one sessions that have already
              taken place.
            </li>
            <li>Gift cards or promotional purchases.</li>
          </ul>
        </section>

        {/* How to Request a Refund */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            3. How to Request a Refund
          </h2>
          <p className="text-gray-700 mb-4">
            To request a refund, please follow these steps:
          </p>
          <ol className="list-decimal list-inside text-gray-700 mb-4">
            <li>
              Email us at <strong>support@thegyaansutra.com</strong> with the
              subject line "Refund Request."
            </li>
            <li>
              Provide the following details:
              <ul className="list-disc list-inside text-gray-700">
                <li>Name and email address used for the purchase.</li>
                <li>Order ID or transaction receipt.</li>
                <li>Reason for the refund request.</li>
              </ul>
            </li>
            <li>
              Our team will review your request and respond within{" "}
              <strong>5-7 business days</strong>.
            </li>
          </ol>
        </section>

        {/* Refund Processing */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            4. Refund Processing
          </h2>
          <p className="text-gray-700 mb-4">
            Approved refunds will be processed within{" "}
            <strong>10-15 business days</strong> after approval. Refunds will be
            issued to the original payment method.
          </p>
        </section>

        {/* Changes to the Policy */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            5. Changes to the Policy
          </h2>
          <p className="text-gray-700 mb-4">
            The Gyaan Sutra reserves the right to update or change this refund
            policy at any time. Any updates will be reflected on this page, and
            the date of the last revision will be mentioned below.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
