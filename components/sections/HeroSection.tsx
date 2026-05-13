import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? "#";

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 py-16 sm:min-h-[800px] sm:px-10 lg:px-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_28%,rgba(238,14,98,0.28),transparent_24rem)]" />
      <div className="absolute right-[-8rem] top-16 -z-10 hidden h-[36rem] w-[36rem] rounded-full border border-depth-border bg-[conic-gradient(from_210deg,rgba(238,14,98,0.9),rgba(255,255,255,0.12),rgba(238,14,98,0.1),rgba(238,14,98,0.9))] p-px opacity-80 blur-[0.2px] lg:block">
        <div className="h-full w-full rounded-full bg-depth-bg/90" />
      </div>
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,0.7fr)]">
        <div className="max-w-3xl">
          <Badge>Spec-driven delivery studio</Badge>
          <h1 className="mt-6 font-display text-[clamp(3.4rem,14vw,7rem)] font-black uppercase leading-[0.88] tracking-normal text-white">
            Think <span className="block text-depth-pink">clearly.</span>
            Build <span className="block text-depth-pink">faster.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base font-semibold leading-6 text-depth-muted sm:mt-8 sm:text-xl sm:leading-7">
            Depthspec helps you turn a messy product idea into a clear plan, visible progress, and working software without the usual agency fog.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
            <Button href={bookingUrl}>Book a call</Button>
            <Button href="#how-it-works" variant="outline">
              See the flow
            </Button>
          </div>
        </div>

        <div className="relative hidden min-h-[32rem] lg:block" aria-hidden="true">
          <img
            src="/assets/depthspec-signal.svg"
            alt=""
            className="absolute right-16 top-8 -z-10 h-[28rem] w-[28rem] opacity-70"
          />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-3xl border border-depth-border bg-white/[0.06] p-6 shadow-depth-glow">
            <strong className="block text-7xl leading-none text-depth-pink">3x</strong>
            <span className="mt-5 block text-2xl font-black leading-none">faster starts</span>
            <small className="mt-3 block text-base font-semibold leading-5 text-depth-muted">with decisions made before build work begins</small>
          </div>
          <div className="absolute bottom-4 left-0 h-56 w-64 rounded-3xl border border-depth-border bg-white/[0.06] p-6 backdrop-blur">
            <strong className="block text-6xl leading-none text-depth-pink">0</strong>
            <span className="mt-5 block text-2xl font-black leading-none">black boxes</span>
            <small className="mt-3 block text-base font-semibold leading-5 text-depth-muted">you see the plan, tradeoffs, and approvals</small>
          </div>
        </div>
      </div>
    </section>
  );
}
