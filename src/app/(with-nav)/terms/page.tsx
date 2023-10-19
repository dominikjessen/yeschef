import Link from 'next/link';

export default async function Terms() {
  return (
    <div className="px-12 sm:px-36 md:px-52 lg:px-80 pb-16 flex flex-col justify-center">
      <div className="py-8 md:py-16">
        <h2 className="font-bold text-4xl py-4">Terms of Service</h2>
        <span className="text-gray-400">Effective October 19, 2023</span>
      </div>

      <div>
        <h3 className="font-bold text-2xl mb-2">Introduction</h3>
        <p>
          Welcome to Yes, Chef! By using our services, you agree to comply with and be bound by the following terms and conditions. Please read these
          terms carefully before accessing or using our website and services.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-2xl mb-2">1. Acceptance of Terms</h3>
        <p>
          By accessing or using Yes, Chef!, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do
          not agree to these terms, please do not use our services.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-2xl mb-2">2. User Conduct</h3>
        <p>
          You agree not to use Yes, Chef! for any unlawful, harmful, or malicious activities. You also agree not to interfere with the proper
          functioning of our website and services or violate the rights of other users.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-2xl mb-2">3. Intellectual Property</h3>
        <p>
          All content and materials available on Yes, Chef!, including but not limited to text, graphics, logos, icons, and software, are the property
          of Yes, Chef! and are protected by copyright and other intellectual property laws.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-2xl mb-2">4. Privacy</h3>
        <p>
          Your use of Yes, Chef! is also governed by our Privacy Policy, which can be found <Link href="/privacy-policy">here</Link>. By using our
          services, you consent to the collection, use, and disclosure of your personal information as described in our Privacy Policy.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-2xl mb-2">5. Changes to Terms</h3>
        <p>
          Yes, Chef! reserves the right to modify or update these Terms of Service at any time. Changes will be effective upon posting to the website.
          It is your responsibility to review these terms periodically.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-2xl mb-2">6. Limitation of Liability</h3>
        <p>
          Yes, Chef! shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in any way
          connected with your use of our services.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-2xl mb-2">7. Governing Law</h3>
        <p>
          These Terms of Service are governed by and construed in accordance with the laws of The European Union, without regard to its conflicts of
          law principles.
        </p>
      </div>
    </div>
  );
}
