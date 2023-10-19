export default async function Privacy() {
  return (
    <div className="px-12 sm:px-36 md:px-52 lg:px-80 pb-16 flex flex-col justify-center">
      <div className="py-8 md:py-16">
        <h2 className="font-bold text-4xl py-4">Privacy Policy</h2>
        <span className="text-gray-400">Effective October 19, 2023</span>
      </div>
      <div>
        <h3 className="font-bold text-2xl mb-2">Introduction</h3>
        <p>
          Welcome to Yes, Chef!. This policy outlines how we collect, use, and safeguard your personal information when you use our services. By using
          Yes, Chef! you consent to the practices described in this policy.
        </p>
      </div>
      <div className="mt-6">
        <h3 className="font-bold text-2xl mb-2">1. Information Collection</h3>
        <p>
          When you sign up for our service we collect your email address for login purposes. Should you choose to login using your email address we
          will send you an email per login attempt - so-called Magic Link - to securely log you in without using or storing a password.
        </p>
      </div>
      <div className="mt-6">
        <h3 className="font-bold text-2xl mb-2">2. Use and Sharing of Information</h3>
        <p>
          We use your email address to provide and enhance our services, personalize your experience, communicate with you, and send you updates and
          promotional content. However, we do not share your email address or other personal information with third parties for marketing purposes.
        </p>
      </div>
      <div className="mt-6">
        <h3 className="font-bold text-2xl mb-2">3. Cookies and Session Handling</h3>
        <p>
          We use only strictly necessary cookies to enhance your experience on Yes, Chef!. Cookies are small text files stored on your device that
          help us recognize you and remember your preferences. These cookies are essential for session handling, allowing you to navigate and use our
          services effectively.
        </p>
      </div>
      <div className="mt-6">
        <h3 className="font-bold text-2xl mb-2">4. Data Security</h3>
        <p>
          We implement reasonable security measures to protect your personal information from unauthorized access and disclosure. While we strive to
          keep your information secure, please be aware that no data transmission over the internet can be guaranteed to be 100% secure.
        </p>
      </div>
      <div className="mt-6">
        <h3 className="font-bold text-2xl mb-2">5. Children{`'`}s Privacy</h3>
        <p>
          Yes, Chef! is not intended for use by individuals under the age of 13. If we learn that we have collected personal information from a child
          under 13, we will take steps to delete such information.
        </p>
      </div>
      <div className="mt-6">
        <h3 className="font-bold text-2xl mb-2">6. Your Rights and Choices</h3>
        <p>
          You have the right to access, rectify, and request erasure of your personal information. You can also restrict processing, object to
          processing, and request data portability. You also have the right to have your account and all data associated with it deleted. If you wish
          to delete your account, please get in touch with us using the email address below.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-2xl mb-2">7. Contact</h3>
        <p>
          If you have any questions or concerns regarding our Privacy Policy, please contact us at{' '}
          <a href="mailto:dominikjessencodes@gmail.com" className="font-bold hover:underline">
            dominikjessencodes@gmail.com
          </a>
          .
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-2xl mb-2">8. Changes to Policy</h3>
        <p>
          Yes, Chef! reserves the right to modify or update this Policy at any time. Changes will be effective upon posting to the website. It is your
          responsibility to review these terms periodically.
        </p>
      </div>
    </div>
  );
}
