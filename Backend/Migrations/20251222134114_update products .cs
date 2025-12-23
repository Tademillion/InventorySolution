using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InventorySystemSolution.Migrations
{
    /// <inheritdoc />
    public partial class updateproducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6a05ba2e-3e39-42d9-8c20-f2dc81753a47");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b6b55d09-6dce-47d3-9b26-fa3bf03abd02");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dbf2c25f-d1ae-4f3f-9baf-0bd494423248");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0bd4d40b-a73d-4da2-b831-5a8107bea3af", null, "Cashier", "CASHIER" },
                    { "7e3374d6-071a-44b0-bc4d-8e8498922d09", null, "Admin", "ADMIN" },
                    { "d9aa35b5-f720-4623-94cc-c98d02453c74", null, "Auditor", "AUDITOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0bd4d40b-a73d-4da2-b831-5a8107bea3af");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7e3374d6-071a-44b0-bc4d-8e8498922d09");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d9aa35b5-f720-4623-94cc-c98d02453c74");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6a05ba2e-3e39-42d9-8c20-f2dc81753a47", null, "Admin", "ADMIN" },
                    { "b6b55d09-6dce-47d3-9b26-fa3bf03abd02", null, "Auditor", "AUDITOR" },
                    { "dbf2c25f-d1ae-4f3f-9baf-0bd494423248", null, "Cashier", "CASHIER" }
                });
        }
    }
}
