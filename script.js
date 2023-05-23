const qz = require("qz-tray");

async function printToQZ() {
  try {
    // Conectar a QZ Tray
    await qz.api.connect();

    // Obtener la lista de impresoras disponibles
    const printers = await qz.printers.find();

    // Seleccionar una impresora (cambiar el nombre de la impresora por la que deseas utilizar)
    const printerName = "nombre_de_la_impresora";
    const printer = printers.find(p => p.name === printerName);

    if (!printer) {
      throw new Error(`No se encontró la impresora "${printerName}"`);
    }

    // Configurar la impresora y la etiqueta (cambiar por el formato que desees imprimir)
    const config = qz.configs.create(printer);
    const data = [
      "^XA",
      "^FO50,50^A0N50,50^FDHello World!^FS",
      "^XZ"
    ];

    // Enviar los datos de impresión a la impresora seleccionada
    await qz.print(config, data);

    // Desconectar de QZ Tray
    await qz.api.disconnect();
  } catch (err) {
    console.error(err);
  }
}

printToQZ();
