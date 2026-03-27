import { Client, Material, Quote, Order, ProductionOrder, StockMovement, FinancialEntry, Invoice, SystemConfig } from '@/types';

export const mockClients: Client[] = [
  { id: '1', name: 'Metalúrgica São Paulo', email: 'contato@metalsp.com.br', phone: '(11) 99999-0001', cnpj: '12.345.678/0001-01', address: 'Rua Industrial, 100 - SP', customPrice: undefined, discount: 5, createdAt: '2024-01-15' },
  { id: '2', name: 'Indústria ABC Ltda', email: 'compras@abc.com.br', phone: '(11) 99999-0002', cnpj: '23.456.789/0001-02', address: 'Av. das Máquinas, 200 - SP', customPrice: undefined, discount: 0, createdAt: '2024-02-20' },
  { id: '3', name: 'Estruturas Delta', email: 'orcamento@delta.com.br', phone: '(11) 99999-0003', cnpj: '34.567.890/0001-03', address: 'Rod. Estrutural, 300 - MG', customPrice: undefined, discount: 10, createdAt: '2024-03-10' },
];

export const mockMaterials: Material[] = [
  { id: '1', name: 'Aço Carbono 1020', thickness: 3, width: 3000, height: 1500, pricePerKg: 5.5, density: 7850, quantity: 25, minStock: 5 },
  { id: '2', name: 'Aço Carbono 1020', thickness: 6, width: 3000, height: 1500, pricePerKg: 5.5, density: 7850, quantity: 18, minStock: 5 },
  { id: '3', name: 'Aço Carbono 1020', thickness: 10, width: 3000, height: 1500, pricePerKg: 5.8, density: 7850, quantity: 12, minStock: 3 },
  { id: '4', name: 'Aço Inox 304', thickness: 2, width: 3000, height: 1500, pricePerKg: 18.0, density: 7930, quantity: 8, minStock: 3 },
  { id: '5', name: 'Aço Inox 304', thickness: 4, width: 3000, height: 1500, pricePerKg: 18.5, density: 7930, quantity: 6, minStock: 2 },
  { id: '6', name: 'Alumínio 5052', thickness: 3, width: 2500, height: 1250, pricePerKg: 22.0, density: 2680, quantity: 10, minStock: 3 },
];

export const mockQuotes: Quote[] = [
  {
    id: 'ORC-001', clientId: '1', clientName: 'Metalúrgica São Paulo',
    pieces: [
      { id: 'p1', name: 'Flange Redonda', width: 200, height: 200, quantity: 50, cuttingLength: 628, pierces: 4, materialId: '1' },
      { id: 'p2', name: 'Suporte L', width: 150, height: 100, quantity: 100, cuttingLength: 480, pierces: 2, materialId: '1' },
    ],
    materialId: '1', materialName: 'Aço Carbono 1020', thickness: 3,
    totalCuttingTime: 85, totalCost: 1200, totalPrice: 1800,
    status: 'approved', createdAt: '2024-03-15'
  },
  {
    id: 'ORC-002', clientId: '2', clientName: 'Indústria ABC Ltda',
    pieces: [
      { id: 'p3', name: 'Placa Base', width: 500, height: 300, quantity: 20, cuttingLength: 1600, pierces: 8, materialId: '2' },
    ],
    materialId: '2', materialName: 'Aço Carbono 1020', thickness: 6,
    totalCuttingTime: 120, totalCost: 2400, totalPrice: 3600,
    status: 'sent', createdAt: '2024-03-18'
  },
  {
    id: 'ORC-003', clientId: '3', clientName: 'Estruturas Delta',
    pieces: [
      { id: 'p4', name: 'Reforço Estrutural', width: 800, height: 400, quantity: 10, cuttingLength: 2400, pierces: 6, materialId: '3' },
    ],
    materialId: '3', materialName: 'Aço Carbono 1020', thickness: 10,
    totalCuttingTime: 200, totalCost: 4500, totalPrice: 6750,
    status: 'draft', createdAt: '2024-03-20'
  },
];

