﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using ProRent.DataAccess;

namespace ProRent.Migrations
{
    [DbContext(typeof(ProRentContext))]
    [Migration("20210223225510_Visits2")]
    partial class Visits2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("ProRent.Domain.Models.RealEstate", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<double>("Area")
                        .HasColumnType("double precision");

                    b.Property<int>("BedRoomQt")
                        .HasColumnType("integer");

                    b.Property<string>("City")
                        .HasColumnType("text");

                    b.Property<bool>("Closet")
                        .HasColumnType("boolean");

                    b.Property<double?>("CondominiumFee")
                        .HasColumnType("double precision");

                    b.Property<string>("Country")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<bool?>("Doorman")
                        .HasColumnType("boolean");

                    b.Property<int?>("Floor")
                        .HasColumnType("integer");

                    b.Property<int>("GarageParkingSpace")
                        .HasColumnType("integer");

                    b.Property<int>("LivingRoomQt")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Neighborhood")
                        .HasColumnType("text");

                    b.Property<int>("Number")
                        .HasColumnType("integer");

                    b.Property<double>("RentValue")
                        .HasColumnType("double precision");

                    b.Property<string>("State")
                        .HasColumnType("text");

                    b.Property<string>("Street")
                        .HasColumnType("text");

                    b.Property<int>("SuiteQt")
                        .HasColumnType("integer");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("RealEstates");
                });

            modelBuilder.Entity("ProRent.Domain.Models.Visit", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<long>("RealEstateId")
                        .HasColumnType("bigint");

                    b.Property<DateTimeOffset>("VisitTime")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("RealEstateId");

                    b.ToTable("Visits");
                });

            modelBuilder.Entity("ProRent.Domain.Models.Visit", b =>
                {
                    b.HasOne("ProRent.Domain.Models.RealEstate", "RealEstate")
                        .WithMany()
                        .HasForeignKey("RealEstateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("RealEstate");
                });
#pragma warning restore 612, 618
        }
    }
}