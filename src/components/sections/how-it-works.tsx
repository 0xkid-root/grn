import { Steps } from '@/components/ui/steps';
import { UserPlus, Send, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    title: 'Create Account',
    description: 'Sign up and complete verification in minutes',
    icon: UserPlus,
  },
  {
    title: 'Send Money',
    description: 'Choose recipient and amount to transfer',
    icon: Send,
  },
  {
    title: 'Complete Transfer',
    description: 'Funds delivered instantly to recipient',
    icon: CheckCircle2,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Send money globally in three simple steps
          </p>
        </div>
        <div className="mt-16">
          <Steps steps={steps} />
        </div>
      </div>
    </section>
  );
}