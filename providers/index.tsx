import AuthCheckProvider from './AuthCheckProvider'
import ReduxProvider from './ReduxProvider'
import ThemeProvider from './ThemeProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ReduxProvider>
        <AuthCheckProvider>{children}</AuthCheckProvider>
      </ReduxProvider>
    </ThemeProvider>
  )
}
