using Microsoft.EntityFrameworkCore.Migrations;

namespace api_publicidadRyR.Migrations
{
    public partial class Inicial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categoria",
                columns: table => new
                {
                    cod_cat = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nom_cat = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    estado = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categoria", x => x.cod_cat);
                });

            migrationBuilder.CreateTable(
                name: "Cliente",
                columns: table => new
                {
                    codigocliente = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    apellido = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    telefono = table.Column<int>(type: "int", nullable: false),
                    estado = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cliente", x => x.codigocliente);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    codigo_user = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_user = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    ape_user = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    cargo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    pass = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    estado = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => x.codigo_user);
                });

            migrationBuilder.CreateTable(
                name: "Juguetes",
                columns: table => new
                {
                    id_prod = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    precio_prod = table.Column<double>(type: "float", nullable: false),
                    cant_prod = table.Column<int>(type: "int", nullable: false),
                    nombreprod = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    estado = table.Column<bool>(type: "bit", nullable: false),
                    cod_cat = table.Column<int>(type: "int", nullable: false),
                    categoriacod_cat = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Juguetes", x => x.id_prod);
                    table.ForeignKey(
                        name: "FK_Juguetes_Categoria_categoriacod_cat",
                        column: x => x.categoriacod_cat,
                        principalTable: "Categoria",
                        principalColumn: "cod_cat",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Venta",
                columns: table => new
                {
                    codigo_venta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    fech_venta = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    nom_cli = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    total = table.Column<double>(type: "float", nullable: false),
                    estado = table.Column<bool>(type: "bit", nullable: false),
                    codigo_user = table.Column<int>(type: "int", nullable: false),
                    usuariocodigo_user = table.Column<int>(type: "int", nullable: true),
                    codigocliente = table.Column<int>(type: "int", nullable: false),
                    clientecodigocliente = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Venta", x => x.codigo_venta);
                    table.ForeignKey(
                        name: "FK_Venta_Cliente_clientecodigocliente",
                        column: x => x.clientecodigocliente,
                        principalTable: "Cliente",
                        principalColumn: "codigocliente",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Venta_Usuario_usuariocodigo_user",
                        column: x => x.usuariocodigo_user,
                        principalTable: "Usuario",
                        principalColumn: "codigo_user",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Detalle_venta",
                columns: table => new
                {
                    id_detalle_venta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cantidad = table.Column<int>(type: "int", nullable: false),
                    producto = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    importe = table.Column<int>(type: "int", nullable: false),
                    id_prod = table.Column<int>(type: "int", nullable: false),
                    juguetesid_prod = table.Column<int>(type: "int", nullable: true),
                    codigo_venta = table.Column<int>(type: "int", nullable: false),
                    ventacodigo_venta = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Detalle_venta", x => x.id_detalle_venta);
                    table.ForeignKey(
                        name: "FK_Detalle_venta_Juguetes_juguetesid_prod",
                        column: x => x.juguetesid_prod,
                        principalTable: "Juguetes",
                        principalColumn: "id_prod",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Detalle_venta_Venta_ventacodigo_venta",
                        column: x => x.ventacodigo_venta,
                        principalTable: "Venta",
                        principalColumn: "codigo_venta",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Detalle_venta_juguetesid_prod",
                table: "Detalle_venta",
                column: "juguetesid_prod");

            migrationBuilder.CreateIndex(
                name: "IX_Detalle_venta_ventacodigo_venta",
                table: "Detalle_venta",
                column: "ventacodigo_venta");

            migrationBuilder.CreateIndex(
                name: "IX_Juguetes_categoriacod_cat",
                table: "Juguetes",
                column: "categoriacod_cat");

            migrationBuilder.CreateIndex(
                name: "IX_Venta_clientecodigocliente",
                table: "Venta",
                column: "clientecodigocliente");

            migrationBuilder.CreateIndex(
                name: "IX_Venta_usuariocodigo_user",
                table: "Venta",
                column: "usuariocodigo_user");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Detalle_venta");

            migrationBuilder.DropTable(
                name: "Juguetes");

            migrationBuilder.DropTable(
                name: "Venta");

            migrationBuilder.DropTable(
                name: "Categoria");

            migrationBuilder.DropTable(
                name: "Cliente");

            migrationBuilder.DropTable(
                name: "Usuario");
        }
    }
}
