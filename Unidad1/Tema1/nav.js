// --- Función para cargar contenido ---
async function loadContent(page) {
    const contentArea = document.getElementById("content-area");
    const wrapper = document.getElementById("content-contenido");
    try {
        const response = await fetch(`contenidos/${page}`);
        if (!response.ok) throw new Error("Error al cargar " + page);
        const html = await response.text();
        contentArea.innerHTML = html;
        wrapper.style.display = "block"; // Mostrar el contenedor al cargar
    } catch (error) {
        contentArea.innerHTML = `<p class="text-red-500">${error.message}</p>`;
        wrapper.style.display = "block"; // También mostrar en caso de error
    }
}

// --- Manejo de navegación ---
document.querySelectorAll(".sidebar-link").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const page = link.dataset.page;

        // Marcar como activo
        document.querySelectorAll(".sidebar-link").forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        // Cargar contenido
        loadContent(page);
    });
});
