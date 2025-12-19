const form = document.getElementById("consultaForm");
const mensaje = document.getElementById("mensaje"); // div para mostrar mensajes

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

  try {
    const response = await fetch("http://localhost:3000/consulta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Error en el envío");

    mensaje.textContent = "Consulta enviada con éxito 💌";
    form.reset();

  } catch (error) {
    console.error(error);
    mensaje.textContent = "Hubo un error al enviar la consulta 😞";
  }
});
