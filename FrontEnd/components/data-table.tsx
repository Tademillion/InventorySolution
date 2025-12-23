"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Column<T> {
  header: string
  accessor: keyof T | ((row: T) => React.ReactNode)
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchKey?: keyof T
  searchPlaceholder?: string
  actions?: (row: T) => React.ReactNode
}

export function DataTable<T extends {  }>({
  data,
  columns,
  searchKey,
  searchPlaceholder = "Search...",
  actions,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = searchKey
    ? data.filter((item) => {
        const value = item[searchKey]
        return String(value).toLowerCase().includes(searchTerm.toLowerCase())
      })
    : data

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      )}

      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {columns.map((column, index) => (
                  <th key={index} className="px-4 py-3 text-left text-sm font-medium">
                    {column.header}
                  </th>
                ))}
                {actions && <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                filteredData.map((row,index) => (
                  <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className={`px-4 py-3 text-sm ${column.className || ""}`}>
                        {typeof column.accessor === "function"
                          ? column.accessor(row)
                          : String(row[column.accessor] ?? "")}
                      </td>
                    ))}
                    {actions && <td className="px-4 py-3 text-right">{actions(row)}</td>}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
