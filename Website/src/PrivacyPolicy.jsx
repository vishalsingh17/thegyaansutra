import React from "react";
import Lottie from "lottie-react";
import logo from "./assets/logo.json";

const PrivacyPolicy = () => {
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
          Privacy Policy
        </h1>

        {/* Scope of the Policy */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Scope of the Policy
          </h2>
          <p className="text-gray-700">
            This Privacy Policy ("Policy") applies to users who visit our
            Website, including those who register for an account with us. It
            also applies to users who access their accounts through third-party
            logins.
          </p>
        </section>

        {/* Gathering Information */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Gathering Information
          </h2>
          <p className="text-gray-700 mb-4">
            We collect the following information about you when you interact
            with our Website:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              <strong>Personal Information:</strong> Name, email address,
              username, password, and other contact details.
            </li>
            <li>
              <strong>Device Information:</strong> Your device type, operating
              system, browser type, IP address, and location data.
            </li>
            <li>
              <strong>Behavioral Data:</strong> Information about how you use
              the Website, including pages visited, time spent, and interactions
              with content.
            </li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-4">Your information is used to:</p>
          <ol className="list-decimal list-inside text-gray-700 mb-4">
            <li>
              <strong>Provide Services:</strong> Offer products, services, and
              content tailored to your needs.
            </li>
            <li>
              <strong>Improve Our Services:</strong> Analyze user behavior to
              enhance our offerings.
            </li>
            <li>
              <strong>Personalize Experiences:</strong> Tailor your experience
              based on your preferences and interests.
            </li>
          </ol>
        </section>

        {/* Sharing Your Information */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Sharing Your Information
          </h2>
          <p className="text-gray-700 mb-4">We share your information with:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              <strong>Third-party providers:</strong> For services like payment
              processing and email marketing.
            </li>
            <li>
              <strong>Business partners:</strong> To improve our offerings and
              services.
            </li>
            <li>
              <strong>Government agencies:</strong> As required by law to comply
              with regulations.
            </li>
          </ul>
        </section>

        {/* Data Security */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Data Security
          </h2>
          <p className="text-gray-700 mb-4">
            We implement industry-standard security measures to protect your
            information:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>SSL encryption to secure data transmission.</li>
            <li>Secure password hashing algorithms for account credentials.</li>
            <li>
              Regular software and system updates to prevent vulnerabilities.
            </li>
          </ul>
        </section>

        {/* Data Protection */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Data Protection
          </h2>
          <p className="text-gray-700 mb-4">
            We comply with applicable laws, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>The General Data Protection Regulation (GDPR).</li>
            <li>The California Consumer Privacy Act (CCPA).</li>
          </ul>
          <p className="text-gray-700 mb-4">Users have the right to:</p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Access, correct, or delete their information.</li>
            <li>Opt-out of marketing communications.</li>
          </ul>
        </section>

        {/* Changes to the Policy */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Changes to the Policy
          </h2>
          <p className="text-gray-700">
            We reserve the right to update or modify this Policy at any time.
            Changes will be posted on our website, and the privacy notice will
            be updated accordingly.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
