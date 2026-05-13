import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type CardProps = HTMLMotionProps<"div"> & {
  glow?: boolean;
  interactive?: boolean;
};

export const GlassCard = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", glow, interactive, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={interactive ? { y: -4, scale: 1.005 } : undefined}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={`group relative overflow-hidden rounded-2xl glass shadow-soft ${
          interactive ? "cursor-pointer hover:shadow-cinema" : ""
        } ${className}`}
        {...props}
      >
        {glow && (
          <div className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet to-transparent opacity-60" />
        )}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--mx, 50%) var(--my, 0%), oklch(0.68 0.22 295 / 0.12), transparent 40%)",
          }}
        />
        <div className="relative">{children as React.ReactNode}</div>
      </motion.div>
    );
  },
);
GlassCard.displayName = "GlassCard";
