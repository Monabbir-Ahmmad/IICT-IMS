﻿// <auto-generated />
using System;
using API.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Database.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20221112213741_Mig6")]
    partial class Mig6
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("API.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("API.Entities.Distribution", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("DistributedToId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DistributionDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("DistributionRoom")
                        .HasColumnType("longtext");

                    b.Property<int?>("DistributorId")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("DistributedToId");

                    b.HasIndex("DistributorId");

                    b.ToTable("Distributions");
                });

            modelBuilder.Entity("API.Entities.InventoryProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("CurrentDistributionId")
                        .HasColumnType("int");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int?>("ProductId")
                        .HasColumnType("int");

                    b.Property<int?>("PurchaseOrderId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("VoucherId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("WarrantyExpiryDate")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("CurrentDistributionId");

                    b.HasIndex("ProductId");

                    b.HasIndex("PurchaseOrderId");

                    b.HasIndex("VoucherId");

                    b.ToTable("InventoryProducts");
                });

            modelBuilder.Entity("API.Entities.Procurement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("CreatedById")
                        .HasColumnType("int");

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("datetime(6)");

                    b.Property<decimal>("EstimatedTotalPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<bool>("IsApproved")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Status")
                        .HasColumnType("longtext");

                    b.Property<string>("Title")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("CreatedById");

                    b.ToTable("Procurements");
                });

            modelBuilder.Entity("API.Entities.ProcurementProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<decimal>("EstimatedPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int?>("ProcurementId")
                        .HasColumnType("int");

                    b.Property<int?>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("ProcurementId");

                    b.HasIndex("ProductId");

                    b.ToTable("ProcurementProducts");
                });

            modelBuilder.Entity("API.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Details")
                        .HasColumnType("longtext");

                    b.Property<string>("Manufacturer")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("API.Entities.PurchaseOrder", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("CreatedById")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DeliveryDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("DeliveryDeadline")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsApproved")
                        .HasColumnType("tinyint(1)");

                    b.Property<int?>("ProcurementId")
                        .HasColumnType("int");

                    b.Property<int?>("QuotationId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("ReceiveDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Status")
                        .HasColumnType("longtext");

                    b.Property<int?>("SupplierId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("longtext");

                    b.Property<decimal>("TotalPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("VoucherId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("CreatedById");

                    b.HasIndex("ProcurementId");

                    b.HasIndex("QuotationId");

                    b.HasIndex("SupplierId");

                    b.HasIndex("VoucherId");

                    b.ToTable("PurchaseOrders");
                });

            modelBuilder.Entity("API.Entities.PurchaseOrderProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("ProductId")
                        .HasColumnType("int");

                    b.Property<int?>("PurchaseOrderId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<decimal?>("UnitPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("WarrantyExpiryDate")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("PurchaseOrderId");

                    b.ToTable("PurchaseOrderProducts");
                });

            modelBuilder.Entity("API.Entities.Quotation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Accepted")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("ProcurementId")
                        .HasColumnType("int");

                    b.Property<decimal>("QuotedTotalPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int?>("SupplierId")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("ProcurementId");

                    b.HasIndex("SupplierId");

                    b.ToTable("Quotations");
                });

            modelBuilder.Entity("API.Entities.ReceiveReturn", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("ReceivedFromId")
                        .HasColumnType("int");

                    b.Property<int?>("ReceiverId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ReceivingDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("ReceivedFromId");

                    b.HasIndex("ReceiverId");

                    b.ToTable("ReceiveReturns");
                });

            modelBuilder.Entity("API.Entities.Supplier", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("longtext");

                    b.Property<string>("BIN")
                        .HasColumnType("longtext");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("CompanyName")
                        .HasColumnType("longtext");

                    b.Property<string>("ContactNumber")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<bool>("IsVerified")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Password")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Website")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Suppliers");
                });

            modelBuilder.Entity("API.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ContactNumber")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Designation")
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<bool>("IsVerified")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Password")
                        .HasColumnType("longtext");

                    b.Property<int?>("RoleId")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Username")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("API.Entities.UserRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("API.Entities.Voucher", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("FileName")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Vouchers");
                });

            modelBuilder.Entity("DistributionInventoryProduct", b =>
                {
                    b.Property<int>("DistributionHistoryId")
                        .HasColumnType("int");

                    b.Property<int>("ProductsId")
                        .HasColumnType("int");

                    b.HasKey("DistributionHistoryId", "ProductsId");

                    b.HasIndex("ProductsId");

                    b.ToTable("DistributionHistory", (string)null);
                });

            modelBuilder.Entity("InventoryProductReceiveReturn", b =>
                {
                    b.Property<int>("ProductsId")
                        .HasColumnType("int");

                    b.Property<int>("ReceiveReturnHistoryId")
                        .HasColumnType("int");

                    b.HasKey("ProductsId", "ReceiveReturnHistoryId");

                    b.HasIndex("ReceiveReturnHistoryId");

                    b.ToTable("ReceiveReturnHistory", (string)null);
                });

            modelBuilder.Entity("API.Entities.Distribution", b =>
                {
                    b.HasOne("API.Entities.User", "DistributedTo")
                        .WithMany()
                        .HasForeignKey("DistributedToId");

                    b.HasOne("API.Entities.User", "Distributor")
                        .WithMany()
                        .HasForeignKey("DistributorId");

                    b.Navigation("DistributedTo");

                    b.Navigation("Distributor");
                });

            modelBuilder.Entity("API.Entities.InventoryProduct", b =>
                {
                    b.HasOne("API.Entities.Distribution", "CurrentDistribution")
                        .WithMany()
                        .HasForeignKey("CurrentDistributionId");

                    b.HasOne("API.Entities.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId");

                    b.HasOne("API.Entities.PurchaseOrder", "PurchaseOrder")
                        .WithMany()
                        .HasForeignKey("PurchaseOrderId");

                    b.HasOne("API.Entities.Voucher", "Voucher")
                        .WithMany("InventoryProducts")
                        .HasForeignKey("VoucherId");

                    b.Navigation("CurrentDistribution");

                    b.Navigation("Product");

                    b.Navigation("PurchaseOrder");

                    b.Navigation("Voucher");
                });

            modelBuilder.Entity("API.Entities.Procurement", b =>
                {
                    b.HasOne("API.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");

                    b.HasOne("API.Entities.User", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");

                    b.Navigation("Category");

                    b.Navigation("CreatedBy");
                });

            modelBuilder.Entity("API.Entities.ProcurementProduct", b =>
                {
                    b.HasOne("API.Entities.Procurement", "Procurement")
                        .WithMany("Products")
                        .HasForeignKey("ProcurementId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("API.Entities.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId");

                    b.Navigation("Procurement");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("API.Entities.Product", b =>
                {
                    b.HasOne("API.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("API.Entities.PurchaseOrder", b =>
                {
                    b.HasOne("API.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");

                    b.HasOne("API.Entities.User", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");

                    b.HasOne("API.Entities.Procurement", "Procurement")
                        .WithMany()
                        .HasForeignKey("ProcurementId");

                    b.HasOne("API.Entities.Quotation", "Quotation")
                        .WithMany()
                        .HasForeignKey("QuotationId");

                    b.HasOne("API.Entities.Supplier", "Supplier")
                        .WithMany()
                        .HasForeignKey("SupplierId");

                    b.HasOne("API.Entities.Voucher", "Voucher")
                        .WithMany()
                        .HasForeignKey("VoucherId");

                    b.Navigation("Category");

                    b.Navigation("CreatedBy");

                    b.Navigation("Procurement");

                    b.Navigation("Quotation");

                    b.Navigation("Supplier");

                    b.Navigation("Voucher");
                });

            modelBuilder.Entity("API.Entities.PurchaseOrderProduct", b =>
                {
                    b.HasOne("API.Entities.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId");

                    b.HasOne("API.Entities.PurchaseOrder", "PurchaseOrder")
                        .WithMany("Products")
                        .HasForeignKey("PurchaseOrderId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Product");

                    b.Navigation("PurchaseOrder");
                });

            modelBuilder.Entity("API.Entities.Quotation", b =>
                {
                    b.HasOne("API.Entities.Procurement", "Procurement")
                        .WithMany("Quotations")
                        .HasForeignKey("ProcurementId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("API.Entities.Supplier", "Supplier")
                        .WithMany("Quotations")
                        .HasForeignKey("SupplierId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Procurement");

                    b.Navigation("Supplier");
                });

            modelBuilder.Entity("API.Entities.ReceiveReturn", b =>
                {
                    b.HasOne("API.Entities.User", "ReceivedFrom")
                        .WithMany()
                        .HasForeignKey("ReceivedFromId");

                    b.HasOne("API.Entities.User", "Receiver")
                        .WithMany()
                        .HasForeignKey("ReceiverId");

                    b.Navigation("ReceivedFrom");

                    b.Navigation("Receiver");
                });

            modelBuilder.Entity("API.Entities.Supplier", b =>
                {
                    b.HasOne("API.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("API.Entities.User", b =>
                {
                    b.HasOne("API.Entities.UserRole", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("DistributionInventoryProduct", b =>
                {
                    b.HasOne("API.Entities.Distribution", null)
                        .WithMany()
                        .HasForeignKey("DistributionHistoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.InventoryProduct", null)
                        .WithMany()
                        .HasForeignKey("ProductsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("InventoryProductReceiveReturn", b =>
                {
                    b.HasOne("API.Entities.InventoryProduct", null)
                        .WithMany()
                        .HasForeignKey("ProductsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.ReceiveReturn", null)
                        .WithMany()
                        .HasForeignKey("ReceiveReturnHistoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("API.Entities.Procurement", b =>
                {
                    b.Navigation("Products");

                    b.Navigation("Quotations");
                });

            modelBuilder.Entity("API.Entities.PurchaseOrder", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("API.Entities.Supplier", b =>
                {
                    b.Navigation("Quotations");
                });

            modelBuilder.Entity("API.Entities.Voucher", b =>
                {
                    b.Navigation("InventoryProducts");
                });
#pragma warning restore 612, 618
        }
    }
}
