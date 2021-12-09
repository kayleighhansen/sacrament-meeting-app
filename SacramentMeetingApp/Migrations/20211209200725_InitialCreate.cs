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
                    Id = table.Column<int>(type: "int", nullable: false)
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
                    SpecialMusicNumberMusician = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpecialMusicNumberSong = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meeting", x => x.MeetingId);
                    table.ForeignKey(
                        name: "FK_Meeting_Bishopric_ConductorId",
                        column: x => x.ConductorId,
                        principalTable: "Bishopric",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Meeting_Bishopric_PresidingId",
                        column: x => x.PresidingId,
                        principalTable: "Bishopric",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Speaker",
                columns: table => new
                {
                    SpeakerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Topic = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MeetingId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Speaker", x => x.SpeakerId);
                    table.ForeignKey(
                        name: "FK_Speaker_Meeting_MeetingId",
                        column: x => x.MeetingId,
                        principalTable: "Meeting",
                        principalColumn: "MeetingId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Meeting_ConductorId",
                table: "Meeting",
                column: "ConductorId");

            migrationBuilder.CreateIndex(
                name: "IX_Meeting_PresidingId",
                table: "Meeting",
                column: "PresidingId");

            migrationBuilder.CreateIndex(
                name: "IX_Speaker_MeetingId",
                table: "Speaker",
                column: "MeetingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Speaker");

            migrationBuilder.DropTable(
                name: "Meeting");

            migrationBuilder.DropTable(
                name: "Bishopric");
        }
    }
}
