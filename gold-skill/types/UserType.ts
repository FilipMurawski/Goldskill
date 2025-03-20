export type PaymentType = {
    createdAt: Date;
    amount: number;
    currency: string;
  };
  
  export type UserSubscriptionType = {
    subscription: SubscriptionType;
    createdAt: Date;
    id: string;
    isActive: boolean;
  };
  
  export type SubscriptionType = {
    name: string;
    period: number;
    description: string;
    price: number;
    isActive: boolean;
  }

  export type PartnerType = {
    email: string | null;
  }
  
  export type UserType = {
    id: string;
    name: string | null;
    email: string | null;
    role: "ADMIN" | "USER" | "ACTIVE_USER";
    isActive: boolean;
    createdAt: Date;
    partnerId?: string | null;
    userSubscription?: UserSubscriptionType[];
    payments: PaymentType[];
    hasMarketingAgreement: boolean;
    hasRODOAgreement: boolean;
  };