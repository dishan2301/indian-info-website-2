import {
  ArrowLeftRight, BadgeCheck, Banknote, Bell, BookOpen, BriefcaseBusiness,
  Calculator, CalendarCheck, CalendarClock, CalendarDays, ChartColumn, ChartNoAxesCombined,
  CircleDollarSign, ClipboardCheck, ClipboardList, Clock, CreditCard, Database,
  FileCheck, FileClock, FileInput, FileOutput, FileText, Fingerprint, FolderOpen,
  Globe, GraduationCap, HandCoins, IdCard, KeyRound, LayoutDashboard, ListChecks,
  ListFilter, LockKeyhole, LogOut, Mail, MapPin, MessageCircle, MessagesSquare,
  Network, Package, QrCode, Receipt, ScanFace, Settings2, ShieldCheck, Smartphone,
  Target, Ticket, UserCheck, UserCog, UserPlus, UserRound, Users, Wallet,
} from 'lucide-react';

// Icons follow the order of each module's features in content.ts.
export const capabilityIcons: Record<string, typeof BadgeCheck[]> = {
  recruitment: [Wallet, BriefcaseBusiness, UserRound, Globe, QrCode, FileInput, ListFilter, LayoutDashboard, Users, FileText, UserCheck, ClipboardCheck, ChartColumn],
  leave: [BookOpen, ClipboardCheck, CalendarDays, ArrowLeftRight, Smartphone, FileClock],
  pms: [Target, MessagesSquare, ChartColumn, UserPlus, ClipboardCheck, CalendarDays],
  'performance-linked-benefits': [Package, CalendarCheck, ChartNoAxesCombined, UserCog, Calculator],
  onboarding: [FileInput, Clock, ListChecks, KeyRound, Bell, LayoutDashboard],
  attendance: [ArrowLeftRight, CalendarClock, MapPin, Clock, Fingerprint, ChartColumn],
  'hr-help-desk': [ClipboardCheck, ListFilter, ClipboardList, Mail, Ticket, MessageCircle],
  'training-induction': [Target, CalendarDays, UserCheck, BookOpen, ClipboardCheck, ChartColumn],
  'core-hris-payroll': [FileInput, Network, FolderOpen, Database, Package, Banknote, FileClock, HandCoins, Receipt, ShieldCheck, ClipboardList, CreditCard, Globe, BookOpen, FileText, ArrowLeftRight, CircleDollarSign, Mail, Calculator, LayoutDashboard, ChartColumn, Wallet, LockKeyhole, ChartNoAxesCombined],
  expense: [Receipt, MapPin, BookOpen, ShieldCheck, Smartphone, ChartColumn],
  'off-boarding': [FileCheck, ClipboardCheck, Calculator, MessagesSquare, FileOutput, ClipboardList],
  timesheet: [Clock, CalendarDays, CalendarCheck, UserCheck, ChartColumn, BriefcaseBusiness],
  ess: [UserRound, Banknote, FileText, Network, LockKeyhole, Smartphone],
  visitors: [Mail, ShieldCheck, ScanFace, IdCard, LogOut, KeyRound],
};
