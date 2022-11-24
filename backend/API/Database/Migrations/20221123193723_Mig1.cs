using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Database.Migrations
{
    public partial class Mig1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DirectPurchaseId",
                table: "InventoryProducts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DirectPurchases",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CategoryId = table.Column<int>(type: "int", nullable: true),
                    VoucherId = table.Column<int>(type: "int", nullable: true),
                    PurchaseDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    SupplierName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SupplierContact = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SupplierAddress = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DirectPurchases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DirectPurchases_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DirectPurchases_Vouchers_VoucherId",
                        column: x => x.VoucherId,
                        principalTable: "Vouchers",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryProducts_DirectPurchaseId",
                table: "InventoryProducts",
                column: "DirectPurchaseId");

            migrationBuilder.CreateIndex(
                name: "IX_DirectPurchases_CategoryId",
                table: "DirectPurchases",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_DirectPurchases_VoucherId",
                table: "DirectPurchases",
                column: "VoucherId");

            migrationBuilder.AddForeignKey(
                name: "FK_InventoryProducts_DirectPurchases_DirectPurchaseId",
                table: "InventoryProducts",
                column: "DirectPurchaseId",
                principalTable: "DirectPurchases",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InventoryProducts_DirectPurchases_DirectPurchaseId",
                table: "InventoryProducts");

            migrationBuilder.DropTable(
                name: "DirectPurchases");

            migrationBuilder.DropIndex(
                name: "IX_InventoryProducts_DirectPurchaseId",
                table: "InventoryProducts");

            migrationBuilder.DropColumn(
                name: "DirectPurchaseId",
                table: "InventoryProducts");
        }
    }
}
