using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Database.Migrations
{
    public partial class Mig3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DistributionId",
                table: "InventoryProducts",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_InventoryProducts_DistributionId",
                table: "InventoryProducts",
                column: "DistributionId");

            migrationBuilder.AddForeignKey(
                name: "FK_InventoryProducts_Distributions_DistributionId",
                table: "InventoryProducts",
                column: "DistributionId",
                principalTable: "Distributions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InventoryProducts_Distributions_DistributionId",
                table: "InventoryProducts");

            migrationBuilder.DropIndex(
                name: "IX_InventoryProducts_DistributionId",
                table: "InventoryProducts");

            migrationBuilder.DropColumn(
                name: "DistributionId",
                table: "InventoryProducts");
        }
    }
}
