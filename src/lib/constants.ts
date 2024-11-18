import { Gem, Home, Key, LucideIcon, Settings } from "lucide-react";

interface SidebarItem {
  href: string;
  icon: LucideIcon;
  text: string;
}

interface SidebarCategory {
  category: string;
  items: SidebarItem[];
}

export const COLOR_OPTIONS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#FDCB6E",
  "#6C5CE7",
  "#FF85A2",
  "#2ECC71",
  "#E17055",
];

export const EMOJI_OPTIONS = [
  { emoji: "💰", label: "Money (Sale)" },
  { emoji: "👤", label: "User (Sign-up)" },
  { emoji: "🎉", label: "Celebration" },
  { emoji: "📅", label: "Calendar" },
  { emoji: "🚀", label: "Launch" },
  { emoji: "📢", label: "Announcement" },
  { emoji: "🎓", label: "Graduation" },
  { emoji: "🏆", label: "Achievement" },
  { emoji: "💡", label: "Idea" },
  { emoji: "🔔", label: "Notification" },
];

export const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    category: "Overview",
    items: [{ href: "/dashboard", icon: Home, text: "Dashboard" }],
  },
  {
    category: "Account",
    items: [{ href: "/dashboard/upgrade", icon: Gem, text: "Upgrade" }],
  },
  {
    category: "Settings",
    items: [
      { href: "/dashboard/api-key", icon: Key, text: "API Key" },
      {
        href: "/dashboard/account-settings",
        icon: Settings,
        text: "Account Settings",
      },
    ],
  },
];

export const FREE_QUOTA = {
  maxEventsPerMonth: 100,
  maxEventCategories: 3,
} as const;

export const PRO_QUOTA = {
  maxEventsPerMonth: 1000,
  maxEventCategories: 10,
} as const;

export const INCLUDED_FEATURES = [
  "10,000 real-time events per month",
  "10 event categories",
  "Advanced analytics and insights",
  "Priority support",
];
