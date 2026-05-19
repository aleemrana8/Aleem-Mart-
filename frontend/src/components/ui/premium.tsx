'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * ALEEM MART — PREMIUM UI COMPONENTS
 * Enterprise-grade reusable component library
 */

// === GLASS CARD ===
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
}

export function GlassCard({ children, className, elevated }: GlassCardProps) {
  return (
    <div className={cn(elevated ? 'glass-card-elevated' : 'glass-card', className)}>
      {children}
    </div>
  );
}

// === PREMIUM CARD ===
interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  glow?: boolean;
}

export function PremiumCard({ children, className, interactive, glow }: PremiumCardProps) {
  return (
    <div className={cn(
      interactive ? 'card-interactive' : 'card-premium',
      glow && 'glow-primary',
      className
    )}>
      {children}
    </div>
  );
}

// === KPI METRIC CARD ===
interface KPICardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: LucideIcon;
  iconColor?: string;
  prefix?: string;
  suffix?: string;
  sparkline?: boolean;
}

export function KPICard({ label, value, change, icon: Icon, iconColor = 'text-primary bg-primary/10', prefix = '', suffix = '' }: KPICardProps) {
  const trend = change ? (change > 0 ? 'up' : change < 0 ? 'down' : 'neutral') : null;
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className="analytics-card group hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-center justify-between mb-3">
        {Icon && (
          <div className={cn('p-2.5 rounded-xl', iconColor)}>
            <Icon size={18} />
          </div>
        )}
        {trend && (
          <span className={cn(
            'flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full',
            trend === 'up' && 'text-success bg-success/10',
            trend === 'down' && 'text-destructive bg-destructive/10',
            trend === 'neutral' && 'text-muted-foreground bg-muted',
          )}>
            <TrendIcon size={12} />
            {change !== undefined && `${Math.abs(change)}%`}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground tracking-tight">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
      {/* Subtle bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

// === PREMIUM BADGE ===
interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'premium';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export function PremiumBadge({ children, variant = 'default', size = 'sm', dot }: BadgeProps) {
  const variants = {
    default: 'bg-muted text-muted-foreground',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-destructive/10 text-destructive',
    info: 'bg-info/10 text-info',
    premium: 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/20',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 font-semibold rounded-full',
      variants[variant],
      size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs',
    )}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', variant === 'success' ? 'bg-success' : variant === 'error' ? 'bg-destructive' : 'bg-primary')} />}
      {children}
    </span>
  );
}

// === SECTION HEADER ===
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export function SectionHeader({ title, subtitle, badge, action, icon }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {icon && <div className="p-2 bg-primary/10 rounded-xl text-primary">{icon}</div>}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-heading-lg text-foreground">{title}</h2>
            {badge && <PremiumBadge variant="premium">{badge}</PremiumBadge>}
          </div>
          {subtitle && <p className="text-body-sm text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// === GRADIENT TEXT ===
export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('bg-clip-text text-transparent bg-gradient-to-r from-primary via-brand-electric to-accent', className)}>
      {children}
    </span>
  );
}

// === PREMIUM DIVIDER ===
export function PremiumDivider({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </div>
  );
}

// === SKELETON LOADER ===
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('shimmer rounded-lg', className)} />;
}

export function SkeletonCard() {
  return (
    <div className="card-premium p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-2 w-16" />
        </div>
      </div>
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-2 w-full" />
    </div>
  );
}

// === EMPTY STATE ===
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 text-muted-foreground">{icon}</div>}
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      {description && <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>}
      {action}
    </div>
  );
}

// === PREMIUM AVATAR ===
interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  ring?: boolean;
}

export function PremiumAvatar({ src, name, size = 'md', ring }: AvatarProps) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base' };
  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

  return (
    <div className={cn(
      'relative rounded-full overflow-hidden flex items-center justify-center font-semibold bg-primary/10 text-primary',
      sizes[size],
      ring && 'ring-2 ring-primary/30 ring-offset-2 ring-offset-background',
    )}>
      {src ? (
        <img src={src} alt={name || 'Avatar'} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
