"use client";

import { MarketingPageLayout } from '@/components/marketing/page-layout';

export default function TermsPage() {
  return (
    <MarketingPageLayout
      title="Terms of Service"
      subtitle="Last updated: March 2025"
    >
      <section className="mb-10">
        <p className="mb-6">
          Welcome to The Pick! These Terms of Service ("Terms") govern your use of our website, services, and applications (collectively, the "Service"). Please read these Terms carefully before using the Service.
        </p>
        <p>
          By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Agreement to Terms</h2>
        <p>
          By accessing and/or using the Service, you agree to these Terms and any additional terms that may apply to specific sections of the Service or to products and services offered through the Service. These Terms apply to all visitors, users, and others who access or use the Service. We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Service following any changes constitutes your acceptance of the new Terms.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. User Accounts</h2>
        <p className="mb-4">
          When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
        </p>
        <p className="mb-4">
          You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
        </p>
        <p>
          You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Intellectual Property</h2>
        <p className="mb-4">
          The Service and its original content, features, and functionality are and will remain the exclusive property of The Pick and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of The Pick.
        </p>
        <p>
          Any feedback, comments, or suggestions you may provide regarding the Service is entirely voluntary, and we will be free to use such feedback, comments, or suggestions as we see fit without any obligation to you.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Acceptable Use</h2>
        <p className="mb-4">
          You agree not to use the Service:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600 dark:text-gray-300">
          <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
          <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation</li>
          <li>To impersonate or attempt to impersonate The Pick, a The Pick employee, another user, or any other person or entity</li>
          <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm The Pick or users of the Service or expose them to liability</li>
          <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service, the server on which the Service is stored, or any server, computer, or database connected to the Service</li>
        </ul>
        <p>
          Additionally, you agree not to use the Service in any manner that could disable, overburden, damage, or impair the site or interfere with any other party's use of the Service.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Payment Terms</h2>
        <p className="mb-4">
          Certain aspects of the Service may be provided for a fee. You will be required to select a payment plan and provide payment information. You agree to pay all fees in accordance with the payment plan you select.
        </p>
        <p className="mb-4">
          We use third-party payment processors to bill you through a payment account linked to your account. The processing of payments will be subject to the terms, conditions, and privacy policies of the payment processor in addition to these Terms.
        </p>
        <p className="mb-4">
          We reserve the right to change our prices at any time. If we change prices, we will provide notice of the change on the Service or via the email address we have on file for you. Your continued use of the Service after the price change becomes effective constitutes your agreement to pay the changed amount.
        </p>
        <p>
          You may cancel your subscription at any time by contacting us. If you cancel, you will still be responsible for any charges already incurred. Refunds may be provided at our discretion, in accordance with our refund policy.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Limitation of Liability</h2>
        <p className="mb-4">
          In no event shall The Pick, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
        </p>
        <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-600 dark:text-gray-300">
          <li>Your access to or use of or inability to access or use the Service;</li>
          <li>Any conduct or content of any third party on the Service;</li>
          <li>Any content obtained from the Service; and</li>
          <li>Unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.</li>
        </ol>
        <p>
          In jurisdictions where the exclusion or limitation of liability for consequential or incidental damages is not allowed, our liability shall be limited to the maximum extent permitted by law.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Disclaimer</h2>
        <p className="mb-4">
          The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
        </p>
        <p className="mb-4">
          The Pick, its subsidiaries, affiliates, and its licensors do not warrant that:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600 dark:text-gray-300">
          <li>The Service will function uninterrupted, secure, or available at any particular time or location;</li>
          <li>Any errors or defects will be corrected;</li>
          <li>The Service is free of viruses or other harmful components; or</li>
          <li>The results of using the Service will meet your requirements.</li>
        </ul>
        <p>
          We do not guarantee the accuracy, completeness, or reliability of any sports predictions, analysis, or other content provided through the Service. Betting and gambling involve financial risk, and you should never bet more than you can afford to lose.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Termination</h2>
        <p className="mb-4">
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>
        <p>
          Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <address className="mt-4 not-italic text-gray-600 dark:text-gray-300">
          The Pick, Inc.<br />
          123 Tech Avenue<br />
          San Francisco, CA 94107<br />
          <a href="mailto:legal@thepick.ai" className="text-orange-500 hover:underline">legal@thepick.ai</a><br />
          (800) 555-5555
        </address>
      </section>
    </MarketingPageLayout>
  );
}
