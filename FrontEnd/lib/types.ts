export type UserRole = "admin" | "cashier" | "auditor"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: Date
}

export interface Product {
  id: string
  sku: string
  name: string
  description: string
  categoryId: string
  categoryName: string
  price: number
  cost: number
  stock: number
  reorderLevel: number
  reorderQuantity: number
  supplierId: string
  supplierName: string
  warehouseId: string
  warehouseName: string
  hasBatchTracking: boolean
  hasExpiryTracking: boolean
  unit: string
  barcode?: string
  imageUrl?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description: string
  parentId?: string
  parentName?: string
  isActive: boolean
  createdAt: Date
}

export interface Supplier {
  id: string
  name: string
  code: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  contactPerson?: string
  paymentTerms?: string
  rating?: number
  isActive: boolean
  createdAt: Date
}

export interface Customer {
  id: string
  name: string
  code: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  creditLimit?: number
  outstandingBalance?: number
  isActive: boolean
  createdAt: Date
}

export type InvoiceType = "purchase" | "sales"
export type InvoiceStatus = "draft" | "confirmed" | "cancelled" | "returned"

export interface Invoice {
  id: string
  invoiceNumber: string
  type: InvoiceType
  status: InvoiceStatus
  customerId?: string
  customerName?: string
  supplierId?: string
  supplierName?: string
  warehouseId: string
  warehouseName: string
  subtotal: number
  taxAmount: number
  discountAmount: number
  total: number
  paymentMethod?: string
  paymentStatus?: "pending" | "partial" | "paid"
  notes?: string
  createdBy: string
  createdByName: string
  items: InvoiceItem[]
  createdAt: Date
  confirmedAt?: Date
  dueDate?: Date
}

export interface InvoiceItem {
  id: string
  invoiceId: string
  productId: string
  productName: string
  batchId?: string
  batchNumber?: string
  quantity: number
  unitPrice: number
  discountPercent: number
  taxPercent: number
  totalPrice: number
}

export type MovementType = "IN" | "OUT" | "ADJUSTMENT" | "TRANSFER"
export type MovementReason = "purchase" | "sales" | "adjustment" | "return" | "transfer" | "damage" | "theft"

export interface StockMovement {
  id: string
  productId: string
  productName: string
  batchId?: string
  batchNumber?: string
  fromWarehouseId?: string
  fromWarehouseName?: string
  toWarehouseId?: string
  toWarehouseName?: string
  quantity: number
  type: MovementType
  reason: MovementReason
  referenceId?: string
  referenceType?: "invoice" | "adjustment" | "transfer"
  notes?: string
  createdBy: string
  createdByName: string
  approvedBy?: string
  approvedByName?: string
  createdAt: Date
  approvedAt?: Date
}

export interface AIInsight {
  id: string
  type: "warning" | "info" | "success" | "critical"
  category: InsightCategory
  title: string
  description: string
  recommendation?: string
  productId?: string
  productName?: string
  impact: "high" | "medium" | "low"
  confidence: number
  isActionable: boolean
  actionTaken?: boolean
  createdAt: Date
  expiresAt?: Date
}

export type InsightCategory =
  | "stock_level"
  | "demand_forecast"
  | "expiry_alert"
  | "pricing"
  | "supplier_performance"
  | "sales_trend"
  | "anomaly"
  | "reorder"

export interface DashboardMetrics {
  totalRevenue: number
  revenueChange: number
  totalOrders: number
  ordersChange: number
  lowStockItems: number
  stockChange: number
  expiringSoon: number
  expiryChange: number
  topSellingProducts: Array<{ productId: string; productName: string; quantity: number; revenue: number }>
  recentActivity: Array<{ id: string; type: string; description: string; timestamp: Date }>
  warehouseUtilization: Array<{ warehouseId: string; warehouseName: string; utilization: number }>
}

export interface Report {
  id: string
  name: string
  type: ReportType
  description: string
  parameters: Record<string, unknown>
  generatedBy: string
  generatedByName: string
  fileUrl?: string
  status: "generating" | "completed" | "failed"
  createdAt: Date
}

export type ReportType =
  | "inventory_valuation"
  | "stock_movement"
  | "sales_summary"
  | "purchase_summary"
  | "expiry_report"
  | "audit_trail"
  | "supplier_performance"
  | "customer_analysis"
  | "profit_loss"

export interface SystemSettings {
  id: string
  companyName: string
  companyEmail: string
  companyPhone: string
  companyAddress: string
  currency: string
  taxRate: number
  lowStockThreshold: number
  expiryWarningDays: number
  autoReorderEnabled: boolean
  autoReorderLeadTime: number
  emailNotifications: boolean
  smsNotifications: boolean
  updatedAt: Date
  updatedBy: string
}

export interface AuditLog {
  id: string
  userId: string
  userName: string
  userRole: UserRole
  action: AuditAction
  entityType: EntityType
  entityId: string
  entityName?: string
  changes?: Record<string, { old: unknown; new: unknown }>
  metadata?: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
  createdAt: Date
}

export type AuditAction = "create" | "update" | "delete" | "view" | "export" | "login" | "logout" | "approve" | "reject"

export type EntityType =
  | "product"
  | "category"
  | "supplier"
  | "customer"
  | "invoice"
  | "stock_movement"
  | "user"
  | "warehouse"
  | "batch"
  | "settings"

export interface Warehouse {
  id: string
  name: string
  code: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  managerId?: string
  managerName?: string
  isActive: boolean
  capacity?: number
  currentUtilization?: number
  createdAt: Date
  updatedAt: Date
}

export interface Batch {
  id: string
  batchNumber: string
  productId: string
  productName: string
  warehouseId: string
  warehouseName: string
  quantity: number
  manufacturingDate?: Date
  expiryDate?: Date
  supplierBatchNumber?: string
  notes?: string
  status: "active" | "expired" | "recalled"
  createdAt: Date
  updatedAt: Date
}
