import React from "react"

export function H1({ children, color }: { color?: string, children: React.ReactNode }) {
    return (
        <h1 className={`${color} text-4xl font-extrabold tracking-tight lg:text-5xl`}>
            {children}
        </h1>
    )
}

export function H2({ children, color }: { color?: string, children: React.ReactNode }) {
    return (
        <h2 className={`${color} text-3xl font-semibold tracking-tight`}>
            {children}
        </h2>
    )
}

export function H3({ children, color }: { color?: string, children: React.ReactNode }) {
    return (
        <h3 className={`${color} text-2xl font-semibold tracking-tight`}>
            {children}
        </h3>
    )
}
export function H4({ children, color }: { color?: string, children: React.ReactNode }) {
    return (
        <h4 className={`${color} text-xl font-semibold tracking-tight`}>
            {children}
        </h4>
    )
}

export function P({ children, color }: { color?: string, children: React.ReactNode }) {
    return (
        <p className={`${color} leading-7 [&:not(:first-child)]:mt-6`}>
            {children}
        </p>
    )
}

export function Lead({ children, color }: { color?: string, children: React.ReactNode }) {
    return (
        <p className={`${color} text-xl text-muted-foreground`}>
            {children}
        </p>
    )
}

export function Large({ children, color }: { color?: string, children: React.ReactNode }) {
    return (
        <div className={`${color} text-lg font-semibold`}>
            {children}
        </div>
    )
}

export function Small({ children, color }: { color?: string, children: React.ReactNode }) {
    return (
        <small className={`${color} text-sm font-medium leading-none`}>
            {children}
        </small>
    )
}

export function Muted({ children, color }: { color?: string, children: React.ReactNode }) {
    return (
        <p className={`${color} text-sm text-muted-foreground`}>
            {children}
        </p>
    )
}
