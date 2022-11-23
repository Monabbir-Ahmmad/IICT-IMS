using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Database.Migrations
{
    public partial class Mig5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ReceiveReturns",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ReceiverId = table.Column<int>(type: "INTEGER", nullable: true),
                    ReceivedFromId = table.Column<int>(type: "INTEGER", nullable: true),
                    ReceivingDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReceiveReturns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReceiveReturns_Users_ReceivedFromId",
                        column: x => x.ReceivedFromId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ReceiveReturns_Users_ReceiverId",
                        column: x => x.ReceiverId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ReceiveReturnHistory",
                columns: table => new
                {
                    ProductsId = table.Column<int>(type: "INTEGER", nullable: false),
                    ReceiveReturnHistoryId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReceiveReturnHistory", x => new { x.ProductsId, x.ReceiveReturnHistoryId });
                    table.ForeignKey(
                        name: "FK_ReceiveReturnHistory_InventoryProducts_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "InventoryProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReceiveReturnHistory_ReceiveReturns_ReceiveReturnHistoryId",
                        column: x => x.ReceiveReturnHistoryId,
                        principalTable: "ReceiveReturns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReceiveReturnHistory_ReceiveReturnHistoryId",
                table: "ReceiveReturnHistory",
                column: "ReceiveReturnHistoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ReceiveReturns_ReceivedFromId",
                table: "ReceiveReturns",
                column: "ReceivedFromId");

            migrationBuilder.CreateIndex(
                name: "IX_ReceiveReturns_ReceiverId",
                table: "ReceiveReturns",
                column: "ReceiverId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReceiveReturnHistory");

            migrationBuilder.DropTable(
                name: "ReceiveReturns");
        }
    }
}
