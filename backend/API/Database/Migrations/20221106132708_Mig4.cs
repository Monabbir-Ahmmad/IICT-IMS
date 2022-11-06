using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Database.Migrations
{
    public partial class Mig4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DistributorId",
                table: "Distributions",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Distributions_DistributorId",
                table: "Distributions",
                column: "DistributorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Distributions_Users_DistributorId",
                table: "Distributions",
                column: "DistributorId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Distributions_Users_DistributorId",
                table: "Distributions");

            migrationBuilder.DropIndex(
                name: "IX_Distributions_DistributorId",
                table: "Distributions");

            migrationBuilder.DropColumn(
                name: "DistributorId",
                table: "Distributions");
        }
    }
}
