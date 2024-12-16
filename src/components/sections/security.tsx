import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, FileCheck, AlertCircle } from 'lucide-react';

const securityFeatures = [
  {
    title: 'End-to-End Encryption',
    description:
      'All transactions and personal data are protected with military-grade encryption.',
    icon: Lock,
  },
  {
    title: 'Multi-Signature Security',
    description:
      'Transactions require multiple signatures for enhanced security and control.',
    icon: Shield,
  },
  {
    title: 'Compliance & Regulations',
    description:
      'Fully compliant with global financial regulations and standards.',
    icon: FileCheck,
  },
  {
    title: 'Fraud Prevention',
    description:
      'Advanced AI-powered systems to detect and prevent fraudulent activities.',
    icon: AlertCircle,
  },
];

export default function Security() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Enterprise-Grade Security
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Your security is our top priority. We employ multiple layers of
            protection to keep your money and data safe.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="transition-all hover:scale-105">
                <CardContent className="flex items-start gap-4 p-6">
                  <Icon className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}