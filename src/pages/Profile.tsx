import { useAuth } from '@/contexts/AuthContext';
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
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink, Shield, UserCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Profile() {
  const { user, disconnect } = useAuth();

  const copyAddress = () => {
    if (user?.address) {
      navigator.clipboard.writeText(user.address);
      toast.success('Address copied to clipboard');
    }
  };

  return (
    <div className="container py-8">
      <div className="grid gap-8">
        {/* Profile Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Profile</CardTitle>
            <UserCircle className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Wallet Address
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <code className="rounded bg-muted px-2 py-1">
                    {user?.address}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyAddress}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Verification Status
                </label>
                <div className="mt-1">
                  {user?.isVerified ? (
                    <Badge className="gap-1">
                      <Shield className="h-3 w-3" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="gap-1">
                      <Shield className="h-3 w-3" />
                      Not Verified
                    </Badge>
                  )}
                </div>
              </div>

              <Button
                variant="destructive"
                className="mt-4"
                onClick={disconnect}
              >
                Disconnect Wallet
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Setting</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Two-Factor Authentication</TableCell>
                  <TableCell>
                    <Badge variant="outline">Enabled</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Configure
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Transaction Notifications</TableCell>
                  <TableCell>
                    <Badge variant="outline">Enabled</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Configure
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Daily Transfer Limit</TableCell>
                  <TableCell>$5,000</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Modify
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* External Links */}
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 gap-2">
            <ExternalLink className="h-4 w-4" />
            View on Explorer
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Shield className="h-4 w-4" />
            Security Guide
          </Button>
        </div>
      </div>
    </div>
  );
}