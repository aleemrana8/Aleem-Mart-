'use client';

import * as React from 'react';

// Simplified toast implementation
const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const ToastViewport: React.FC = () => {
  return <div id="toast-viewport" className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2" />;
};

const Toast: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="bg-white border rounded-lg shadow-lg p-4">{children}</div>;
};

const ToastTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="font-semibold text-sm">{children}</p>;
};

const ToastDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="text-sm text-muted-foreground">{children}</p>;
};

const ToastClose: React.FC = () => {
  return <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">×</button>;
};

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose };
