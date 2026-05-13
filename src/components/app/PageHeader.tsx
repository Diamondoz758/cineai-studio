import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8 flex flex-wrap items-end justify-between gap-4"
    >
      <div>
        {eyebrow && (
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-glass-border bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-violet shadow-glow" />
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          <span className="text-gradient">{title}</span>
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </motion.div>
  );
}
