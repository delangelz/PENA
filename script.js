document.addEventListener("DOMContentLoaded", () => {
    // Este evento asegura que todo el DOM esté cargado antes de que el script se ejecute.

    // Validación de los nombres: solo permite letras y espacios
    document.getElementById("jugador1Nombre").addEventListener("input", function () {
        this.value = this.value.replace(/[^A-Za-z\s]/g, ""); // Bloquea caracteres no permitidos
    });

    document.getElementById("jugador2Nombre").addEventListener("input", function () {
        this.value = this.value.replace(/[^A-Za-z\s]/g, ""); // Bloquea caracteres no permitidos
    });

    // Arrays de preguntas para el Jugador 1 y el Jugador 2
    let preguntasJugador1 = [
        { 
            pregunta: "¿Cuántos jugadores tiene un equipo de fútbol?", 
            respuestas: ["11", "once"] 
        },
        { 
            pregunta: "¿Cuál es la duración de un partido de fútbol profesional?", 
            respuestas: ["90", "noventa"] 
        },
        { 
            pregunta: "¿Quién ganó el mundial de 2018?", 
            respuestas: ["francia"] 
        },
        { 
            pregunta: "¿Qué jugador tiene 7 Copas del Rey?", 
            respuestas: ["lionel messi", "messi"] 
        },
        { 
            pregunta: "¿Cuántas veces ganó el Balón de Oro Ronaldinho?", 
            respuestas: ["1", "uno"] 
        },
        { 
            pregunta: "¿Quién tiene más Copas del Rey, Barcelona o Real Madrid?", 
            respuestas: ["barcelona", "barça", "barsa"] 
        },
        { 
            pregunta: "¿Cuál fue el ganador en la mayor goleada del clásico español del siglo 21?", 
            respuestas: ["barcelona", "barça", "barsa"] 
        },
        { 
            pregunta: "¿Qué jugador tiene más goles en la historia de los clásicos?", 
            respuestas: ["lionel messi", "messi"] 
        },
        { 
            pregunta: "¿Quién ganó el mundial de 2018?", 
            respuestas: ["francia"] 
        },
        { 
            pregunta: "¿Cuántos Balones de Oro tiene Lionel Messi?", 
            respuestas: ["7", "siete"] 
        }
    ];
    

    let preguntasJugador2 = [
        { 
            pregunta: "¿Qué país ha ganado más Copas del Mundo?", 
            respuestas: ["brasil"] 
        },
        { 
            pregunta: "¿Qué jugador es conocido como 'La Pulga'?", 
            respuestas: ["messi", "lionel messi"] 
        },
        { 
            pregunta: "¿Quién ganó el primer Mundial del mundo?", 
            respuestas: ["uruguay"] 
        },
        { 
            pregunta: "¿En qué equipo empezó su carrera Cristiano Ronaldo?", 
            respuestas: ["sporting", "sporting lisboa"] 
        },
        { 
            pregunta: "¿Cuál es el número de camiseta que identificaba a Zinedine Zidane?", 
            respuestas: ["5", "cinco"] 
        },
        { 
            pregunta: "¿Cuántas veces Marcelo ganó la Champions?", 
            respuestas: ["5", "cinco"] 
        },
        { 
            pregunta: "¿Quién ganó el Mundial de 2010?", 
            respuestas: ["españa"] 
        },
        { 
            pregunta: "¿Qué equipo ha ganado más veces El Clásico?", 
            respuestas: ["real madrid", "madrid"] 
        },
        { 
            pregunta: "¿Qué entrenador del Barça tuvo una racha de 5 clásicos sin perder?", 
            respuestas: ["pep guardiola", "guardiola"] 
        },
        { 
            pregunta: "¿Cuántos Mundiales ha ganado Italia?", 
            respuestas: ["4", "cuatro"] 
        }
    ];
    

    // Información de cada jugador
    let jugador1 = { 
        nombre: "",
        puntaje: 0,                      // Acumulador: puntaje total del jugador
        respuestasCorrectas: 0,         // Contador: número de respuestas correctas
        respuestasIncorrectas: 0,       // Contador: número de respuestas incorrectas
        preguntasTotales: preguntasJugador1.length // Total de preguntas disponibles
    };

    let jugador2 = { 
        nombre: "",
        puntaje: 0,                      // Acumulador: puntaje total del jugador
        respuestasCorrectas: 0,         // Contador: número de respuestas correctas
        respuestasIncorrectas: 0,       // Contador: número de respuestas incorrectas
        preguntasTotales: preguntasJugador2.length // Total de preguntas disponibles
    };

    let turno = 0; // Controla de quién es el turno

    // Botón "Iniciar Juego"
    document.getElementById("iniciar").onclick = () => {
        jugador1.nombre = document.getElementById("jugador1Nombre").value.trim();
        jugador2.nombre = document.getElementById("jugador2Nombre").value.trim();

        if (!jugador1.nombre || !jugador2.nombre) {
            alert("Por favor, ingrese nombres válidos para ambos jugadores.");
            return;
        }

        // Oculta el formulario inicial, el título y el texto de introducción
        document.getElementById("formularioInicial").style.display = "none";
        document.querySelector("h1").style.display = "none"; // Oculta el título
        document.querySelector("p").style.display = "none";  // Oculta el texto introductorio

        // Muestra la sección del juego
        document.getElementById("juego").style.display = "block";

        jugar(); // Comienza el juego
    };

    // Función principal del juego
    function jugar() {
        let jugadorActual = turno % 2 === 0 ? jugador1 : jugador2;
        let preguntasDisponibles = turno % 2 === 0 ? preguntasJugador1 : preguntasJugador2;

        if (preguntasDisponibles.length === 0) {
            mostrarResultados();
            return;
        }

        let preguntaActual = preguntasDisponibles.shift();
        document.getElementById("turno").innerText = `Turno de ${jugadorActual.nombre}`;
        document.getElementById("pregunta").innerText = preguntaActual.pregunta;

        document.getElementById("enviar").onclick = () => {
            let respuestaUsuario = document.getElementById("respuesta").value.trim().toLowerCase();

            // Verifica si la respuesta del usuario está dentro del array de respuestas correctas
            if (preguntaActual.respuestas.some(respuesta => respuesta.toLowerCase() === respuestaUsuario)) {
                jugadorActual.puntaje += 10; // Acumulador: suma 10 puntos por respuesta correcta
                jugadorActual.respuestasCorrectas++; // Contador: incrementa respuestas correctas
            } else {
                jugadorActual.respuestasIncorrectas++; // Contador: incrementa respuestas incorrectas
            }

            turno++;
            document.getElementById("respuesta").value = "";
            jugar();
        };
    }

    // Función para mostrar los resultados finales
    function mostrarResultados() {
        document.getElementById("juego").style.display = "none";
        document.getElementById("resultados").style.display = "block";

        // Calcula los porcentajes y el ganador
        let porcentaje1 = ((jugador1.respuestasCorrectas / jugador1.preguntasTotales) * 100).toFixed(2); // Porcentaje del jugador 1
        let porcentaje2 = ((jugador2.respuestasCorrectas / jugador2.preguntasTotales) * 100).toFixed(2); // Porcentaje del jugador 2

        let promedio1 = (jugador1.puntaje / jugador1.respuestasCorrectas || 0).toFixed(2); // Promedio del jugador 1
        let promedio2 = (jugador2.puntaje / jugador2.respuestasCorrectas || 0).toFixed(2); // Promedio del jugador 2

        let ganador = "";
        if (jugador1.puntaje > jugador2.puntaje) {
            ganador = jugador1.nombre;
        } else if (jugador2.puntaje > jugador1.puntaje) {
            ganador = jugador2.nombre;
        } else {
            ganador = "Empate";
        }

        // Muestra todos los resultados al final
        document.getElementById("resultados").innerHTML = `
            <h2>Resultados Finales</h2>
            <p><strong>${jugador1.nombre}</strong>: Puntaje: ${jugador1.puntaje}, Correctas: ${jugador1.respuestasCorrectas}, Incorrectas: ${jugador1.respuestasIncorrectas}, Porcentaje de respuestas correctas: ${porcentaje1}%, Promedio de puntos obtenidos por cada respuesta correcta: ${promedio1}</p>
            <p><strong>${jugador2.nombre}</strong>: Puntaje: ${jugador2.puntaje}, Correctas: ${jugador2.respuestasCorrectas}, Incorrectas: ${jugador2.respuestasIncorrectas}, Porcentaje de respuestas correctas: ${porcentaje2}%, Promedio de puntos obtenidos por cada respuesta correcta: ${promedio2}</p>
            <h3>El ganador es: <strong>${ganador}</strong></h3>
        `;
    }
});
