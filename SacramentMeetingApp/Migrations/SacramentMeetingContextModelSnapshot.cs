﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace SacramentMeetingApp.Migrations
{
    [DbContext(typeof(SacramentMeetingContext))]
    partial class SacramentMeetingContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("SacramentMeeting.Models.Bishopric", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Calling")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Bishopric");
                });

            modelBuilder.Entity("SacramentMeeting.Models.Meeting", b =>
                {
                    b.Property<int>("MeetingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("ClosingHymnNumber")
                        .HasColumnType("int");

                    b.Property<string>("ClosingPrayer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ConductorId")
                        .HasColumnType("int");

                    b.Property<string>("Date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DismissalHymnNumber")
                        .HasColumnType("int");

                    b.Property<int?>("IntermediateHymnNumber")
                        .HasColumnType("int");

                    b.Property<int>("OpeningHymnNumber")
                        .HasColumnType("int");

                    b.Property<string>("OpeningPrayer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PresidingId")
                        .HasColumnType("int");

                    b.Property<int>("SacramentHymnNumber")
                        .HasColumnType("int");

                    b.Property<string>("SpecialMusicNumberMusician")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SpecialMusicNumberSong")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isFastSunday")
                        .HasColumnType("bit");

                    b.Property<bool>("isSpecialMusicNumber")
                        .HasColumnType("bit");

                    b.HasKey("MeetingId");

                    b.HasIndex("ConductorId");

                    b.HasIndex("PresidingId");

                    b.ToTable("Meeting");
                });

            modelBuilder.Entity("SacramentMeeting.Models.Speaker", b =>
                {
                    b.Property<int>("SpeakerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("MeetingId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Topic")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("SpeakerId");

                    b.HasIndex("MeetingId");

                    b.ToTable("Speaker");
                });

            modelBuilder.Entity("SacramentMeeting.Models.Meeting", b =>
                {
                    b.HasOne("SacramentMeeting.Models.Bishopric", "Conductor")
                        .WithMany("Conductings")
                        .HasForeignKey("ConductorId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("SacramentMeeting.Models.Bishopric", "Presiding")
                        .WithMany("Presidings")
                        .HasForeignKey("PresidingId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Conductor");

                    b.Navigation("Presiding");
                });

            modelBuilder.Entity("SacramentMeeting.Models.Speaker", b =>
                {
                    b.HasOne("SacramentMeeting.Models.Meeting", null)
                        .WithMany("Speakers")
                        .HasForeignKey("MeetingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SacramentMeeting.Models.Bishopric", b =>
                {
                    b.Navigation("Conductings");

                    b.Navigation("Presidings");
                });

            modelBuilder.Entity("SacramentMeeting.Models.Meeting", b =>
                {
                    b.Navigation("Speakers");
                });
#pragma warning restore 612, 618
        }
    }
}
