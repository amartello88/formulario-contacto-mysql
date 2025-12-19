const form = document.getElementById("consultaForm");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

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
