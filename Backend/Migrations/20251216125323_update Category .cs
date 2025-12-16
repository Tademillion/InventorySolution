using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InventorySystemSolution.Migrations
{
    /// <inheritdoc />
    public partial class updateCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "86d74fd9-ab6e-4a6d-9e8d-7b66d59a3e76");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bdb48bda-1e1b-4b33-a310-a79abd890abf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d9da5104-c6e7-4918-8567-61524e22d4f9");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Categories",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Categories",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1164856c-eb6c-44e9-8a13-bafe23b67b4b", null, "Admin", "ADMIN" },
                    { "1f713ec9-e8f2-4eb5-91dc-a7ec99365e31", null, "Cashier", "CASHIER" },
                    { "5ddccfd6-df84-4e0b-bbf3-b7bfefda41ff", null, "Auditor", "AUDITOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1164856c-eb6c-44e9-8a13-bafe23b67b4b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1f713ec9-e8f2-4eb5-91dc-a7ec99365e31");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5ddccfd6-df84-4e0b-bbf3-b7bfefda41ff");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Categories");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "86d74fd9-ab6e-4a6d-9e8d-7b66d59a3e76", null, "Auditor", "AUDITOR" },
                    { "bdb48bda-1e1b-4b33-a310-a79abd890abf", null, "Admin", "ADMIN" },
                    { "d9da5104-c6e7-4918-8567-61524e22d4f9", null, "Cashier", "CASHIER" }
                });
        }
    }
}
