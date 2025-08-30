import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  onLanguageChange: (language: 'en' | 'ta') => void;
  currentLanguage: 'en' | 'ta';
}

export const LanguageToggle = ({ onLanguageChange, currentLanguage }: LanguageToggleProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onLanguageChange(currentLanguage === 'en' ? 'ta' : 'en')}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      {currentLanguage === 'en' ? 'தமிழ்' : 'English'}
    </Button>
  );
};