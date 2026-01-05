export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-24 px-4">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <h1 className="mb-8 text-3xl font-bold uppercase tracking-tighter text-white">
          Privacy Policy
        </h1>
        
        <div className="space-y-6 text-sm leading-relaxed text-zinc-400">
          <section>
            <h2 className="mb-3 text-base font-semibold uppercase tracking-wide text-white">
              Data Collection
            </h2>
            <p>
              We collect information you provide when contacting us: name, email, phone number, and project details. This data is used solely for project consultation and communication.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold uppercase tracking-wide text-white">
              Data Usage
            </h2>
            <p>
              Your information is used to respond to inquiries, provide quotes, and coordinate project execution. We do not share your data with third parties except as necessary for service delivery.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold uppercase tracking-wide text-white">
              Data Retention
            </h2>
            <p>
              We retain project-related data for the duration of the project and as required by Serbian business law. You may request data deletion after project completion.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold uppercase tracking-wide text-white">
              Your Rights
            </h2>
            <p>
              You have the right to access, correct, or delete your personal data. Contact us at contact@wallie.com to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold uppercase tracking-wide text-white">
              Contact
            </h2>
            <p>
              For privacy inquiries: contact@wallie.com
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Last updated: January 2026
            </p>
          </section>
        </div>

        <div className="mt-12">
          <a
            href="/"
            className="text-sm font-mono uppercase tracking-wider text-zinc-400 underline underline-offset-4 transition-colors hover:text-white"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
