interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 
        rounded-lg shadow-md 
        border border-gray-200 dark:border-gray-700
        p-6 
        hover:shadow-lg transition-shadow duration-200
        animate-fade-in
        ${className}
      `}
    >
      {children}
    </div>
  )
}