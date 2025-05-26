
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { AuthDialog } from '@/components/auth/AuthDialog';

export const AuthButton = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <Button variant="outline" disabled size="sm">
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <User className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="truncate max-w-32 sm:max-w-none">{user.email}</span>
        </div>
        <Button 
          variant="default" 
          onClick={signOut} 
          size="sm" 
          className="text-xs sm:text-sm bg-orange-500 hover:bg-orange-600 text-white"
        >
          <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button 
        onClick={() => setShowAuthDialog(true)}
        className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
        size="sm"
      >
        Sign In
      </Button>
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </>
  );
};
