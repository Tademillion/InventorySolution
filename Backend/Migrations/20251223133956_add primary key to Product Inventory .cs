using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InventorySystemSolution.Migrations
{
    /// <inheritdoc />
    public partial class addprimarykeytoProductInventory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductInventory_Products_ProductId1",
                table: "ProductInventory");

            migrationBuilder.DropForeignKey(
                name: "FK_StockMovements_ProductInventory_ProductInventoryProductId",
                table: "StockMovements");

            migrationBuilder.DropIndex(
                name: "IX_StockMovements_ProductInventoryProductId",
                table: "StockMovements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductInventory",
                table: "ProductInventory");

            migrationBuilder.DropIndex(
                name: "IX_ProductInventory_ProductId1",
                table: "ProductInventory");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3ee04b0a-a73a-45c4-a385-f63e748a28c2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "58b0e905-c63e-4245-b484-c3fef5e79846");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8a01ca94-b218-4710-b0ba-c4aa7a8a1033");

            migrationBuilder.DropColumn(
                name: "ProductInventoryProductId",
                table: "StockMovements");

            migrationBuilder.DropColumn(
                name: "ProductId1",
                table: "ProductInventory");

            migrationBuilder.AddColumn<int>(
                name: "ProductInventoryId",
                table: "StockMovements",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "ProductInventory",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductInventory",
                table: "ProductInventory",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3a6844db-8985-47c0-bae4-1df7c851f2d5", null, "Auditor", "AUDITOR" },
                    { "6d9bdc66-5bcb-4d2f-8efe-4b0e668d6f2d", null, "Cashier", "CASHIER" },
                    { "926839b5-f68f-4950-98fe-8da493424349", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_StockMovements_ProductInventoryId",
                table: "StockMovements",
                column: "ProductInventoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductInventory_ProductId",
                table: "ProductInventory",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductInventory_Products_ProductId",
                table: "ProductInventory",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StockMovements_ProductInventory_ProductInventoryId",
                table: "StockMovements",
                column: "ProductInventoryId",
                principalTable: "ProductInventory",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductInventory_Products_ProductId",
                table: "ProductInventory");

            migrationBuilder.DropForeignKey(
                name: "FK_StockMovements_ProductInventory_ProductInventoryId",
                table: "StockMovements");

            migrationBuilder.DropIndex(
                name: "IX_StockMovements_ProductInventoryId",
                table: "StockMovements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductInventory",
                table: "ProductInventory");

            migrationBuilder.DropIndex(
                name: "IX_ProductInventory_ProductId",
                table: "ProductInventory");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3a6844db-8985-47c0-bae4-1df7c851f2d5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6d9bdc66-5bcb-4d2f-8efe-4b0e668d6f2d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "926839b5-f68f-4950-98fe-8da493424349");

            migrationBuilder.DropColumn(
                name: "ProductInventoryId",
                table: "StockMovements");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ProductInventory");

            migrationBuilder.AddColumn<Guid>(
                name: "ProductInventoryProductId",
                table: "StockMovements",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ProductId1",
                table: "ProductInventory",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductInventory",
                table: "ProductInventory",
                column: "ProductId");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3ee04b0a-a73a-45c4-a385-f63e748a28c2", null, "Auditor", "AUDITOR" },
                    { "58b0e905-c63e-4245-b484-c3fef5e79846", null, "Admin", "ADMIN" },
                    { "8a01ca94-b218-4710-b0ba-c4aa7a8a1033", null, "Cashier", "CASHIER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_StockMovements_ProductInventoryProductId",
                table: "StockMovements",
                column: "ProductInventoryProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductInventory_ProductId1",
                table: "ProductInventory",
                column: "ProductId1");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductInventory_Products_ProductId1",
                table: "ProductInventory",
                column: "ProductId1",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StockMovements_ProductInventory_ProductInventoryProductId",
                table: "StockMovements",
                column: "ProductInventoryProductId",
                principalTable: "ProductInventory",
                principalColumn: "ProductId");
        }
    }
}
