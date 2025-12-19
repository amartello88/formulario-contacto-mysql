const form = document.getElementById("consultaForm");
const mensaje = document.getElementById("mensaje");

// 🔧 Ajustar fecha mínima de egreso según ingreso
form.fecha_desde.addEventListener("change", () => {
  const fechaDesde = new Date(form.fecha_desde.value);
  if (!isNaN(fechaDesde)) {
    const minSalida = new Date(fechaDesde);
    minSalida.setDate(minSalida.getDate() + 3); // +3 noches
    form.fecha_hasta.min = minSalida.toISOString().split("T")[0];
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fechaDesde = new Date(form.fecha_desde.value);
  const fechaHasta = new Date(form.fecha_hasta.value);

  // Calcular diferencia en días
  const diffTime = fechaHasta - fechaDesde;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays < 3) {
    mensaje.textContent = "La estadía mínima es de 3 noches ⛔";
    return; // corta el envío si no cumple
  }

  const data = {
    nombre: form.nombre.value,
    apellido: form.apellido.value,
    personas: Number(form.personas.value),
    mascotas: form.mascotas.value || "no",
    fecha_desde: form.fecha_desde.value,
    fecha_hasta: form.fecha_hasta.value,
    consulta: form.consulta.value
  };

  console.log("Datos enviados:", data);

  try {
    const response = await fetch("https://formulario-contacto-mysql.onrender.com/consulta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Error en el envío");

    const result = await response.json();
    console.log("Respuesta del servidor:", result);

    mensaje.textContent = "Consulta enviada con éxito 💌 (ID: " + result.id + ")";
    form.reset();

  } catch (error) {
    console.error("Error:", error);
    mensaje.textContent = "Hubo un error al enviar la consulta 😞";
  }
});
