import { Button } from "@/components/ui/Button";

const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? "#";

export function CTASection() {
  return (
    <section className="px-5 py-20 sm:px-10 lg:px-16" aria-labelledby="cta-title">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-depth-border bg-[linear-gradient(135deg,rgba(238,14,98,0.22),rgba(255,255,255,0.05)_48%,rgba(238,14,98,0.1))] p-8 shadow-depth-glow sm:p-12 lg:p-16">
        <div className="max-w-3xl">
          <h2 id="cta-title" className="font-display text-4xl font-black uppercase leading-none tracking-normal sm:text-6xl">
            Ready to build with depth?
          </h2>
          <p className="mt-6 text-lg font-semibold leading-7 text-depth-muted sm:text-xl">
            Bring the idea, the stalled product, or the messy rebuild. We will turn it into a clear plan and a product path you can trust.
          </p>
          <div className="mt-8">
            <Button href={bookingUrl}>Book a call</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
