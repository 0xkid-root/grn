import { Card, CardContent } from '@/components/ui/card';
import { Users, ArrowUpRight, Globe2, Shield } from 'lucide-react';

const stats = [
  {
    title: 'Active Users',
    value: '2M+',
    description: 'Trust our network',
    icon: Users,
    trend: '+12.5%',
  },
  {
    title: 'Daily Volume',
    value: '$50M+',
    description: 'Processed daily',
    icon: ArrowUpRight,
    trend: '+8.2%',
  },
  {
    title: 'Countries',
    value: '200+',
    description: 'Global coverage',
    icon: Globe2,
    trend: '+3 this month',
  },
  {
    title: 'Security',
    value: '99.99%',
    description: 'Uptime guarantee',
    icon: Shield,
    trend: 'Enterprise-grade',
  },
];

export default function Stats() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Icon className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-3xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="mt-2 text-sm text-primary">{stat.trend}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}