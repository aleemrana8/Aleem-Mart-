import { Request, Response } from 'express';

/**
 * Loyalty & Gamification Service
 * 
 * Features:
 * - Points system (earn on purchase, review, referral)
 * - Tier system (Bronze → Silver → Gold → Platinum → Diamond)
 * - Badges & achievements
 * - Streak rewards
 * - Referral bonuses
 * - Points redemption
 */

interface UserLoyaltyProfile {
  userId: string;
  points: number;
  lifetimePoints: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  streakDays: number;
  badges: string[];
  referralCode: string;
  referralCount: number;
  joinedAt: Date;
}

const TIER_THRESHOLDS = {
  bronze: 0,
  silver: 500,
  gold: 2000,
  platinum: 5000,
  diamond: 15000,
};

const TIER_BENEFITS = {
  bronze: { discount: 0, freeShipping: false, earlyAccess: false, multiplier: 1 },
  silver: { discount: 3, freeShipping: false, earlyAccess: false, multiplier: 1.2 },
  gold: { discount: 5, freeShipping: true, earlyAccess: false, multiplier: 1.5 },
  platinum: { discount: 8, freeShipping: true, earlyAccess: true, multiplier: 2 },
  diamond: { discount: 12, freeShipping: true, earlyAccess: true, multiplier: 3 },
};

const POINT_RULES = {
  purchase: 1, // 1 point per Rs. 100 spent
  review: 25,
  reviewWithPhoto: 50,
  referralSignup: 100,
  referralPurchase: 200,
  dailyLogin: 5,
  streakBonus7: 50,
  streakBonus30: 200,
  firstPurchase: 100,
  profileComplete: 50,
};

const BADGES = [
  { id: 'first_purchase', name: 'First Purchase', icon: '🛒', description: 'Made your first purchase', points: 100 },
  { id: 'reviewer', name: 'Reviewer', icon: '⭐', description: 'Left 5 product reviews', points: 50 },
  { id: 'top_reviewer', name: 'Top Reviewer', icon: '🏆', description: 'Left 25 reviews', points: 200 },
  { id: 'streak_7', name: 'Week Warrior', icon: '🔥', description: '7-day login streak', points: 50 },
  { id: 'streak_30', name: 'Monthly Master', icon: '💪', description: '30-day login streak', points: 200 },
  { id: 'big_spender', name: 'Big Spender', icon: '💎', description: 'Spent Rs. 50,000+', points: 300 },
  { id: 'referrer', name: 'Social Star', icon: '🌟', description: 'Referred 5 friends', points: 150 },
  { id: 'early_bird', name: 'Early Bird', icon: '🐦', description: 'Purchased during flash sale', points: 30 },
  { id: 'category_explorer', name: 'Explorer', icon: '🗺️', description: 'Purchased from 5 categories', points: 75 },
  { id: 'wishlist_guru', name: 'Wishlist Guru', icon: '📋', description: 'Added 20 items to wishlist', points: 25 },
];

// In-memory loyalty store (Production: MongoDB collection)
const loyaltyProfiles = new Map<string, UserLoyaltyProfile>();

function getOrCreateProfile(userId: string): UserLoyaltyProfile {
  if (!loyaltyProfiles.has(userId)) {
    loyaltyProfiles.set(userId, {
      userId,
      points: 150, // Welcome bonus
      lifetimePoints: 150,
      tier: 'bronze',
      streakDays: 1,
      badges: ['welcome'],
      referralCode: `AM${userId.slice(-6).toUpperCase()}`,
      referralCount: 0,
      joinedAt: new Date(),
    });
  }
  return loyaltyProfiles.get(userId)!;
}

function calculateTier(lifetimePoints: number): UserLoyaltyProfile['tier'] {
  if (lifetimePoints >= TIER_THRESHOLDS.diamond) return 'diamond';
  if (lifetimePoints >= TIER_THRESHOLDS.platinum) return 'platinum';
  if (lifetimePoints >= TIER_THRESHOLDS.gold) return 'gold';
  if (lifetimePoints >= TIER_THRESHOLDS.silver) return 'silver';
  return 'bronze';
}

// === API Controllers ===

