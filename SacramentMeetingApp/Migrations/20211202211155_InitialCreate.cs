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

            migrationBuilder.CreateTable(
                name: "Meeting",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PresidingId = table.Column<long>(type: "bigint", nullable: true),
                    ConductorId = table.Column<long>(type: "bigint", nullable: true),
                    OpeningPrayer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClosingPrayer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OpeningHymnId = table.Column<long>(type: "bigint", nullable: true),
                    ClosingHymnId = table.Column<long>(type: "bigint", nullable: true),
                    SacramentHymnId = table.Column<long>(type: "bigint", nullable: true),
                    DismissalHymnId = table.Column<long>(type: "bigint", nullable: true),
                    isFastSunday = table.Column<bool>(type: "bit", nullable: false),
                    isSpecialMusicNumber = table.Column<bool>(type: "bit", nullable: false),
                    SpecialMusicNumberName = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meeting", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Meeting_Bishopric_ConductorId",
                        column: x => x.ConductorId,
                        principalTable: "Bishopric",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Meeting_Bishopric_PresidingId",
                        column: x => x.PresidingId,
                        principalTable: "Bishopric",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Meeting_Hymn_ClosingHymnId",
                        column: x => x.ClosingHymnId,
                        principalTable: "Hymn",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Meeting_Hymn_DismissalHymnId",
                        column: x => x.DismissalHymnId,
                        principalTable: "Hymn",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Meeting_Hymn_OpeningHymnId",
                        column: x => x.OpeningHymnId,
                        principalTable: "Hymn",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Meeting_Hymn_SacramentHymnId",
                        column: x => x.SacramentHymnId,
                        principalTable: "Hymn",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Speaker",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prefix = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MeetingId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Speaker", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Speaker_Meeting_MeetingId",
                        column: x => x.MeetingId,
                        principalTable: "Meeting",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Meeting_ClosingHymnId",
                table: "Meeting",
                column: "ClosingHymnId");

            migrationBuilder.CreateIndex(
                name: "IX_Meeting_ConductorId",
                table: "Meeting",
                column: "ConductorId");

            migrationBuilder.CreateIndex(
                name: "IX_Meeting_DismissalHymnId",
                table: "Meeting",
                column: "DismissalHymnId");

            migrationBuilder.CreateIndex(
                name: "IX_Meeting_OpeningHymnId",
                table: "Meeting",
                column: "OpeningHymnId");

            migrationBuilder.CreateIndex(
                name: "IX_Meeting_PresidingId",
                table: "Meeting",
                column: "PresidingId");

            migrationBuilder.CreateIndex(
                name: "IX_Meeting_SacramentHymnId",
                table: "Meeting",
                column: "SacramentHymnId");

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

            migrationBuilder.DropTable(
                name: "Hymn");
        }
    }
}
