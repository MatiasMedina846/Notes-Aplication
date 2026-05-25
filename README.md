# Ensolvers Notes - Challenge Técnico

Proyecto Full Stack para la gestión organizada de notas, diseñado para ser intuitivo, minimalista y eficiente.

---

##  Descripción del Proyecto
Esta aplicación permite realizar un CRUD completo de notas (Crear, Leer, Actualizar, Eliminar) con soporte para etiquetado, archivado y búsqueda rápida. El enfoque principal ha sido la creación de una **interfaz de usuario limpia** y una **comunicación fluida entre frontend y backend**.

##  Stack Tecnológico

### Backend
* **Framework:** Spring Boot.
* **Persistencia:** Base de datos H2 (Configuración en memoria para despliegue rápido).
* **Gestión de dependencias:** Maven.

### Frontend
* **Framework:** Angular 17+ (Standalone Components).
* **UI/UX:** CSS personalizado enfocado en minimalismo y usabilidad.
* **Gestión de estado:** Manejo local de datos con sincronización reactiva (`ChangeDetectorRef`).

---

## ⚙ Requisitos Previos
Para ejecutar el proyecto, asegúrate de tener instalado:
- **Java 21** o superior.
- **Node.js** (versión LTS recomendada).
- **Maven** (opcional, incluido en el wrapper del proyecto).

##  Guía de Ejecución
Se ha incluido un script de automatización para evitar configuraciones manuales:

1. Clona el repositorio.
2. Abre una terminal en la raíz del proyecto.
3. Ejecuta el archivo `run.bat` (Windows).
4. La aplicación estará disponible en: `http://localhost:4200`

---

##  Aspectos Destacados
* **Arquitectura:** Separación clara entre el servicio de backend y la capa de componentes en el frontend.
* **UX/UI:** Diseño responsive que garantiza una experiencia consistente en cualquier pantalla.
* **Robustez:** Implementación de manejo de eventos y detección de cambios para garantizar una interfaz responsiva y sin fallos de renderizado.
* **Estructura:** Código organizado con buenas prácticas de nomenclatura y arquitectura de componentes standalone de Angular.

---

##  Contacto
Proyecto desarrollado por **Matias German** para el desafío técnico de Ensolvers.

---
*Si encuentras algún problema al ejecutar la aplicación, asegúrate de que los puertos 8080 (backend) y 4200 (frontend) estén libres.*