export type PaymentPeriod = 'Weekly' | 'Biweekly' | 'Monthly' | 'Quarterly'
export type MemberStatus = 'pending' | 'active' | 'paid' | 'waiting' | 'upcoming' | 'declined'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      tribes: {
        Row: {
          id: string
          name: string
          size: number
          payment_period: PaymentPeriod
          amount: number
          start_date: string
          end_date: string
          cover_image_url: string | null
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          size: number
          payment_period: PaymentPeriod
          amount: number
          start_date: string
          end_date: string
          cover_image_url?: string | null
          created_by: string
          created_at?: string
        }
        Update: {
          name?: string
          size?: number
          payment_period?: PaymentPeriod
          amount?: number
          start_date?: string
          end_date?: string
          cover_image_url?: string | null
        }
      }
      tribe_members: {
        Row: {
          id: string
          tribe_id: string
          user_id: string | null
          invited_email: string | null
          turn_number: number
          status: MemberStatus
          joined_at: string | null
        }
        Insert: {
          id?: string
          tribe_id: string
          user_id?: string | null
          invited_email?: string | null
          turn_number: number
          status?: MemberStatus
          joined_at?: string | null
        }
        Update: {
          status?: MemberStatus
          joined_at?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          tribe_id: string
          user_id: string
          text: string
          created_at: string
        }
        Insert: {
          id?: string
          tribe_id: string
          user_id: string
          text: string
          created_at?: string
        }
        Update: {
          text?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
