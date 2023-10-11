import { cn } from '@/utils/helpers'
import { forwardRef } from 'react'
import { Icons } from '../icons'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isError, error, className, type, ...props }, ref) => {
    return (
      <>
        <div className="relative">
          <input
            type={type}
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              {
                'ring-inset ring-1 ring-red-300 focus-visible:ring-1 focus-visible:ring-red-500':
                  isError,
              },
              className
            )}
            ref={ref}
            {...props}
          />
          {isError && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Icons.exclamation className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
          )}
        </div>
        {isError && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </>
    )
  }
)
Input.displayName = 'Input'

export { Input }