export const mockOrders: Order[] = [
  {
    id: 'PED-001', quoteId: 'ORC-001', clientName: 'Metalúrgica São Paulo',
    status: 'production', pieces: mockQuotes[0].pieces, materialName: 'Aço Carbono 1020 - 3mm',
    totalPrice: 1800, createdAt: '2024-03-16'
  },
  {
    id: 'PED-002', quoteId: 'ORC-002', clientName: 'Indústria ABC Ltda',
    status: 'waiting', pieces: mockQuotes[1].pieces, materialName: 'Aço Carbono 1020 - 6mm',
    totalPrice: 3600, createdAt: '2024-03-19'
  },
];

export const mockProduction: ProductionOrder[] = [
  { id: 'PROD-001', orderId: 'PED-001', clientName: 'Metalúrgica São Paulo', pieceName: 'Flange Redonda', quantity: 50, estimatedTime: 45, status: 'cutting', startedAt: '2024-03-20T08:00:00' },
  { id: 'PROD-002', orderId: 'PED-001', clientName: 'Metalúrgica São Paulo', pieceName: 'Suporte L', quantity: 100, estimatedTime: 40, status: 'queued' },
  { id: 'PROD-003', orderId: 'PED-002', clientName: 'Indústria ABC Ltda', pieceName: 'Placa Base', quantity: 20, estimatedTime: 120, status: 'queued' },
];

export const mockStockMovements: StockMovement[] = [
  { id: '1', materialId: '1', materialName: 'Aço Carbono 1020 - 3mm', type: 'in', quantity: 10, reason: 'Compra fornecedor', date: '2024-03-01' },
  { id: '2', materialId: '1', materialName: 'Aço Carbono 1020 - 3mm', type: 'out', quantity: 3, reason: 'PED-001 - Produção', date: '2024-03-16' },
  { id: '3', materialId: '2', materialName: 'Aço Carbono 1020 - 6mm', type: 'in', quantity: 8, reason: 'Compra fornecedor', date: '2024-03-05' },
];

export const mockFinancial: FinancialEntry[] = [
  { id: '1', type: 'income', category: 'Vendas', description: 'PED-001 - Metalúrgica São Paulo', amount: 1800, date: '2024-03-16', orderId: 'PED-001' },
  { id: '2', type: 'expense', category: 'Material', description: 'Compra Aço Carbono 3mm', amount: 2500, date: '2024-03-01' },
  { id: '3', type: 'expense', category: 'Gás', description: 'Nitrogênio industrial', amount: 800, date: '2024-03-10' },
  { id: '4', type: 'income', category: 'Vendas', description: 'Serviço avulso', amount: 450, date: '2024-03-12' },
  { id: '5', type: 'expense', category: 'Manutenção', description: 'Troca de lente laser', amount: 1200, date: '2024-03-14' },
  { id: '6', type: 'income', category: 'Vendas', description: 'PED-002 parcial', amount: 1800, date: '2024-03-19' },
];

export const mockInvoices: Invoice[] = [
  { id: '1', number: 'NF-000123', clientName: 'Metalúrgica São Paulo', orderId: 'PED-001', amount: 1800, status: 'issued', issuedAt: '2024-03-17', createdAt: '2024-03-16' },
  { id: '2', number: 'NF-000124', clientName: 'Indústria ABC Ltda', orderId: 'PED-002', amount: 3600, status: 'pending', createdAt: '2024-03-19' },
];

export const defaultConfig: SystemConfig = {
  pricePerMinute: 3.50,
  pricePerPierce: 0.80,
  profitMargin: 50,
  speedTable: [
    { material: 'Aço Carbono', thickness: 2, speed: 8000 },
    { material: 'Aço Carbono', thickness: 3, speed: 6000 },
    { material: 'Aço Carbono', thickness: 6, speed: 3500 },
    { material: 'Aço Carbono', thickness: 10, speed: 1800 },
    { material: 'Aço Carbono', thickness: 12, speed: 1400 },
    { material: 'Aço Carbono', thickness: 16, speed: 900 },
    { material: 'Aço Carbono', thickness: 20, speed: 600 },
    { material: 'Aço Inox', thickness: 2, speed: 7000 },
    { material: 'Aço Inox', thickness: 4, speed: 4000 },
    { material: 'Aço Inox', thickness: 6, speed: 2500 },
    { material: 'Alumínio', thickness: 2, speed: 10000 },
    { material: 'Alumínio', thickness: 3, speed: 8000 },
    { material: 'Alumínio', thickness: 6, speed: 4500 },
  ],
};
