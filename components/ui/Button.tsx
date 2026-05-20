import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline";

interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

type AnchorButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = AnchorButtonProps | NativeButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-[linear-gradient(110deg,var(--color-depth-pink)_0%,var(--color-depth-pink-hot)_48%,var(--color-depth-pink)_100%)] text-white shadow-depth-glow hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(238,14,98,0.72)]",
  outline:
    "border-depth-border bg-white/5 text-white hover:border-depth-pink hover:bg-depth-pink/10",
};

function isAnchorButton(props: ButtonProps): props is AnchorButtonProps {
  return typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const classes = [
    "inline-flex min-h-12 items-center justify-center rounded-lg border px-6 py-3 text-sm font-black uppercase tracking-normal transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-h-14 sm:px-8 sm:text-base",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (isAnchorButton(props)) {
    const { children: _children, variant: _variant, className: _className, ...anchorProps } = props;

    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { children: _children, variant: _variant, className: _className, ...buttonProps } = props;

  return (
    <button className={classes} type="button" {...buttonProps}>
      {children}
    </button>
  );
}
