import React from "react";
import Lottie from "lottie-react";
import logo from "./assets/logo.json";
const TermsAndConditions = () => {
  const revisionDate = "Last revised: January 14, 2025";
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
          Terms of Use
        </h1>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            1. Introduction
          </h2>
          <p className="text-gray-700 mb-4">
            The Gyaan Sutra Terms of Use (the "Terms") govern your use of the
            Site, Application, Services, Collective Content, and other resources
            provided by The Gyaan Sutra.
          </p>
        </section>

        {/* Definitions */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            2. Definitions
          </h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              <strong>Notice:</strong> Notice given or transmitted shall be in
              writing and, if sent by email, shall be deemed delivered when such
              notice is received.
            </li>
            <li>
              <strong>Email address:</strong> Your email address registered with
              The Gyaan Sutra at the time of registration shall serve as your
              Notice Address for all purposes.
            </li>
          </ul>
        </section>

        {/* Use of the Site and Services */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            3. Use of the Site and Services
          </h2>
          You may use the Site and Services only in compliance with these Terms.
          <h3 className="text-lg sm:text-xl font-semibold mb-2">3.1 License</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            The Gyaan Sutra grants you a non-exclusive, revocable license to use
            the Services solely for personal or commercial purposes (as
            applicable).
            <li>
              <strong>Personal Use:</strong> You may use the Services only for
              personal purposes and not for business or commercial activities.
            </li>
            <li>
              <strong>Commercial Use:</strong>The Gyaan Sutra permits you to use
              the Services for commercial purposes, subject to these Terms. You
              must comply with all applicable laws and regulations in such
              cases.
            </li>
            <li>
              <strong>Restriction:</strong> You may not License or sublicense
              the Services or any content contained within; Modify or distribute
              the Services or any part thereof; or Use the Services for
              unauthorized purposes.
            </li>
          </ul>
          {/* Content Restriction */}
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            3.2 Content Restrictions
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            You agree to comply with all applicable laws and regulations
            regarding your use of the Site, Application, and Services, including
            but not limited to intellectual property laws.
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              3.2.1 Prohibited Content
            </h3>
            <li>
              <strong> *Restricted Content:</strong> You may not upload, post,
              transmit, or share any content that:
            </li>
            <li>Is obscene, defamatory, libelous, or inflammatory;</li>
            <li>
              Promotes hate speech, harassment, violence, or discrimination;
            </li>
            <li>
              Infringes on third-party rights (including but not limited to
              intellectual property rights);
            </li>
            <li> Contains malware, viruses, or other malicious software;</li>
            <li>
              Interferes with the normal operation of the Site and Services; or
            </li>
            <li>Otherwise violates these Terms.</li>
          </ul>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            3.3 Content Guidlines
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            The Gyaan Sutra reserves the right to review and modify your content
            before posting it on the Site and Application, and may refuse to
            post any such content if it believes that the content does not
            comply with these guidelines.
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              3.3.1 Content Guidelines
            </h3>
            <li>
              <strong> General:</strong> The Gyaan Sutra encourages you to share
              your content with others, but we reserve the right to review and
              modify your content before posting it on the Site and Application.
            </li>
            <li>
              <strong> Restricted Content:</strong>You may not upload, post,
              transmit, or share any content that is restricted under Section
              3.2.1 of these Terms.
            </li>
          </ul>
        </section>
        {/* Member Content */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            4. Member Content
          </h2>
          <p className="text-gray-700 mb-4">
            You are responsible for ensuring that all information you provide to
            The Gyaan Sutra (including but not limited to Member Content) is
            accurate and up-to-date.
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <strong>Member Content:</strong> You are solely responsible for
              the content of your Member Content.
            </li>
            <li>
              <strong>Accuracy:</strong> You must ensure that all information
              provided by you in connection with the Services is accurate and
              up-to-date.
            </li>
          </ul>
        </section>

        {/* Payment Services */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            5. Payment Services
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <strong>Payment Methods:</strong> The Gyaan Sutra accepts various
              payment methods, including credit cards, bank transfers, and other
              electronic payments.
            </li>
            <li>
              <strong>Transaction Process:</strong> To make a purchase or
              receive payment for services using the Payment Services:
              <ul className="list-disc pl-6">
                <li>
                  Provide accurate information about yourself and the recipient
                  of the payment;
                </li>
                <li>
                  Ensure you have sufficient funds to complete the transaction;
                  and
                </li>
                <li>
                  The Gyaan Sutra may refuse to process any transaction if
                  unauthorized use is suspected.
                </li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            6. Intellectual Property
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            The Gyaan Sutra owns or has the right to license intellectual
            property (including but not limited to trademarks, copyrights,
            patents, and trade secrets).
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              6.1 Ownership
            </h3>
            <li>
              <strong>Intellectual Property:</strong> The Gyaan Sutra owns or
              has the right to license all intellectual property rights in and
              to the Services, including trademarks, copyrights, patents, and
              trade secrets.
            </li>
          </ul>
        </section>

        {/* Dispute Resolution */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            7. Dispute Resolution
          </h2>
          <p className="text-gray-700 mb-4">
            The Gyaan Sutra may resolve disputes arising under these Terms
            through mediation, arbitration, or other dispute resolution
            processes as described below.
          </p>

          {/* Mediation */}
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            7.1 Mediation
          </h3>
          <p className="text-gray-700 mb-2">
            The Gyaan Sutra will use its best efforts to mediate any disputes
            arising under these Terms.
          </p>
          <h4 className="text-md sm:text-lg font-semibold mb-2">Process:</h4>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              You must provide written notice of the dispute to The Gyaan Sutra.
            </li>
            <li>
              We will respond within 14 days with an acknowledgment of receipt.
            </li>
            <li>
              We will attempt to reach a mutually acceptable resolution within
              30 days.
            </li>
          </ul>

          {/* Arbitration */}
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            7.2 Arbitration
          </h3>
          <p className="text-gray-700 mb-2">
            If mediation is not successful, the parties may proceed with
            arbitration.
          </p>
          <h4 className="text-md sm:text-lg font-semibold mb-2">Process:</h4>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              You must provide written notice of the dispute to The Gyaan Sutra.
            </li>
            <li>
              We will respond within 14 days with an acknowledgment of receipt.
            </li>
            <li>
              We will attempt to reach a mutually acceptable resolution within
              30 days.
            </li>
          </ul>

          {/* Governing Law */}
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            7.3 Governing Law
          </h3>
          <p className="text-gray-700 mb-4">
            The Gyaan Sutra's arbitration shall be governed by the laws of the
            state or jurisdiction in which the dispute arises, as determined by
            The Gyaan Sutra in its discretion.
          </p>

          {/* Jurisdiction */}
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            7.4 Jurisdiction
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              Any disputes arising under these Terms shall be resolved through
              arbitration in accordance with the laws of the state or
              jurisdiction in which the dispute arises.
            </li>
            <li>
              The arbitration shall be held in accordance with the rules of the
              American Arbitration Association (AAA) and shall take place in the
              city and state where your registered email address is located.
            </li>
          </ul>
        </section>

        {/* Warranty Disclaimer */}
        {/* Warranty Disclaimer */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            8. Warranty Disclaimer
          </h2>
          <p className="text-gray-700 mb-2">
            The Gyaan Sutra disclaims all warranties, express or implied,
            including but not limited to implied warranties of merchantability,
            fitness for a particular purpose, and non-infringement.
          </p>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            8.1 Disclaimer
          </h3>
          <p className="text-gray-700 mb-2">
            The Gyaan Sutra does not make any representations or warranties
            regarding the Services, including but not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Accuracy</li>
            <li>Reliability</li>
            <li>Completeness</li>
            <li>Non-infringement</li>
            <li>Fitness for a particular purpose</li>
          </ul>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            9. Limitation of Liability
          </h2>
          <p className="text-gray-700 mb-2">
            In no event shall The Gyaan Sutra be liable for any indirect,
            special, incidental, or consequential damages arising out of these
            Terms.
          </p>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            9.1 Limitation of Liability
          </h3>
          <p className="text-gray-700 mb-2">
            You agree to hold harmless The Gyaan Sutra against all claims and
            demands arising from the Services, including but not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Indirect damages</li>
            <li>Special damages</li>
            <li>Incidental damages</li>
            <li>Consequential damages</li>
          </ul>
        </section>

        {/* Termination */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            10. Termination
          </h2>
          <p className="text-gray-700 mb-2">
            The Gyaan Sutra may terminate these Terms at any time without
            notice.
          </p>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            10.1 Termination
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              You agree to hold harmless The Gyaan Sutra against all claims and
              demands arising from your use of the Services.
            </li>
            <li>
              The Gyaan Sutra reserves the right to terminate these Terms with
              or without cause upon written notice to you.
            </li>
          </ul>
        </section>

        {/* Governing Law */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            11. Governing Law
          </h2>
          <p className="text-gray-700 mb-2">
            The Gyaan Sutra's interpretation of these Terms shall be governed by
            the laws of the state or jurisdiction in which the dispute arises,
            as determined by The Gyaan Sutra in its discretion.
          </p>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            11.1 Jurisdiction
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              Any disputes arising under these Terms shall be resolved through
              arbitration in accordance with the laws of the relevant
              jurisdiction.
            </li>
            <li>
              The arbitration shall be held in accordance with the rules of the
              American Arbitration Association (AAA) and shall take place in the
              city and state where your registered email address is located.
            </li>
          </ul>
        </section>

        {/* Entire Agreement */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            12. Entire Agreement
          </h2>
          <p className="text-gray-700 mb-2">
            These Terms constitute the entire agreement between you and The
            Gyaan Sutra regarding the Services and supersede all prior
            negotiations, understandings, agreements, and arrangements.
          </p>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            12.1 Entire Agreement
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              These Terms represent the complete understanding of the parties
              regarding the Services.
            </li>
            <li>
              There are no other agreements or understandings between you and
              The Gyaan Sutra regarding the Services.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
