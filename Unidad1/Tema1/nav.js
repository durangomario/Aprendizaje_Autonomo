// --- Función para cargar contenido ---
async function loadContent(page) {
    const contentArea = document.getElementById("content-area");
    if (page == "Contenido.html"){
        const contenido = document.getElementById("contenido");
        contenido.style.display = "block";
        contentArea.style.display = "none";
    }else{        
        contentArea.style.display = "block";
        contenido.style.display = "none";
        try {
            const response = await fetch(`contenidos/${page}`);
            if (!response.ok) throw new Error("Error al cargar " + page);
            const html = await response.text();
            contentArea.innerHTML = html;
        } catch (error) {
            contentArea.innerHTML = `<p class="text-red-500">${error.message}</p>`;
        }
    }
}

// --- Cargar inicio por defecto ---
window.addEventListener("DOMContentLoaded", () => {
    loadContent("inicio.html");
});

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
