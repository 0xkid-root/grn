import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { NavigationMenu } from './ui/navigation-menu';
import { Globe2, Send } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe2 className="h-6 w-6" />
            <span className="text-xl font-bold">GRN</span>
          </div>
          <NavigationMenu className="hidden md:flex">
            <ul className="flex space-x-6">
              <li>Features</li>
              <li>How it Works</li>
              <li>Security</li>
              <li>Pricing</li>
            </ul>
          </NavigationMenu>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send Money
            </Button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t py-8">
        <div className="container grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Product</h3>
            <ul className="space-y-2">
              <li>Features</li>
              <li>Security</li>
              <li>Pricing</li>
              <li>API</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>Documentation</li>
              <li>Help Center</li>
              <li>Community</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>Privacy</li>
              <li>Terms</li>
              <li>Cookie Policy</li>
              <li>Licenses</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}