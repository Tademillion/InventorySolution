// Brand Configuration
export const BRAND = {
  name: "InventoryPro",
  tagline: "Enterprise Inventory Management System",
  version: "2.0.0",
  copyright: `© ${new Date().getFullYear()} InventoryPro. All rights reserved.`,
} as const

// API Configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 30000,
  retryAttempts: 3,
} as const

// Feature Flags
export const FEATURES = {
  aiInsights: true,
  batchTracking: true,
  expiryManagement: true,
  multiWarehouse: true,
  autoReorder: true,
  advancedAnalytics: true,
  auditTrail: true,
} as const

// Pagination
export const PAGINATION = {
  defaultPageSize: 20,
  pageSizeOptions: [10, 20, 50, 100],
} as const

// Stock Levels
export const STOCK_LEVELS = {
  critical: 0,
  low: 0.2, // 20% of reorder level
  warning: 0.5, // 50% of reorder level
  healthy: 1, // at or above reorder level
} as const

// Role Permissions
export const PERMISSIONS = {
  admin: {
    canManageUsers: true,
    canManageProducts: true,
    canManageInvoices: true,
    canManageSuppliers: true,
    canManageCustomers: true,
    canViewReports: true,
    canViewAuditTrail: true,
    canManageSettings: true,
    canManageWarehouses: true,
  },
  cashier: {
    canManageUsers: false,
    canManageProducts: false,
    canManageInvoices: true, // only sales
    canManageSuppliers: false,
    canManageCustomers: true,
    canViewReports: false,
    canViewAuditTrail: false,
    canManageSettings: false,
    canManageWarehouses: false,
  },
  auditor: {
    canManageUsers: false,
    canManageProducts: false,
    canManageInvoices: false,
    canManageSuppliers: false,
    canManageCustomers: false,
    canViewReports: true,
    canViewAuditTrail: true,
    canManageSettings: false,
    canManageWarehouses: false,
  },
} as const

// Date Formats
export const DATE_FORMATS = {
  display: "MMM dd, yyyy",
  displayWithTime: "MMM dd, yyyy HH:mm",
  input: "yyyy-MM-dd",
  api: "yyyy-MM-dd'T'HH:mm:ss",
} as const
