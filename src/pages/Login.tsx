import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

export default function Login() {
  const { connect } = useAuth();

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Connect Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={connect}
            size="lg"
            className="w-full gap-2"
          >
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Connect your wallet to start sending and receiving payments globally
          </p>
        </CardContent>
      </Card>
    </div>
  );
}