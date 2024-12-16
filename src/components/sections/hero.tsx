import { Button } from '@/components/ui/button';
import { ArrowRight, Globe2 } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Global Remittance Network
            <Globe2 className="mx-auto mt-4 h-12 w-12 animate-spin-slow text-primary" />
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Send money globally with instant transfers, low fees, and blockchain
            security. Join millions of users who trust our network for their
            cross-border payments.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    </div>
  );
}