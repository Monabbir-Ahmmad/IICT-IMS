using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Database.Migrations
{
    public partial class Mig4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SupplierId",
                table: "PurchaseOrders",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrders_SupplierId",
                table: "PurchaseOrders",
                column: "SupplierId");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseOrders_Suppliers_SupplierId",
                table: "PurchaseOrders",
                column: "SupplierId",
                principalTable: "Suppliers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseOrders_Suppliers_SupplierId",
                table: "PurchaseOrders");

            migrationBuilder.DropIndex(
                name: "IX_PurchaseOrders_SupplierId",
                table: "PurchaseOrders");

            migrationBuilder.DropColumn(
                name: "SupplierId",
                table: "PurchaseOrders");
        }
    }
}
