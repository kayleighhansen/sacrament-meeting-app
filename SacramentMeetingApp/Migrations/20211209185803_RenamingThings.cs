using Microsoft.EntityFrameworkCore.Migrations;

namespace SacramentMeetingApp.Migrations
{
    public partial class RenamingThings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SpecialMusicNumberName",
                table: "Meeting",
                newName: "SpecialMusicNumberSong");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SpecialMusicNumberSong",
                table: "Meeting",
                newName: "SpecialMusicNumberName");
        }
    }
}
