using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Database.Migrations
{
    public partial class ProcurementsUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProcurementItems_Procurements_ProcurementId",
                table: "ProcurementItems");

            migrationBuilder.AlterColumn<int>(
                name: "ProcurementId",
                table: "ProcurementItems",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProcurementItems_Procurements_ProcurementId",
                table: "ProcurementItems",
                column: "ProcurementId",
                principalTable: "Procurements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProcurementItems_Procurements_ProcurementId",
                table: "ProcurementItems");

            migrationBuilder.AlterColumn<int>(
                name: "ProcurementId",
                table: "ProcurementItems",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_ProcurementItems_Procurements_ProcurementId",
                table: "ProcurementItems",
                column: "ProcurementId",
                principalTable: "Procurements",
                principalColumn: "Id");
        }
    }
}
