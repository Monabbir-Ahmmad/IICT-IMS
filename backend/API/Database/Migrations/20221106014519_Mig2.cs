using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Database.Migrations
{
    public partial class Mig2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "DistributionHistory",
                columns: table => new
                {
                    DistributionHistoryId = table.Column<int>(type: "INTEGER", nullable: false),
                    ProductsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DistributionHistory", x => new { x.DistributionHistoryId, x.ProductsId });
                    table.ForeignKey(
                        name: "FK_DistributionHistory_Distributions_DistributionHistoryId",
                        column: x => x.DistributionHistoryId,
                        principalTable: "Distributions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DistributionHistory_InventoryProducts_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "InventoryProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DistributionHistory_ProductsId",
                table: "DistributionHistory",
                column: "ProductsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DistributionHistory");

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
                principalColumn: "Id");
        }
    }
}
