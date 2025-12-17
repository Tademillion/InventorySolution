using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InventorySystemSolution.Migrations
{
    /// <inheritdoc />
    public partial class updatewarehouseentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "Capacity",
                table: "Warehouses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CurrentUtilization",
                table: "Warehouses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ManagerId",
                table: "Warehouses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ManagerName",
                table: "Warehouses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b36c0e2c-18ce-4f80-bbc8-5dc42a0e0986", null, "Auditor", "AUDITOR" },
                    { "dc49febc-692c-4fc9-a686-d398b85a1f29", null, "Cashier", "CASHIER" },
                    { "f26f9769-3e4c-4546-81cb-0187aed35ec5", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b36c0e2c-18ce-4f80-bbc8-5dc42a0e0986");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dc49febc-692c-4fc9-a686-d398b85a1f29");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f26f9769-3e4c-4546-81cb-0187aed35ec5");

            migrationBuilder.DropColumn(
                name: "Capacity",
                table: "Warehouses");

            migrationBuilder.DropColumn(
                name: "CurrentUtilization",
                table: "Warehouses");

            migrationBuilder.DropColumn(
                name: "ManagerId",
                table: "Warehouses");

            migrationBuilder.DropColumn(
                name: "ManagerName",
                table: "Warehouses");

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
    }
}
