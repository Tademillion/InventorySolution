using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InventorySystemSolution.Migrations
{
    /// <inheritdoc />
    public partial class addSKURulesasForStandardSKu : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "31f4da75-998a-4e86-b213-4c6266dde0ce");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "654eb271-abd2-4c95-b445-7941aa3aeea5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d2408e30-788e-45e5-b961-e97250415acc");

            migrationBuilder.CreateTable(
                name: "SkuRules",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Pattern = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentSequence = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SkuRules", x => x.Id);
                });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SkuRules");

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

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "31f4da75-998a-4e86-b213-4c6266dde0ce", null, "Admin", "ADMIN" },
                    { "654eb271-abd2-4c95-b445-7941aa3aeea5", null, "Auditor", "AUDITOR" },
                    { "d2408e30-788e-45e5-b961-e97250415acc", null, "Cashier", "CASHIER" }
                });
        }
    }
}
