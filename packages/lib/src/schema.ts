export type AnalysisStatus = 'pending' | 'processing' | 'completed' | 'error';

export interface AxisScores {
  taste: number;
  service: number;
  atmosphere: number;
  cost: number;
}

export interface UsageScores {
  business: number; // 接待・会食
  date: number;     // デート
  solo: number;     // お一人様
  family: number;   // 家族連れ
  group: number;    // 団体利用
}

export interface Place {
  id: string; // Google Place ID
  name: string;
  address?: string;
  originalRating: number;
  userRatingsTotal: number;
  priceLevel?: string;
  priceRange?: {
    startPrice?: { currencyCode: string; units: string; nanos?: number };
    endPrice?: { currencyCode: string; units: string; nanos?: number };
  };
  reviews?: string[]; // Array of review texts

  // Detailed Info
  detailedInfo?: {
    paymentOptions?: string[];
    serviceOptions?: {
      delivery?: boolean;
      takeout?: boolean;
      dineIn?: boolean;
      reservable?: boolean;
    };
    offerings?: {
      servesBeer?: boolean;
      servesWine?: boolean;
      servesVegetarianFood?: boolean;
      servesCoffee?: boolean;
    };
    diningOptions?: {
      servesBreakfast?: boolean;
      servesLunch?: boolean;
      servesDinner?: boolean;
    };
    amenities?: {
      restroom?: boolean;
      goodForChildren?: boolean;
      goodForGroups?: boolean;
    };
    atmosphere?: {
      romantic?: boolean;
      casual?: boolean;
      cozy?: boolean;
    };
  };

  // Analysis Data
  status: AnalysisStatus;
  trueScore?: number;
  axisScores?: AxisScores;
  usageScores?: UsageScores;
  usageSummary?: string; // 利用シーン評価の根拠
  summary?: string;
  gapReason?: string;
  axisAnalysis?: {
    taste: { pros: string[]; cons: string[]; summary: string; };
    service: { pros: string[]; cons: string[]; summary: string; };
    atmosphere: { pros: string[]; cons: string[]; summary: string; };
    cost: { pros: string[]; cons: string[]; summary: string; };
  };

  analysisStats?: {
    totalReviewsFetched: number;
    validReviews: number;
    excludedReviews: number;
    exclusionRatio: number;
  };

  lastAnalyzedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
