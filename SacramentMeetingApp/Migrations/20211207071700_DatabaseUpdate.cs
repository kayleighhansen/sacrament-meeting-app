using Microsoft.EntityFrameworkCore.Migrations;

namespace SacramentMeetingApp.Migrations
{
    public partial class DatabaseUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meeting_Hymn_ClosingHymnId",
                table: "Meeting");

            migrationBuilder.DropForeignKey(
                name: "FK_Meeting_Hymn_DismissalHymnId",
                table: "Meeting");

            migrationBuilder.DropForeignKey(
                name: "FK_Meeting_Hymn_OpeningHymnId",
                table: "Meeting");

            migrationBuilder.DropForeignKey(
                name: "FK_Meeting_Hymn_SacramentHymnId",
                table: "Meeting");

            migrationBuilder.DropTable(
                name: "Hymn");

            migrationBuilder.DropIndex(
                name: "IX_Meeting_ClosingHymnId",
                table: "Meeting");

            migrationBuilder.DropIndex(
                name: "IX_Meeting_DismissalHymnId",
                table: "Meeting");

            migrationBuilder.DropIndex(
                name: "IX_Meeting_OpeningHymnId",
                table: "Meeting");

            migrationBuilder.DropIndex(
                name: "IX_Meeting_SacramentHymnId",
                table: "Meeting");

            migrationBuilder.DropColumn(
                name: "ClosingHymnId",
                table: "Meeting");

            migrationBuilder.DropColumn(
                name: "DismissalHymnId",
                table: "Meeting");

            migrationBuilder.DropColumn(
                name: "OpeningHymnId",
                table: "Meeting");

            migrationBuilder.DropColumn(
                name: "SacramentHymnId",
                table: "Meeting");

            migrationBuilder.AddColumn<string>(
                name: "Topic",
                table: "Speaker",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SpecialMusicNumberName",
                table: "Meeting",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddColumn<int>(
                name: "ClosingHymnNumber",
                table: "Meeting",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DismissalHymnNumber",
                table: "Meeting",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IntermediateHymnNumber",
                table: "Meeting",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OpeningHymnNumber",
                table: "Meeting",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SacramentHymnNumber",
                table: "Meeting",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "SpecialMusicNumberMusician",
                table: "Meeting",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Topic",
                table: "Speaker");

            migrationBuilder.DropColumn(
                name: "ClosingHymnNumber",
                table: "Meeting");

            migrationBuilder.DropColumn(
                name: "DismissalHymnNumber",
                table: "Meeting");

            migrationBuilder.DropColumn(
                name: "IntermediateHymnNumber",
                table: "Meeting");

            migrationBuilder.DropColumn(
                name: "OpeningHymnNumber",
                table: "Meeting");

            migrationBuilder.DropColumn(
                name: "SacramentHymnNumber",
                table: "Meeting");

            migrationBuilder.DropColumn(
                name: "SpecialMusicNumberMusician",
                table: "Meeting");

            migrationBuilder.AlterColumn<bool>(
                name: "SpecialMusicNumberName",
                table: "Meeting",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ClosingHymnId",
                table: "Meeting",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DismissalHymnId",
                table: "Meeting",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "OpeningHymnId",
                table: "Meeting",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "SacramentHymnId",
                table: "Meeting",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Hymn",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hymn", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Meeting_ClosingHymnId",
                table: "Meeting",
                column: "ClosingHymnId");

            migrationBuilder.CreateIndex(
                name: "IX_Meeting_DismissalHymnId",
                table: "Meeting",
                column: "DismissalHymnId");

            migrationBuilder.CreateIndex(
                name: "IX_Meeting_OpeningHymnId",
                table: "Meeting",
                column: "OpeningHymnId");

            migrationBuilder.CreateIndex(
                name: "IX_Meeting_SacramentHymnId",
                table: "Meeting",
                column: "SacramentHymnId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meeting_Hymn_ClosingHymnId",
                table: "Meeting",
                column: "ClosingHymnId",
                principalTable: "Hymn",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Meeting_Hymn_DismissalHymnId",
                table: "Meeting",
                column: "DismissalHymnId",
                principalTable: "Hymn",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Meeting_Hymn_OpeningHymnId",
                table: "Meeting",
                column: "OpeningHymnId",
                principalTable: "Hymn",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Meeting_Hymn_SacramentHymnId",
                table: "Meeting",
                column: "SacramentHymnId",
                principalTable: "Hymn",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
