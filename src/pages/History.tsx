import { useEffect, useState } from 'react';
import { useTransfer } from '@/contexts/TransferContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { formatDistanceToNow } from 'date-fns';
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Search,
  XCircle,
} from 'lucide-react';

export default function History() {
  const { transfers } = useTransfer();
  const [filteredTransfers, setFilteredTransfers] = useState(transfers);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let filtered = transfers;

    if (statusFilter !== 'all') {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.sender.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTransfers(filtered);
  }, [transfers, statusFilter, searchQuery]);

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>Transfer History</CardTitle>
          <div className="mt-4 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by address..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransfers.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell>
                    {transfer.status === 'completed' ? (
                      <ArrowUpRight className="h-4 w-4 text-primary" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-destructive" />
                    )}
                  </TableCell>
                  <TableCell className="font-mono">
                    {transfer.sender}
                  </TableCell>
                  <TableCell className="font-mono">
                    {transfer.recipient}
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
  );
}