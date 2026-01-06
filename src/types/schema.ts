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


export interface HotPepperData {
  id: string;
  name: string;
  url: string;
  imageUrl?: string;
  station?: string;
  access?: string;
  catchCopy?: string;
  budgetAverage?: string;

  // Flags
  hasLunch?: string;
  hasMidnight?: string;
  hasChild?: string;
  hasPet?: string;
  hasParking?: string;
  hasBarrierFree?: string;
  hasWifi?: string;
  hasCourse?: string;
  hasFreeDrink?: string;
  hasFreeFood?: string;
  hasPrivateRoom?: string;
  hasTatami?: string;
  hasHorigotatsu?: string;
  hasCard?: string;
  hasEnglish?: string;
}

export interface Place {
  id: string; // Google Place ID
  name: string;
  hotpepper?: HotPepperData; // Linked HotPepper Data
  address?: string;
  originalRating: number;
  userRatingsTotal: number;
  priceLevel?: string;
  priceRange?: {
    startPrice?: { currencyCode: string; units: string; nanos?: number };
    endPrice?: { currencyCode: string; units: string; nanos?: number };
  };
  reviews?: string[]; // Array of review texts

  // Location Info
  location?: {
    lat: number;
    lng: number;
  };
  nearestStation?: string; // e.g. "六本木駅 350m"

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
  summary?: string[]; // AI Summary formatted as a list of key points
  gapReason?: string;
  axisAnalysis?: {
    taste: { pros: string[]; cons: string[]; summary: string; };
    service: { pros: string[]; cons: string[]; summary: string; };
    atmosphere: { pros: string[]; cons: string[]; summary: string; };
    cost: { pros: string[]; cons: string[]; summary: string; };
  };

  // AI Feature Extraction (Recommendation Engine)
  area?: string[]; // Standardized area hierarchy (e.g. ["Tokyo", "Shinjuku City"])
  genre?: string[]; // Standardized genres from API Types (e.g. ["ramen_restaurant"])

  // Master Feature Vector (-1.0 to 1.0)
  featureVector?: Record<string, number>;

  // Semantic Embedding (Vertex AI text-embedding-005)
  embeddingSourceText?: string; // Logic: "[Name] is [Genre] in [Area]. [Tags]. [Summary]"
  embeddingVector?: number[]; // 768-dim vector

  // Keep for UI display (optional/derived)
  featureTags?: {
    tag: string; // e.g. "Rich Soup"
    axis: 'taste' | 'service' | 'atmosphere' | 'cost';
  }[];

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

