// ===== TYPES =====

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  address: string;
  customPrice?: number;
  discount?: number;
  createdAt: string;
}

export interface Material {
  id: string;
  name: string;
  thickness: number; // mm
  width: number; // mm
  height: number; // mm
  pricePerKg: number;
  density: number; // kg/m³
  quantity: number;
  minStock: number;
}

export interface QuotePiece {
  id: string;
  name: string;
  width: number;
  height: number;
  quantity: number;
  cuttingLength: number; // mm
  pierces: number;
  materialId: string;
}

export interface Quote {
  id: string;
  clientId: string;
  clientName: string;
  pieces: QuotePiece[];
  materialId: string;
  materialName: string;
  thickness: number;
  totalCuttingTime: number; // min
  totalCost: number;
  totalPrice: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Order {
  id: string;
  quoteId: string;
  clientName: string;
  status: 'waiting' | 'production' | 'finished';
  pieces: QuotePiece[];
  materialName: string;
  totalPrice: number;
  createdAt: string;
  finishedAt?: string;
}

export interface ProductionOrder {
  id: string;
  orderId: string;
  clientName: string;
  pieceName: string;
  quantity: number;
  estimatedTime: number; // min
  status: 'queued' | 'cutting' | 'done';
  startedAt?: string;
  completedAt?: string;
}

export interface StockMovement {
  id: string;
  materialId: string;
  materialName: string;
  type: 'in' | 'out';
  quantity: number;
  reason: string;
  date: string;
}

export interface FinancialEntry {
  id: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: string;
  orderId?: string;
}

export interface Invoice {
  id: string;
  number: string;
  clientName: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'issued' | 'cancelled';
  issuedAt?: string;
  createdAt: string;
}

export interface SystemConfig {
  pricePerMinute: number;
  pricePerPierce: number;
  profitMargin: number;
  speedTable: SpeedEntry[];
}

export interface SpeedEntry {
  material: string;
  thickness: number;
  speed: number; // mm/min
}
