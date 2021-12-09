using Microsoft.EntityFrameworkCore.Migrations;

namespace SacramentMeetingApp.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bishopric",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Calling = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bishopric", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Meeting",
                columns: table => new
                {
                    MeetingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PresidingId = table.Column<int>(type: "int", nullable: false),
                    ConductorId = table.Column<int>(type: "int", nullable: false),
                    OpeningPrayer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClosingPrayer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OpeningHymnNumber = table.Column<int>(type: "int", nullable: false),
                    ClosingHymnNumber = table.Column<int>(type: "int", nullable: false),
                    SacramentHymnNumber = table.Column<int>(type: "int", nullable: false),
                    IntermediateHymnNumber = table.Column<int>(type: "int", nullable: true),
                    DismissalHymnNumber = table.Column<int>(type: "int", nullable: false),
                    isFastSunday = table.Column<bool>(type: "bit", nullable: false),
                    isSpecialMusicNumber = table.Column<bool>(type: "bit", nullable: false),
                    SpecialMusicNumberName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpecialMusicNumberMusician = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PresidingId1 = table.Column<long>(type: "bigint", nullable: true),
                    ConductorId1 = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meeting", x => x.MeetingId);
                    table.ForeignKey(
                        name: "FK_Meeting_Bishopric_ConductorId1",
                        column: x => x.ConductorId1,
                        principalTable: "Bishopric",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Meeting_Bishopric_PresidingId1",
                        column: x => x.PresidingId1,
                        principalTable: "Bishopric",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Meeting_ConductorId1",
                table: "Meeting",
                column: "ConductorId1");

            migrationBuilder.CreateIndex(
                name: "IX_Meeting_PresidingId1",
                table: "Meeting",
                column: "PresidingId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Meeting");

            migrationBuilder.DropTable(
                name: "Bishopric");
        }
    }
}
