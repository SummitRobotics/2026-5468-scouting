"use client";

import React, { ReactNode } from 'react';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import BugsnagPerformance from '@bugsnag/browser-performance';

Bugsnag.start({
  apiKey: process.env.BUGSNAG_KEY || '', 
  plugins: [new BugsnagPluginReact()]
});

BugsnagPerformance.start({
  apiKey: process.env.BUGSNAG_KEY || ''
});

interface BugSnagProviderProps {
  children: ReactNode;
}

export default function BugSnagProvider({ children }: BugSnagProviderProps) {
  const ErrorBoundary = Bugsnag.getPlugin('react')!.createErrorBoundary(React);

  return <ErrorBoundary>{children}</ErrorBoundary>;
}
