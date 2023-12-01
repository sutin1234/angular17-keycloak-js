export interface RootState {
  items: string[];
  authenticated: boolean
  profile: Record<string, any>
}
