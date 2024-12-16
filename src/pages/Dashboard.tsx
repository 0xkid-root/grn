import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTransfer } from '@/contexts/TransferContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import NewTransferDialog from '@/components/dialogs/NewTransferDialog';

export default function Dashboard() {
  const { user } = useAuth();
  const { transfers, getTransferHistory } = useTransfer();

  useEffect(() => {
    getTransferHistory();
  }, [getTransferHistory]);

  return (
    <div className="container py-8">
      <div className="grid gap-8">
        {/* Balance Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Balance</CardTitle>
            <Wallet className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${user?.balance}</div>
            <p className="text-sm text-muted-foreground">Available for transfer</p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex gap-4">
          <NewTransferDialog />
          <Button variant="outline" className="flex-1">
            View History
          </Button>
        </div>

        {/* Recent Transfers */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {transfer.sender === user?.address ? (
                          <ArrowUpRight className="text-destructive" />
                        ) : (
                          <ArrowDownRight className="text-primary" />
                        )}
                        {transfer.sender === user?.address ? 'Sent' : 'Received'}
                      </div>
                    </TableCell>
                    <TableCell>${transfer.amount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {transfer.status === 'pending' && (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        )}
                        {transfer.status === 'completed' && (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        )}
                        {transfer.status === 'cancelled' && (
                          <XCircle className="h-4 w-4 text-destructive" />
                        )}
                        {transfer.status.charAt(0).toUpperCase() +
                          transfer.status.slice(1)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDistanceToNow(transfer.timestamp, {
                        addSuffix: true,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}