import {
  ProviderEnum,
  ProviderEnumType,
} from "./../enums/account-provider.enum";
import mongoose, { Document, Schema } from "mongoose";

export interface AccountDoccument extends Document {
  provider: ProviderEnumType;
  providerId: string;
  userId: mongoose.Types.ObjectId;
  refreshToken: string | null;
  tokenExpiry: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const accountSchema = new Schema<AccountDoccument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
      enum: Object.values(ProviderEnum),
      required: true,
    },
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    tokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
        transform(doc, ret){
          delete ret.refreshToken;
        },
    },
  }
);

const AccountModel = mongoose.model<AccountDoccument>("Account", accountSchema);
export default AccountModel;