import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Banknote,
  Shield,
  Zap,
  Globe,
  LineChart,
  RefreshCw,
} from 'lucide-react';

const features = [
  {
    title: 'Multi-Currency Support',
    description:
      'Send and receive payments in multiple currencies with real-time conversion rates.',
    icon: Banknote,
  },
  {
    title: 'Instant Transfers',
    description:
      'Lightning-fast transactions powered by Avalanche blockchain technology.',
    icon: Zap,
  },
  {
    title: 'Global Coverage',
    description:
      'Send money to over 200 countries with our extensive network of partners.',
    icon: Globe,
  },
  {
    title: 'Advanced Security',
    description:
      'Enterprise-grade security with multi-signature wallets and encryption.',
    icon: Shield,
  },
  {
    title: 'Real-Time Tracking',
    description:
      'Track your transfers in real-time with detailed transaction analytics.',
    icon: LineChart,
  },
  {
    title: 'Automated Compliance',
    description:
      'Built-in KYC/AML compliance with automated verification processes.',
    icon: RefreshCw,
  },
];

export default function Features() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful Features for Global Payments
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to send money globally with confidence and ease.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all hover:scale-105">
              <CardHeader>
                <feature.icon className="h-8 w-8 text-primary" />
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}