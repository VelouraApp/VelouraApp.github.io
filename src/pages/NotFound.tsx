
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-wedding-blush/10">
      <div className="text-center px-4">
        <h1 className="text-6xl font-serif font-medium mb-6">404</h1>
        <h2 className="text-2xl font-serif mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We're sorry, the page you requested could not be found. Please check the URL or navigate back to our homepage.
        </p>
        <Button asChild className="wedding-btn-primary">
          <Link to="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
