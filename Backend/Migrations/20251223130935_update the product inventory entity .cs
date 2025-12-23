using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InventorySystemSolution.Migrations
{
    /// <inheritdoc />
    public partial class updatetheproductinventoryentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductInventory_Categories_CategoryId",
                table: "ProductInventory");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4b1eaee6-5346-4516-a3b3-f698a5e82fb6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dd609349-0fea-42ae-9c56-2ca936971352");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f5673164-98b9-4532-876c-6cb0d19029c3");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ProductInventory");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "ProductInventory");

            migrationBuilder.DropColumn(
                name: "Sku",
                table: "ProductInventory");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "ProductInventory",
                newName: "ProductId1");

            migrationBuilder.RenameIndex(
                name: "IX_ProductInventory_CategoryId",
                table: "ProductInventory",
                newName: "IX_ProductInventory_ProductId1");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3ee04b0a-a73a-45c4-a385-f63e748a28c2", null, "Auditor", "AUDITOR" },
                    { "58b0e905-c63e-4245-b484-c3fef5e79846", null, "Admin", "ADMIN" },
                    { "8a01ca94-b218-4710-b0ba-c4aa7a8a1033", null, "Cashier", "CASHIER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_ProductInventory_Products_ProductId1",
                table: "ProductInventory",
                column: "ProductId1",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductInventory_Products_ProductId1",
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

            migrationBuilder.RenameColumn(
                name: "ProductId1",
                table: "ProductInventory",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductInventory_ProductId1",
                table: "ProductInventory",
                newName: "IX_ProductInventory_CategoryId");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ProductInventory",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ProductInventory",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Sku",
                table: "ProductInventory",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4b1eaee6-5346-4516-a3b3-f698a5e82fb6", null, "Cashier", "CASHIER" },
                    { "dd609349-0fea-42ae-9c56-2ca936971352", null, "Auditor", "AUDITOR" },
                    { "f5673164-98b9-4532-876c-6cb0d19029c3", null, "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_ProductInventory_Categories_CategoryId",
                table: "ProductInventory",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
