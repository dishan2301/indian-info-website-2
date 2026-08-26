'use client';

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from 'framer-motion';
import { cn } from '@/lib/utils';

const DOCK_HEIGHT = 92;
const DEFAULT_MAGNIFICATION = 58;
const DEFAULT_DISTANCE = 120;
const DEFAULT_PANEL_HEIGHT = 54;

type DockProps = { children: ReactNode; className?: string; distance?: number; panelHeight?: number; magnification?: number; spring?: SpringOptions };
type InjectedProps = { width?: MotionValue<number>; isHovered?: MotionValue<number> };
type DockContextType = { mouseX: MotionValue<number>; spring: SpringOptions; magnification: number; distance: number };
const DockContext = createContext<DockContextType | undefined>(undefined);

function useDock() {
  const context = useContext(DockContext);
  if (!context) throw new Error('useDock must be used within a Dock');
  return context;
}

function Dock({ children, className, spring = { mass: 0.1, stiffness: 180, damping: 14 }, magnification = DEFAULT_MAGNIFICATION, distance = DEFAULT_DISTANCE, panelHeight = DEFAULT_PANEL_HEIGHT }: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const maxHeight = useMemo(() => Math.max(DOCK_HEIGHT, magnification + magnification / 2 + 4), [magnification]);
  const height = useSpring(useTransform(isHovered, [0, 1], [panelHeight, maxHeight]), spring);

  return <motion.div style={{ height, scrollbarWidth: 'none' }} className="site-dock-shell">
    <motion.div
      onMouseMove={({ pageX }) => { isHovered.set(1); mouseX.set(pageX); }}
      onMouseLeave={() => { isHovered.set(0); mouseX.set(Infinity); }}
      className={cn('site-dock', className)} role="toolbar" aria-label="Indian Infotech navigation"
    >
      <DockContext.Provider value={{ mouseX, spring, distance, magnification }}>{children}</DockContext.Provider>
    </motion.div>
  </motion.div>;
}

function DockItem({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { distance, magnification, mouseX, spring } = useDock();
  const isHovered = useMotionValue(0);
  const mouseDistance = useTransform(mouseX, (value) => { const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }; return value - rect.x - rect.width / 2; });
  const width = useSpring(useTransform(mouseDistance, [-distance, 0, distance], [40, magnification, 40]), spring);

  return <motion.div ref={ref} style={{ width }} onHoverStart={() => isHovered.set(1)} onHoverEnd={() => isHovered.set(0)} onFocus={() => isHovered.set(1)} onBlur={() => isHovered.set(0)} className={cn('site-dock-item', className)} tabIndex={0}>
    {Children.map(children, (child) => isValidElement<InjectedProps>(child) ? cloneElement(child, { width, isHovered }) : child)}
  </motion.div>;
}

function DockLabel({ children, className, isHovered }: { children: ReactNode; className?: string; isHovered?: MotionValue<number> }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { if (!isHovered) return; return isHovered.on('change', (latest) => setVisible(latest === 1)); }, [isHovered]);
  return <AnimatePresence>{visible && <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: -8 }} exit={{ opacity: 0, y: 3 }} className={cn('site-dock-label', className)} role="tooltip">{children}</motion.span>}</AnimatePresence>;
}

function DockIcon({ children, className, width }: { children: ReactNode; className?: string; width?: MotionValue<number> }) {
  const fallbackWidth = useMotionValue(40);
  const iconWidth = useTransform(width ?? fallbackWidth, (value) => value / 2.2);
  return <motion.span style={{ width: iconWidth }} className={cn('site-dock-icon', className)}>{children}</motion.span>;
}

export { Dock, DockIcon, DockItem, DockLabel };