export async function getLoyaltyProfile(req: Request, res: Response) {
  const userId = (req as any).user?.id || 'demo-user';
  const profile = getOrCreateProfile(userId);

  const currentTier = calculateTier(profile.lifetimePoints);
  const tierBenefits = TIER_BENEFITS[currentTier];

  // Calculate progress to next tier
  const tiers = Object.entries(TIER_THRESHOLDS);
  const currentTierIndex = tiers.findIndex(([name]) => name === currentTier);
  const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;
  const progressToNext = nextTier
    ? Math.min(100, Math.round(((profile.lifetimePoints - tiers[currentTierIndex][1]) / (nextTier[1] - tiers[currentTierIndex][1])) * 100))
    : 100;

  res.json({
    success: true,
    data: {
      profile: {
        ...profile,
        tier: currentTier,
      },
      tierBenefits,
      nextTier: nextTier ? { name: nextTier[0], pointsRequired: nextTier[1], progressPercent: progressToNext } : null,
      pointsValue: `Rs. ${Math.floor(profile.points * 0.5)}`, // 1 point = Rs. 0.5
      availableBadges: BADGES,
      earnedBadges: BADGES.filter((b) => profile.badges.includes(b.id)),
      pointRules: POINT_RULES,
    },
  });
}

export async function earnPoints(req: Request, res: Response) {
  const userId = (req as any).user?.id || 'demo-user';
  const { action, metadata } = req.body;
  const profile = getOrCreateProfile(userId);

  let pointsEarned = 0;
  let badge: string | null = null;

  switch (action) {
    case 'purchase':
      const amount = metadata?.amount || 0;
      pointsEarned = Math.floor(amount / 100) * POINT_RULES.purchase;
      pointsEarned = Math.floor(pointsEarned * TIER_BENEFITS[profile.tier].multiplier);
      break;
    case 'review':
      pointsEarned = metadata?.hasPhoto ? POINT_RULES.reviewWithPhoto : POINT_RULES.review;
      break;
    case 'daily_login':
      pointsEarned = POINT_RULES.dailyLogin;
      profile.streakDays++;
      if (profile.streakDays === 7) { pointsEarned += POINT_RULES.streakBonus7; badge = 'streak_7'; }
      if (profile.streakDays === 30) { pointsEarned += POINT_RULES.streakBonus30; badge = 'streak_30'; }
      break;
    case 'referral':
      pointsEarned = metadata?.type === 'purchase' ? POINT_RULES.referralPurchase : POINT_RULES.referralSignup;
      profile.referralCount++;
      if (profile.referralCount >= 5 && !profile.badges.includes('referrer')) badge = 'referrer';
      break;
  }

  profile.points += pointsEarned;
  profile.lifetimePoints += pointsEarned;
  profile.tier = calculateTier(profile.lifetimePoints);
  if (badge && !profile.badges.includes(badge)) profile.badges.push(badge);

  res.json({
    success: true,
    data: {
      pointsEarned,
      multiplier: TIER_BENEFITS[profile.tier].multiplier,
      newBalance: profile.points,
      newBadge: badge ? BADGES.find((b) => b.id === badge) : null,
      tierUp: null,
    },
  });
}

export async function redeemPoints(req: Request, res: Response) {
  const userId = (req as any).user?.id || 'demo-user';
  const { points, type } = req.body;
  const profile = getOrCreateProfile(userId);

  if (points > profile.points) {
    return res.status(400).json({ success: false, message: 'Insufficient points' });
  }

  let value = 0;
  switch (type) {
    case 'discount':
      value = Math.floor(points * 0.5); // Rs. 0.5 per point
      break;
    case 'free_shipping':
      if (points < 100) return res.status(400).json({ success: false, message: 'Need at least 100 points for free shipping' });
      value = 200; // Rs. 200 shipping value
      break;
  }

  profile.points -= points;

  res.json({
    success: true,
    data: {
      redeemed: points,
      value: `Rs. ${value}`,
      type,
      remainingPoints: profile.points,
      couponCode: `LOYALTY-${Date.now().toString(36).toUpperCase()}`,
    },
  });
}

export async function getLeaderboard(_req: Request, res: Response) {
  // Top users by lifetime points
  const leaders = Array.from(loyaltyProfiles.values())
    .sort((a, b) => b.lifetimePoints - a.lifetimePoints)
    .slice(0, 20)
    .map((p, i) => ({
      rank: i + 1,
      userId: p.userId,
      displayName: `User ${p.userId.slice(-4)}`,
      tier: p.tier,
      lifetimePoints: p.lifetimePoints,
      badges: p.badges.length,
    }));

  res.json({ success: true, data: { leaderboard: leaders } });
}
