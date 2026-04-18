import { useRender } from "@base-ui/react/use-render";
import { cn, cva, type VariantProps } from "@repo/tailwind";

const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-md border px-2 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
    {
        variants: {
            variant: {
                default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
                secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
                destructive:
                    "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
                blur: "border-transparent bg-black/40 backdrop-blur-md text-white shadow-sm",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

interface BadgeProps extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
    render?: React.ReactElement | ((props: React.ComponentProps<"span">) => React.ReactElement);
}

function Badge({ className, variant, render, ...props }: BadgeProps) {
    return useRender({
        defaultTagName: "span",
        render,
        props: {
            ...props,
            "data-slot": "badge",
            className: cn(badgeVariants({ variant }), className),
        },
    });
}

export { Badge };
