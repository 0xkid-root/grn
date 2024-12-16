import { cn } from '@/lib/utils';

interface Step {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface StepsProps {
  steps: Step[];
}

export function Steps({ steps }: StepsProps) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div
            key={index}
            className={cn(
              'relative flex flex-col items-center text-center',
              index < steps.length - 1 &&
                'after:absolute after:right-[-50%] after:top-8 after:hidden after:h-0.5 after:w-full after:bg-border after:content-[""] md:after:block'
            )}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Icon className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
            <p className="mt-2 text-muted-foreground">{step.description}</p>
          </div>
        );
      })}
    </div>
  );
}