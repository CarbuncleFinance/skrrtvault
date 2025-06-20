import { WalletModel } from '@/libs/supabase/models/wallet'
import { TransactionModel } from '@/libs/supabase/models/transaction'
import {
  createClient,
  type SupabaseClient as SupabaseClientType
} from '@supabase/supabase-js'
import type { Database } from '@/types/database'

/**
 * Supabase client for the frontend
 *
 * @dev Types are generated by `bun run db:gen` in the root directory
 */
export class SupabaseClient {
  private client: SupabaseClientType<Database>
  private walletModel: WalletModel
  private transactionModel: TransactionModel

  constructor() {
    this.client = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    this.walletModel = new WalletModel(this.client)
    this.transactionModel = new TransactionModel(this.client)
  }

  get wallet() {
    return this.walletModel
  }

  get transactions() {
    return this.transactionModel
  }
}
